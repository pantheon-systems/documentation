"use server";
import Layout from "@/components/layout";
import { ProcessedFile } from "@/server/processor/mdx";
import { Container, Icon } from "@/components/ui/pds-re-export";
import Link from "next/link";
import ReleaseNoteCategories from "@/components/common/release-note-categories";
import PublishedDate from "@/components/common/published-date";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import {
  headline2,
  headline3,
  headline4,
} from "@/components/common/release-headlines";
import { processDirectoryForJson } from "@/server/processor/json";

export const ReleaseNoteTemplate = async ({
  releaseNote,
}: {
  releaseNote: {
    prev: { fields: { slug: string } } | null;
    node: ProcessedFile;
    next: { fields: { slug: string } } | null;
  };
}) => {
  const node = releaseNote.node;
  const excerptRaw = releaseNote.node.excerpt;
  const excerpt =
    excerptRaw.substring(0, 200).trim() ||
    "A summary of changes to the Pantheon Platform";

  const allCategoriesData = await processDirectoryForJson(
    "source/releasenotescategories",
    "releaseNoteCategories.json"
  );

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <main id="docs-main" tabIndex={-1}>
        <Container
          width={"standard"}
          className="pds-spacing-mar-block-start-3xl"
        >
          <div className="pds-overline-text pds-overline-text--lg pds-spacing-mar-block-end-xs">

            <Link href="/release-notes" className="pds-spacing-mar-block-end-m">
              Pantheon Release Notes
            </Link>
          </div>
          <h1 className="pds-spacing-mar-block-end-l">
            {node.frontmatter.title}
          </h1>

          <ReleaseNoteCategories
            categories={node.frontmatter.categories || []}
            displayType="page"
            className="pds-spacing-mar-block-end-xl"
            allCategoriesData={allCategoriesData}
          />

          <article className="pds-spacing-pad-block-end-xl">


            <div id="doc" className="doc changelog__content">
              <div className="pds-spacing-mar-block-start-s pds-spacing-mar-block-end-2xl">
                <PublishedDate
                  dateString={node.frontmatter.published_date}
                  className="pds-spacing-mar-block-end-m"
                />
                {/* <MdxWrapper
                  mdx={node.body}
                  customShortcodes={customShortcodes}
                /> */}

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

            <div className="pds-spacing-mar-block-4xl">
              <a
                href="/release-notes/rss.xml"
                target="_blank"
                className="rss-feed-link"
              >
                <Icon
                  className="rss-feed-link-icon"
                  iconName="rss"
                  iconSize="lg"
                />
                <span>Subscribe to RSS feed</span>
              </a>
            </div>
          </article>
        </Container>
      </main>
    </Layout>
  );
};
