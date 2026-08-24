import Link from "next/link";
import {
  Gamepad2, ShoppingBag, Utensils, Clapperboard, Plane, Shirt, Smartphone, Sparkles, Wrench, type LucideIcon,
} from "lucide-react";
import type { Category, Locale } from "@/types";

const ICONS: Record<string, LucideIcon> = {
  "gamepad-2": Gamepad2,
  "shopping-bag": ShoppingBag,
  utensils: Utensils,
  clapperboard: Clapperboard,
  plane: Plane,
  shirt: Shirt,
  smartphone: Smartphone,
  sparkles: Sparkles,
  wrench: Wrench,
};

export function CategoryCard({ category, locale }: { category: Category; locale: Locale }) {
  const Icon = ICONS[category.icon] ?? Sparkles;
  return (
    <Link
      href={`/${locale}/gift-cards?category=${category.slug}`}
      className="group flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-surface p-4 text-center transition-all hover:-translate-y-0.5 hover:border-dara-blue/40 hover:shadow-card sm:p-5"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-dara-blue/10 text-dara-blue transition-colors group-hover:bg-dara-blue group-hover:text-white sm:h-14 sm:w-14">
        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="text-xs font-semibold text-foreground sm:text-sm">{category.name[locale]}</span>
    </Link>
  );
}
