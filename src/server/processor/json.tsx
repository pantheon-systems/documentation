import fs from "fs";
import path from "path";
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
