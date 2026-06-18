import { processDirectoryForYaml } from "@/server/processor/yaml";
import { ContributorType } from "@/app/contributors/types";

const contributorsYaml = processDirectoryForYaml("source/data", {
  filter: (filePath) => filePath.includes("contributor.yaml"),
})[0].content as ContributorType[];

const contributorRedirectMap: Record<string, string> = Object.fromEntries(
  contributorsYaml.map((contributor) => [
    `${contributor.id}`,
    `https:${contributor.github}`,
  ])
);

import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  {
    params,
  }: {
    params: Promise<{
      contributorId: string;
    }>;
  }
) {
  const { contributorId } = await params;

  return NextResponse.redirect(contributorRedirectMap[contributorId], 302);
}
