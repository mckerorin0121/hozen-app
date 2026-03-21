import Stripe from 'stripe'

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10' as any,
})

// Price IDs from Stripe Dashboard
export const PRICE_IDS = {
  monthly: process.env.STRIPE_MONTHLY_PRICE_ID || '',
  yearly: process.env.STRIPE_YEARLY_PRICE_ID || '',
}
