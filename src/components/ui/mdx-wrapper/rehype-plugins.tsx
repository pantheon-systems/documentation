import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";
import type { Plugin } from "unified";

import ReactMarkdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";

type PluggableList = Parameters<typeof ReactMarkdown>[0]["rehypePlugins"];

const rehypeNormalizeCodeClass: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "code") return;

      const classes = node.properties?.className as string[] | undefined;
      if (!Array.isArray(classes)) return;

      const updated: string[] = [];

      for (let cls of classes) {
        if (cls.includes("language-none")) {
          node.properties["data-skip-line-highlight"] = "true";
          cls = cls.replaceAll("language-none", "language-text");
        }

        if (cls.includes("{")) {
          const [lang, meta] = cls.split("{");
          if (lang) updated.push(`${lang}`);
          if (meta) {
            const item = meta.split("}")?.[0];

            if (item) {
              updated.push(`metadata-${item.split(":").join("=")}`);
            }
          }
          continue;
        }

        const [lang, meta] = cls.split(":");

        if (lang) updated.push(`${lang}`);
        if (meta) updated.push(`metadata-${meta}`); // e.g. title=imce.page.inc
      }

      node.properties.className = updated;

      // Mirror to <pre> if it's the parent
      if (parent?.type === "element" && parent.tagName === "pre") {
        parent.properties = parent.properties || {};
        parent.properties.className = updated;
      }
    });
  };
};

const removalFrom = [
  "partial",
  "download",
  "reviewdate",
  "accordion",
  "example",
  "youtube",
  "card",
  "cardgroup",
  "commands",
  "dnsproviderdocs",
  "accordion",
  "popover",
];

const rehypeRemovePWithPartialComponent: Plugin<[], Root> = () => {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "p") return;

      let isPopover = false;

      // Check if the p element has children
      if (!node.children || !Array.isArray(node.children)) return;

      // Recursively check for partial components
      const hasPartialComponent = (children: any[]): boolean => {
        return children.some((child) => {
          if (child.type !== "element") return false;

          // Check if this element is a partial component
          if (removalFrom.includes(child.tagName)) {
            if (child.tagName === "popover") {
              isPopover = true;
            }
            return true;
          }

          // Check if this element has the pds-partial-component class
          const classes = child.properties?.className as string[] | undefined;
          if (
            Array.isArray(classes) &&
            classes.includes("pds-partial-component")
          ) {
            return true;
          }

          if (
            Array.isArray(classes) &&
            classes.includes("pds-p-removal-component")
          ) {
            return true;
          }

          // Recursively check children
          if (child.children && Array.isArray(child.children)) {
            return hasPartialComponent(child.children);
          }

          return false;
        });
      };

      const hasPartialComponentSpan = hasPartialComponent(node.children);

      if (
        hasPartialComponentSpan &&
        parent &&
        Array.isArray(parent.children) &&
        typeof index === "number"
      ) {
        // if popover replace p with span
        if (isPopover) {
          parent.children.splice(index, 1, {
            type: "element",
            tagName: "span",
            children: node.children,
            properties: {},
          });
          return;
        }

        // Replace the p element with its children
        parent.children.splice(index, 1, ...node.children);
      }
    });
  };
};

export const rehypePlugins: NonNullable<PluggableList> = [
  rehypeRaw,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        className: ["docs-header-anchor"],
        ariaHidden: "true",
      },
      content: {
        type: "element",
        tagName: "svg",
        properties: {
          xmlns: "http://www.w3.org/2000/svg",
          height: "0.75em",
          viewBox: "0 0 576 512",
          style: "margin-left: 0.4em; vertical-align: middle; display: inline;",
        },
        children: [
          {
            type: "element",
            tagName: "path",
            properties: {
              d: "M0 256C0 167.6 71.6 96 160 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H160c-53 0-96 43-96 96s43 96 96 96h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H160C71.6 416 0 344.4 0 256zm576 0c0 88.4-71.6 160-160 160H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c53 0 96-43 96-96s-43-96-96-96H352c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c88.4 0 160 71.6 160 160zM192 224H384c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32s14.3-32 32-32z",
            },
            children: [],
          },
        ],
      },
    },
  ],
  rehypeNormalizeCodeClass,
  rehypeRemovePWithPartialComponent,
  [rehypePrism, { defaultLanguage: "text" }],
];
