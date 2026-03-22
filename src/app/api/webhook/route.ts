import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      // TODO: Save subscription to database
      break
    }
    case 'customer.subscription.deleted': {
      // TODO: Revoke premium access
      break
    }
    case 'invoice.payment_succeeded': {
      break
    }
    case 'invoice.payment_failed': {
      // TODO: Notify user
      break
    }
  }

  return NextResponse.json({ received: true })
}
