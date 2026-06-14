'use client';

import { getStripePublishableKey } from '@/app/lib/shop-payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';
import { useMemo, type ReactNode } from 'react';

const stripePublishableKey = getStripePublishableKey();
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

type StripeCheckoutProviderProps = {
  clientSecret: string;
  children: ReactNode;
};

export function StripeCheckoutProvider({
  clientSecret,
  children,
}: StripeCheckoutProviderProps) {
  const options = useMemo<StripeElementsOptions>(
    () => ({ clientSecret }),
    [clientSecret]
  );

  if (!stripePromise) {
    return <>{children}</>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

export function isStripeCheckoutConfigured(): boolean {
  return Boolean(stripePromise);
}
