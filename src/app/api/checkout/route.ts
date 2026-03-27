import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

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
    if (!body || typeof body.amount !== 'number') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    const { amount } = body
    // Minimum ¥100, maximum ¥100,000
    if (amount < 100 || amount > 100000 || !Number.isInteger(amount)) {
      return NextResponse.json(
        { error: 'Amount must be an integer between 100 and 100000.' },
        { status: 400 }
      )
    }

    // Origin validation (prevent open redirect)
    const requestOrigin = req.headers.get('origin') || ''
    const origin = ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0]

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: '歩禅 HoZen — ご支援',
              description: '歩く瞑想アプリへのドネーション',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/pricing?donated=true`,
      cancel_url: `${origin}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
