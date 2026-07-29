# Production Deployment Checklist — Jay Shree Ram Bike Point

Use this checklist to ensure all production requirements, security configurations, media optimizations, and database setups are verified before launching.

---

## 1. Environment & Secrets
- [ ] `DATABASE_URL` configured with Neon pooled connection string (`sslmode=require`).
- [ ] `DIRECT_URL` configured for migration commands (`sslmode=require`).
- [ ] `AUTH_SECRET` generated via `openssl rand -base64 32` (min 32 characters).
- [ ] `ADMIN_EMAIL` set to official dealership administrator email.
- [ ] `ADMIN_PASSWORD` changed from development default (`admin123`) to a strong password.
- [ ] `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` set to production Cloudinary account.
- [ ] `NEXT_PUBLIC_APP_URL` configured with exact production domain (`https://jsrbikepoint.com`).

---

## 2. Database & Data Integrity
- [ ] Production migrations executed cleanly via `npx prisma migrate deploy`.
- [ ] Production seed executed cleanly (`prisma/seed.ts`), verifying admin account creation and business settings initialization.
- [ ] Sample development bikes verified **NOT** seeded in production database (`NODE_ENV=production`).
- [ ] Neon connection pooling enabled and tested under concurrent request load.

---

## 3. Media & Optimization
- [ ] Cloudinary automatic format (`f_auto`) and quality (`q_auto`) transformations enabled.
- [ ] Remote patterns restricted strictly to HTTPS `res.cloudinary.com` in `next.config.ts`.
- [ ] Next.js `<Image />` tags using `sizes`, `loading="lazy"`, and `blurDataURL` low-quality image previews.
- [ ] Max image upload size validated (10MB limit in server actions).

---

## 4. Security & Compliance
- [ ] HTTP Security Headers verified (`Content-Security-Policy`, `HSTS`, `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy`).
- [ ] Unauthenticated requests to `/admin/*` redirected securely to `/admin/login` via Next.js Proxy middleware (`src/proxy.ts`).
- [ ] Login rate limiting / invalid credentials error handling verified.
- [ ] Sensitive `.env` files verified excluded from Git repository (`.gitignore`).

---

## 5. SEO & Metadata
- [ ] `robots.txt` accessible at `/robots.txt`, permitting public routes and disallowing `/admin/` and `/api/`.
- [ ] `sitemap.xml` accessible at `/sitemap.xml`, containing canonical URLs for static pages and available bikes (`isSold: false`).
- [ ] Canonical URL alternate links included in HTML `<head>` tags.
- [ ] OpenGraph image and metadata previews working on WhatsApp and social sharing.
- [ ] `MotorcycleDealer` and `Product` Schema.org JSON-LD structured data validated.

---

## 6. Performance & Monitoring
- [ ] Vercel Web Analytics integrated (`@vercel/analytics`).
- [ ] Vercel Speed Insights integrated (`@vercel/speed-insights`).
- [ ] Uptime monitoring configured (e.g., UptimeRobot pinging `https://jsrbikepoint.com`).
- [ ] Full production build (`npm run build`) compiles with zero TypeScript or ESLint warnings.
- [ ] Playwright E2E test suite passing 100% across Desktop, Mobile, and Tablet viewports.
