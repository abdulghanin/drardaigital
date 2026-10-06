"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";

import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/types";
import { localizedHref } from "@/lib/locale-url";

type MobileMenuProps = {
  locale: Locale;
  dict: Dictionary;
};

export function MobileMenu({ locale, dict }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  const isRTL = locale === "ar";

  const links = [
    {
      href: localizedHref(locale, "/"),
      label: dict.nav.home,
    },
    {
      href: localizedHref(locale, "/gift-cards"),
      label: dict.nav.giftCards,
    },
    {
      href: localizedHref(locale, "/categories"),
      label: dict.nav.categories,
    },
    {
      href: localizedHref(locale, "/offers"),
      label: dict.nav.offers,
    },
    {
      href: localizedHref(locale, "/business"),
      label: dict.nav.business,
    },
    {
      href: localizedHref(locale, "/login"),
      label: dict.header.account,
    },
  ];

  // Close menu with Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Lock body scroll while menu is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const menuVariants: Variants = {
    hidden: {
      x: isRTL ? "100%" : "-100%",
      opacity: 0.8,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 28,
        when: "beforeChildren",
        staggerChildren: 0.07,
      },
    },
    exit: {
      x: isRTL ? "100%" : "-100%",
      opacity: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: isRTL ? 20 : -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="lg:hidden">
      {/* Menu Trigger */}
      <motion.button
        type="button"
        aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface"
      >
        <Menu className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 cursor-default bg-dara-dark/50 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.aside
              id={menuId}
              role="dialog"
              aria-modal="true"
              aria-label={locale === "ar" ? "القائمة" : "Menu"}
              variants={menuVariants}
              className={`absolute top-0 flex h-[100dvh] w-[88%] max-w-sm flex-col overflow-y-auto bg-surface p-5 shadow-2xl sm:p-6 ${
                isRTL ? "right-0" : "left-0"
              }`}
            >
              {/* Header */}
              <motion.div
                variants={itemVariants}
                className="mb-8 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Dara Digital
                  </p>

                  <h2 className="mt-1 font-display text-xl font-bold text-foreground">
                    {locale === "ar" ? "القائمة" : "Menu"}
                  </h2>
                </div>

                <motion.button
                  type="button"
                  aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
                  onClick={() => setOpen(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground transition-colors hover:bg-dara-dark hover:text-white"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </motion.div>

              {/* Navigation */}
              <motion.nav
                variants={containerVariants}
                aria-label={locale === "ar" ? "التنقل" : "Navigation"}
                className="flex flex-col gap-2"
              >
                {links.map((link) => (
                  <motion.div
                    key={link.href}
                    variants={itemVariants}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-foreground transition-all duration-300 hover:bg-background hover:shadow-sm"
                    >
                      <span>{link.label}</span>

                      <ChevronRight
                        className={`h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 ${
                          isRTL ? "rotate-180 group-hover:-translate-x-1" : ""
                        }`}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Bottom Content */}
              <motion.div
                variants={itemVariants}
                className="mt-auto pt-10"
              >
                <div className="rounded-2xl bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">
                    {locale === "ar"
                      ? "اكتشف أفضل العروض الرقمية"
                      : "Discover the best digital offers"}
                  </p>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {locale === "ar"
                      ? "بطاقات رقمية وعروض حصرية في مكان واحد."
                      : "Digital gift cards and exclusive offers in one place."}
                  </p>
                </div>
              </motion.div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


