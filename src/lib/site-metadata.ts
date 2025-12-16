export const siteMetadata = {
  title: "Pantheon Docs",
  description: "Homepage",
  siteUrl: "https://docs.pantheon.io",
  social: {
    twitter: "getpantheon",
  },
};

interface Author {
  name?: string;
  twitter?: string;
}

interface SiteConfig {
  title: string;
  description: string;
  siteUrl: string;
  social: {
    twitter: string;
  };
}

export interface GenerateMetadataParams {
  title?: string;
  description?: string;
  authors?: Set<Author | string> | (Author | string)[];
  image?: string;
  categories?: string[];
  tags?: string[];
  reviewed?: string;
  type?: string;
  keywords?: string[];
  siteConfig?: SiteConfig;
}

interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

interface OpenGraph {
  title?: string;
  description: string;
  type: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  section?: string;
  tags?: string;
  modifiedTime?: string;
}

interface Twitter {
  card: string;
  title?: string;
  description: string;
  images: string[];
  site: string;
  creators?: string[];
}

interface Other {
  "addsearch-custom-field": string;
  "addsearch-category": string;
  "itemprop-name": string;
  "itemprop-image": string;
  "itemprop-description": string;
  [key: string]: string;
}

interface Metadata {
  title: string;
  description: string;
  keywords: string[];
  authors: string[];
  openGraph: OpenGraph;
  twitter: Twitter;
  other: Other;
}

export function generateMetadataFromUri({
  title,
  description,
  authors,
  image,
  categories,
  tags,
  reviewed,
  type,
  keywords = [],
  siteConfig = siteMetadata,
}: GenerateMetadataParams): Metadata {
  const metaDescription = description || siteConfig.description;
  const metaImage = image || "/images/default-thumb-doc.png";
  const authorList = authors ? Array.from(authors) : [];
  const addSearchCategories = categories ? categories.join("/") : "other";
  const addSearchType = type ? `type=${type}` : "type=doc";

  const pageTitle = title ? `${title} | ${siteConfig.title}` : siteConfig.title;

  const tagValues = tags && tags.length ? `${tags}` : undefined;

  const twitterCreators = authorList
    .filter((author) => typeof author === "object" && author?.twitter)
    .map((author) => `@${(author as Author).twitter?.toLowerCase()}`);

  return {
    title: pageTitle,
    description: metaDescription,
    keywords: keywords.length > 0 ? keywords : ["documentation"],
    authors: authorList.map((author) =>
      typeof author === "string" ? author : author.name || ""
    ),
    openGraph: {
      title,
      description: metaDescription,
      type: "article",
      url: `${siteConfig.siteUrl}${
        typeof window !== "undefined" ? window.location.pathname : ""
      }`,
      siteName: siteConfig.title,
      images: [
        {
          url: `${siteConfig.siteUrl}${metaImage}`,
          width: 1200,
          height: 630,
          alt: title || "",
        },
      ],
      ...(categories && { section: categories.join(", ") }),
      ...(tagValues && { tags: tagValues }),
      ...(reviewed && { modifiedTime: reviewed }),
    },
    twitter: {
      card: "summary",
      title,
      description: metaDescription,
      images: [`${siteConfig.siteUrl}${metaImage}`],
      site: `@${siteConfig.social.twitter}`,
      ...(twitterCreators.length > 0 && { creators: twitterCreators }),
    },
    other: {
      "addsearch-custom-field": addSearchType,
      "addsearch-category": addSearchCategories,
      "itemprop-name": pageTitle,
      "itemprop-image": `${siteConfig.siteUrl}${metaImage}`,
      "itemprop-description": metaDescription,
    },
  };
}
