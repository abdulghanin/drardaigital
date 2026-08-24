"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, MousePointerClick, ShieldCheck, Send } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";

const CYCLE_MS = 2600;

export function HowItWorks({ dict }: { locale: Locale; dict: Dictionary }) {
  const steps = [
    { n: "01", t: dict.steps.s1t, icon: MousePointerClick },
    { n: "02", t: dict.steps.s2t, icon: Wallet },
    { n: "03", t: dict.steps.s3t, icon: ShieldCheck },
    { n: "04", t: dict.steps.s4t, icon: Send },
  ];

  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, steps.length]);

  return (
    <section className="border-y border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center font-display text-xl font-bold text-foreground sm:text-2xl"
        >
          {dict.sections.howItWorks}
        </motion.h2>

        <motion.div
          onViewportEnter={() => setInView(true)}
          onViewportLeave={() => setInView(false)}
          viewport={{ amount: 0.5 }}
          className="relative grid grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute inset-x-10 top-7 hidden h-px bg-border lg:block" />
          <motion.div
            className="pointer-events-none absolute start-10 top-7 hidden h-px bg-dara-blue lg:block"
            animate={{ width: `${(active / (steps.length - 1)) * 100}%`, maxWidth: "calc(100% - 5rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {steps.map((s, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center"
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.08 : 1,
                    backgroundColor: isActive ? "var(--primary)" : "transparent",
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-dara-blue/10 text-dara-blue"
                >
                  <s.icon className={`h-6 w-6 transition-colors duration-300 ${isActive ? "text-white" : "text-dara-blue"}`} />
                  {isActive && (
                    <motion.span
                      layoutId="step-ring"
                      className="absolute inset-0 rounded-2xl ring-2 ring-dara-blue/40"
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </motion.div>
                <span className="mb-1 text-xs font-bold tracking-widest text-dara-blue">{s.n}</span>
                <p className="text-sm font-semibold text-foreground sm:text-base">{s.t}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
