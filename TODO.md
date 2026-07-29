# TODO.md — Jay Shree Ram Bike Point

This file tracks the outstanding implementation steps across the development lifecycle.

---

## 🛠️ Pre-Milestone 2 Cleanup
- [x] Zod-based environment variable validation (`src/lib/env.ts`)
- [x] Centralized logger utility (`src/lib/logger.ts`)
- [x] Migrate all Cloudinary folders and application constants into `src/lib/constants.ts`
- [x] Verify Prisma client uses recommended global singleton pattern
- [x] Expand seed script with business settings and sample bikes
- [x] Tighten ESLint rules for code quality
- [x] Initialize documentation (`PROJECT_DECISIONS.md`, `CHANGELOG.md`, `TODO.md`)

---

## 🎨 Milestone 2: Design System & Layout
- [ ] Build global layout elements:
  - [ ] Public Header & Navigation (Desktop & Mobile hamburger)
  - [ ] Public Footer (business details, opening hours, social links)
  - [ ] Dark Mode Support (smooth switching via system detection)
  - [ ] Custom 404 Not Found Page
  - [ ] Global Error Boundary Layout
- [ ] Build reusable UI blocks:
  - [ ] Animated Button (Framer Motion press/hover states)
  - [ ] Bike Card component (badges, price formatting, lazy-loaded cover image)
  - [ ] Brand Grid (Popular Brands visual section)
  - [ ] Skeletal Loading templates (grid skeletons)
- [ ] Verify: layouts are fully responsive across 320px to 2560px
- [ ] Verify: build successfully compiles with clean ESLint status

---

## 🔒 Milestone 3: Admin — Bike CRUD
- [ ] Integrate Cloudinary Signed Widget on client side
- [ ] Build reusable Admin Bike Form (React Hook Form + Zod validation)
- [ ] Build Add Bike (`/admin/bikes/new`) page
- [ ] Build Bike Inventory List (`/admin/bikes`) with search, filter, and pagination
- [ ] Build Edit Bike (`/admin/bikes/[id]/edit`) page
- [ ] Build delete bike mutation with cascade image cleanup on Cloudinary
- [ ] Build one-click Sold/Featured status switches
- [ ] Build Dashboard widgets with real database aggregation counts

---

## 🌐 Milestone 4: Public — Home & Inventory
- [ ] Build Homepage (Hero, Featured, Latest, Popular Brands, CTA sections)
- [ ] Build Public Inventory page (`/bikes`)
  - [ ] Full-text URL-param search (brand, model, engine CC)
  - [ ] Filters sidebar/sheet (multi-brand, dual price-slider, condition checkboxes, owners)
  - [ ] Server-side pagination & sort selections
  - [ ] Skeletal card loads during navigation transitions

---

## 🏍️ Milestone 5: Public — Bike Detail & Interactions
- [ ] Build Bike Detail Page (`/bikes/[slug]`)
  - [ ] Image gallery carousel (swipeable with pinch-to-zoom)
  - [ ] Technical Specifications table with document badges
  - [ ] EMI Calculator popup
  - [ ] Similar Bikes section
  - [ ] Dynamic QR Code utility
- [ ] Implement booking & sharing interactions:
  - [ ] WhatsApp Booking (sends formatted message to owner)
  - [ ] Call Now dialer click
  - [ ] Web Share integration
  - [ ] Favourite state toggles (persisted in localStorage)
  - [ ] Compare addition

---

## ⚖️ Milestone 6: Compare, Favourites & Static Pages
- [ ] Build Comparison page (`/compare`) with side-by-side spec comparison table
- [ ] Build Favourites collection page (`/favourites`)
- [ ] Build static text pages (About Us, Privacy Policy, Terms & Conditions)

---

## ⚙️ Milestone 7: Admin Settings, SEO & PWA
- [ ] Build Business Settings panel (`/admin/settings`)
- [ ] Build SEO dynamic metadata generators & sitemap.xml
- [ ] Build PWA service worker and manifest properties

---

## 🚀 Milestone 8: Polish, Testing & Launch
- [ ] Execute animation, accessibility, and Core Web Vitals audits
- [ ] Perform Vercel deployment checks and final launch validations
