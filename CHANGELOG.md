# Changelog

All notable changes to the **Jay Shree Ram Bike Point** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2026-07-16

### Added
- **Project Structure & Layouts:** Fully scaffolded Next.js 16 App Router folder structure inside `/src`.
- **Database Schema:** Configured Prisma with PostgreSQL (Neon) containing `Bike`, `BikeImage`, `Settings`, and `AdminUser` models.
- **Design System:** Created modern CSS-first theme configuration using OKLCH colors, Inter, and Outfit fonts in `globals.css`.
- **UI Components:** Installed 17 core shadcn/ui components (Card, Dialog, Sheet, Input, Button, Table, etc.).
- **Auth.js Configuration:** Built secure JWT-based admin authentication with custom LoginForm and ProtectedLayout.
- **Logging & Validation:** Added centralized `logger` utility and Zod-based environment variable validation.
- **Seed Script:** Configured initial database seeder containing admin credentials, business settings, and 4 sample bikes.
- **Project Metadata:** Created `PROJECT_RULES.md`, `PROJECT_PROGRESS.md`, `PROJECT_DECISIONS.md`, and `TODO.md`.
