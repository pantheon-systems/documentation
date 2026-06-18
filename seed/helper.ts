import { getGlossaryPageData } from "@/lib/glossary";
import {
  createArticle,
  disconnectArticle,
  ingestMarkdown,
  updateMetadata,
} from "@/lib/ingestion";
import {
  BasePageDataWithoutComponent,
  fetchArticleBySlug,
  PageDataWithoutComponent,
  singleSlugForFetch as normalizeSlug,
  getAllReleaseNotes,
} from "@/lib/page-utils";
import { getFilesByExtension } from "@/server/processor/helper";
import { ProcessedJsonFile, processFile } from "@/server/processor/json";
import { processDirectoryForMarkDown } from "@/server/processor/mdx";
import { ProcessedYamlFile, processYamlFile } from "@/server/processor/yaml";
import { writeFileSync } from "fs";
import path, { join } from "path";

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

export const processPage = async (
  page: PageDataWithoutComponent,
  allowFetch: boolean = true,
  siteId: string = process.env.PCC_SITE_ID || "",
  token: string = process.env.PCC_TOKEN || ""
) => {
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

  console.log("processing", page.type, page.uri, page.relativeFilePath);

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

export const updatePartials = async (
  allowFetch: boolean = true,
  filter: (filePath: string) => boolean = (filePath) => {
    return filePath.endsWith(".md") || filePath.endsWith(".mdx");
  }
) => {
  if (!allowFetch) {
    return;
  }

  const files = processDirectoryForMarkDown("source/content/partials", {
    filter,
  });

  for (const file of files) {
    const slug = normalizeSlug(
      file.relativePath.split("source/content/partials/")[1]
    );
    console.log({ slug });
    let article = await fetchArticleBySlug(slug);
    if (article) {
      continue;
    }

    if (!article) {
      article = await createArticle({
        title: file.frontmatter.title ?? "partial-file",
        contentType: "TEXT_MARKDOWN",
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: slug,
          type: "partial",
          relativePath: file.relativePath,
        },
        tags: [],
      });
      console.log("Created article", article);
    }

    await saveDataAfterPreProcessing(
      file.internal.content,
      {
        uri: slug,
        title: file.frontmatter.title ?? "partial-file",
        description: file.frontmatter.description ?? "partial-file",
        rawFileData: file.content,
      },
      article
    );

    console.log("Updated article", article);
  }
};

export const updateGlossary = async (allowFetch: boolean = true) => {
  if (!allowFetch) {
    return;
  }

  const { allDefs, letters } = await getGlossaryPageData();

  const slug = "glossary";
  let article = await fetchArticleBySlug(slug);

  if (!article) {
    article = await createArticle({
      title: "Glossary",
      siteId: process.env.PCC_SITE_ID || "",
      metadataFields: {
        slug: slug,
        type: "glossary",
        relativePath: "glossary.md",
      },
      tags: [],
      contentType: "TEXT_MARKDOWN",
    });
    console.log("Created article", article);
  }

  await saveDataAfterPreProcessing(
    JSON.stringify({ allDefs, letters }),
    {
      uri: slug,
      title: "Glossary",
      description: "Glossary",
      rawFileData: JSON.stringify({ allDefs, letters }),
    },
    article
  );
};
export const updateJSONFiles = async (
  allowFetch = true,
  filter: (filePath: string) => boolean = (filePath) => {
    return filePath.endsWith(".json");
  }
) => {
  if (!allowFetch) {
    return;
  }

  const files = getFilesByExtension(
    join(path.resolve(process.cwd(), "src"), "source"),
    [".json"]
  );

  const filteredFiles = files.filter(filter);

  const jsonFiles = filteredFiles
    .map(processFile)
    .filter((file): file is ProcessedJsonFile => file !== null);

  for (const file of jsonFiles) {
    if (file.fileName.startsWith(".")) {
      continue;
    }

    console.log("fetching", normalizeSlug(`${file.fileName}-json-file`));
    let article = await fetchArticleBySlug(
      normalizeSlug(`${file.fileName}-json-file`)
    );
    if (article) {
      continue;
    }

    if (!article) {
      console.log("article not found", file.fileName);
      article = await createArticle({
        title: `${file.fileName}-json-file`,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          title: file.fileName,
          slug: `${file.fileName}-json-file`,
          type: "json",
          relativePath: file.relativePath,
        },
        tags: [],
        contentType: "TEXT_MARKDOWN",
      });
    }

    try {
      await saveDataAfterPreProcessing(
        JSON.stringify({ content: file.content }),
        {
          uri: file.fileName,
          title: file.fileName,
          description: file.fileName,
          rawFileData: JSON.stringify({ content: file.content }),
        },
        article
      );
    } catch (err) {
      try {
        await disconnectArticle(article.id);
      } catch {}
      console.log("disconnected article", article.id);
      continue;
    }
  }
};

export const updateYamlFiles = async (
  allowFetch = true,
  filter: (filePath: string) => boolean = (filePath) => {
    return filePath.endsWith(".yaml");
  }
) => {
  if (!allowFetch) {
    return;
  }

  const files = getFilesByExtension(
    join(path.resolve(process.cwd(), "src"), "source"),
    [".yaml", ".yml"]
  );

  const filteredFiles = files.filter(filter);

  const yamlFiles = filteredFiles
    .map(processYamlFile)
    .filter((file): file is ProcessedYamlFile => file !== null);

  for (const file of yamlFiles) {
    if (file.fileName.startsWith(".")) {
      continue;
    }

    console.log("fetching", normalizeSlug(`${file.fileName}-yaml-file`));
    let article = await fetchArticleBySlug(
      normalizeSlug(`${file.fileName}-yaml-file`)
    );
    if (article) {
      continue;
    }

    if (!article) {
      console.log("article not found", file.fileName);
      article = await createArticle({
        title: `${file.fileName}-yaml-file`,
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          title: file.fileName,
          slug: `${file.fileName}-yaml-file`,
          type: "yaml",
          relativePath: file.relativePath,
        },
        tags: [],
        contentType: "TEXT_MARKDOWN",
      });
    }

    try {
      await saveDataAfterPreProcessing(
        JSON.stringify({ content: file.content }),
        {
          uri: file.fileName,
          title: file.fileName,
          description: file.fileName,
          rawFileData: JSON.stringify({ content: file.content }),
        },
        article
      );
    } catch (err) {
      try {
        await disconnectArticle(article.id);
      } catch {}
      console.log("disconnected article", article.id);
      continue;
    }
  }
};

export const updateReleaseNotesListing = async (allowFetch = true) => {
  if (!allowFetch) {
    return;
  }

  const allReleaseNotes = getAllReleaseNotes();
  const categories = allReleaseNotes.map((releaseNote) => {
    return {
      node: {
        frontmatter: {
          categories: releaseNote.frontmatter.categories ?? [],
        },
      },
    };
  });
  const releaseNotes = getAllReleaseNotes().map((releaseNote) => {
    const { content, internal, ...doc } = releaseNote;
    return { slug: doc.fields.slug };
  });
  const allCategories = Array.from(
    new Set(categories.map((c) => c.node.frontmatter.categories).flat())
  );

  const slug = "release-notes-listing";

  let article = await fetchArticleBySlug(slug);

  if (!article) {
    article = await createArticle({
      title: "Release Notes Listing",
      siteId: process.env.PCC_SITE_ID || "",
      metadataFields: {
        slug: slug,
      },
      tags: [],
      contentType: "TEXT_MARKDOWN",
    });
    console.log("Created article", article);
  }

  console.log(article);

  const content = JSON.stringify({ releaseNotes, categories: allCategories });

  console.log(content);

  writeFileSync("release-notes-listing.json", content);

  await saveDataAfterPreProcessing(
    content,
    {
      uri: slug,
      title: "Release Notes Listing",
      description: "Release Notes Listing",
      rawFileData: content,
    },
    article
  );

  // map categories to release note slugs
  {
    const categoryToReleaseNoteSlugs: Record<string, string[]> = {};
    allReleaseNotes.map((e) => {
      e.frontmatter.categories?.map((category) => {
        if (!categoryToReleaseNoteSlugs[category]) {
          categoryToReleaseNoteSlugs[category] = [];
        }
        categoryToReleaseNoteSlugs[category].push(e.fields.slug);
      });
    });

    const slug = "release-notes-listing-with-categories";

    let article = await fetchArticleBySlug(slug);

    if (!article) {
      article = await createArticle({
        title: "Release Notes Listing with Categories",
        siteId: process.env.PCC_SITE_ID || "",
        metadataFields: {
          slug: slug,
        },
        tags: [],
        contentType: "TEXT_MARKDOWN",
      });
    }

    await saveDataAfterPreProcessing(
      JSON.stringify({ categoryToReleaseNoteSlugs }),
      {
        uri: slug,
        title: "Release Notes Listing with Categories",
        description: "Release Notes Listing with Categories",
        rawFileData: JSON.stringify({ categoryToReleaseNoteSlugs }),
      },
      article
    );
  }
};
