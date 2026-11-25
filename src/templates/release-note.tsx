"use server";
import Layout from "@/components/layout";
import { ProcessedFile } from "@/server/processor/mdx";
import { Container, Icon, Panel } from "@/components/ui/pds-re-export";
import PublishedDate from "@/components/common/published-date";
import { PageBreadcrumbs } from "@/components/common/page-breadcrumbs";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import {
  headline2,
  headline3,
  headline4,
} from "@/components/common/release-headlines";
import { ReleaseNoteTags } from "@/templates/release-note-listing/release-note-tags";

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
  const categories: string[] = node.frontmatter.categories ?? [];

  return (
    <Layout containerWidth="standard" excludeSearch={true}>
      <div>
        <Container width="wide" className="pds-mar-block-start-xl">
          <PageBreadcrumbs
            crumbs={[
              { label: "Pantheon release notes", href: "/release-notes" },
            ]}
          />
          <h1 className="pds-heading-4xl pds-mar-block-end-xl">
            {node.frontmatter.title}
          </h1>

          <div className="docs-note-layout pds-pad-block-end-4xl">
            <article id="doc" className="pds-prose docs-note-body">
              <MdxWrapper
                article={{ content: node.content }}
                componentMap={{
                  h1: headline2,
                  h2: headline3,
                  h3: headline4,
                }}
              />
            </article>

            <aside
              className="docs-note-meta"
              aria-label="About this release note"
            >
              <Panel>
                <h2 className="docs-note-meta__label">Published</h2>
                <PublishedDate
                  dateString={node.frontmatter.published_date}
                  className="docs-note-meta__value"
                />
                {categories.length > 0 && (
                  <>
                    <h2 className="docs-note-meta__label">Categories</h2>
                    <ReleaseNoteTags categories={categories} />
                  </>
                )}
                <hr className="docs-note-meta__rule" />
                <a
                  href="/release-notes/rss.xml"
                  target="_blank"
                  className="rss-feed-link"
                >
                  <Icon
                    className="rss-feed-link-icon"
                    iconName="rss"
                    size="m"
                  />
                  <span>Subscribe to RSS feed</span>
                </a>
              </Panel>
            </aside>
          </div>
        </Container>
      </div>
    </Layout>
  );
};
