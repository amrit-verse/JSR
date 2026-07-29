import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  reporter: "line",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome (375x812)",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Tablet (768x1024)",
      use: {
        viewport: { width: 768, height: 1024 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  webServer: {
    command: "npm run start",
    port: 3000,
    reuseExistingServer: false,
    timeout: 30 * 1000,
  },
});
