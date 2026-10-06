export type Locale = "ar" | "en";

export interface Brand {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  logoColor: string;
  logoInitial: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: { ar: string; en: string };
  icon: string;
}

export interface Denomination {
  amount: number;
  currency: "AED";
}

export interface GiftCard {
  id: string;
  slug: string;
  brandId: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  categoryId: string;
  image: string;
  color: string;
  priceMin: number;
  priceMax: number;
  denominations: number[];
  discountPercent?: number;
  rating: number;
  reviewCount: number;
  deliveryType: "instant" | "email";
  availability: "in_stock" | "low_stock" | "out_of_stock";
  featured?: boolean;
}

export interface Offer {
  id: string;
  giftCardId: string;
  title: { ar: string; en: string };
  discountPercent: number;
  color: string;
  validUntil: string;
}

export interface CartLine {
  id: string;
  giftCardId: string;
  amount: number;
  quantity: number;
  recipientEmail?: string;
}

export interface Order {
  orderNumber: string;
  lines: CartLine[];
  total: number;
  customerName: string;
  customerEmail: string;
  createdAt: string;
}
