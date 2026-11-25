import Layout from "@/components/layout";
import { processDirectoryForYaml } from "@/server/processor/yaml";
import { HeroCTA } from "@/components/hero-cta";
import { Container } from "@/components/ui/pds-re-export";
import { TopicsGrid } from "@/components/pds-middleware/topic-grid";
import { LinksList } from "@/components/pds-middleware/links-list";
import {
  LatestReleaseNotes,
  type LatestReleaseNote,
} from "@/components/pds-middleware/latest-release-notes";
import { releaseNoteCategoryLoader } from "@/templates/release-note-listing/release-note-categories";
import { formatLongDate } from "@/lib/format-date";
import { sanitizeSlug } from "@/lib/utils";
import { processDirectoryForMarkDown } from "@/server/processor/mdx";
import { generateMetadataFromUri } from "@/lib/site-metadata";

export default async function Home() {
  const homeYaml = processDirectoryForYaml("source/data", {
    filter: (filePath) => filePath.includes("home.yaml"),
  })[0].content[0];

  // Newest first: the files are in date order, oldest first.
  const latestNotes: LatestReleaseNote[] = processDirectoryForMarkDown(
    "source/releasenotes",
  )
    .slice(-3)
    .reverse()
    .map((note) => ({
      id: note.id,
      href: `/${sanitizeSlug(note.fields.slug ?? "")}`,
      title: note.frontmatter.title ?? "",
      date: note.frontmatter.published_date
        ? formatLongDate(note.frontmatter.published_date)
        : "",
      categories: ((note.frontmatter.categories ?? []) as string[])
        .sort()
        .map((slug) => {
          const category = releaseNoteCategoryLoader(slug);
          return {
            label: category?.displayName ?? slug,
            color: category?.color,
          };
        }),
    }));

  return (
    <Layout activePage="/">
      <Container width="wide">
        <HeroCTA
          title={homeYaml?.title || ""}
          subTitle={homeYaml?.call_to_action?.subtitle || ""}
          url={homeYaml?.call_to_action?.url || ""}
          linkText={homeYaml?.call_to_action?.linkText || ""}
        />

        <div className="pan-docs-home__body">
          <section aria-labelledby="docs-topics-heading">
            <h2 className="pan-docs-section-title" id="docs-topics-heading">
              {homeYaml.topics.title}
            </h2>
            <TopicsGrid topics={homeYaml.topics.tiles} />
          </section>

          <section aria-labelledby="docs-popular-heading">
            <h2 className="pan-docs-section-title" id="docs-popular-heading">
              {homeYaml.three_column_links.title}
            </h2>
            <LinksList title="" links={homeYaml.three_column_links.links} />
          </section>

          <LatestReleaseNotes
            title="Latest release notes"
            allUrl={homeYaml.changelog_preview.url}
            notes={latestNotes}
          />
        </div>
      </Container>
    </Layout>
  );
}

export function generateMetadata() {
  const metadata = generateMetadataFromUri({
    title: "Pantheon Docs",
    description: "Homepage",
    image: "/images/default-thumb-doc.png",
  });
  return {
    ...metadata,
    authors: metadata.authors
      .map((author) => {
        if (typeof author === "string") {
          return { name: author };
        }
        return null;
      })
      .filter((e) => e !== null),
  };
}
