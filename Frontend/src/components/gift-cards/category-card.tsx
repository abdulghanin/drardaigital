import Link from "next/link";
import {
  Gamepad2,
  ShoppingBag,
  Utensils,
  Clapperboard,
  Plane,
  Shirt,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Category, Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

type IconConfig = {
  icon: LucideIcon;
  color: string;
  bg: string;
};

const ICONS: Record<string, IconConfig> = {
  "gamepad-2": {
    icon: Gamepad2,
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-500/10",
  },

  "shopping-bag": {
    icon: ShoppingBag,
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },

  utensils: {
    icon: Utensils,
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
  },

  clapperboard: {
    icon: Clapperboard,
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-500/10",
  },

  plane: {
    icon: Plane,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10",
  },

  shirt: {
    icon: Shirt,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
  },

  smartphone: {
    icon: Smartphone,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },

  sparkles: {
    icon: Sparkles,
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },

  wrench: {
    icon: Wrench,
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-500/10",
  },
};

export function CategoryCard({
  category,
  locale,
}: {
  category: Category;
  locale: Locale;
}) {
  const item = ICONS[category.icon] ?? ICONS.sparkles;
  const Icon = item.icon;

  const categoryName = category.name[locale];

  const href = localizedHref(locale, `/gift-cards?category=${encodeURIComponent(category.slug)}`);

  return (
    <Link
      href={href}
      aria-label={categoryName}
      className="
        group
        flex
        min-h-[145px]
        w-full
        flex-col
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-border/70
        bg-surface
        p-4
        text-center
        transition-all
        duration-300
        ease-out

        hover:-translate-y-1
        hover:border-dara-blue/40
        hover:bg-dara-blue/[0.03]
        hover:shadow-lg
        hover:shadow-dara-blue/5

        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-dara-blue
        focus-visible:ring-offset-2

        active:scale-[0.98]

        motion-reduce:transform-none
        motion-reduce:transition-none

        sm:min-h-[155px]
        sm:p-5
      "
    >
      {/* Icon */}
      <span
        className={`
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${item.bg}
          ${item.color}

          transition-all
          duration-300
          ease-out

          group-hover:scale-105
          group-hover:bg-dara-blue
          group-hover:text-white
          group-hover:shadow-md
          group-hover:shadow-dara-blue/20

          motion-reduce:transform-none
          motion-reduce:transition-none

          sm:h-14
          sm:w-14
        `}
      >
        <Icon
          aria-hidden="true"
          className="
            h-5
            w-5
            transition-transform
            duration-300
            group-hover:scale-110

            motion-reduce:transform-none

            sm:h-6
            sm:w-6
          "
          strokeWidth={1.8}
        />
      </span>

      {/* Category Name */}
      <span
        className="
          line-clamp-2
          max-w-full
          text-xs
          font-semibold
          leading-5
          text-foreground
          transition-colors
          duration-200

          group-hover:text-dara-blue

          sm:text-sm
        "
      >
        {categoryName}
      </span>
    </Link>
  );
}
