import type { Offer } from "@/types";

export const offers: Offer[] = [
  { id: "o1", giftCardId: "g7", title: { ar: "خصم 15% على طلبات", en: "15% Off Talabat" }, discountPercent: 15, color: "#FF5A00", validUntil: "2026-09-30" },
  { id: "o2", giftCardId: "g4", title: { ar: "خصم 10% على نتفليكس", en: "10% Off Netflix" }, discountPercent: 10, color: "#E50914", validUntil: "2026-09-15" },
  { id: "o3", giftCardId: "g21", title: { ar: "خصم 10% على جيم باس", en: "10% Off Game Pass" }, discountPercent: 10, color: "#107C10", validUntil: "2026-09-20" },
  { id: "o4", giftCardId: "g16", title: { ar: "خصم 12% على نون فود", en: "12% Off Noon Food" }, discountPercent: 12, color: "#FEC900", validUntil: "2026-09-10" },
  { id: "o5", giftCardId: "g12", title: { ar: "خصم 8% على سيفورا", en: "8% Off Sephora" }, discountPercent: 8, color: "#035AF7", validUntil: "2026-10-01" },
  { id: "o6", giftCardId: "g1", title: { ar: "خصم 5% على أمازون", en: "5% Off Amazon" }, discountPercent: 5, color: "#02A1FC", validUntil: "2026-09-25" },
];
