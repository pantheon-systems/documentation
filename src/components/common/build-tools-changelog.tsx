"use server";
import React from "react";
// import { StaticQuery, graphql } from "gatsby"
// import { MDXProvider } from "@mdx-js/react"
// import { MDXRenderer } from "gatsby-plugin-mdx"
import { MarkdownAsync } from "react-markdown";
import { rehypePlugins } from "../ui/mdx-wrapper/rehype-plugins";
import { processDirectoryForJson } from "@/server/processor/json";

export const BuildToolsChangelog = async () => {
  const data = (
    await processDirectoryForJson("source/data", "buildToolsReleases.json")
  )[0].content as any[];

  return (
    <>
      {data.map((buildtools, i) => {
        Object.keys(buildtools).forEach(
          (key) =>
            buildtools[key as keyof typeof buildtools] == null &&
            delete buildtools[key as keyof typeof buildtools]
        );
        return (
          <div key={i}>
            <h3 className="toc-ignore">
              {buildtools.name ? buildtools.name : buildtools.tag_name}
            </h3>
            <MarkdownAsync remarkPlugins={[]} rehypePlugins={rehypePlugins}>
              {buildtools.body.replace(/h1/g, "h4")}
            </MarkdownAsync>
            <hr />
          </div>
        );
      })}
    </>
  );
};
