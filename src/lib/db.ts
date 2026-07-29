import { PrismaClient } from "@prisma/client";

// =============================================================================
// Prisma Client Singleton
// =============================================================================
// In development, Next.js hot-reloads modules which would create multiple
// PrismaClient instances. We store it on globalThis to reuse across reloads.
// In production, this is a standard singleton.
// =============================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
