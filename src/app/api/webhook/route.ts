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
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      console.log('New subscription!', session.customer_email)
      // TODO: Save subscription to database
      break
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      console.log('Subscription cancelled:', subscription.id)
      // TODO: Revoke premium access
      break
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object
      console.log('Payment succeeded:', invoice.id)
      break
    }
    case 'invoice.payment_failed': {
      const invoice = event.data.object
      console.log('Payment failed:', invoice.id)
      // TODO: Notify user
      break
    }
  }

  return NextResponse.json({ received: true })
}
