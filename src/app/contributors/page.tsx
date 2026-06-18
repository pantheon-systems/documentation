import Layout from "@/components/layout";
import {
  AvatarTileList,
  AvatarTileListItem,
  Container,
} from "@/components/ui/pds-re-export";
import { processDirectoryForYaml } from "@/server/processor/yaml";
import { type ContributorType } from "./types";

export default async function Contributors() {
  const contributorsYaml = processDirectoryForYaml("source/data", {
    filter: (filePath) => filePath.includes("contributor.yaml"),
  })[0].content as ContributorType[];

  const contributorsList: AvatarTileListItem[] = [];

  contributorsYaml.map((contributor: ContributorType) => {
    contributorsList.push({
      image: contributor.avatar,
      alt: "",
      name: contributor.name,
      title: contributor.bio,
      linkContent: (
        <a
          href={`https:${contributor.github}`}
          title={contributor.id}
          target="_blank"
          rel="noreferrer noopener"
        ></a>
      ),
    });
  });

  return (
    <Layout>
      <Container width={"standard"}>
        <h1 className="title">Contributors</h1>
        <AvatarTileList listItems={contributorsList} />
      </Container>
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Contributors",
  };
}
