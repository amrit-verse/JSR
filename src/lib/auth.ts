// =============================================================================
// Auth.js Configuration
// =============================================================================
// Provider: Credentials (email + password)
// Session: JWT (stateless)
// Guard: auth() in admin layout.tsx
// =============================================================================

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";
import { loginSchema } from "@/schemas/auth-schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "dev_secret_key_jsr_bike_point_2026_super_secure",
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Validate input shape
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {return null;}

        // 2. Find admin user by email
        const user = await db.adminUser.findUnique({
          where: { email: parsed.data.email },
        });
        if (!user) {return null;}

        // 3. Verify password
        const passwordMatch = await compare(
          parsed.data.password,
          user.hashedPassword
        );
        if (!passwordMatch) {return null;}

        // 4. Return user object (stored in JWT)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async authorized({ auth, request }) {
      const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
      const isLoginPage = request.nextUrl.pathname === "/admin/login";
      const isAuthenticated = !!auth?.user;

      // Allow login page for unauthenticated users
      if (isLoginPage) {
        if (isAuthenticated) {
          return Response.redirect(new URL("/admin", request.nextUrl));
        }
        return true;
      }

      // Protect all other admin routes
      if (isAdminRoute && !isAuthenticated) {
        return Response.redirect(
          new URL("/admin/login", request.nextUrl)
        );
      }

      return true;
    },
  },
});
