# Dara Digital — Phase 1 (Frontend Only)

A production-quality Next.js 14 (App Router) frontend for **Dara Digital**, a UAE digital gift cards & vouchers marketplace. Built per the Phase 1 brief: **no backend, no database — mock data only**, structured so Laravel + MySQL can be plugged in later without touching the UI.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (brand tokens wired from the official color sheet)
- Arabic (default, RTL) + English (LTR) via `/[locale]` routing
- Light/Dark mode (`next-themes`, persisted, respects system preference)
- lucide-react icons

## Getting started
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` — you'll be redirected to `/ar` (or `/en` based on browser language).

```bash
npm run build && npm run start   # production build
```

## Project structure
```
app/[locale]/          routes (home, gift-cards, gift-cards/[slug], cart,
                        checkout, order-success, offers, business)
app/robots.ts           SEO
app/sitemap.ts
src/components/         Header, Footer, GiftCardCard, ProductGrid, cart,
                         checkout, business, ui primitives, etc.
src/data/                mock data: brands.ts, categories.ts, products.ts, offers.ts
src/services/            abstraction layer — UI imports ONLY from here.
                         Currently returns mock data; swap internals for
                         Laravel REST calls in Phase 2 without touching any UI.
src/lib/                 dictionaries (i18n), cart-context, order-store, utils
src/types/                shared TypeScript types
```

## Notes on fonts
Font variables (`--font-display`, `--font-body`) currently resolve to system
font stacks so the project builds with zero external network calls. To use
the originally-specified Google Fonts (Sora / Plus Jakarta Sans for
Latin, Tajawal for Arabic), add `next/font/google` imports in
`app/[locale]/layout.tsx` — every component already reads from those two
CSS variables, so nothing else needs to change.

## Brand tokens (from provided color sheet)
| Token | Hex |
|---|---|
| Primary Blue | `#035AF7` |
| Bright Blue | `#02A1FC` |
| Light Blue | `#4FD0FA` |
| Dark | `#16161E` |
| White | `#FEFEFE` |

## What's implemented (Phase 1 scope)
Home, gift card listing with filters/sort, product detail with denomination
picker & custom amount, cart, 3-step checkout, order success with a digital
gift card view (voucher code, copy, QR placeholder, redemption info),
offers page, business page, header/footer, mobile drawer nav, search with
live autocomplete, loading/empty/error states, dark mode, full AR/RTL + EN/LTR
support, and SEO metadata (per-locale titles/descriptions, OG tags, sitemap,
robots.txt).

## Phase 2 (not built yet, by design)
Laravel REST API + MySQL for products, gift cards, vouchers, brands,
categories, orders, customers, payments, promotions, inventory, merchant,
POS. Point the functions in `src/services/*` at real endpoints when ready.
