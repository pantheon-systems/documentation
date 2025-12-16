"use server";

import { MarkdownAsync } from "react-markdown";
import { rehypePlugins } from "./rehype-plugins";
import {
  defaultComponentMap,
  MdxWrapperProps,
  normalizeAllCustomTags,
} from "./default-components";
import { Partial } from "@/components/common/partial-component";
import { remarkPlugins } from "./remark-plugins";
import {
  TYPE_TABLE,
  mdast2hastGridTablesHandler,
} from "@adobe/mdast-util-gridtables";

export const MdxWrapper = async (
  props: Omit<MdxWrapperProps, "article"> & {
    article: Partial<MdxWrapperProps["article"]>;
  }
) => {
  const updatedProps: typeof props = {
    ...props,
    componentMap: {
      ...defaultComponentMap,
      partial: Partial,
      ...props.componentMap,
    },
  };
  return (
    <MarkdownAsync
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins}
      components={
        {
          ...defaultComponentMap,
          ...updatedProps.componentMap,
        } as any
      }
      remarkRehypeOptions={{
        handlers: {
          [TYPE_TABLE]: mdast2hastGridTablesHandler(),
        },
      }}
    >
      {normalizeAllCustomTags(props.article?.content ?? "")}
    </MarkdownAsync>
  );
};
