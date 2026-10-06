import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "c1", slug: "gaming", name: { ar: "الألعاب", en: "Gaming" }, icon: "gamepad-2" },
  { id: "c2", slug: "shopping", name: { ar: "التسوق", en: "Shopping" }, icon: "shopping-bag" },
  { id: "c3", slug: "restaurants", name: { ar: "المطاعم", en: "Restaurants" }, icon: "utensils" },
  { id: "c4", slug: "entertainment", name: { ar: "الترفيه", en: "Entertainment" }, icon: "clapperboard" },
  { id: "c5", slug: "travel", name: { ar: "السفر", en: "Travel" }, icon: "plane" },
  { id: "c6", slug: "fashion", name: { ar: "الموضة", en: "Fashion" }, icon: "shirt" },
  { id: "c7", slug: "technology", name: { ar: "التكنولوجيا", en: "Technology" }, icon: "smartphone" },
  { id: "c8", slug: "beauty", name: { ar: "الجمال", en: "Beauty" }, icon: "sparkles" },
  { id: "c9", slug: "services", name: { ar: "الخدمات", en: "Services" }, icon: "wrench" },
];

export const getCategoryById = (id: string) => categories.find((c) => c.id === id);
export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);
