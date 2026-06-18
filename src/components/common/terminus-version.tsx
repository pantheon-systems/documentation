"use server";
import { processDirectoryForJson } from "@/server/processor/json";
import React from "react";

export const TerminusVersion = async ({ text }: { text: string }) => {
  // const { allTerminusReleasesJson } = useStaticQuery(graphql`
  //   query {
  //     allTerminusReleasesJson(sort: { fields: [published_at], order: DESC }) {
  //       edges {
  //         node {
  //           tag_name
  //         }
  //       }
  //     }
  //   }
  // `);

  const data = (
    await processDirectoryForJson("source/data", "terminusReleases.json")
  )[0].content as any[];

  const latestRelease = data[0].tag_name;

  return (
    <h2>
      {text} {latestRelease}
    </h2>
  );
};
