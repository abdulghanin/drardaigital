# Dara Digital

Dara Digital is a bilingual (Arabic/English) digital gift-card marketplace frontend for the UAE. It uses mock catalog data and exports as static HTML for CloudPanel/Nginx hosting. There is no database, authentication service, payment provider, API, or runtime Node.js server.

## Stack

- Next.js 14 App Router and TypeScript
- Tailwind CSS
- Arabic RTL and English LTR
- Static export with trailing-slash routes
- `next-themes` for light/dark mode
- `lucide-react` icons

## Local Development

```bash
npm install
npm run dev
```

Open the URL printed by Next.js. The root route `/` renders the English homepage; `/en/` and `/ar/` are the explicit localized homepages. No middleware or runtime redirect is used.

## Routes

The following localized pages are generated for both `/en/` and `/ar/`:

- `/business/`
- `/cart/`
- `/categories/`
- `/checkout/`
- `/gift-cards/`
- `/gift-cards/[slug]/` for each gift card in `src/data/products.ts`
- `/login/`
- `/offers/`
- `/order-success/`

The separate root route `/` also renders the English homepage.

The login page provides frontend-only login and signup forms. It does not authenticate or create accounts. Checkout is a demo flow: completing it does not charge a card or fulfill a gift card; the mock order and generated voucher details are stored in browser `localStorage`.

All internal localized links use `src/lib/locale-url.ts` to ensure one locale prefix and a trailing slash. The language switcher replaces the existing locale while preserving the current path and query string.

## Static Export and Nginx

Build the site and run the route/link verifier:

```bash
npm run build
```

The build creates `out/`, including `out/index.html`, localized route directories, `_next/` assets, and public images. The build fails if an expected localized route is missing, an internal HTML link has no exported target, or generated HTML contains duplicate locale prefixes. The verifier derives localized pages from `app/[locale]` and gift-card slugs from the mock catalog.

For CloudPanel, publish the **contents** of `out/` as the site's document root. With `trailingSlash: true`, route URLs map to directories containing `index.html`; Nginx should serve directory indexes and return 404 for unknown paths. No `next start`, middleware, API route, or server-side rendering is required.

Example Nginx location behavior:

```nginx
index index.html;

location / {
    try_files $uri $uri/ =404;
}
```

## Project Structure

```text
app/(root)/             English homepage at /
app/[locale]/           English and Arabic routes
app/icon.png            Next.js app icon
public/                 Static public assets, including favicon
scripts/                 Static export route/link verifier
src/components/          Page, layout, and UI components
src/data/                Mock brands, categories, products, and offers
src/services/            Data access wrappers over mock data
src/lib/                 Locale URL helper, dictionaries, cart, order store
src/types/               Shared TypeScript types
```

## Build Checks

```bash
npm run lint
rm -rf .next out
npm run build
find out -type f -name "index.html" | sort
```

Do not run a production build concurrently with `next dev`; both use `.next` and can interfere with the development cache.

## Phase 2

The catalog service layer can later be connected to a real backend. Authentication, payments, inventory, order persistence, and voucher fulfillment are not implemented in this frontend phase.