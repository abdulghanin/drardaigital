"use client";

import { generateOrderNumber, generateVoucherCode } from "./utils";
import type { CartLine } from "@/types";

export interface CompletedOrderLine extends CartLine {
  voucherCode: string;
}

export interface CompletedOrder {
  orderNumber: string;
  lines: CompletedOrderLine[];
  total: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
}

const KEY = "dara-digital-last-order";

export function saveCompletedOrder(input: {
  lines: CartLine[];
  total: number;
  customerName: string;
  customerEmail: string;
}): CompletedOrder {
  const order: CompletedOrder = {
    orderNumber: generateOrderNumber(),
    lines: input.lines.map((l) => ({ ...l, voucherCode: generateVoucherCode() })),
    total: input.total,
    customerName: input.customerName,
    customerEmail: input.customerEmail,
    createdAt: new Date().toISOString(),
  };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    // ignore
  }
  return order;
}

export function getCompletedOrder(): CompletedOrder | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
