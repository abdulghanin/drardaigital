import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getGiftCardById } from "@/data/products";
import type { CartLine } from "@/types";

export async function POST(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe is not configured." }, { status: 500 });
  }

  try {
    const body = (await request.json()) as {
      lines?: CartLine[];
      customerEmail?: string;
      customerName?: string;
    };
    const lines = body.lines ?? [];

    if (lines.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    const amount = lines.reduce((total, line) => {
      const card = getGiftCardById(line.giftCardId);
      const validQuantity = Number.isInteger(line.quantity) && line.quantity > 0;
      const validAmount = Number.isFinite(line.amount) && line.amount > 0;
      const amountInFils = Math.round(line.amount * 100);

      if (!card || !validQuantity || !validAmount || amountInFils < card.priceMin * 100 || amountInFils > card.priceMax * 100) {
        throw new Error("Invalid cart item.");
      }

      return total + amountInFils * line.quantity;
    }, 0);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "aed",
      payment_method_types: ["card"],
      receipt_email: body.customerEmail,
      description: "Dara Digital gift cards",
      metadata: {
        customerName: body.customerName ?? "",
        customerEmail: body.customerEmail ?? "",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create payment.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
