# PROJECT_DECISIONS.md — Jay Shree Ram Bike Point

This document tracks major technical and architectural decisions, their context, justifications, and consequences.

---

## Decision 1: Next.js 16 App Router
- **Status:** Approved
- **Context:** Deciding on the primary framework.
- **Justification:** Next.js 16 provides the best-in-class performance, Turbopack support for Fast Refresh, a new caching model using the explicit `use cache` directive, and native integration with React 19.2.
- **Consequences:** Eliminates legacy ISR/PPR configurations, providing explicit and robust data caching control.

---

## Decision 2: Tailwind CSS v4 & OKLCH Color Space
- **Status:** Approved
- **Context:** Deciding on style sheet structure and theme configuration.
- **Justification:** Tailwind CSS v4 replaces JavaScript-based configuration (`tailwind.config.js`) with a native CSS-first configuration via `@theme` directives. OKLCH color space ensures accurate P3 wide-gamut display support on modern devices and displays.
- **Consequences:** Theme and tokens are configured inside `globals.css` in a single location. Utility classes map directly to these variables.

---

## Decision 3: Server Actions for Mutations & Form Actions
- **Status:** Approved
- **Context:** Choosing between REST API endpoints vs. React Server Actions for data mutations.
- **Justification:** Server Actions provide direct, type-safe mutations from client forms to server logic. This removes REST boilerplate (no routes, controllers, or fetch clients) and provides native integration with React Hook Form.
- **Consequences:** Form submissions validate inputs on the server using Zod schemas and trigger cache revalidation tags natively.

---

## Decision 4: Auth.js v5 (Next-Auth) JWT Credentials Session Guard
- **Status:** Approved
- **Context:** Choosing the auth structure for single-admin dashboard security.
- **Justification:** Using Auth.js v5 with Credentials provider and JWT session strategy avoids maintaining a separate session table in PostgreSQL.
- **Consequences:** Protected layouts use the async `auth()` block to guard server-side page rendering and handle secure redirects before sending HTML to client browsers. Global edge middleware is not required, avoiding database runtime compatibility issues.

---

## Decision 5: Neon serverless pgBouncer Connection Pooling
- **Status:** Approved
- **Context:** Connecting to serverless PostgreSQL.
- **Justification:** Serverless functions scale dynamically, which can quickly exhaust native database connection pools. Neon's PgBouncer pooler (`-pooler` connection string) handles high-frequency connection lifecycles automatically.
- **Consequences:** Prisma uses `DATABASE_URL` with PgBouncer for runtime transactions, and `DIRECT_URL` without pooler for migrations.

---

## Decision 6: Cloudinary Signed Client-Side Upload
- **Status:** Approved
- **Context:** Uploading high-res images for bike listings.
- **Justification:** Direct client-to-Cloudinary uploads bypasses Next.js server resources, saving memory and compute. Signed parameters (validated via `api/sign-cloudinary-params/route.ts`) ensure security.
- **Consequences:** Client receives secure upload URLs and public IDs, storing only the metadata in PostgreSQL.

---

## Decision 7: Integer Units for Numeric Types (Price, Engine CC, Odometer)
- **Status:** Approved
- **Context:** Storing and retrieving tech specs.
- **Justification:** Avoids floating-point precision issues and simplifies database indexing and comparisons.
- **Consequences:** Formatting (currency symbols, comma separators, unit labels like "cc" and "km") is handled exclusively in the UI layer.
