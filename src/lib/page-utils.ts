import { processDirectoryForYaml } from "@/server/processor/yaml";
import {
  processDirectoryForMarkDown,
  ProcessedFile,
  FilterCriteria as MdxFilterCriteria,
} from "@/server/processor/mdx";
import { processDirectoryForJson } from "@/server/processor/json";
import { CommandType } from "@/components/common/commands/types";

const filterMdxFiles = (
  files: ProcessedFile[],
  filter: MdxFilterCriteria = {}
): ProcessedFile[] => {
  return files.filter((file) => {
    if (filter.fileAbsolutePath) {
      if (
        filter.fileAbsolutePath.ne &&
        file.fileAbsolutePath === filter.fileAbsolutePath.ne
      ) {
        return false;
      }
      if (filter.fileAbsolutePath.regex) {
        const regex = new RegExp(filter.fileAbsolutePath.regex);
        if (!regex.test(file.fileAbsolutePath)) {
          return false;
        }
      }
    }
    if (filter.fields) {
      for (const [fieldName, fieldFilter] of Object.entries(filter.fields)) {
        if (!file.fields[fieldName]) {
          if (fieldFilter.ne !== null) {
            return false;
          }
        } else if (
          fieldFilter.ne &&
          file.fields[fieldName] === fieldFilter.ne
        ) {
          return false;
        }
      }
    }
    if (filter.frontmatter) {
      for (const [fieldName, fieldFilter] of Object.entries(
        filter.frontmatter
      )) {
        if (!file.frontmatter[fieldName]) {
          // If field doesn't exist and ne is defined, we should include the file
          // (since ne means "not equal", and undefined is not equal to the ne value)
          return true;
        } else if (
          fieldFilter.ne &&
          file.frontmatter[fieldName] === fieldFilter.ne
        ) {
          return false;
        }
      }
    }
    return true;
  });
};

// Type definitions for different page data structures
export interface GuideData {
  guide: ProcessedFile;
  prev: { fields: { slug: string; guide_directory: string } } | null;
  next: { fields: { slug: string; guide_directory: string } } | null;
}

export interface DocData {
  doc: ProcessedFile;
}

export interface TerminusCommandData extends CommandType {
  slug: string;
}

export interface ReleaseNoteData {
  prev: { fields: { slug: string } } | null;
  node: ProcessedFile;
  next: { fields: { slug: string } } | null;
}

export interface ReleaseNoteListingData {
  pageNumber: number;
  releaseNotes: ReleaseNoteData[];
  categories: {
    node: {
      frontmatter: {
        categories: string[];
      };
    };
  }[];
  totalPages: number;
}

export interface IframeEmbedData {
  iframeEmbed: ProcessedFile;
}

export interface LandingData {
  landing: any; // Using any for now since the landing structure is complex and varies
}

// Base interface for common PageData properties without Component
export interface BasePageDataWithoutComponent {
  uri: string;
  title: string;
  relativeFilePath: string;
  description: string;
  rawFileData: string;
}

// Union type for PageData without Component
export type PageDataWithoutComponent =
  | (BasePageDataWithoutComponent & { type: "guide"; data: GuideData })
  | (BasePageDataWithoutComponent & { type: "doc"; data: DocData })
  | (BasePageDataWithoutComponent & {
      type: "terminus-command";
      data: TerminusCommandData;
    })
  | (BasePageDataWithoutComponent & {
      type: "release-note";
      data: ReleaseNoteData;
    })
  | (BasePageDataWithoutComponent & {
      type: "release-note-listing";
      data: ReleaseNoteListingData;
    })
  | (BasePageDataWithoutComponent & {
      type: "iframe-embed";
      data: IframeEmbedData;
    })
  | (BasePageDataWithoutComponent & { type: "landing"; data: LandingData });

// Legacy interface for backward compatibility (includes Component)
export interface BasePageData extends BasePageDataWithoutComponent {
  Component: React.ReactNode;
}

// Legacy union type for backward compatibility
export type PageData = PageDataWithoutComponent & {
  Component: React.ReactNode;
};

export const normalizeSlug = (slug: string): string => {
  let normalizedSlug = slug;
  if (normalizedSlug.startsWith("/")) {
    normalizedSlug = normalizedSlug.slice(1);
  }
  if (normalizedSlug.endsWith("/")) {
    normalizedSlug = normalizedSlug.slice(0, -1);
  }
  return normalizedSlug;
};

export const processDocPages = async (
  uri?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const allContentFiles = processDirectoryForMarkDown("source", {});
  const filteredDocs = filterMdxFiles(allContentFiles, {
    fileAbsolutePath: {
      regex:
        "/content(?!/(partials|changelog|guides|releasenotes|iframeembeds)/)/",
    },
    frontmatter: {
      draft: { ne: true },
    },
  });

  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  for (const doc of filteredDocs) {
    const slug = normalizeSlug(doc.fields.slug);

    // If looking for specific URI and this doesn't match, skip
    if (targetUri && slug !== targetUri) {
      continue;
    }

    pages.push({
      uri: slug,
      title: doc.frontmatter.subtitle ?? doc.frontmatter.title ?? "Doc",
      description: doc.frontmatter.description ?? "Doc",
      type: "doc",
      data: { doc },
      rawFileData: doc.internal.content,
      relativeFilePath: doc.relativePath,
    });

    // If looking for specific URI and found it, return early
    if (targetUri && slug === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const processGuidePages = async (
  uri?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const guides = processDirectoryForMarkDown("source/content/guides", {
    sortBy: "fileAbsolutePath",
    sortOrder: "asc",
  });

  const updatedGuides = guides.reduce(
    (acc, guide, index) => {
      return [
        ...acc,
        {
          prev:
            index > 0
              ? guides[index - 1].fields.guide_directory !==
                guide.fields.guide_directory
                ? null
                : {
                    fields: {
                      slug: guides[index - 1].fields.slug,
                      guide_directory: guides[index - 1].fields.guide_directory,
                    },
                  }
              : null,
          next:
            index < guides.length - 1
              ? guides[index + 1].fields.guide_directory !==
                guide.fields.guide_directory
                ? null
                : {
                    fields: {
                      slug: guides[index + 1].fields.slug,
                      guide_directory: guides[index + 1].fields.guide_directory,
                    },
                  }
              : null,
          guide,
        },
      ];
    },
    [] as {
      guide: ProcessedFile;
      prev: { fields: { slug: string; guide_directory: string } } | null;
      next: { fields: { slug: string; guide_directory: string } } | null;
    }[]
  );

  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  for (const guideContent of updatedGuides) {
    const slug = normalizeSlug(guideContent.guide.fields.slug);

    // If looking for specific URI and this doesn't match, skip
    if (targetUri && slug !== targetUri) {
      continue;
    }

    pages.push({
      uri: slug,
      title:
        guideContent.guide.frontmatter.subtitle ??
        guideContent.guide.frontmatter.title ??
        "Guide",
      description: guideContent.guide.frontmatter.description ?? "Guide",
      type: "guide",
      data: {
        guide: guideContent.guide,
        prev: guideContent.prev,
        next: guideContent.next,
      },
      rawFileData: guideContent.guide.internal.content,
      relativeFilePath: guideContent.guide.relativePath,
    });

    // If looking for specific URI and found it, return early
    if (targetUri && slug === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const processTerminusCommandPages = async (
  uri?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const terminusCommands = (
    await processDirectoryForJson("source/data", "commands.json")
  )?.[0]?.content as {
    commands: CommandType[];
  };

  const commands = terminusCommands.commands.map((command) => {
    const slugRegExp = /:/g;
    const slug = command.name.replace(slugRegExp, "-");
    return {
      ...command,
      slug: `terminus/commands/${slug}`,
    };
  });

  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  for (const terminusCommand of commands) {
    // If looking for specific URI and this doesn't match, skip
    if (targetUri && terminusCommand.slug !== targetUri) {
      continue;
    }

    pages.push({
      uri: terminusCommand.slug,
      title: `${terminusCommand.name}`,
      description: `${terminusCommand.description}`,
      type: "terminus-command",
      data: terminusCommand,
      rawFileData: JSON.stringify(terminusCommands),
      relativeFilePath: "src/source/data/commands.json",
    });

    // If looking for specific URI and found it, return early
    if (targetUri && terminusCommand.slug === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const getAllReleaseNotes = () => {
  const releaseNotes = processDirectoryForMarkDown("source/releasenotes", {
    sortBy: "fileAbsolutePath",
    sortOrder: "desc",
  });

  return releaseNotes;
};

export const processReleaseNotePages = async (
  uri?: string[],
  selectedCategories?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const releaseNotes = getAllReleaseNotes();

  const allReleaseNotes = releaseNotes.reduce(
    (acc, releaseNote) => {
      return [
        ...acc,
        {
          prev:
            acc.length > 0
              ? {
                  fields: {
                    slug: releaseNotes[acc.length - 1].fields.slug,
                  },
                }
              : null,
          node: releaseNote,
          next:
            acc.length < releaseNotes.length - 1
              ? {
                  fields: {
                    slug: releaseNotes[acc.length + 1].fields.slug,
                  },
                }
              : null,
        },
      ];
    },
    [] as {
      prev: { fields: { slug: string } } | null;
      node: ProcessedFile;
      next: { fields: { slug: string } } | null;
    }[]
  );

  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  // Filter the release notes
  const filteredReleaseNotes = allReleaseNotes.filter((releaseNote) => {
    if (!selectedCategories || selectedCategories.length === 0) {
      return true;
    }
    const noteCategories = releaseNote.node.frontmatter.categories || [];
    return noteCategories.some((cat: string) => selectedCategories.includes(cat));
  });

  // Add individual release note pages
  for (const releaseNote of filteredReleaseNotes) {
    if (targetUri && releaseNote.node.fields.slug !== targetUri) {
      continue;
    }

    pages.push({
      uri: releaseNote.node.fields.slug,
      title: releaseNote.node.frontmatter.title ?? "Release Note",
      description: releaseNote.node.frontmatter.description ?? "Release Note",
      type: "release-note",
      data: releaseNote,
      rawFileData: releaseNote.node.internal.content,
      relativeFilePath: releaseNote.node.relativePath,
    });

    // If looking for specific URI and found it, return early
    if (targetUri && releaseNote.node.fields.slug === targetUri) {
      return pages;
    }
  }

  // Add paginated release note pages
  const releaseNotesPostsPerPage = 8;
  const releaseNotesNumPages = Math.ceil(
    filteredReleaseNotes.length / releaseNotesPostsPerPage
  );

  for (let i = 0; i < releaseNotesNumPages; i++) {
    const path = `release-notes/${i + 1}`;

    // If looking for specific URI and this doesn't match, skip
    if (targetUri && path !== targetUri) {
      continue;
    }

    const releaseNotes = filteredReleaseNotes.slice(
      i * releaseNotesPostsPerPage,
      (i + 1) * releaseNotesPostsPerPage
    );

    const categories = filteredReleaseNotes.map((releaseNote) => {
      return {
        node: {
          frontmatter: {
            categories: releaseNote.node.frontmatter.categories ?? [],
          },
        },
      };
    });

    pages.push({
      uri: path,
      title: "Release Notes",
      description: "Release Notes",
      type: "release-note-listing",
      data: {
        releaseNotes,
        categories,
        totalPages: releaseNotesNumPages,
        pageNumber: i + 1,
      },
      rawFileData: JSON.stringify(releaseNotes),
      relativeFilePath: "src/source/releasenotes/index.md",
    });

    // If looking for specific URI and found it, return early
    if (targetUri && path === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const processIframeEmbedPages = async (
  uri?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const iframeEmbeds = processDirectoryForMarkDown(
    "source/content/iframeembeds"
  );
  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  for (const iframeEmbed of iframeEmbeds) {
    const iframeUri = `iframeembeds/${iframeEmbed.fields.slug}`;

    // If looking for specific URI and this doesn't match, skip
    if (targetUri && iframeUri !== targetUri) {
      continue;
    }

    iframeEmbed.fields.slug = iframeUri;

    pages.push({
      uri: iframeUri,
      title: iframeEmbed.frontmatter.title ?? "Iframe Embed",
      description: iframeEmbed.frontmatter.description ?? "Iframe Embed",
      type: "iframe-embed",
      data: { iframeEmbed },
      rawFileData: iframeEmbed.internal.content,
      relativeFilePath: iframeEmbed.relativePath,
    });

    // If looking for specific URI and found it, return early
    if (targetUri && iframeUri === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const processLandingPages = async (
  uri?: string[]
): Promise<PageDataWithoutComponent[]> => {
  const landings = processDirectoryForYaml("source/data", {
    filter: (filePath) => filePath.includes("source/data/landings.yaml"),
  })[0];

  const landingsContent = landings.content as any[];
  const pages: PageDataWithoutComponent[] = [];
  const targetUri = uri?.join("/");

  for (const landing of landingsContent) {
    // If looking for specific URI and this doesn't match, skip
    if (targetUri && landing.path !== targetUri) {
      continue;
    }

    pages.push({
      uri: landing.path,
      title: landing.title,
      description: landing.description,
      type: "landing",
      data: { landing },
      rawFileData: JSON.stringify(landing),
      relativeFilePath: "src/source/data/landings.yaml",
    });

    // If looking for specific URI and found it, return early
    if (targetUri && landing.path === targetUri) {
      return pages;
    }
  }

  return pages;
};

export const getReleaseNotesByCategories = async (
  uri?: string[],
  selectedCategories?: string[]
): Promise<PageDataWithoutComponent[]> => {
  // If URI is specified, run functions in sequence and return early when match is found
  if (uri) {

    const releaseNotePages = await processReleaseNotePages(uri);
    const filteredReleaseNotes = releaseNotePages.filter((page) => { return true});
    if (filteredReleaseNotes.length > 0) return filteredReleaseNotes;

  }
  return [];
}

export const getAllPages = async (
  uri?: string[],
  selectedCategories?: string[]
): Promise<PageDataWithoutComponent[]> => {
  // If URI is specified, run functions in sequence and return early when match is found
  if (uri) {
    // Try each content type in sequence
    const docPages = await processDocPages(uri);
    if (docPages.length > 0) return docPages;

    const guidePages = await processGuidePages(uri);
    if (guidePages.length > 0) return guidePages;

    const terminusCommandPages = await processTerminusCommandPages(uri);
    if (terminusCommandPages.length > 0) return terminusCommandPages;

    const releaseNotePages = await processReleaseNotePages(uri, selectedCategories);
    if (releaseNotePages.length > 0) return releaseNotePages;

    const iframeEmbedPages = await processIframeEmbedPages(uri);
    if (iframeEmbedPages.length > 0) return iframeEmbedPages;

    const landingPages = await processLandingPages(uri);
    if (landingPages.length > 0) return landingPages;

    // If no match found, return empty array
    return [];
  }

  // If no URI specified, return all pages (parallel processing for performance)
  const [
    docPages,
    guidePages,
    terminusCommandPages,
    releaseNotePages,
    iframeEmbedPages,
    landingPages,
  ] = await Promise.all([
    processDocPages(),
    processGuidePages(),
    processTerminusCommandPages(),
    processReleaseNotePages(),
    processIframeEmbedPages(),
    processLandingPages(),
  ]);

  return [
    ...docPages,
    ...guidePages,
    ...terminusCommandPages,
    ...releaseNotePages,
    ...iframeEmbedPages,
    ...landingPages,
  ];
};

export const fetchArticleById = async (id: string) => {
  const query = `
    query GetArticle($id: String, $contentType: ContentType, $publishingLevel: PublishingLevel) {
      article(id: $id, contentType: $contentType, publishingLevel: $publishingLevel) {
        id
        title
        content
        slug
        tags
        siteId
        metadata
        publishedDate
        publishingLevel
        contentType
        updatedAt
        previewActiveUntil
      }
    }
  `;

  const variables = {
    id: id,
    contentType: "TEXT_MARKDOWN",
    publishingLevel: "PRODUCTION",
  };

  try {
    const response = await fetch(
      `${process.env.PCC_HOST || "https://gql.prod.pcc.pantheon.io"}/sites/${process.env.PCC_SITE_ID}/query`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PCC-TOKEN": process.env.PCC_TOKEN || "",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP error! status: ${response.status} ${error} ${id}`);
    }

    const data = await response.json();
    return data.data.article;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Using fetch with the same GraphQL query
export const fetchArticleBySlug = async (
  slug: string,
  siteId: string = process.env.PCC_SITE_ID || "",
  token: string = process.env.PCC_TOKEN || "",
  options: { withContent: boolean; withMetadata: boolean } = {
    withContent: true,
    withMetadata: true,
  },
  tries: number = 2
) => {
  console.debug("fetching article by slug", slug);

  const query = `
    query GetArticle($slug: String, $contentType: ContentType, $publishingLevel: PublishingLevel) {
      article(slug: $slug, contentType: $contentType, publishingLevel: $publishingLevel) {
        id
        title
        ${options.withContent === true ? "content" : ""}
        slug
        tags
        siteId
        ${options.withMetadata === true ? "metadata" : ""}
        publishedDate
        publishingLevel
        contentType
        updatedAt
        previewActiveUntil
      }
    }
  `;

  const variables = {
    slug: slug,
    contentType: "TEXT_MARKDOWN",
    publishingLevel: "PRODUCTION",
  };

  while (tries > 0) {
    tries -= 1;
    try {
      const response = await fetch(
        `${process.env.PCC_HOST || "https://gql.prod.pcc.pantheon.io"}/sites/${siteId}/query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "PCC-TOKEN": token,
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }

        const error = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status} ${error} ${slug}`
        );
      }

      const data = await response.json();
      return data.data.article;
    } catch (error) {
      console.error("Fetch error:", error, { tries });
      if (tries === 0) {
        throw error;
      }
    }
  }
};

export const singleSlugForFetch = (slug: string) => {
  if (slug.startsWith("_")) {
    slug = slug.slice(1);
  }

  return slug
    .replaceAll("/", "-")
    .replaceAll("_", "-")
    .replaceAll(".", "-")
    .replaceAll(" ", "-")
    .replaceAll("-&-", "-")
    .replaceAll(",-", "-")
    .replaceAll("!", "")
    .replaceAll("(", "")
    .replaceAll(")", "")
    .toLowerCase();
};
