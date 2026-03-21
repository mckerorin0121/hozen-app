import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRICE_IDS } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()
    const priceId = plan === 'yearly' ? PRICE_IDS.yearly : PRICE_IDS.monthly

    if (!priceId) {
      return NextResponse.json(
        { error: 'Price not configured' },
        { status: 500 }
      )
    }

    const origin = req.headers.get('origin') || 'http://localhost:3000'

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
  } catch (err: any) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}
