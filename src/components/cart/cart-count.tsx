"use client";

import { useCart } from "@/lib/cart-context";

export function CartCount() {
  const { count } = useCart();
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -end-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-dara-blue px-1 text-[10px] font-bold leading-none text-white">
      {count}
    </span>
  );
}
