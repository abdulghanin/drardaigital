import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" &&
            "bg-dara-blue text-white hover:bg-[#0247CC] active:scale-[0.98] shadow-sm hover:shadow-md",
          variant === "secondary" &&
            "bg-dara-bright text-white hover:brightness-95 active:scale-[0.98]",
          variant === "outline" &&
            "border border-border bg-transparent text-foreground hover:bg-surface hover:border-dara-blue/40",
          variant === "ghost" && "bg-transparent text-foreground hover:bg-surface",
          size === "sm" && "h-9 px-4 text-sm",
          size === "md" && "h-11 px-6 text-sm",
          size === "lg" && "h-12 px-8 text-base",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
