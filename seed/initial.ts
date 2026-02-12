import {
  BasePageDataWithoutComponent,
  fetchArticleBySlug,
  getAllPages,
  PageDataWithoutComponent,
  singleSlugForFetch as normalizeSlug,
} from "@/lib/page-utils";
import {
  createArticle,
  ingestMarkdown,
  updateMetadata,
} from "../src/lib/ingestion";
import {
  updateGlossary,
  updateJSONFiles,
  updatePartials,
  updateReleaseNotesListing,
} from "./helper";

const allowFetch = false;
process.env.SERVE_LOCAL = "true";

const token = process.env.PCC_TOKEN || "";
const siteId = process.env.PCC_SITE_ID || "";

const getDateFromFilename = (filename: string): Date | null => {
  // Extract date from filename like "2024-01-22-drupal-7-99-release-bug fixes-and-feature-enhancements.md"
  const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})-/);

  if (dateMatch) {
    const dateString = dateMatch[1];
    const date = new Date(dateString);

    // Check if the date is valid
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
};

const processPage = async (page: PageDataWithoutComponent) => {
  if (page.uri.startsWith("wordpress-known-issues")) {
    return;
  }

  if (page.uri.startsWith("terminus/commands")) {
    return;
  }

  if (!allowFetch) {
    console.log({
      uri: page.uri,
      type: page.type,
      title: page.title,
      normalized: normalizeSlug(page.uri),
    });

    if (page.type !== "doc") {
      return;
    }

    let article = await fetchArticleBySlug(
      normalizeSlug(page.uri),
      siteId,
      token,
      {
        withContent: false,
        withMetadata: true,
      }
    );

    if (!article) {
      return;
    }

    if (article.title !== page.title) {
      console.log("Updating metadata", article.id, page.title);
      await updateMetadata(article.id, {
        title: page.title,
        metadataFields: {
          ...article.metadata,
          title: page.title,
          description: page.description,
        },
      });
      console.log("Updated metadata", article.id, page.title);
    }

    return;
  }

  if (page.type === "release-note") {
    let article: { id: string } = await fetchArticleBySlug(
      normalizeSlug(page.uri)
    );

    const { content, internal, ...doc } = page.data.node;
    const date = getDateFromFilename(
      doc.relativePath.split("releasenotes/")[1]
    );

    if (!date) {
      console.log("No date found for release note", doc.relativePath);
      throw new Error("No date found for release note" + page.uri);
    }

    if (article) {
      return;
    }

    if (!article) {
      console.log("article not found", page.uri);
      article = await createArticle({
        title: page.title,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: page.uri,
          type: page.type,
          relativePath: doc.relativePath,
          description: page.description,
          title: page.title,
          prev: page.data.prev,
          next: page.data.next,
        },
        tags: doc.frontmatter.tags ?? [],
        contentType: "TEXT_MARKDOWN",
      });
      console.log("Created article", article);
    }

    console.log("saving data", page.uri);

    await saveDataAfterPreProcessing(
      page.rawFileData,
      page,
      article,
      getDateFromFilename(doc.relativePath) ?? new Date()
    );
  }

  if (page.type === "guide") {
    let article: { id: string } = await fetchArticleBySlug(
      normalizeSlug(page.uri)
    );

    if (article) {
      return;
    }
    const { content, frontmatter, internal, ...doc } = page.data.guide;

    if (!article) {
      console.log("article not found", page.uri);
      article = await createArticle({
        title: page.title,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: page.uri,
          type: page.type,
          relativePath: doc.relativePath,
          description: page.description,
          title: page.title,
          prev: page.data.prev,
          next: page.data.next,
        },
        tags: frontmatter.tags ?? [],
        contentType: "TEXT_MARKDOWN",
      });
      console.log("Created article", article);
    }

    console.log("saving data", page.uri);

    await saveDataAfterPreProcessing(page.rawFileData, page, article);
  }

  if (page.type === "doc") {
    let article: { id: string } = await fetchArticleBySlug(
      normalizeSlug(page.uri)
    );
    if (article) {
      return;
    }

    const { content, frontmatter, internal, ...doc } = page.data.doc;

    if (!article) {
      console.log("article not found", page.uri);
      article = await createArticle({
        title: page.title,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: page.uri,
          type: page.type,
          relativePath: doc.relativePath,
          description: page.description,
          title: page.title,
        },
        tags: frontmatter.tags ?? [],
        contentType: "TEXT_MARKDOWN",
      });
      console.log("Created article", article);
    }

    await saveDataAfterPreProcessing(page.rawFileData, page, article);
  }

  if (page.type === "landing") {
    let article: { id: string } = await fetchArticleBySlug(
      normalizeSlug(page.uri)
    );
    console.log(page);

    if (article) {
      return;
    }

    console.log(article);

    const landing = page.data.landing;

    if (!article) {
      console.log("article not found", page.uri);
      article = await createArticle({
        title: page.title,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: page.uri,
          type: page.type,
          description: page.description,
        },
        tags: [],
        contentType: "TEXT_MARKDOWN",
      });
      console.log("Created article", article);
    }

    await saveDataAfterPreProcessing(JSON.stringify(landing), page, article);
  }

  if (page.type === "iframe-embed") {
    let article: { id: string } = await fetchArticleBySlug(
      normalizeSlug(page.uri)
    );

    if (article) {
      return;
    }
    const { content, frontmatter, internal, ...doc } = page.data.iframeEmbed;

    if (!article) {
      console.log("article not found", page.uri);
      article = await createArticle({
        title: page.title,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: page.uri,
          type: page.type,
          relativePath: doc.relativePath,
          description: page.description,
          title: page.title,
        },
        tags: frontmatter.tags ?? [],
        contentType: "TEXT_MARKDOWN",
      });
      console.log("Created article", article);
    }

    console.log("saving data", page.uri);

    await saveDataAfterPreProcessing(page.rawFileData, page, article);
  }
};

const main = async () => {
  await updatePartials(allowFetch);
  await updateGlossary(allowFetch);
  await updateJSONFiles(allowFetch);
  await updateReleaseNotesListing(allowFetch);

  const pages: PageDataWithoutComponent[] = await getAllPages();
  if (pages.length > 0) {
    // Process pages in batches of 8
    const batchSize = 8;
    for (let i = 0; i < pages.length; i += batchSize) {
      const batch = pages.slice(i, i + batchSize);
      if (allowFetch) {
        console.log(
          `Processing batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(pages.length / batchSize)}`
        );
      }

      // Process batch in parallel
      await Promise.all(batch.map((page) => processPage(page)));
    }
  }

  // store JSON and YAML files
};

main().catch(console.error);

async function saveDataAfterPreProcessing(
  content: string,
  page: Omit<BasePageDataWithoutComponent, "relativeFilePath">,
  article: { id: string },
  ingestDate: Date = new Date()
) {
  const lines = content
    .replaceAll("![", "__IMAGE_REPLACEMENT_MARKER__")
    .split("\n");
  const batches: string[] = [];
  for (let i = 0; i < lines.length; i += 10000) {
    batches.push(lines.slice(i, i + 10000).join("\n"));
  }

  let i = 0;
  console.log("Processing. Ingest Markdown", page.uri);

  for (const batch of batches) {
    i++;
    if (i > 1) {
      console.error("Breaking");
      break;
    }
    try {
      await ingestMarkdown(article.id, {
        content: JSON.stringify({ content: batch }),
        publishLevel: "prod",
        contentType: "markdown",
        docName: page.title,
        docRevisionDate: ingestDate.getTime(),
      });
      console.log(i);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
