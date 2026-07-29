import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "abhishek2mfp@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Aarav@246";

test.describe("Admin Authentication & Bike CRUD Workflow", () => {
  test("1. Reject unauthenticated access to protected admin dashboard", async ({ page }) => {
    await page.goto("/admin");
    // Verify redirect to login page
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.getByText("Enter your admin credentials to login")).toBeVisible();
  });

  test("2. Reject invalid login credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', "wrong_invalid_password_999");
    await page.click('button[type="submit"]');

    // Verify error message toast/alert
    await expect(page.getByText(/Invalid credentials|Invalid email or password/i)).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("3. Successful admin login and dashboard overview", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page.locator("h1")).toContainText(/Welcome back/i, { timeout: 10000 });
    await expect(page.getByText("Total Inventory")).toBeVisible();
    await expect(page.getByText("Available Bikes")).toBeVisible();
  });

  test("4. View inventory table and search bikes", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', ADMIN_EMAIL);
    await page.fill('input[type="password"]', ADMIN_PASSWORD);
    await page.click('button[type="submit"]');

    await expect(page.locator("h1")).toContainText(/Welcome back/i, { timeout: 10000 });
    await page.goto("/admin/bikes");
    await expect(page.locator("h1")).toContainText("Bike Listings");
    await expect(page.locator('a:has-text("Add New Bike")')).toBeVisible();
  });

  test("5. Public layout and mobile responsiveness shell", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Browse Inspected");
    await expect(page.getByText("Popular Bike Brands")).toBeVisible();
    await expect(page.getByText("Gobarsahi Chowk, Muzaffarpur").first()).toBeVisible();
  });
});
