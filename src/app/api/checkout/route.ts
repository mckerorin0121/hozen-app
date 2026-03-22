import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'

// Allowed origins for redirect URLs
const ALLOWED_ORIGINS = [
  'https://hozen-app.vercel.app',
  'https://www.hozen-app.vercel.app',
]
if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000')
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10       // max requests
const RATE_WINDOW = 60_000  // per 60 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Input validation
    const body = await req.json().catch(() => null)
    if (!body || typeof body.plan !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { plan } = body
    if (plan !== 'monthly' && plan !== 'yearly') {
      return NextResponse.json(
        { error: 'Invalid plan. Must be "monthly" or "yearly".' },
        { status: 400 }
      )
    }

    const priceId = plan === 'yearly' ? PRICE_IDS.yearly : PRICE_IDS.monthly
    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not configured' },
        { status: 500 }
      )
    }

    // Origin validation (prevent open redirect)
    const requestOrigin = req.headers.get('origin') || ''
    const origin = ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0]

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${origin}/meditation?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
