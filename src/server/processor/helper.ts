import fs from "fs";
import path from "path";
import crypto from "crypto";
import type {
  BaseProcessedFile,
  BaseFilterCriteria,
  BaseGraphQLData,
} from "./types";

// Utility functions that are common across all processors
export const generateId = (filePath: string): string => {
  return Buffer.from(filePath).toString("base64");
};

export const generateContentDigest = (content: string): string => {
  return crypto.createHash("md5").update(content).digest("hex");
};

export const generateBaseFields = (
  filePath: string,
  fileName: string,
  content: Record<string, any>
) => {
  return {
    slug: fileName,
    fileName,
    ...content,
  };
};

// Generic file processing utilities
export const getFilesByExtension = (
  directoryPath: string,
  extensions: string[]
): string[] => {
  const files: string[] = [];

  const readDirectory = (dir: string): void => {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        readDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  };

  readDirectory(directoryPath);
  return files;
};

export const filterFilesByCriteria = <T extends BaseProcessedFile>(
  files: T[],
  filter: BaseFilterCriteria = {}
): T[] => {
  return files.filter((file) => {
    if (filter.fileAbsolutePath) {
      if (
        filter.fileAbsolutePath.ne &&
        file.fileAbsolutePath === filter.fileAbsolutePath.ne
      ) {
        return false;
      }
      if (filter.fileAbsolutePath.regex) {
        const regex = new RegExp(filter.fileAbsolutePath.regex);
        if (!regex.test(file.fileAbsolutePath)) {
          return false;
        }
      }
    }
    if (filter.fields) {
      for (const [fieldName, fieldFilter] of Object.entries(filter.fields)) {
        if (!file.fields[fieldName]) {
          if (fieldFilter.ne !== null) {
            return false;
          }
        } else if (
          fieldFilter.ne &&
          file.fields[fieldName] === fieldFilter.ne
        ) {
          return false;
        }
      }
    }
    return true;
  });
};

export const sortProcessedFiles = <T extends BaseProcessedFile>(
  files: T[],
  sortBy: string = "fileAbsolutePath",
  sortOrder: "asc" | "desc" = "asc"
): T[] => {
  if (sortBy) {
    files.sort((a, b) => {
      if (sortBy === "fileAbsolutePath") {
        return sortOrder === "asc"
          ? a.fileAbsolutePath.localeCompare(b.fileAbsolutePath)
          : b.fileAbsolutePath.localeCompare(a.fileAbsolutePath);
      }

      return 0;
    });
  }
  return files;
};

export const exportGraphQLData = <T extends BaseProcessedFile>(
  files: T[],
  collectionName: string
): BaseGraphQLData<T> => {
  return {
    [collectionName]: {
      edges: files.map((file) => ({
        node: file,
      })),
    },
  };
};

// Common file processing pipeline
export const processDirectoryWithOptions = <T extends BaseProcessedFile>(
  directoryPath: string,
  processFile: (filePath: string) => T | null,
  options: {
    extensions?: string[];
    filter?: (filePath: string) => boolean;
    sortBy?: string;
  } = {},
  baseDirectory = path.resolve(process.cwd())
): T[] => {
  const {
    extensions = [],
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
    .filter((file): file is T => file !== null);

  return sortProcessedFiles(processedFiles, sortBy);
};

// Common error handling
export const safeProcessFile = <T>(
  filePath: string,
  processor: (filePath: string) => T,
  errorMessage: string
): T | null => {
  try {
    return processor(filePath);
  } catch (error) {
    console.error(`${errorMessage} ${filePath}:`, error);
    return null;
  }
};

// Common path utilities
export const getFileInfo = (filePath: string) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const relativePath = path.relative(process.cwd(), filePath);
  const absolutePath = path.resolve(filePath);

  return {
    fileName,
    relativePath,
    absolutePath,
  };
};
