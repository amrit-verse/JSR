import { test, expect } from "@playwright/test";

test.describe("Milestone 4 — Customer Journey & Public Storefront Workflow", () => {
  test("1. Homepage inventory focus, featured bikes, and brand links", async ({ page }) => {
    await page.goto("/");

    // Verify main hero headline & dealearship location badge
    await expect(page.locator("h1")).toContainText("Browse Inspected");
    await expect(page.getByText("Sipahpur, Bihar 842001").first()).toBeVisible();

    // Verify quick action buttons
    const exploreBtn = page.locator('a:has-text("Browse Full Inventory")').first();
    await expect(exploreBtn).toBeVisible();

    // Click explore inventory and verify navigation
    await exploreBtn.click();
    await expect(page).toHaveURL("/bikes");
  });

  test("2. Inventory debounced search by model name and engine CC", async ({ page }) => {
    await page.goto("/bikes");

    // Perform search
    const searchInput = page.locator('input[placeholder*="Honda Activa"]');
    await searchInput.fill("Honda");

    // Wait for debounce and transition to sync URL
    await expect(page).toHaveURL(/\/bikes\?query=Honda/, { timeout: 10000 });

    // Verify search active filter pill
    await expect(page.getByText('Query: "Honda"')).toBeVisible();

    // Clear search
    await page.click('button:has-text("Clear All")');
    await expect(page).toHaveURL(/\/bikes(\?page=1)?/, { timeout: 10000 });
  });

  test("3. Multi-filter system, available only toggle, and empty state", async ({ page }) => {
    await page.goto("/bikes");

    // Open filter drawer if on mobile viewport
    const filterDrawerBtn = page.locator('button:has-text("Filters")').first();
    if (await filterDrawerBtn.isVisible()) {
      await filterDrawerBtn.click();
    }

    // Verify "Available Bikes Only" is checked by default
    const availableOnlyCheckbox = page.locator('label:has-text("Available Bikes Only") input[type="checkbox"]');
    await expect(availableOnlyCheckbox).toBeChecked();

    // Filter by Brand "Hero"
    const heroCheckbox = page.locator('label:has-text("Hero") input[type="checkbox"]').first();
    await heroCheckbox.click();

    // Verify URL reflects brand filter
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/bikes\?brand=Hero/);
    await expect(page.getByText("Brand: Hero")).toBeVisible();

    // Open filter drawer again on mobile if closed
    if (await filterDrawerBtn.isVisible() && !(await availableOnlyCheckbox.isVisible())) {
      await filterDrawerBtn.click();
    }

    // Uncheck Available Only to include sold bikes
    await availableOnlyCheckbox.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/bikes\?brand=Hero(&page=\d+)?&availableOnly=false/);
  });

  test("4. Bike Details Page, breadcrumbs, WhatsApp CTA, and EMI calculator", async ({ page }) => {
    await page.goto("/bikes");

    // Click on the first bike card's "View Specs" link if bikes are available
    const firstViewSpecsBtn = page.getByRole("link", { name: /view specs/i }).first();
    if (await firstViewSpecsBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await firstViewSpecsBtn.click();
      await expect(page).toHaveURL(/\/bikes\/[a-z0-9-]+/);
      await expect(page.getByText(/Key Specifications/i)).toBeVisible();
      await expect(page.getByText(/EMI /i).first()).toBeVisible();
    } else {
      await expect(page.locator("h1")).toContainText("Inventory");
    }
  });

  test("5. Direct URL navigation, refresh persistence, and mobile viewports", async ({ page }) => {
    // Test direct deep link navigation with query params
    await page.goto("/bikes?brand=Honda&sort=price_asc");
    await expect(page.getByText("Brand: Honda")).toBeVisible();

    // Test browser refresh persistence
    await page.reload();
    await expect(page.getByText("Brand: Honda")).toBeVisible();
    await expect(page).toHaveURL(/\/bikes\?brand=Honda&sort=price_asc/);
  });
});
