import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
}

export function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        variant === "primary" && "bg-dara-blue/10 text-dara-blue",
        variant === "success" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        variant === "warning" && "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        variant === "danger" && "bg-red-500/10 text-red-600 dark:text-red-400",
        variant === "neutral" && "bg-muted/10 text-muted",
        className
      )}
      {...props}
    />
  );
}
