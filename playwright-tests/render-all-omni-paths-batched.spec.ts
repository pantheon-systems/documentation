import { test, expect } from "@playwright/test";
import urls from "./urls.json";

test.describe.parallel("Page render checks", () => {
  test.setTimeout(60_000);
  for (const url of urls) {
    test(`Page loads without error: ${url}`, async ({ page }) => {
      console.log(`Testing ${url}`);
      const consoleErrors: string[] = [];

      page.on("pageerror", (error) => {
        consoleErrors.push(error.message);
      });

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      const response = await page.goto(url, { waitUntil: "networkidle" });
      expect(response?.ok()).toBeTruthy(); // HTTP status check

      // Optional: check for a body or main wrapper
      await expect(page.locator("body")).toBeVisible();

      // Optional: Fail test if JS errors are found
      expect(consoleErrors).toEqual([]);
    });
  }
});
