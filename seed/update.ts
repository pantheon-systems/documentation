import { getAllPages } from "@/lib/page-utils";
import { readFileSync } from "node:fs";
import {
  processPage,
  updateGlossary,
  updateJSONFiles,
  updatePartials,
  updateReleaseNotesListing,
  updateYamlFiles,
} from "./helper";

process.env.SERVE_LOCAL = "true";

if (!process.env.PCC_SITE_ID) {
  throw new Error("PCC_SITE_ID is not set");
}

if (!process.env.PCC_TOKEN) {
  throw new Error("PCC_TOKEN is not set");
}

if (!process.env.PCC_MANAGEMENT_TOKEN) {
  throw new Error("PCC_MANAGEMENT_TOKEN is not set");
}

const files = readFileSync("/tmp/changed_files.txt", "utf-8")
  .toString()
  .split("\n");

const filteredFiles = files.filter((e) => e.startsWith("src/source"));

const main = async () => {
  const mdxFiles = filteredFiles.filter(
    (e) => e.endsWith(".md") || e.endsWith(".mdx")
  );

  console.log({ mdxFiles });
  // if mdx, then we need to update the page
  const pages = await getAllPages();
  const pagesToUpdate = pages.filter((page) =>
    mdxFiles.includes(page.relativeFilePath)
  );

  console.log({ pagesToUpdate: pagesToUpdate.map((e) => e.relativeFilePath) });

  const batchSize = 8;

  for (let i = 0; i < pagesToUpdate.length / batchSize; i++) {
    const batch = pagesToUpdate.slice(i * batchSize, (i + 1) * batchSize);
    await Promise.all(batch.map((page) => processPage(page)));
    console.log(
      `Processed batch ${i + 1} of ${pagesToUpdate.length / batchSize}`
    );
  }

  // if partials encountered, then we need to update the partials
  await updatePartials(true, (page) => {
    const splitPage = page.split("/src/source/");
    return mdxFiles.includes(`src/source/${splitPage[1]}`);
  });

  // if glossary encountered, then we need to update the glossary
  // always update glossary
  await updateGlossary(true);

  // if .json encountered, then we need to update the .json
  const jsonFiles = filteredFiles.filter((e) => e.endsWith(".json"));
  await updateJSONFiles(true, (page) => {
    const splitPage = page.split("/src/source");

    return jsonFiles.includes(`src/source${splitPage[1]}`);
  });

  // if .yaml encountered, then we need to update the .yaml
  const yamlFiles = filteredFiles.filter(
    (e) => e.endsWith(".yaml") || e.endsWith(".yml")
  );

  await updateYamlFiles(true, (page) => {
    const splitPage = page.split("/src/source");
    const result = yamlFiles.includes(`src/source${splitPage[1]}`);
    return result;
  });

  // if release-notes/ updated, then we need to update release-notes listing
  if (mdxFiles.some((e) => e.includes("src/source/releasenotes/"))) {
    await updateReleaseNotesListing(true);
  }
};

main().catch(console.error);
