import { Article } from "@pantheon-systems/cpub-sdk-core";
import { Metadata } from "next";
import { isDateObject } from "./assertions";

export interface SeoMetadataOptions {
  defaultDescription?: string;
  defaultTitle?: string;
  openGraphType?: "article" | "website";
}

const defaultOptions: SeoMetadataOptions = {
  defaultDescription: "Article hosted on Pantheon Content Cloud Playground",
  defaultTitle: "Untitled Article",
  openGraphType: "article",
};

export function getSeoMetadata(
  article: Article,
  options?: SeoMetadataOptions
): Metadata {
  const opts = { ...defaultOptions, ...options };

  const tags: string[] =
    article.tags && article.tags.length > 0 ? article.tags : [];
  const imageProperties = [article.metadata?.image]
    .filter((url): url is string => typeof url === "string")
    .map((url) => ({ url }));
  const description =
    article.metadata?.description?.toString() || opts.defaultDescription!;

  let authors: string[] = [];
  let publishedTime: number | null = article.publishedDate;
  let title: string | null = article.title || opts.defaultTitle!;

  Object.entries(article.metadata || {}).forEach(([k, v]) => {
    const key = k.toLowerCase().trim();

    switch (key) {
      case "author": {
        if (typeof v === "string") {
          authors = v.split(",").map((a) => a.trim());
        }
        break;
      }
      case "date": {
        if (isDateObject(v)) {
          publishedTime = v.msSinceEpoch;
        }
        break;
      }
      case "title": {
        if (typeof v === "string") {
          title = v;
        }
        break;
      }
    }
  });

  return {
    title: title || opts.defaultTitle!,
    description,
    openGraph: {
      title: title || opts.defaultTitle!,
      type: opts.openGraphType!,
      images: imageProperties,
      description,
      ...(publishedTime && {
        publishedTime: new Date(publishedTime).toISOString(),
      }),
      ...(authors.length > 0 && { authors }),
      ...(tags.length > 0 && { tags }),
    },
  };
}
