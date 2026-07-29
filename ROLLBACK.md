# Production Rollback & Emergency Recovery Guide — Jay Shree Ram Bike Point

This document provides procedures for rolling back Vercel deployments, restoring Neon PostgreSQL database state, recovering from failed Prisma migrations, and handling emergency outages.

---

## 1. Application Deployment Rollback (Vercel)

If a newly deployed build introduces a critical bug or application crash:

### Instant Instant Rollback via Vercel Dashboard
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Select the `jsr-bike-point` project.
3. Click the **Deployments** tab.
4. Find the **previous stable deployment** that passed QA.
5. Click the three dots (`...`) menu next to that deployment and select **Instant Rollback**.
6. Confirm the rollback. Vercel will instantly route traffic back to the previous deployment build artifact in less than 5 seconds without triggering a re-build.

### Rollback via Vercel CLI
```bash
# List recent deployments
npx vercel ls

# Alias previous deployment URL to production
npx vercel alias set <previous-deployment-id>.vercel.app jsrbikepoint.com
```

---

## 2. Database Recovery & Restore Points (Neon PostgreSQL)

If database records are corrupted or data loss occurs:

### Restore using Neon Point-in-Time Restore (PITR)
Neon serverless PostgreSQL provides instant branching and Point-in-Time Recovery.

1. Log into the [Neon Console](https://console.neon.tech).
2. Go to **Branches** -> **Create Branch**.
3. Select **Time Travel / Point in Time**.
4. Choose the exact timestamp (e.g., 5 minutes prior to the bad deployment).
5. Name the new branch `recovery-branch-prod`.
6. Update your `DATABASE_URL` and `DIRECT_URL` environment variables in Vercel settings to point to the `recovery-branch-prod` connection string.
7. Trigger a Vercel redeployment (`Redeploy` without cache).

---

## 3. Migration Failure Recovery (Prisma)

If a schema migration fails midway or becomes stuck in an unapplied state during deployment (`prisma migrate deploy` error):

### Step 1: Check Migration Status
Run from your local environment pointing to production `DIRECT_URL`:

```bash
DIRECT_URL="<neon_direct_url>" npx prisma migrate status
```

### Step 2: Mark Failed Migration as Resolved
If Prisma reports a failed migration:

```bash
# Option A: Mark the migration as rolled back if changes were reverted manually
DIRECT_URL="<neon_direct_url>" npx prisma migrate resolve --rolled-back "<migration_folder_name>"

# Option B: Mark the migration as applied if the SQL was applied directly in psql
DIRECT_URL="<neon_direct_url>" npx prisma migrate resolve --applied "<migration_folder_name>"
```

### Step 3: Re-deploy Clean Migration
Once the migration history table (`_prisma_migrations`) is resolved:

```bash
DIRECT_URL="<neon_direct_url>" npx prisma migrate deploy
```

---

## 4. Environment Variable Rollback

If incorrect environment variables caused runtime failures:

1. Go to Vercel **Project Settings -> Environment Variables**.
2. Update or restore the previous environment variable values.
3. Click **Deployments** -> **Redeploy** on the active deployment for changes to take effect.

---

## 5. Emergency Contact & Escalation Protocol

- **Dealership Tech Lead**: Admin Team (`admin@jsrbikepoint.com`)
- **Hosting Status Page**: [vercel-status.com](https://www.vercel-status.com/)
- **Database Status Page**: [neonstatus.com](https://neonstatus.com/)
- **Cloudinary Status Page**: [status.cloudinary.com](https://status.cloudinary.com/)
