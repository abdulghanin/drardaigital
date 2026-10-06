"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealItem } from "./reveal";

/** Single stagger-animated item — use inside <RevealGroup>. */
export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={revealItem}>
      {children}
    </motion.div>
  );
}
