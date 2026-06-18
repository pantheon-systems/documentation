"use server";
import React from "react";
import { subYears, parseISO, isAfter } from "date-fns";
import { headline1, headline2, headline3 } from "./release-headlines";
import { processDirectoryForJson } from "@/server/processor/json";
import { MarkdownAsync } from "react-markdown";
import { rehypePlugins } from "../ui/mdx-wrapper/rehype-plugins";

const shortcodes = {
  h1: headline1,
  h2: headline2,
  h3: headline3,
};

export const Releases = async () => {
  const releases: any[] = (
    await processDirectoryForJson("source/data", "terminusReleases.json")
  )[0].content as any[];

  const oneYearAgo = subYears(new Date(), 1);

  // Safe Filtering: Ensure `published_at` exists before filtering
  const filteredReleases = releases.filter((release) => {
    const publishedDate = release.published_at;
    return publishedDate && isAfter(parseISO(publishedDate), oneYearAgo);
  });

  return (
    <>
      {filteredReleases.length > 0 ? (
        filteredReleases.map((release, i) => (
          <div key={i}>
            <h3 className="toc-ignore" id={release.tag_name}>
              {release.tag_name}
            </h3>
            <MarkdownAsync
              remarkPlugins={[]}
              rehypePlugins={rehypePlugins}
              components={shortcodes}
            >
              {release.body}
            </MarkdownAsync>
            <hr />
          </div>
        ))
      ) : (
        <p>No recent releases found.</p>
      )}
    </>
  );
};
