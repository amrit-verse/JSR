# Jai Shree Ram Bike Point 🏍️

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon_Serverless-4169E1?style=for-the-badge&logo=postgresql)](https://neon.tech/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tested-2EAD33?style=for-the-badge&logo=playwright)](https://playwright.dev/)

A modern, high-performance, full-stack web application and inventory management platform for **Jai Shree Ram Bike Point**, a verified second-hand motorcycle and scooter dealership located at **No-04, Imamganj Naka, Sipahpur, Muzaffarpur, Bihar**.

Built with Next.js 16 (App Router & Server Actions), React 19, Tailwind CSS v4, Prisma ORM, Neon Serverless PostgreSQL, Cloudinary Image CDN, Auth.js v5, and Playwright E2E testing.

---

## 🌟 Key Features

### 🛒 Public Customer Storefront
- **Inventory-Focused Homepage**: Displays live available vehicle counts, featured curated inventory, and popular brand quick links.
- **Debounced Search System**: Real-time URL-synced search matching model names, brands, colours, and integer engine capacities (e.g., `150cc` or `Honda Activa`).
- **Multi-Filter System**: Instant filtering by brand badges, price range presets (Under ₹50k, ₹50k–₹1 Lakh, ₹1 Lakh+), vehicle condition, owner history, fuel type, and **Available Only** toggle.
- **Active Filter Tag Bar**: Interactive active filter pills with a one-click "Clear All Filters" action.
- **Responsive Image Gallery**: Touch swipe support for mobile, thumbnail selector, and full-screen lightbox zoom modal.
- **Instant EMI Calculator**: Interactive loan payment breakdown with customizable down payment, tenure buttons, and advanced interest rate toggles.
- **WhatsApp Direct Integration**: One-click "Enquire on WhatsApp" CTA with pre-formatted vehicle specs, price, and dealership location.
- **SEO & Schema.org Structured Data**: Dynamic OpenGraph tags, canonical URLs, `robots.txt`, `sitemap.xml`, and `MotorcycleDealer` / `Product` JSON-LD schemas for high Google Search ranking.

### 🛡️ Protected Admin Management Portal
- **Dashboard Overview**: Metrics overview tracking total vehicles, active inventory, featured listings, and sold units.
- **Full Bike CRUD**: Add, edit, view, delete, mark as sold, and toggle featured status for any vehicle.
- **Cloudinary Image Uploader**: Drag-and-drop multi-file upload, image reordering, primary cover selection, and automatic CDN thumbnail generation.
- **Secure Authentication**: Credentials authentication powered by Auth.js (NextAuth v5) and Next.js 16 Proxy middleware guarding `/admin/*` routes.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage / Details |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) | App Router, Server Actions, Turbopack, Route Groups |
| **UI Library** | [React 19](https://react.dev/) | Server Components, Client Components, Suspense |
| **Styling & Icons** | [Tailwind CSS v4](https://tailwindcss.com/) + [Lucide](https://lucide.dev/) | Custom design system (Saffron `#f97316`, Charcoal `#121212`, Gold `#eab308`) |
| **Database** | [Neon PostgreSQL](https://neon.tech/) + [Prisma 6](https://www.prisma.io/) | Serverless PostgreSQL with connection pooling & direct migration support |
| **Media Hosting** | [Cloudinary](https://cloudinary.com/) | Auto-format (`f_auto`), auto-quality (`q_auto`), and secure signed uploads |
| **Authentication** | [Auth.js (NextAuth v5)](https://authjs.dev/) | JWT sessions, bcryptjs password hashing, Next.js Proxy middleware |
| **Validation** | [Zod 4](https://zod.dev/) | Server & Client environment variable validation and form schemas |
| **Testing** | [Playwright](https://playwright.dev/) | End-to-end multi-viewport (Desktop, Mobile Pixel 5, Tablet) testing |
| **Monitoring** | [Vercel Analytics](https://vercel.com/analytics) | Web Analytics & Speed Insights Core Web Vitals tracking |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: Local PostgreSQL or a free [Neon PostgreSQL](https://neon.tech) database instance.

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/jsr-bike-point.git
   cd jsr-bike-point
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your PostgreSQL database string, Auth secret, and Cloudinary credentials:
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jsr_bikepoint"
   AUTH_SECRET="your-random-32-character-auth-secret-key"
   ADMIN_EMAIL="admin@jsrbikepoint.com"
   ADMIN_PASSWORD="admin_secure_password_123"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="123456789012345"
   CLOUDINARY_API_SECRET="your_api_secret"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

4. **Initialize Database & Run Migrations**:
   ```bash
   npx prisma migrate dev
   ```

5. **Seed Initial Admin Account & Sample Bikes**:
   ```bash
   npx prisma db seed
   ```

6. **Start Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing & Quality Assurance

The application includes a comprehensive **Playwright End-to-End (E2E) Test Suite** covering admin CRUD workflows, customer search journeys, multi-device viewports, and security redirects.

```bash
# Run full E2E test suite across Desktop, Mobile (Pixel 5), and Tablet
npx playwright test

# View interactive HTML test reports
npx playwright show-report
```

---

## 📁 Directory Architecture

```
jsr-bike-point/
├── prisma/
│   ├── schema.prisma           # Prisma PostgreSQL schema & model indexes
│   └── seed.ts                 # Database seed script (Admin & Settings)
├── src/
│   ├── actions/                # Next.js Server Actions (Bike CRUD, Auth)
│   ├── app/
│   │   ├── (public)/           # Public Storefront (Home, Inventory, Bike Details)
│   │   ├── admin/              # Protected Dealership Admin Dashboard & Login
│   │   ├── api/                # API Endpoints (Auth.js, Cloudinary Signatures)
│   │   ├── robots.ts           # Dynamic robots.txt generator
│   │   └── sitemap.ts          # Dynamic sitemap.xml generator
│   ├── components/
│   │   ├── admin/              # Bike Form, Data Table, Image Uploader
│   │   ├── bikes/              # BikeCard, Filters, Gallery, EMI Calculator
│   │   ├── layout/             # Header, Footer, Mobile Navigation Drawer
│   │   └── ui/                 # Base UI / Shadcn accessible components
│   ├── lib/
│   │   ├── db.ts               # Prisma Client singleton pattern
│   │   ├── env.ts              # Zod environment variable validation
│   │   ├── metadata.ts         # Canonical URLs, OpenGraph & Schema.org JSON-LD
│   │   └── cloudinary-utils.ts # Client-safe Cloudinary f_auto,q_auto helpers
│   └── proxy.ts                # Next.js 16 Auth Proxy middleware matcher
├── tests/
│   └── e2e/                    # Playwright test specs (Admin CRUD & Customer Journey)
├── DEPLOYMENT.md               # Step-by-step production Vercel + Neon deployment guide
├── CHECKLIST.md                # Production launch readiness checklist
├── ROLLBACK.md                 # Emergency rollback & Neon PITR database recovery guide
├── vercel.json                 # Vercel platform configuration
└── next.config.ts              # HTTP Security Headers, CSP & Image Remote Patterns
```

---

## 🚢 Deployment

For complete instructions on deploying to **Vercel** with **Neon PostgreSQL Connection Pooling**, **Cloudinary Media CDN**, and **Custom Domain SSL**, refer to our deployment documentation:

- 📖 [Deployment Guide (DEPLOYMENT.md)](file:///home/amrit/Projects/JSR/DEPLOYMENT.md)
- 📋 [Production Checklist (CHECKLIST.md)](file:///home/amrit/Projects/JSR/CHECKLIST.md)
- 🔄 [Emergency Rollback Guide (ROLLBACK.md)](file:///home/amrit/Projects/JSR/ROLLBACK.md)

---

## 📄 License

This project is proprietary software created for **Jai Shree Ram Bike Point**, No-04, Imamganj Naka, Sipahpur, Muzaffarpur, Bihar. All rights reserved.
