import { getFilesByExtension } from "@/server/processor/helper";
import {
  processDirectoryForMarkDown,
  ProcessedFile,
} from "@/server/processor/mdx";
import { readFileSync } from "fs";
import path from "path";

// Type definitions
interface DefinitionList {
  title: string;
  from: string;
  slug: string;
  definition: string;
  letter: string;
}

interface DefinitionElement extends DefinitionList {
  id: string;
}

export type AllDefs = (DefinitionList | DefinitionElement)[];

function sanitizeSlug(slug: string): string {
  if (slug.startsWith("/")) {
    slug = slug.slice(1);
  }
  if (slug.endsWith("/")) {
    slug = slug.slice(0, -1);
  }
  return slug;
}

/**
 * Enhanced version that also extracts frontmatter title if available
 * @param filePaths - Array of file paths to process
 * @returns Array of definition objects with proper source titles
 */
export function extractAllDefsWithFrontmatter(filePaths: string[]): AllDefs {
  const defLists: DefinitionList[] = [];
  const allDfns: DefinitionElement[] = [];

  const files = processDirectoryForMarkDown("source/", {
    filter: (filePath: string) => {
      return filePaths.includes(filePath);
    },
  }).reduce(
    (acc, file) => {
      acc[file.fileAbsolutePath] = file;
      return acc;
    },
    {} as Record<string, ProcessedFile>
  );

  filePaths.forEach((filePath: string) => {
    try {
      const fileContent: string = readFileSync(filePath, "utf8");

      // Extract frontmatter title if available
      const frontmatterMatch: RegExpMatchArray | null = fileContent.match(
        /^---\s*\n([\s\S]*?)\n---/
      );
      let sourceTitle: string = "";

      if (frontmatterMatch) {
        const titleMatch: RegExpMatchArray | null =
          frontmatterMatch[1].match(/title:\s*(.+)$/m);
        if (titleMatch) {
          sourceTitle = titleMatch[1].trim();
        }
      }

      // Extract definition lists (<dt> and <dd> pairs)
      const defListMatches: RegExpMatchArray | null = fileContent.match(
        /<dt>(.+?)<\/dt>\n\n\s*<dd>\n\n(.+?)\n\n\s*<\/dd>/gim
      );

      if (defListMatches && defListMatches.length) {
        defListMatches.forEach((term: string) => {
          const titleMatch: RegExpMatchArray | null =
            term.match(/<dt>(.*?)<\/dt>/);
          const definitionMatch: RegExpMatchArray | null = term.match(
            /<dd>\n\n\s*(.*?)\n\n\s*<\/dd>/
          );

          if (titleMatch && definitionMatch) {
            const title: string = titleMatch[1];
            const definition: string = definitionMatch[1];

            defLists.push({
              title,
              from: sourceTitle,
              slug: sanitizeSlug(files[filePath]?.fields?.slug),
              definition,
              letter: title[0].toUpperCase(),
            });
          }
        });
      }

      // Extract definition elements (<dfn> tags)
      const dfnMatches: RegExpMatchArray | null = fileContent.match(
        /\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/g
      );

      if (dfnMatches && dfnMatches.length) {
        dfnMatches.forEach((def: string) => {
          const dfnMatch: RegExpMatchArray | null = def.match(
            /\n.*?<dfn id="(.*?)">(.*?)<\/dfn>.*?\n/
          );

          if (dfnMatch) {
            const id: string = dfnMatch[1];
            const title: string = dfnMatch[2];

            allDfns.push({
              title,
              from: sourceTitle,
              slug: sanitizeSlug(files[filePath]?.fields?.slug),
              definition: def,
              letter: id[0].toUpperCase(),
              id,
            });
          }
        });
      }
    } catch (error) {
      console.error(
        `Error processing file ${filePath}:`,
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  });

  // Combine and sort all definitions
  const allDefs: AllDefs = [...allDfns, ...defLists];
  allDefs.sort(
    (
      a: DefinitionList | DefinitionElement,
      b: DefinitionList | DefinitionElement
    ) => (a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
  );

  return allDefs;
}

export const getGlossaryPageData = async () => {
  const files = getFilesByExtension(path.join(process.cwd(), "src/source/"), [
    ".md",
    ".mdx",
  ]);

  const allDefs = extractAllDefsWithFrontmatter(files);

  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return { allDefs, letters };
};
