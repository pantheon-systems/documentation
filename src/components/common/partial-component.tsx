"use server";
import { processDirectoryForMarkDown } from "@/server/processor/mdx";
import React from "react";
import { MarkdownAsync } from "react-markdown";
import {
  defaultComponentMap,
  normalizeAllCustomTags,
} from "../ui/mdx-wrapper/default-components";
import { rehypePlugins } from "../ui/mdx-wrapper/rehype-plugins";
import { remarkPlugins } from "../ui/mdx-wrapper/remark-plugins";

export const Partial = async (props: { file: string }) => {
  let mdx: string | undefined = processDirectoryForMarkDown(
    "source/content/partials",
    {
      filterKey: props.file,
      filter: (file) => {
        const relativePath = file.split("source/content/partials/")[1];
        return relativePath === props.file;
      },
    }
  )?.[0]?.content;

  if (!mdx) {
    // Return early if no content was found for this specific file
    return null;
  }

  mdx = normalizeAllCustomTags(mdx);

  return (
    <span className="pds-partial-component">
      <MarkdownAsync
        components={{
          ...defaultComponentMap,
          ...({ partial: Partial } as any),
        }}
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {mdx}
      </MarkdownAsync>
    </span>
  );
};
