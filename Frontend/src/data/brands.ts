import type { Brand } from "@/types";

export const brands: Brand[] = [
  { id: "b1", slug: "amazon", name: { ar: "أمازون", en: "Amazon" }, logoColor: "#16161E", logoInitial: "a", popular: true },
  { id: "b2", slug: "noon", name: { ar: "نون", en: "Noon" }, logoColor: "#FEC900", logoInitial: "n", popular: true },
  { id: "b3", slug: "apple", name: { ar: "آبل", en: "Apple" }, logoColor: "#16161E", logoInitial: "", popular: true },
  { id: "b4", slug: "netflix", name: { ar: "نتفليكس", en: "Netflix" }, logoColor: "#E50914", logoInitial: "N", popular: true },
  { id: "b5", slug: "playstation", name: { ar: "بلايستيشن", en: "PlayStation" }, logoColor: "#003791", logoInitial: "P", popular: true },
  { id: "b6", slug: "spotify", name: { ar: "سبوتيفاي", en: "Spotify" }, logoColor: "#1DB954", logoInitial: "S", popular: true },
  { id: "b7", slug: "talabat", name: { ar: "طلبات", en: "Talabat" }, logoColor: "#FF5A00", logoInitial: "T", popular: true },
  { id: "b8", slug: "carrefour", name: { ar: "كارفور", en: "Carrefour" }, logoColor: "#035AF7", logoInitial: "C", popular: true },
  { id: "b9", slug: "shein", name: { ar: "شي إن", en: "SHEIN" }, logoColor: "#16161E", logoInitial: "S" },
  { id: "b10", slug: "xbox", name: { ar: "إكس بوكس", en: "Xbox" }, logoColor: "#107C10", logoInitial: "X" },
  { id: "b11", slug: "itunes", name: { ar: "آيتونز", en: "iTunes" }, logoColor: "#FA57C1", logoInitial: "i" },
  { id: "b12", slug: "sephora", name: { ar: "سيفورا", en: "Sephora" }, logoColor: "#16161E", logoInitial: "S" },
  { id: "b13", slug: "steam", name: { ar: "ستيم", en: "Steam" }, logoColor: "#171A21", logoInitial: "S" },
  { id: "b14", slug: "booking", name: { ar: "بوكينج", en: "Booking.com" }, logoColor: "#003580", logoInitial: "B" },
];

export const getBrandById = (id: string) => brands.find((b) => b.id === id);
export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);
