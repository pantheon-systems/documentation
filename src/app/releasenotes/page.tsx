import { Metadata } from "next";
import Link from "next/link";
import Layout from "@/components/layout";
import { Container } from "@/components/ui/pds-re-export";
import PublishedDate from "@/components/common/published-date";
import ReleaseNoteBody from "@/components/content-publisher/release-note-body";
import { getAllArticles } from "@/lib/content-publisher/Articles";
import Logger from "@/lib/content-publisher/Logger";
import { getSiteId } from "@/lib/content-publisher/PantheonClient";
import ReleaseNoteCategories from "@/components/content-publisher/release-note-categories";
import ReleaseNoteCategoryFilter from "@/components/content-publisher/release-note-category-filter";
import {
  getCategories,
  getCategoryColor,
  getCategoryName,
  getCategoryOptions,
  hasAnyCategory,
  type ReleaseNoteCategory,
} from "@/lib/content-publisher/release-note-categories";
import {
  compareReleaseNotes,
  getReleaseDateString,
  getReleaseNoteSlug,
} from "@/lib/content-publisher/release-note-fields";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pantheon Release Notes",
  description: "Pantheon Release Notes",
};

// Mirrors the markdown listing at /release-notes/[page]
// (src/templates/release-note-listing), minus RSS, search and pagination.
// Category tags and the category filter use ?category=<name>.
interface Props {
  searchParams: Promise<{ category?: string | string[] }>;
}

export default async function ReleaseNotesListingPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const selectedCategories = (
    Array.isArray(category) ? category : category ? [category] : []
  ).filter(Boolean);

  let articles: Awaited<ReturnType<typeof getAllArticles>> = [];
  let categoryOptions: ReleaseNoteCategory[] = getCategoryOptions([]);
  try {
    // The SDK returns a frozen array, so sort a copy.
    articles = [...(await getAllArticles({ withContent: true }))].sort(
      compareReleaseNotes,
    );
    categoryOptions = getCategoryOptions(articles);
    if (selectedCategories.length > 0) {
      articles = articles.filter((article) =>
        hasAnyCategory(article, selectedCategories),
      );
    }
  } catch (e) {
    Logger.error(e);
  }

  const siteId = getSiteId();

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <Container width="standard" className="pds-spacing-mar-block-start-3xl">
        <h1>Pantheon release notes</h1>
        <div className="pds-lead-text pds-lead-text--sm">
          Your destination for staying informed about our latest innovations and
          product updates.
        </div>

        <ReleaseNoteCategoryFilter
          options={categoryOptions}
          selected={selectedCategories.map((name) => ({
            name: getCategoryName(name),
            color: getCategoryColor(name),
          }))}
        />

        <div className="pds-spacing-mar-block-end-2xl pds-spacing-mar-block-start-2xl">
          {articles.length === 0 ? (
            <p>No release notes found.</p>
          ) : (
            articles.map((article) => {
              const releaseDate = getReleaseDateString(article);
              return (
                <div key={article.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      href={`/releasenotes/${getReleaseNoteSlug(article)}`}
                      className="pds-spacing-mar-block-end-l individual-changelog-link"
                    >
                      <h2 className="pds-spacing-mar-block-end-l">
                        {article.title}
                      </h2>
                    </Link>

                    <ReleaseNoteCategories
                      categories={getCategories(article)}
                      className="pds-spacing-mar-block-end-xl"
                    />
                  </div>

                  <article className="pds-spacing-pad-block-end-xl">
                    <div className="doc changelog__content">
                      <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                        {releaseDate ? (
                          <PublishedDate
                            dateString={releaseDate}
                            className="pds-spacing-mar-block-end-m"
                          />
                        ) : null}
                        {article.resolvedContent ? (
                          <ReleaseNoteBody
                            article={article}
                            siteId={siteId}
                            publishingLevel="PRODUCTION"
                          />
                        ) : null}
                      </div>
                    </div>
                  </article>
                </div>
              );
            })
          )}
        </div>
      </Container>
    </Layout>
  );
}
