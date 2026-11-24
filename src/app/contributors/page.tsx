import Layout from "@/components/layout";
import { Container } from "@/components/ui/pds-re-export";
import { processDirectoryForYaml } from "@/server/processor/yaml";
import { type ContributorType } from "./types";

// PDS V2 removed AvatarTileList, so this renders a plain list of contributors
// until a toolkit pattern exists.
export default async function Contributors() {
  const contributors = processDirectoryForYaml("source/data", {
    filter: (filePath) => filePath.includes("contributor.yaml"),
  })[0].content as ContributorType[];

  return (
    <Layout>
      <Container width={"standard"}>
        <h1 className="title">Contributors</h1>
        <ul className="contributors-list pds-grid">
          {contributors.map((contributor: ContributorType) => (
            <li
              key={contributor.id}
              className="pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-6 pds-grid-item--lg-4"
            >
              <a
                href={`https:${contributor.github}`}
                title={contributor.id}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={contributor.avatar}
                  alt=""
                  width={64}
                  height={64}
                  loading="lazy"
                />
                <strong>{contributor.name}</strong>
              </a>
              <p>{contributor.bio}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}

export async function generateMetadata() {
  return {
    title: "Contributors",
  };
}
