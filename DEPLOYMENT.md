# Production Deployment Guide — Jai Shree Ram Bike Point

This guide provides step-by-step instructions for deploying **Jai Shree Ram Bike Point** to **Vercel** with a **Neon PostgreSQL** production database and **Cloudinary** media storage.

---

## 1. Prerequisites

Before starting deployment, ensure you have:
1. A **GitHub** account containing the project repository.
2. A **Vercel** account ([vercel.com](https://vercel.com)).
3. A **Neon** account ([neon.tech](https://neon.tech)) for serverless PostgreSQL.
4. A **Cloudinary** account ([cloudinary.com](https://cloudinary.com)) for bike image hosting.
5. Access to your custom domain DNS panel (e.g., GoDaddy, Namecheap, Cloudflare).

---

## 2. Step 1: Provision Neon PostgreSQL Database

1. Log into your [Neon Console](https://console.neon.tech).
2. Create a new project named `jsr-bike-point-prod`.
3. In the project dashboard, locate your connection details:
   - **Pooled Connection String** (Used for `DATABASE_URL`):
     `postgresql://<user>:<password>@ep-pool-1234.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
   - **Direct Connection String** (Used for `DIRECT_URL`):
     `postgresql://<user>:<password>@ep-direct-1234.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
4. Keep these two connection strings handy for Vercel environment variable configuration.

---

## 3. Step 2: Configure Cloudinary Media Storage

1. Log into your [Cloudinary Dashboard](https://console.cloudinary.com).
2. Under **Product Environment Settings**, copy:
   - **Cloud Name** (`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`)
   - **API Key** (`CLOUDINARY_API_KEY`)
   - **API Secret** (`CLOUDINARY_API_SECRET`)
3. Under **Settings -> Upload**, create an unsigned upload preset if desired or use signed upload API signatures (`/api/sign-cloudinary-params`).
4. Ensure folder tags `jsr_bikes` and `jsr_assets` exist for clean organization.

---

## 4. Step 3: Deploy Application to Vercel

1. Log into [Vercel](https://vercel.com) and click **Add New -> Project**.
2. Import the `jsr-bike-point` GitHub repository.
3. Configure **Project Settings**:
   - **Framework Preset**: Next.js
   - **Build Command**: `prisma generate && next build`
   - **Install Command**: `npm install`
4. Expand **Environment Variables** and add all required production variables:

| Variable Name | Value Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon Pooled Connection String | `postgresql://...neon.tech/neondb?sslmode=require` |
| `DIRECT_URL` | Neon Direct Connection String | `postgresql://...neon.tech/neondb?sslmode=require` |
| `AUTH_SECRET` | 32-char Random Base64 String | `openssl rand -base64 32` |
| `AUTH_URL` | Production Domain URL | `https://jsrbikepoint.com` |
| `ADMIN_EMAIL` | Production Admin Email | `admin@jsrbikepoint.com` |
| `ADMIN_PASSWORD` | Strong Production Password | `StrongPass123!#` |
| `ADMIN_NAME` | Admin Display Name | `Jai Shree Ram Admin` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name | `jsr_bikepoint_prod` |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | `your_secret_key` |
| `NEXT_PUBLIC_APP_URL` | Production Domain URL | `https://jsrbikepoint.com` |

5. Click **Deploy**. Vercel will build and deploy your application.

---

## 5. Step 4: Run Initial Production Database Migration & Seed

After deployment succeeds, run migrations and the minimal production seed from your local CLI using your Neon production credentials:

```bash
# Apply database schema to production Neon database
DATABASE_URL="<your_neon_pooled_url>" DIRECT_URL="<your_neon_direct_url>" npx prisma migrate deploy

# Run minimal production seed (Creates admin user & business settings only)
NODE_ENV="production" DATABASE_URL="<your_neon_pooled_url>" ADMIN_EMAIL="admin@jsrbikepoint.com" ADMIN_PASSWORD="<strong_password>" npx prisma db seed
```

---

## 6. Step 5: Configure Custom Domain

1. In your Vercel Project Dashboard, navigate to **Settings -> Domains**.
2. Add your custom domain: `jsrbikepoint.com` and `www.jsrbikepoint.com`.
3. Update DNS records at your domain registrar:
   - **Apex domain (`jsrbikepoint.com`)**:
     `A` Record -> `76.76.21.21`
   - **Subdomain (`www.jsrbikepoint.com`)**:
     `CNAME` Record -> `cname.vercel-dns.com`
4. Vercel will automatically verify DNS propagation and issue a free SSL/TLS certificate.

---

## 7. Step 6: Post-Deployment Verification

1. Access `https://jsrbikepoint.com` in a browser.
2. Confirm the homepage loads with business information for No-04, Imamganj Naka, Sipahpur, Muzaffarpur.
3. Access `https://jsrbikepoint.com/admin/login` and verify logging in with your `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
4. Verify creating a new bike listing with Cloudinary image upload.
5. Check `https://jsrbikepoint.com/sitemap.xml` and `https://jsrbikepoint.com/robots.txt`.
