# PROJECT_RULES.md — Jay Shree Ram Bike Point

> These rules MUST be followed throughout the entire development lifecycle.
> Violating any rule requires explicit justification and approval.

---

## 1. Architecture Rules

- **Next.js 16 App Router only** — no Pages Router usage.
- **Server Components by default** — only use `"use client"` when React hooks, browser APIs, or event handlers are required.
- **Server Actions for all mutations** — no REST API endpoints for CRUD. The only API routes allowed are Auth.js handlers and the Cloudinary signature endpoint.
- **Feature-based folder structure** — group components by feature (`bikes/`, `home/`, `admin/`, `shared/`), not by type.
- **Single source of truth for types** — derive TypeScript types from Prisma schema (`Prisma.BikeGetPayload<>`) wherever possible. Only create manual types for UI-only concerns.
- **No barrel exports in component folders** — import directly from the file. Barrel exports are allowed only in `types/index.ts`.

---

## 2. TypeScript Rules

- **Strict mode enabled** — `"strict": true` in `tsconfig.json`.
- **No `any` type** — use `unknown` + type narrowing instead.
- **No `@ts-ignore` or `@ts-expect-error`** without a justifying comment.
- **Explicit return types** on all exported functions and Server Actions.
- **Interface over type** for object shapes; `type` for unions, intersections, and utility types.
- **Enums from Prisma** — never duplicate enum values in TypeScript; import from `@prisma/client`.

---

## 3. Data & Database Rules

- **Prisma as the only database interface** — no raw SQL unless absolutely necessary (and then only via `prisma.$queryRaw`).
- **snake_case in PostgreSQL** — use `@map()` for all fields. Prisma fields stay camelCase.
- **UUID primary keys** — never use auto-incrementing integers.
- **Integer storage for numeric values** — Price (₹), Engine CC, and Odometer (km) are stored as integers. Format only in the UI layer.
- **Optional fields explicitly marked** — use `String?` in Prisma, never store empty strings as "no value".
- **All mutations validate with Zod** — server-side validation on every Server Action before touching the database.
- **Cloudinary `public_id` stored, not just URL** — enables future deletion and transformation.
- **Pooled connection for app, direct connection for migrations** — `DATABASE_URL` (pooled) and `DIRECT_URL` (direct).

---

## 4. Component Rules

- **One component per file** — exception: small helper sub-components that are only used by the parent.
- **Component file naming** — kebab-case (e.g., `bike-card.tsx`).
- **shadcn/ui as the base** — never create custom primitives (Button, Input, Card, etc.) from scratch. Extend shadcn/ui.
- **Framer Motion for animations** — no raw CSS animations for complex interactions. Simple transitions (hover, focus) can use Tailwind's `transition-*` utilities.
- **Composition over configuration** — prefer composing small components over large components with many props.
- **No inline styles** — use Tailwind classes exclusively.
- **Accessible by default** — all interactive elements must have proper ARIA attributes, focus states, and keyboard navigation.

---

## 5. Styling Rules

- **Tailwind CSS v4** — CSS-first configuration via `@theme` directive. No `tailwind.config.ts` file.
- **OKLCH colour space** — all custom colours defined in OKLCH for wide-gamut P3 display support.
- **Design tokens in `@theme`** — colours, shadows, radii, and spacing defined centrally. Never hardcode values in components.
- **Mobile-first** — start with mobile styles, add responsive variants (`sm:`, `md:`, `lg:`, `xl:`) for larger screens.
- **Dark mode via `class` strategy** — use `dark:` variant. Managed by `next-themes`.
- **`cn()` utility for conditional classes** — use `clsx` + `tailwind-merge` via the `cn()` helper. Never concatenate class strings manually.

---

## 6. Data Flow Rules

- **URL search params for filter/search state** — every filter, search query, sort, and page number goes in the URL. Pages must be bookmarkable and shareable.
- **localStorage for client-only state** — favourites and comparison list only.
- **Server-side pagination** — never fetch all records and paginate on the client.
- **12 items per page** — standard pagination for bike grids.
- **Optimistic UI for toggles** — sold/featured toggles show immediate feedback, then sync with server.

---

## 7. Image Rules

- **Cloudinary for all images** — no local file storage.
- **Signed uploads only** — the Cloudinary signature endpoint generates signatures server-side.
- **Store `public_id` + `url`** — reconstruct URLs via Cloudinary SDK for transformations.
- **`next/image` or `CldImage` for rendering** — never use raw `<img>` tags.
- **Max 10 images per bike** — enforced in both UI and Server Action validation.
- **Lazy loading by default** — only the first image of a gallery should be `priority`.

---

## 8. Authentication & Security Rules

- **Auth.js v5 with Credentials provider** — JWT session strategy.
- **bcryptjs with 12 salt rounds** — for password hashing.
- **httpOnly, secure, sameSite=lax cookies** — for JWT storage.
- **Server-side route protection** — `auth()` in admin `layout.tsx`. Never rely on client-side guards alone.
- **No secrets in client code** — only `NEXT_PUBLIC_*` env vars are exposed to the browser.
- **Zod validation on all inputs** — validate on the server even if also validated on the client.
- **CSRF protection** — built-in Auth.js CSRF tokens on all forms.

---

## 9. Performance Rules

- **Lighthouse targets** — Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100.
- **Core Web Vitals** — LCP < 2.5s, FID < 100ms, CLS < 0.1.
- **Server Components first** — minimise client-side JavaScript.
- **Dynamic imports** for heavy components (EMI calculator, image gallery, comparison table).
- **Skeleton loading** for every async data fetch — never show a blank screen.
- **Error boundaries** (`error.tsx`) on every route segment.
- **Image optimization** — Cloudinary auto-format, responsive sizes, lazy loading.

---

## 10. SEO Rules

- **Dynamic `<title>` and `<meta description>`** on every page.
- **Single `<h1>` per page** with proper heading hierarchy (h1 → h2 → h3).
- **OpenGraph and Twitter meta tags** on all public pages.
- **JSON-LD structured data** — `LocalBusiness` for the shop, `Product` for each bike.
- **Dynamic `sitemap.xml`** — includes all bike slugs, auto-updates.
- **`robots.txt`** — allow all public pages, disallow `/admin`.
- **Semantic HTML** — `<main>`, `<nav>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- **All images have `alt` text** — descriptive, not decorative.

---

## 11. Code Quality Rules

- **No duplicated code** — extract shared logic into hooks, utils, or components.
- **Meaningful naming** — variable, function, and component names should be self-documenting.
- **Small functions** — each function does one thing. Max ~50 lines for a function, ~200 lines for a component.
- **Preserve existing comments** — never remove comments unless the related code is also removed.
- **ESLint must pass** — no lint warnings or errors in committed code.
- **No console.log in production** — use proper error handling and logging.

---

## 12. Development Workflow Rules

- **Milestone-based development** — complete one milestone fully before starting the next.
- **Code review after every milestone** — identify improvements, refactor, then continue.
- **Incremental changes only** — never regenerate entire files. Modify only what is necessary.
- **Analyse before changing** — read and understand existing code before modifying it.
- **Update PROJECT_PROGRESS.md** after every completed milestone.
- **Test before declaring done** — run `npm run build` (or equivalent) after every milestone to verify no build errors.

---

## 13. Error Handling Rules

- **Never show raw errors to users** — always show friendly, actionable messages.
- **Try-catch in all Server Actions** — return structured `{ success: boolean, error?: string }` responses.
- **Toast notifications for mutations** — success (green), error (red), with descriptive messages.
- **`not-found.tsx`** for invalid routes/slugs — with a CTA to go back.
- **`error.tsx`** with retry button — on every route segment.
- **Graceful degradation** — if a feature fails (e.g., Maps embed), the rest of the page still works.

---

## 14. Git & Deployment Rules

- **Conventional commits** — `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, `style:`, `perf:`.
- **Never commit secrets** — `.env.local` is in `.gitignore`. Use `.env.example` as a template.
- **Vercel deployment** — main branch auto-deploys to production.
- **Preview deploys** for PRs — test before merging.

---

## 15. Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Files (components) | kebab-case | `bike-card.tsx` |
| Files (hooks) | kebab-case with `use-` prefix | `use-favourites.ts` |
| Files (actions) | kebab-case with `-actions` suffix | `bike-actions.ts` |
| Files (schemas) | kebab-case with `-schema` suffix | `bike-schema.ts` |
| React components | PascalCase | `BikeCard` |
| Functions/hooks | camelCase | `useFavourites` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FEATURED_BIKES` |
| DB columns (Prisma model) | camelCase | `engineCC` |
| DB columns (PostgreSQL) | snake_case (via `@map`) | `engine_cc` |
| CSS variables | kebab-case with `--` prefix | `--color-saffron-500` |
| URL slugs | kebab-case | `2022-honda-shine-black` |
| Environment variables | SCREAMING_SNAKE_CASE | `DATABASE_URL` |
