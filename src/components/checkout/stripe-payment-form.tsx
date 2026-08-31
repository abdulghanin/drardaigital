"use client";

import { useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";
import { Button } from "@/components/ui/button";

export function StripePaymentForm({
  locale,
  dict,
  submitting,
  onSuccess,
  onError,
}: {
  locale: Locale;
  dict: Dictionary;
  submitting: boolean;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setMessage("");
    onError("");
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/${locale}/checkout`,
      },
    });

    if (result.error) {
      const nextMessage = result.error.message ?? "Unable to complete payment.";
      setMessage(nextMessage);
      onError(nextMessage);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
      return;
    }

    const nextMessage = "Payment requires additional action.";
    setMessage(nextMessage);
    onError(nextMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />
      <p className="text-xs text-muted">{dict.checkout.securePayment}</p>
      {message && <p className="text-sm text-red-600" role="alert">{message}</p>}
      <Button type="submit" className="w-full" disabled={!stripe || !elements || submitting}>
        {submitting ? dict.states.loading : dict.checkout.placeOrder}
      </Button>
    </form>
  );
}
