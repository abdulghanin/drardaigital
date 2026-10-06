"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

/**
 * 3D floating gift-card stack with mouse-parallax tilt. Pure CSS/transform
 * based (no WebGL) so it stays light and works everywhere; motion is
 * automatically muted by prefers-reduced-motion via CSS + framer-motion.
 */
export function HeroVisual3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });

  const rotateY = useTransform(springX, [-1, 1], [-14, 14]);
  const rotateX = useTransform(springY, [-1, 1], [12, -12]);
  const shiftX = useTransform(springX, [-1, 1], [-10, 10]);
  const shiftY = useTransform(springY, [-1, 1], [-8, 8]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawX.set(px * 2 - 1);
    rawY.set(py * 2 - 1);
  };

  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onMouseEnter={() => setEnabled(true)}
      className="relative mx-auto hidden w-full max-w-md select-none lg:block"
      style={{ perspective: 1200 }}
    >
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-4 top-6 h-40 w-40 animate-orb-drift-1 rounded-full bg-dara-bright/25 blur-3xl dark:bg-dara-bright/20" />
        <div className="absolute bottom-4 right-0 h-48 w-48 animate-orb-drift-2 rounded-full bg-dara-blue/20 blur-3xl dark:bg-dara-light/15" />
      </div>

      <motion.div
        className="relative aspect-[4/3] w-full"
        style={{
          rotateX: enabled ? rotateX : 0,
          rotateY: enabled ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back card */}
        <motion.div
          style={{ x: shiftX, y: shiftY, translateZ: 0 }}
          className="animate-float-card-1 absolute inset-x-2 top-4 h-48 rounded-3xl bg-dara-gradient opacity-90 shadow-card-hover"
        />

        {/* Middle accent card */}
        <motion.div
          style={{ x: useTransform(shiftX, (v) => v * 1.4), y: useTransform(shiftY, (v) => v * 1.4) }}
          className="animate-float-card-2 absolute inset-x-8 top-16 flex h-44 flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-br from-dara-light/90 to-dara-bright p-6 text-white shadow-card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold opacity-80">NETFLIX</span>
            <Sparkles className="h-4 w-4 opacity-80" />
          </div>
          <p className="text-xl font-extrabold tracking-wide">AED 100</p>
        </motion.div>

        {/* Front primary card */}
        <motion.div
          style={{
            x: useTransform(shiftX, (v) => v * 1.8),
            y: useTransform(shiftY, (v) => v * 1.8),
            translateZ: 40,
          }}
          className="animate-float-card-3 absolute inset-x-12 top-28 flex h-48 flex-col justify-between rounded-3xl bg-dara-dark p-6 text-white shadow-card-hover"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide opacity-70">DARA DIGITAL</span>
            <span className="h-6 w-9 rounded-md bg-white/15" />
          </div>
          <div>
            <p className="text-2xl font-extrabold tracking-wide">AED 250</p>
            <p className="mt-1 text-xs tracking-[0.3em] opacity-60">•••• •••• •••• 4821</p>
          </div>
        </motion.div>

        {/* Floating micro badges */}
        <motion.div
          style={{ x: useTransform(shiftX, (v) => v * -1.5) }}
          className="animate-sparkle absolute -right-3 top-2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface shadow-card"
        >
          <Zap className="h-4 w-4 text-dara-blue" />
        </motion.div>
        <motion.div
          style={{ x: useTransform(shiftX, (v) => v * 1.2) }}
          className="animate-sparkle absolute -left-2 bottom-6 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface shadow-card"
          initial={{ animationDelay: "1.2s" } as never}
        >
          <Sparkles className="h-3.5 w-3.5 text-dara-bright" />
        </motion.div>
      </motion.div>
    </div>
  );
}
