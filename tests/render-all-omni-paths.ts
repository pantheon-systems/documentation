import { getOmniItems } from "@/components/omni-components";
import { OmniItem } from "@/components/omni-components/helpers";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3002";

const fetchOmniItemRecursively = async (item: OmniItem, depth = 0) => {
  console.log(`Fetching at depth ${depth}`, `${BASE_URL}${item.link}`);

  let slug = item.link;
  if (slug.startsWith("/")) {
    slug = slug.slice(1);
  }

  if (slug.endsWith("/")) {
    slug = slug.slice(0, -1);
  }

  const response = await fetch(`${BASE_URL}/${slug}`);

  if (!response.ok) {
    console.info(`Failed to fetch ${item.link}: ${response.statusText}`);
  } else {
    console.log(`Fetched ${item.link}`);
  }

  if (item.children) {
    const promises = [];
    for (const child of item.children) {
      const promise = async () => {
        try {
          await fetchOmniItemRecursively(child, depth + 1);
          if (!response.ok) {
            console.info(
              `Failed to fetch ${child.link}: ${response.statusText}`
            );
          } else {
            console.log(`Fetched child ${child.link}`);
          }
        } catch (error) {
          console.info(`Failed to fetch ${child.link}: ${error}`);
        }
      };
      promises.push(promise());
    }
    await Promise.all(promises);
  }
};

const main = async () => {
  const items = await getOmniItems();

  for (const item of items) {
    try {
      await fetchOmniItemRecursively(item);
      console.log(`Fetched ${item.link} with children`);
    } catch (error) {
      console.error(`Failed to fetch ${item.link}: ${error}`);
    }
  }
};

main();
