import { getOmniItems } from "@/components/omni-components";
import { OmniItem } from "@/components/omni-components/helpers";
import { ContentStructureItem, updateContentStructure } from "@/lib/ingestion";
import { fetchArticleBySlug, singleSlugForFetch } from "@/lib/page-utils";
import { writeFileSync } from "fs";
import { join } from "path";

let processed = 0;
const token = process.env.PCC_TOKEN || "";
const siteId = process.env.PCC_SITE_ID || "";
const managementToken = process.env.PCC_MANAGEMENT_TOKEN || "";

const processOmniItems = async (
  omniItem: OmniItem
): Promise<ContentStructureItem | null> => {
  processed++;
  console.log(`Processed: ${processed}`);
  let { link, title, children } = omniItem;

  console.log(`Processing link:`, link);

  if (link.startsWith("/")) {
    link = link.slice(1);
  }
  if (link.endsWith("/")) {
    link = link.slice(0, -1);
  }

  let slug = singleSlugForFetch(link);

  console.log(`Processing slug:`, slug);

  const article = await fetchArticleBySlug(slug, siteId, token, {
    withContent: false,
    withMetadata: false,
  });

  if (!article) {
    return null;
  }

  let updatedChildren: ContentStructureItem[] = [];

  if (children && children.length > 0) {
    // process in batches of 20
    const batchSize = 20;
    const batches = [];
    for (let i = 0; i < children.length; i += batchSize) {
      batches.push(children.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      let innerChilren: ContentStructureItem[] = [];
      for (const child of batch) {
        try {
          const result = await processOmniItems(child);
          if (result) {
            innerChilren.push(result);
          }
        } catch (error) {
          console.error(`Error processing child:`, error);
        }
      }
      updatedChildren.push(...innerChilren);
      //   wait for 500ms
      await new Promise((resolve) => setTimeout(resolve, 1_000));
    }
  }

  console.log(`Updated children:`, updatedChildren);

  return {
    children: updatedChildren,
    id: article.id,
    isHidden: false,
    type: "article",
    name: omniItem.title,
    slug: singleSlugForFetch(omniItem.link),
    published: true,
  };
};

const main = async () => {
  const omniItems = await getOmniItems();

  const active: ContentStructureItem[] = [];

  for (const omniItem of omniItems) {
    const contentStructureItem = await processOmniItems(omniItem);
    if (contentStructureItem) {
      active.push(contentStructureItem);
    }
  }

  writeFileSync(
    join(process.cwd(), "active.json"),
    JSON.stringify(active, null, 2)
  );

  await updateContentStructure(
    siteId,
    {
      contentStructure: {
        active,
        uncategorized: [],
      },
    },
    managementToken
  );
};

main().then(console.log).catch(console.error);
