import { loadStripe } from '@stripe/stripe-js';
import { products } from '../stripe-config';

// Initialize Stripe
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || '';

if (!stripePublicKey) {
  console.error('Missing Stripe public key');
}

export const stripePromise = loadStripe(stripePublicKey);

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription') {
  const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      success_url: `${window.location.origin}/success`,
      cancel_url: `${window.location.origin}/cart`,
      mode,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create checkout session');
  }

  const { url } = await response.json();
  return url;
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find(product => product.priceId === priceId);
}