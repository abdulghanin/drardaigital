"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HeroVisual3D } from "./hero-visual-3d";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 -z-10 bg-dara-gradient opacity-[0.06] dark:opacity-[0.14]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] dark:opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
        <div>
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-5 inline-flex items-center rounded-full bg-dara-blue/10 px-3.5 py-1.5 text-xs font-semibold text-dara-blue"
          >
            {locale === "ar" ? "منصة الهدايا الرقمية الأولى في الإمارات" : "The UAE's #1 digital gifting platform"}
          </motion.span>

          <motion.h1
            custom={0.08}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            {dict.hero.title}
          </motion.h1>

          <motion.p
            custom={0.16}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          >
            {dict.hero.description}
          </motion.p>

          <motion.div
            custom={0.24}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-6 flex flex-wrap items-center gap-3"
          >
            <Link
              href={localizedHref(locale, "/gift-cards")}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-dara-blue px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#0247CC] hover:shadow-lg active:scale-[0.98]"
            >
              {dict.hero.exploreBtn}
              <Arrow className="h-4 w-4" />
            </Link>
            <Link
              href={localizedHref(locale, "/business")}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all hover:border-dara-blue/40"
            >
              {dict.hero.businessBtn}
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual3D />
        </motion.div>
      </div>
    </section>
  );
}
