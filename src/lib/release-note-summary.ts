import type { ProcessedFile } from "@/server/processor/mdx";
import { stripMarkdown } from "@/lib/strip-markdown";

const MAX_LENGTH = 260;

// A paragraph, not a heading, list, table, code fence or component tag.
const isParagraph = (block: string) =>
  !/^(#|<|[-*+] |\d+\. |\||```|>)/.test(block);

/**
 * The short summary shown under a release note's title in the list. Most notes
 * have no description, so fall back to the opening paragraph of the body, cut
 * at a word boundary.
 */
export const releaseNoteSummary = (node: ProcessedFile): string => {
  const description = node.frontmatter.description?.trim();
  if (description) return description;

  const blocks = (node.content ?? "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
  const first = blocks.find(isParagraph) ?? blocks[0] ?? "";
  const text = stripMarkdown(first);

  if (text.length <= MAX_LENGTH) return text;
  const cut = text.slice(0, MAX_LENGTH);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
};
