import { getArticles, type Article } from "@pantheon-systems/cpub-sdk-core";
import { getPantheonClient } from "./PantheonClient";

export async function getAllArticles({
  pccGrant,
  withContent = false,
}: {
  pccGrant?: string | null;
  /** Include each article's full content (TREE_PANTHEON_V2). */
  withContent?: boolean;
} = {}) {
  const articles = await getArticles(
    getPantheonClient({ pccGrant }),
    {
      publishingLevel: "PRODUCTION",
      ...(withContent ? { contentType: "TREE_PANTHEON_V2" as const } : {}),
    },
    {
      publishStatus: "published",
    },
    withContent
  );

  // getArticles is typed as returning articles without content, but
  // includes resolvedContent when withContent is true.
  return articles as Article[];
}
