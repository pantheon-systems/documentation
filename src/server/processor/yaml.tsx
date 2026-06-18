import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import _ from "lodash";
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

export type YamlFileContent = Record<string, any>;

export type Fields = BaseFields;

export type Internal = BaseInternal;

export type ProcessedYamlFile = BaseProcessedFile & {
  content: YamlFileContent;
};

export type FilterCriteria = BaseFilterCriteria;

export type GraphQLData = BaseGraphQLData<ProcessedYamlFile> & {
  allYaml: {
    edges: Array<{
      node: ProcessedYamlFile;
    }>;
  };
};

const convertKeysToSnakeCase = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(convertKeysToSnakeCase);
  }

  if (typeof obj === "object") {
    const converted: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (key.includes("-")) {
        const snakeKey = _.snakeCase(key);
        converted[snakeKey] = convertKeysToSnakeCase(value);
      } else {
        converted[key] = convertKeysToSnakeCase(value);
      }
    }
    return converted;
  }

  return obj;
};

export const processYamlFile = (filePath: string): ProcessedYamlFile => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { fileName, relativePath, absolutePath } = getFileInfo(filePath);
  const yamlContent = yaml.load(fileContent) as YamlFileContent;

  // recursively convert all keys to camelCase
  const convertedContent = convertKeysToSnakeCase(yamlContent);

  return {
    id: generateId(filePath),
    fileAbsolutePath: absolutePath,
    relativePath,
    fileName,
    content: convertedContent,
    fields: generateBaseFields(filePath, fileName, convertedContent),
    internal: {
      type: "Yaml",
      content: fileContent,
      contentDigest: generateContentDigest(fileContent),
    },
  };
};

export const processFile = (filePath: string): ProcessedYamlFile | null => {
  return safeProcessFile(
    filePath,
    processYamlFile,
    "Error processing YAML file"
  );
};

export const processDirectoryForYaml = (
  directoryPath: string,
  options: ProcessingOptions = {},
  baseDirectory = path.resolve(process.cwd(), "src")
): ProcessedYamlFile[] => {
  const {
    extensions = [".yaml", ".yml"],
    filter = () => true,
    sortBy = "fileAbsolutePath",
  } = options;

  const files = getFilesByExtension(
    path.join(baseDirectory, directoryPath),
    extensions
  );

  const processedFiles = files
    .filter(filter)
    .map(processFile)
    .filter((file): file is ProcessedYamlFile => file !== null);

  return sortProcessedFiles(processedFiles, sortBy);
};

export const filterFiles = (
  files: ProcessedYamlFile[],
  filter: FilterCriteria = {}
): ProcessedYamlFile[] => {
  return filterFilesByCriteria(files, filter);
};

export const exportGraphQLData = (files: ProcessedYamlFile[]): GraphQLData => {
  return exportBaseGraphQLData(files, "allYaml") as GraphQLData;
};
