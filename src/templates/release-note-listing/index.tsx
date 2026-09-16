"use server";
import Layout from "@/components/layout";
import { Container, Icon } from "@/components/ui/pds-re-export";
import ReleaseNoteCategories from "@/components/common/release-note-categories";
import PublishedDate from "@/components/common/published-date";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import {
  headline2,
  headline3,
  headline4,
} from "@/components/common/release-headlines";
import { ProcessedFile } from "@/server/processor/mdx";
import { ReleaseNoteListingClientComponent } from "./client-component";
import ReleaseNotesPager from "./release-note-pager";
import { processDirectoryForJson } from "@/server/processor/json";
import Link from "next/link";

// Helper to sanitize slugs for internal navigation
function sanitizeSlug(slug: string): string {
  // Remove any leading slashes
  let sanitized = slug.replace(/^\/+/, "");
  // Disallow protocol-relative or absolute URLs
  if (/^(\w+:)?\/\//.test(sanitized)) {
    return "";
  }
  // Only allow alphanumerics, dashes, underscores, and slashes
  if (!/^[a-zA-Z0-9/_-]+$/.test(sanitized)) {
    return "";
  }
  return sanitized;
}

export const ReleaseNoteListingTemplate = async ({
  releaseNotes,
  landing,
  categories,
  totalPages,
  pageNumber,
  selectedCategories,
}: {
  pageNumber: number;
  selectedCategories?: string | string[];
  landing?: {
    introText: string;
  };
  categories: {
    node: {
      frontmatter: {
        categories: string[];
      };
    };
  }[];
  releaseNotes: {
    prev: {
      fields: {
        slug: string;
      };
    } | null;
    node: ProcessedFile;
    next: {
      fields: {
        slug: string;
      };
    } | null;
  }[];
  totalPages: number;
}) => {
  const allCategoriesData = await processDirectoryForJson(
    "source/releasenotescategories",
    "releaseNoteCategories.json"
  );

  // This handles cases where it's a single string, undefined, or already an array.
  const selectedCategoriesArray = Array.isArray(selectedCategories)
    ? selectedCategories
    : selectedCategories
      ? [selectedCategories] // Convert single string (e.g., "action-need") into an array
      : []; // Use an empty array if it's undefined/null


  // Join the parameters with an ampersand, but do not start the string with one.
  const queryStrings = selectedCategoriesArray && selectedCategoriesArray.length > 0 ? selectedCategoriesArray
        .map((category) => `category=${category}`)
        .join("&")
      : "";

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <main id="docs-main" tabIndex={-1}>
        <Container
          width={"standard"}
          className="pds-spacing-mar-block-start-3xl"
        >
          <h1>Pantheon release notes</h1>
          <div className="pds-lead-text pds-lead-text--sm">
            {landing?.introText ??
              "Your destination for staying informed about our latest innovations and product updates."}
          </div>
          <a
            href="/release-notes/rss.xml"
            target="_blank"
            className="rss-feed-link"
          >
            <Icon className="rss-feed-link-icon" iconName="rss" iconSize="lg" />
            <span>Subscribe to RSS feed</span>
          </a>

          <ReleaseNoteListingClientComponent
            allCategories={allCategoriesData[0].content.categories}
            categories={categories}
            pageNumber={pageNumber}
          />

          <div className="pds-spacing-mar-block-end-2xl pds-spacing-mar-block-start-2xl">
            {releaseNotes.map(({ node }, idx) => (
              <div key={`${node.id}-${idx}`}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={`/${sanitizeSlug(node.fields.slug)}`}
                    className="pds-spacing-mar-block-end-l individual-changelog-link"
                  >
                    <h2 className="pds-spacing-mar-block-end-l">
                      {node.frontmatter.title}
                    </h2>
                  </Link>

                  <ReleaseNoteCategories
                    categories={node.frontmatter.categories || []}
                    displayType="page"
                    className="pds-spacing-mar-block-end-xl"
                    allCategoriesData={allCategoriesData}
                  />
                </div>

                <article className="pds-spacing-pad-block-end-xl">
                  <div id="doc" className="doc changelog__content">
                    <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                      <PublishedDate
                        dateString={node.frontmatter.published_date}
                        className="pds-spacing-mar-block-end-m"
                      />

                      <MdxWrapper
                        article={{
                          content: node.content,
                          contentType: "TEXT_MARKDOWN",
                          id: node.id,
                          metadata: { ...(node.frontmatter ?? {}) },
                          publishedDate: node.frontmatter.published_date,
                          publishingLevel: "PRODUCTION",
                          tags: [],
                          title: node.frontmatter.title || "",
                          updatedAt: null,
                          previewActiveUntil: null,
                        }}
                        componentMap={{
                          h1: headline2,
                          h2: headline3,
                          h3: headline4,
                        }}
                      />
                    </div>
                  </div>
                </article>
              </div>
            ))}

            <ReleaseNotesPager
              currentPage={pageNumber}
              totalPages={totalPages}
              queryStrings={queryStrings}
            />
          </div>
        </Container>
      </main>
    </Layout>
  );
};
