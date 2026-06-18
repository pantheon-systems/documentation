"use server";
import { processDirectoryForJson } from "@/server/processor/json";
import React from "react";
import { MarkdownAsync } from "react-markdown";
import { rehypePlugins } from "../ui/mdx-wrapper/rehype-plugins";

export const DrushChangelog = async () => {
  const data = (
    await processDirectoryForJson("source/data", "drushReleases.json")
  )[0].content as {
    name: string;
    body: string;
  }[];

  return (
    <>
      {data.map((drush, i) => {
        Object.keys(drush).forEach(
          (key) =>
            drush[key as keyof typeof drush] == null &&
            delete drush[key as keyof typeof drush]
        );
        return (
          <div key={i}>
            <h3 className="toc-ignore">{drush.name}</h3>
            <MarkdownAsync remarkPlugins={[]} rehypePlugins={rehypePlugins}>
              {drush.body?.replace(/h1/g, "h4")}
            </MarkdownAsync>
            <hr />
          </div>
        );
      })}
    </>
  );
};
