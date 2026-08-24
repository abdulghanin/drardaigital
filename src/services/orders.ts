import type { CartLine, Order } from "@/types";
import { generateOrderNumber } from "@/lib/utils";

/**
 * Mock order service. Later this will POST to the Laravel `/orders` endpoint.
 */
export async function placeOrder(input: {
  lines: CartLine[];
  total: number;
  customerName: string;
  customerEmail: string;
}): Promise<Order> {
  const order: Order = {
    orderNumber: generateOrderNumber(),
    lines: input.lines,
    total: input.total,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    createdAt: new Date().toISOString(),
  };
  return Promise.resolve(order);
}
