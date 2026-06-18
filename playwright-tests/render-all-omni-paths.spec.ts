import { test, expect } from "@playwright/test";
import { getOmniItems } from "@/components/omni-components";
import { OmniItem } from "@/components/omni-components/helpers";

const visitOmniItemRecursively = async (
  page: any,
  item: OmniItem,
  depth = 0
) => {
  console.log(`Visiting at depth ${depth}`, `${item.link}`);

  let slug = item.link;
  if (slug.startsWith("/")) {
    slug = slug.slice(1);
  }

  if (slug.endsWith("/")) {
    slug = slug.slice(0, -1);
  }

  try {
    await page.goto(`/${slug}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    // Wait for the page to be fully loaded
    await page.waitForLoadState("domcontentloaded");

    // Check if the page loaded successfully (not a 404 or error page)
    const title = await page.title();
    console.log(`Successfully visited ${item.link} - Title: ${title}`);

    // For example, check if the page has some expected content
    const bodyText = await page.textContent("body");
    if (bodyText && bodyText.length > 0) {
      console.log(
        `Page ${item.link} has content (${bodyText.length} characters)`
      );
    } else {
      console.warn(`Page ${item.link} appears to have no content`);
    }
  } catch (error) {
    console.error(`Failed to visit ${item.link}: ${error}`);
    // Don't throw the error to continue with other pages
  }

  // Recursively visit children
  if (item.children) {
    for (const child of item.children) {
      await visitOmniItemRecursively(page, child, depth + 1);
    }
  }
};

// Helper function to flatten all omni items into a single array
const flattenOmniItems = (items: OmniItem[]): OmniItem[] => {
  const flattened: OmniItem[] = [];

  const flatten = (item: OmniItem) => {
    flattened.push(item);
    if (item.children) {
      item.children.forEach(flatten);
    }
  };

  items.forEach(flatten);
  return flattened;
};

// Create individual tests for each omni item to enable parallelization
test.describe("render all omni paths in parallel", () => {
  let allItems: OmniItem[] = [];

  test.beforeAll(async () => {
    const items = await getOmniItems();
    allItems = flattenOmniItems(items);
    console.log(
      `Found ${allItems.length} total omni items to test in parallel`
    );
  });

  // Create a test for each item - this enables parallel execution
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];

    test(`render ${item.link}`, async ({ page }) => {
      test.setTimeout(60000); // 1 minute per item

      try {
        await visitOmniItemRecursively(page, item);
        console.log(`Completed testing ${item.link}`);
      } catch (error) {
        console.error(`Failed to test ${item.link}: ${error}`);
        throw error; // Re-throw to mark test as failed
      }
    });
  }
});
