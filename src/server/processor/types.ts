// Base types that are common across all processors
export type BaseFields = {
  slug: string;
  fileName: string;
  [key: string]: any;
};

export type BaseInternal = {
  type: string;
  content: string;
  contentDigest: string;
};

export type BaseProcessedFile = {
  id: string;
  fileAbsolutePath: string;
  relativePath: string;
  fileName: string;
  fields: BaseFields;
  internal: BaseInternal;
};

export type ProcessingOptions = {
  extensions?: string[];
  filter?: (filePath: string) => boolean;
  sortBy?: string;
  filterKey?: string;
};

export type BaseFilterCriteria = {
  fileAbsolutePath?: {
    ne?: string | null;
    regex?: string;
  };
  fields?: {
    [key: string]: {
      ne?: any;
    };
  };
};

export type BaseGraphQLData<T extends BaseProcessedFile> = {
  [key: string]: {
    edges: Array<{
      node: T;
    }>;
  };
};
