import fs from "fs";
import path, { join } from "path";
import {
  BaseFields,
  BaseInternal,
  BaseProcessedFile,
  ProcessingOptions,
  BaseFilterCriteria,
  BaseGraphQLData,
} from "./types";
import {
  generateId,
  generateContentDigest,
  generateBaseFields,
  getFilesByExtension,
  filterFilesByCriteria,
  sortProcessedFiles,
  exportGraphQLData as exportBaseGraphQLData,
  safeProcessFile,
  getFileInfo,
} from "./helper";
import { serveLocal, serveLocalAsync } from "@/lib/resolve-component";
import { fetchArticleBySlug, singleSlugForFetch } from "@/lib/page-utils";

export type JsonFileContent = Record<string, any>;

export type Fields = BaseFields;

export type Internal = BaseInternal;

export type ProcessedJsonFile = BaseProcessedFile & {
  content: JsonFileContent;
};

export type FilterCriteria = BaseFilterCriteria;

export type GraphQLData = BaseGraphQLData<ProcessedJsonFile> & {
  allJson: {
    edges: Array<{
      node: ProcessedJsonFile;
    }>;
  };
};

const processJsonFile = (filePath: string): ProcessedJsonFile => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { fileName, relativePath, absolutePath } = getFileInfo(filePath);
  const jsonContent = JSON.parse(fileContent);

  return {
    id: generateId(filePath),
    fileAbsolutePath: absolutePath,
    relativePath,
    fileName,
    content: jsonContent,
    fields: generateBaseFields(filePath, fileName, jsonContent),
    internal: {
      type: "Json",
      content: fileContent,
      contentDigest: generateContentDigest(fileContent),
    },
  };
};

export const processFile = (filePath: string): ProcessedJsonFile | null => {
  return safeProcessFile(
    filePath,
    processJsonFile,
    "Error processing JSON file"
  );
};

export const processDirectoryForJson = async (
  directoryPath: string,
  fileName: string | null,
  baseDirectory = path.resolve(process.cwd(), "src")
): Promise<ProcessedJsonFile[]> => {
  const useLocal = serveLocal();

  if (useLocal === false && fileName) {
    fileName = fileName.split(".")[0];

    const article = await fetchArticleBySlug(
      singleSlugForFetch(`${fileName}-json-file`),
      undefined,
      undefined,
      undefined,
      1
    );

    if (article) {
      const content = JSON.parse(article.content);
      const parsedContent = JSON.parse(content.content).content;

      const relativePath = article.metadata.relativePath;

      return [
        {
          id: generateId(join(process.cwd(), relativePath)),
          fileAbsolutePath: join(process.cwd(), relativePath),
          relativePath: relativePath,
          fileName: article.fileName,
          content: parsedContent,
          fields: generateBaseFields(
            join(process.cwd(), relativePath),
            article.fileName,
            parsedContent
          ),
          internal: {
            type: "Json",
            content: parsedContent,
            contentDigest: generateContentDigest(content.content),
          },
        },
      ];
    }
  }

  const options = {
    extensions: [".json"],
    filter: (filePath: string) => {
      return fileName ? filePath.includes(fileName) : true;
    },
    sortBy: "fileAbsolutePath",
  };

  const files = getFilesByExtension(
    path.join(baseDirectory, directoryPath),
    options.extensions
  );

  const processedFiles = files
    .filter(options.filter)
    .map(processFile)
    .filter((file): file is ProcessedJsonFile => file !== null);

  return sortProcessedFiles(processedFiles, options.sortBy);
};

export const filterFiles = (
  files: ProcessedJsonFile[],
  filter: FilterCriteria = {}
): ProcessedJsonFile[] => {
  return filterFilesByCriteria(files, filter);
};

export const exportGraphQLData = (files: ProcessedJsonFile[]): GraphQLData => {
  return exportBaseGraphQLData(files, "allJson") as GraphQLData;
};
