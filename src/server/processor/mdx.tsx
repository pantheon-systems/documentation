import fs from "fs";
import path from "path";
import matter from "gray-matter";
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
  getFilesByExtension,
  filterFilesByCriteria,
  sortProcessedFiles,
  exportGraphQLData as exportBaseGraphQLData,
  safeProcessFile,
  getFileInfo,
} from "./helper";

const isDevelopment = process.env.NODE_ENV === "development";

export type Frontmatter = {
  title?: string;
  subtitle?: string;
  audience?: string[];
  description?: string;
  categories?: string[];
  cms?: string[];
  product?: string[];
  integration?: string[];
  tags?: string[];
  contributors?: string[];
  showtoc?: boolean;
  permalink?: string;
  draft?: boolean;
  layout?: string;
  contenttype?: string[];
  innav?: boolean[];
  [key: string]: any; // Allow additional frontmatter fields
};

export type Fields = BaseFields & {
  guide_directory?: string;
  editPath?: string;
  excerpt?: string;
};

export type Internal = BaseInternal;

export type ProcessedFile = BaseProcessedFile & {
  frontmatter: Frontmatter;
  content: string;
  excerpt: string;
};

export type FilterCriteria = BaseFilterCriteria & {
  frontmatter?: {
    [key: string]: {
      ne?: any;
    };
  };
};

export type GraphQLData = BaseGraphQLData<ProcessedFile> & {
  allMdx: {
    edges: Array<{
      node: ProcessedFile;
    }>;
  };
};

// MDX-specific utility functions
const generateFields = (
  filePath: string,
  fileName: string,
  frontmatter: Frontmatter
): Fields => {
  const fields: Fields = {
    slug: "",
    fileName,
  };

  if (frontmatter.permalink) {
    fields.slug = frontmatter.permalink
      .replace(":basename", fileName)
      .replace("docs", "");
  } else {
    fields.slug = fileName;
  }

  if (filePath.includes("/guides/")) {
    // REVIEWME: Updated to add src/source/content to the path @aniketbiprojit
    const relativeDir = path.dirname(
      path.relative(
        path.join(process.cwd(), "src", "source", "content"),
        filePath
      )
    );
    if (relativeDir !== "guides") {
      fields.guide_directory = relativeDir;
    }
  }

  if (filePath.includes("/releasenotes/")) {
    // If the file is in the releasenotes directory...
    // split the file name where hyphenated.
    const split = fileName.split("-");
    // set a const to remaining slug based on the keys from split that are not the date.
    const remainingSlug = split.slice(3).join("-");
    fields.slug = `release-notes/${split[0]}/${split[1]}/${remainingSlug}`; // and return a slug of releasenotes/YYYY/MM/slug
  }

  if (filePath.includes("/iframeembeds/")) {
    fields.iframeembed = true;
    const relativeDir = path.dirname(
      path.relative(
        path.join(process.cwd(), "src", "source", "content", "iframeembeds"),
        filePath
      )
    );
    fields.slug = path.join(relativeDir, fileName);
  }

  if (filePath.includes("/source/content/")) {
    // REVIEWME: Updated to add src/ to the path @aniketbiprojit
    const editPath = `src/source/content/${path.relative(path.join(process.cwd(), "src/source/content"), filePath)}`;
    fields.editPath = editPath;
  }

  return fields;
};

// Main processing function
const processMdxFile = (filePath: string): ProcessedFile => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { fileName, relativePath, absolutePath } = getFileInfo(filePath);

  // Parse frontmatter using gray-matter (same as gatsby-plugin-mdx)
  return getMdxProcessed({
    fileContent,
    filePath,
    absolutePath,
    relativePath,
    fileName,
  });
};

const processFile = (filePath: string): ProcessedFile | null => {
  return safeProcessFile(filePath, processMdxFile, "Error processing file");
};

const cache = new Map<string, any>();

const fileCache = {
  get<T>(key: string): T | undefined {
    return cache.get(key);
  },
  set<T>(key: string, value: T): void {
    cache.set(key, value);
  },
  // In development, we might want to clear the cache to see changes without restarting the server.
  clear(): void {
    cache.clear();
  },
};

export const processDirectoryForMarkDown = (
  directoryPath: string,
  options: ProcessingOptions & { sortOrder?: "asc" | "desc" } = {},
  baseDirectory = path.resolve(process.cwd(), "src")
): ProcessedFile[] => {
  // Create a unique key for the cache based on the function's arguments.
  const cacheKey = `processed_dir_${directoryPath}_${JSON.stringify(options)}`;

  // 1. Check the cache first (ONLY in production)
  if (!isDevelopment) {
    const cachedFiles = fileCache.get<ProcessedFile[]>(cacheKey);
    if (cachedFiles) {
      // console.log(`[Cache HIT] for ${directoryPath}`);
      return cachedFiles;
    }
  }

  // console.log(`[Cache MISS] for ${directoryPath}`);

  // 2. If not in cache, do the expensive work

  const {
    extensions = [".md", ".mdx"],
    filter = () => true,
    sortBy = "fileAbsolutePath",
    sortOrder = "asc",
  } = options;

  const files = getFilesByExtension(
    path.join(baseDirectory, directoryPath),
    extensions
  );

  const processedFiles = files
    .filter(filter)
    .map(processFile)
    .filter((file): file is ProcessedFile => file !== null);

  const sortedFiles = sortProcessedFiles(processedFiles, sortBy, sortOrder);

  // 3. Store the result in the cache before returning
  if (!isDevelopment) {
    fileCache.set(cacheKey, processedFiles);
  }

  return sortedFiles;
};

export const filterFiles = (
  files: ProcessedFile[],
  filter: FilterCriteria = {}
): ProcessedFile[] => {
  return files.filter((file) => {
    // Use base filter criteria
    const baseFilter: BaseFilterCriteria = {
      fileAbsolutePath: filter.fileAbsolutePath,
      fields: filter.fields,
    };

    const baseFiltered = filterFilesByCriteria([file], baseFilter);
    if (baseFiltered.length === 0) {
      return false;
    }

    // Filter by frontmatter
    if (filter.frontmatter) {
      for (const [fieldName, fieldFilter] of Object.entries(
        filter.frontmatter
      )) {
        if (!file.frontmatter[fieldName]) {
          if (fieldFilter.ne !== undefined) {
            return false;
          }
        } else if (
          fieldFilter.ne &&
          file.frontmatter[fieldName] === fieldFilter.ne
        ) {
          return false;
        }
      }
    }

    return true;
  });
};

export function getMdxProcessed({
  fileContent,
  filePath,
  absolutePath,
  relativePath,
  fileName,
}: {
  fileContent: string;
  filePath: string;
  absolutePath: string;
  relativePath: string;
  fileName: string;
}) {
  const {
    data: frontmatter,
    content,
    excerpt,
  } = matter(fileContent, {
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
  });

  return {
    id: generateId(filePath),
    fileAbsolutePath: absolutePath,
    relativePath,
    fileName,
    frontmatter: frontmatter as Frontmatter,
    content,
    excerpt: excerpt || "",
    fields: generateFields(filePath, fileName, frontmatter as Frontmatter),
    internal: {
      type: "Mdx",
      content: fileContent,
      contentDigest: generateContentDigest(fileContent),
    },
  };
}
