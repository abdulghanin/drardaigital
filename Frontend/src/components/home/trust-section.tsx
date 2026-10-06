import { Zap, ShieldCheck, BadgeCheck, Headset } from "lucide-react";
import { RevealGroup } from "@/components/motion/reveal";
import { RevealItem } from "@/components/motion/reveal-item";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

export function TrustSection({ dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { icon: Zap, t: dict.trust.t1, d: dict.trust.t1d },
    { icon: ShieldCheck, t: dict.trust.t2, d: dict.trust.t2d },
    { icon: BadgeCheck, t: dict.trust.t3, d: dict.trust.t3d },
    { icon: Headset, t: dict.trust.t4, d: dict.trust.t4d },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h2 className="mb-10 text-center font-display text-xl font-bold text-foreground sm:text-2xl">
        {dict.sections.trust}
      </h2>
      <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {items.map((it, i) => (
          <RevealItem key={i}>
            <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-dara-blue/10 text-dara-blue transition-transform duration-300 group-hover:scale-110 group-hover:bg-dara-blue group-hover:text-white">
                <it.icon className="h-5 w-5" />
              </div>
              <p className="mb-1.5 text-sm font-semibold text-foreground">{it.t}</p>
              <p className="text-xs leading-relaxed text-muted">{it.d}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
