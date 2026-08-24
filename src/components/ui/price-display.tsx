import { formatAED } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Locale } from "@/types";

export function PriceDisplay({
  min,
  max,
  locale,
  size = "md",
  className,
}: {
  min: number;
  max?: number;
  locale: Locale;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-bold text-foreground tabular-nums",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-2xl",
        className
      )}
    >
      {max && max !== min ? (
        <>
          {formatAED(min, locale)} – {formatAED(max, locale)}
        </>
      ) : (
        formatAED(min, locale)
      )}
    </span>
  );
}
