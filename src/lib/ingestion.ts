// Types for article creation
export type CreateArticleRequest = {
  title: string;
  siteId: string;
  metadataFields: {
    slug: string;
    [key: string]: any;
  };
  tags: string[];
  contentType: string;
};

export type CreateArticleResponse = {
  id: string;
};

// Types for markdown ingestion
export type IngestMarkdownRequest = {
  content: string;
  publishLevel: "prod" | "realtime";
  contentType: "html" | "markdown";
  docName: string;
  docRevisionDate: number;
};

export type IngestMarkdownResponse = {
  success: boolean;
  message?: string;
};

/**
 * Creates an article using the Pantheon Content Cloud API
 * @param articleData - The article data to create
 * @returns Promise<CreateArticleResponse> - The response containing the created article ID
 */
export const createArticle = async (
  articleData: CreateArticleRequest,
  bearerToken: string = process.env.PCC_MANAGEMENT_TOKEN || ""
): Promise<CreateArticleResponse> => {
  const url = "https://addonapi-gfttxsojwq-uc.a.run.app/articles/create";

  console.log(
    "Creating article",
    articleData.title,
    articleData.metadataFields?.slug,
    articleData.metadataFields?.uri
  );
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      console.error(await response.text());

      throw new Error(
        `HTTP error! status: ${response.status} ${JSON.stringify(
          articleData.metadataFields
        )}`
      );
    }

    const data: CreateArticleResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error;
  }
};

/**
 * Ingests markdown content using the Pantheon Content Cloud API
 * @param articleId - The ID of the article to ingest content into
 * @param ingestData - The markdown content and metadata to ingest
 * @returns Promise<IngestMarkdownResponse> - The response from the ingestion API
 */
export const ingestMarkdown = async (
  articleId: string,
  ingestData: IngestMarkdownRequest,
  token: string = process.env.PCC_MANAGEMENT_TOKEN || ""
): Promise<IngestMarkdownResponse> => {
  const url = `https://addonapi-gfttxsojwq-uc.a.run.app/articles/${articleId}/ingest`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ingestData),
    });

    if (!response.ok) {
      console.error("Error ingesting markdown:", await response.text());
      throw new Error(
        `HTTP failed to ingest markdown: ${response.status} ${response.statusText}`
      );
    }

    const data: IngestMarkdownResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error ingesting markdown:", error);
    throw error;
  }
};

/**
 * Disconnects an article from the content structure
 * @param articleId - The ID of the article to disconnect
 * @param bearerToken - The bearer token for the API
 * @returns Promise<void> - The response from the disconnect API
 */
export async function disconnectArticle(
  articleId: string,
  bearerToken: string = process.env.PCC_MANAGEMENT_TOKEN || ""
): Promise<void> {
  const baseUrl = "https://addonapi-gfttxsojwq-uc.a.run.app";

  try {
    const response = await fetch(
      `${baseUrl}/articles/${articleId}/disconnect`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Successfully disconnected article: ${articleId}`);
  } catch (error) {
    console.error(`Error disconnecting article ${articleId}:`, error);
    throw error;
  }
}

export type ContentStructureItem = {
  id: string;
  hidden?: boolean;
  isHidden?: boolean;
  children: ContentStructureItem[];
} & (
  | {
      type: "article";
      name: string;
      published: boolean;
      slug: string;
    }
  | {
      type: "category";
      name: string;
    }
);

export interface PantheonSite {
  contentStructure: {
    active: ContentStructureItem[];
    uncategorized: ContentStructureItem[];
  };
}

/**
 * Updates the content structure for a site
 * @param siteId - The ID of the site to update
 * @param contentStructure - The content structure to update
 * @param bearerToken - The bearer token for the API
 * @returns Promise<ContentStructure> - The response from the update API
 */
export async function updateContentStructure(
  siteId: string,
  contentStructure: PantheonSite,
  bearerToken: string = process.env.PCC_MANAGEMENT_TOKEN || ""
) {
  const url = `https://addonapi-gfttxsojwq-uc.a.run.app/sites/${siteId}/contentStructure`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contentStructure),
    });

    if (!response.ok) {
      console.error("Error updating content structure:", await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Successfully updated content structure for site: ${siteId}`);

    return response.text();
  } catch (error) {
    console.error("Error updating content structure:", error);
    throw error;
  }
}

export async function updateMetadata(
  articleId: string,
  metadata: any,
  bearerToken: string = process.env.PCC_MANAGEMENT_TOKEN || ""
) {
  const url = `https://addonapi-gfttxsojwq-uc.a.run.app/articles/${articleId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      console.error("Error updating metadata:", await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Successfully updated metadata for article: ${articleId}`);

    return response.text();
  } catch (error) {
    console.error("Error updating metadata:", error);
    throw error;
  }
}
