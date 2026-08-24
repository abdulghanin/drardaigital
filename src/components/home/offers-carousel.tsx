"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getGiftCardById } from "@/data/products";
import type { Offer, Locale } from "@/types";
import type { Dictionary } from "@/lib/dictionaries";

const AUTOPLAY_MS = 4500;

export function OffersCarousel({
  offers,
  locale,
  dict,
}: {
  offers: Offer[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = offers.length;

  const goTo = useCallback(
    (next: number) => {
      setDir(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count]
  );

  useEffect(() => {
    if (paused || count <= 1) return;
    timerRef.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, count]);

  const offer = offers[index];
  const card = offer ? getGiftCardById(offer.giftCardId) : undefined;
  const isAr = locale === "ar";
  const NextIcon = isAr ? ChevronLeft : ChevronRight;
  const PrevIcon = isAr ? ChevronRight : ChevronLeft;

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  if (!card || !offer) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative h-52 overflow-hidden rounded-3xl shadow-card sm:h-60">
        <AnimatePresence initial={false} custom={dir} mode="wait">
          <motion.div
            key={offer.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goTo(index + 1);
              else if (info.offset.x > 60) goTo(index - 1);
            }}
            className="absolute inset-0"
          >
            <Link
              href={`/${locale}/gift-cards/${card.slug}`}
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl p-6 text-white sm:p-9"
              style={{ background: `linear-gradient(135deg, ${offer.color} 0%, #16161E 145%)` }}
            >
              <div
                className="pointer-events-none absolute -end-10 -top-10 h-56 w-56 rounded-full opacity-20 blur-2xl"
                style={{ background: offer.color }}
              />
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold backdrop-blur-sm sm:text-sm">
                  {dict.offers.save} {offer.discountPercent}%
                </span>
                <ArrowUpRight className="h-6 w-6 opacity-70 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1" />
              </div>
              <div>
                <p className="max-w-md text-xl font-extrabold leading-tight sm:text-3xl">{offer.title[locale]}</p>
                <p className="mt-2 text-sm text-white/80 sm:text-base">{card.name[locale]}</p>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* progress + dots */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          aria-label="previous"
          onClick={() => goTo(index - 1)}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-dara-blue/40 hover:text-dara-blue sm:flex"
        >
          <PrevIcon className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {offers.map((o, i) => (
            <button
              key={o.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative h-1.5 overflow-hidden rounded-full bg-border transition-all"
              style={{ width: i === index ? 28 : 8 }}
            >
              {i === index && !paused && (
                <span
                  key={`${offer.id}-progress`}
                  className="absolute inset-y-0 start-0 rounded-full bg-dara-blue"
                  style={{
                    animation: `offer-progress ${AUTOPLAY_MS}ms linear forwards`,
                  }}
                />
              )}
              {i === index && paused && <span className="absolute inset-0 rounded-full bg-dara-blue" />}
            </button>
          ))}
        </div>

        <button
          aria-label="next"
          onClick={() => goTo(index + 1)}
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-dara-blue/40 hover:text-dara-blue sm:flex"
        >
          <NextIcon className="h-4 w-4" />
        </button>
      </div>

      <style jsx>{`
        @keyframes offer-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
