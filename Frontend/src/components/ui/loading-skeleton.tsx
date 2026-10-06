import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-border/60", className)} />;
}

export function GiftCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <Skeleton className="mb-4 h-36 w-full rounded-xl" />
      <Skeleton className="mb-2 h-4 w-2/3" />
      <Skeleton className="mb-4 h-3 w-1/3" />
      <Skeleton className="h-9 w-full rounded-full" />
    </div>
  );
}

export function GiftCardGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <GiftCardSkeleton key={i} />
      ))}
    </div>
  );
}
