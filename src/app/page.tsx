import Layout from "@/components/layout";
import { processDirectoryForYaml } from "@/server/processor/yaml";
import { HeroCTA } from "@/components/hero-cta";
import { Container, TwoItemLayout } from "@/components/ui/pds-re-export";
import { TopicsGrid } from "@/components/pds-middleware/topic-grid";
import { LinksList } from "@/components/pds-middleware/links-list";
import ChangelogList from "@/components/pds-middleware/change-log-list";
import { processDirectoryForMarkDown } from "@/server/processor/mdx";
import { generateMetadataFromUri } from "@/lib/site-metadata";
const containerWidth = "standard";

export default async function Home() {
  // Fetch the articles and site in parallel
  // const [{ data: articles }, site] = await Promise.all([
  //   PCCConvenienceFunctions.getPaginatedArticles({
  //     pageSize: 3,
  //   }),
  //   PCCConvenienceFunctions.getSite(),
  // ]);

  const homeYaml = processDirectoryForYaml("source/data", {
    filter: (filePath) => filePath.includes("home.yaml"),
  })[0].content[0];

  const allReleaseNotesFiles = processDirectoryForMarkDown(
    "source/releasenotes"
  );

  const allReleaseNotes = allReleaseNotesFiles
    .slice(-4)
    .map((e) => ({
      title: e.frontmatter.title ?? "",
      slug: e.fields.slug ?? "",
      id: e.id,
    }))
    .reverse();

  return (
    <Layout containerWidth={containerWidth} hasCta={true}>
      <Container width={containerWidth}>
        <HeroCTA
          title={homeYaml?.title || ""}
          subTitle={homeYaml?.call_to_action?.subtitle || ""}
          url={homeYaml?.call_to_action?.url || ""}
          linkText={homeYaml?.call_to_action?.linkText || ""}
        />

        <h2 className="pds-spacing-mar-block-xl">{homeYaml.topics.title}</h2>
        <TopicsGrid topics={homeYaml.topics.tiles} />

        <TwoItemLayout
          layoutVariant="equal"
          className="pds-spacing-mar-block-start-6xl"
        >
          <div slot="first-item">
            <h2 className="pds-spacing-mar-block-end-2xl">
              {homeYaml.three_column_links.title}
            </h2>
            <LinksList title="" links={homeYaml.three_column_links.links} />
          </div>

          <div slot="second-item">
            <h2 className="pds-spacing-mar-block-end-2xl">
              {homeYaml.changelog_preview.title}
            </h2>
            <ChangelogList
              title={homeYaml.changelog_preview.title}
              url={homeYaml.changelog_preview.url}
              changelogs={allReleaseNotes}
            />
          </div>
        </TwoItemLayout>
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
