import { test, expect } from "@playwright/test";

test.describe("Admin Authentication & Bike CRUD Workflow", () => {

  test("1. Reject unauthenticated access to protected admin dashboard", async ({ page }) => {
    await page.goto("/admin");
    // Should automatically redirect to login
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(page.locator("h1")).toContainText("Jay Shree Ram Bike Point");
  });

  test("2. Reject invalid login credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@jsrbikepoint.com");
    await page.fill('input[type="password"]', "wrongpassword123");
    await page.click('button[type="submit"]');

    // Should display error toast or message
    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("3. Successful admin login and dashboard overview", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@jsrbikepoint.com");
    await page.fill('input[type="password"]', "admin_secure_password_123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/admin");

    await expect(page.locator("h1")).toContainText("Welcome back");
    await expect(page.getByText("Total Inventory")).toBeVisible();
    await expect(page.getByText("Available Bikes")).toBeVisible();
  });

  test("4. View inventory table and search bikes", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill('input[type="email"]', "admin@jsrbikepoint.com");
    await page.fill('input[type="password"]', "admin_secure_password_123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/admin");

    await page.goto("/admin/bikes");
    await expect(page.locator("h1")).toContainText("Bike Listings");

    // Search query test
    await page.fill('input[placeholder*="Search"]', "Honda");
    await page.click('button:has-text("Search")');
    await expect(page.getByText("CB Shine")).toBeVisible();
  });

  test("5. Public layout and mobile responsiveness shell", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Browse Inspected");
    await expect(page.getByText("Popular Bike Brands")).toBeVisible();
    await expect(page.getByText("Gobarsahi Chowk, Muzaffarpur").first()).toBeVisible();
  });
});
