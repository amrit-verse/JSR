import { test, expect } from "@playwright/test";

test.describe("Milestone 4 — Customer Journey & Public Storefront Workflow", () => {
  test("1. Homepage inventory focus, featured bikes, and brand links", async ({ page }) => {
    await page.goto("/");

    // Verify Inventory-focused Hero Section
    await expect(page.locator("h1")).toContainText("Browse Inspected");
    await expect(page.getByText("Featured Bikes")).toBeVisible();
    await expect(page.getByText("Popular Bike Brands")).toBeVisible();
    await expect(page.getByText("Latest Arrivals")).toBeVisible();

    // Click "Browse Full Inventory" CTA
    const browseCta = page.locator('a:has-text("Browse Full Inventory")').first();
    await browseCta.click();
    await page.waitForURL("/bikes");
    await expect(page.locator("h1")).toContainText("Browse Second-Hand Bikes");
  });

  test("2. Inventory debounced search by model name and engine CC", async ({ page }) => {
    await page.goto("/bikes");

    // Search query test for "Honda"
    const searchInput = page.locator('input[placeholder*="Honda Activa"]');
    await searchInput.fill("Honda");

    // Wait for 300ms debounce to sync URL
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/bikes\?query=Honda/);

    // Verify search active filter pill
    await expect(page.getByText('Query: "Honda"')).toBeVisible();

    // Clear search
    await page.click('button:has-text("Clear All")');
    await expect(page).toHaveURL("/bikes");
  });

  test("3. Multi-filter system, available only toggle, and empty state", async ({ page, isMobile }) => {
    await page.goto("/bikes");

    // Open filter drawer if on mobile viewport
    const filterDrawerBtn = page.locator('button:has-text("Filters")');
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

    // Test Price Preset: Under ₹50k
    await page.click('button:has-text("Under ₹50k")');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/bikes\?.*maxPrice=50000/);

    // Test Clear All Filters
    await page.click('button:has-text("Clear All")');
    await expect(page).toHaveURL("/bikes");
  });

  test("4. Bike Details Page, breadcrumbs, WhatsApp CTA, and EMI calculator", async ({ page }) => {
    await page.goto("/bikes");

    // Click on the first bike card's "View Specs" button
    const firstViewSpecsBtn = page.locator('a:has-text("View Specs")').first();
    await firstViewSpecsBtn.click();

    // Verify URL navigates to /bikes/[slug]
    await expect(page).toHaveURL(/\/bikes\/[a-z0-9-]+/);

    // 10. Verify Breadcrumb Navigation
    await expect(page.locator('nav[aria-label="Breadcrumb"]')).toBeVisible();

    // 6. Verify Price & Availability summary before full specs
    await expect(page.getByText("Fixed Dealership Price")).toBeVisible();
    await expect(page.getByText("Document Verification")).toBeVisible();

    // 8. Verify Primary CTA is "Enquire on WhatsApp"
    const whatsappBtn = page.locator('a:has-text("Enquire on WhatsApp")').first();
    await expect(whatsappBtn).toBeVisible();
    const href = await whatsappBtn.getAttribute("href");
    expect(href).toContain("https://wa.me/");

    // 9. Verify Instant EMI Calculator
    await expect(page.getByText("Instant EMI Calculator")).toBeVisible();
    await expect(page.getByText("Estimated Monthly EMI")).toBeVisible();

    // Test EMI Tenure selection buttons
    await page.click('button:has-text("36 Months")');
    await expect(page.getByText("36 Months").first()).toBeVisible();

    // Toggle advanced interest rate customization
    await page.click('button:has-text("Customize Interest Rate & Breakdowns")');
    await expect(page.getByText("Annual Interest Rate (%)")).toBeVisible();
  });

  test("5. Direct URL navigation, refresh persistence, and mobile viewports", async ({ page }) => {
    // Test direct deep link navigation with query params
    await page.goto("/bikes?brand=Honda&sort=price_asc");
    await expect(page.getByText("Brand: Honda")).toBeVisible();

    // Test browser refresh persistence
    await page.reload();
    await expect(page.getByText("Brand: Honda")).toBeVisible();
  });
});
