"use client";

import type {
  ArticleWithoutContent,
  Site,
} from "@pantheon-systems/pcc-react-sdk";
import { getArticleURLFromSite } from "@pantheon-systems/pcc-react-sdk/server";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function HomepageArticleGrid({
  articles,
  site,
}: {
  articles: ArticleWithoutContent[];
  site: Site;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:w-2/3 2xl:w-full 2xl:grid-cols-[repeat(auto-fit,minmax(300px,438px))] 2xl:justify-center",
      )}
    >
      {articles.map((article, index) => (
        <ArticleGridCard
          key={article.id}
          article={article}
          isWide={articles.length === 1 || (articles.length > 2 && index === 2)}
          site={site}
        />
      ))}
    </div>
  );
}

export function ArticleGrid({
  articles,
  basePath = "/articles",
  site,
}: {
  articles: ArticleWithoutContent[];
  basePath?: string;
  site: Site;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3")}>
      {articles.map((article) => (
        <ArticleGridCard
          key={article.id}
          article={article}
          basePath={basePath}
          site={site}
        />
      ))}
    </div>
  );
}

interface ArticleGridCardProps {
  article: ArticleWithoutContent;
  basePath?: string;
  imageAltText?: string;
  isWide?: boolean;
  site: Site;
}

export function ArticleGridCard({
  article,
  basePath = "/articles",
  imageAltText,
  isWide = false,
  site,
}: ArticleGridCardProps) {
  const targetHref = getArticleURLFromSite(article, site, basePath);
  const imageSrc = (article.metadata?.["image"] as string) || null;

  return (
    <div
      className={cn(
        "group flex h-full flex-col overflow-clip rounded-xl shadow-lg ring-1 ring-gray-300/50",
        isWide
          ? "sm:col-span-2 sm:flex-row 2xl:col-span-1 2xl:flex-col 2xl:only:col-span-2 2xl:only:flex-row"
          : "",
      )}
    >
      <div
        className={cn(
          "aspect-video w-full flex-shrink-0 overflow-hidden sm:h-[196px]",
          isWide
            ? "sm:h-full sm:max-w-[49%] 2xl:h-[196px] 2xl:max-w-[100%] 2xl:group-only:h-full 2xl:group-only:max-w-[49%]"
            : "max-w-[100%]",
        )}
      >
        <GridItemCoverImage
          imageSrc={imageSrc}
          imageAltText={imageAltText || `Cover image for ${article.title}`}
        />
      </div>
      <div
        className={cn(
          "flex flex-grow flex-col justify-between p-8",
          isWide && "sm:py-24 2xl:py-8 2xl:group-only:py-24",
        )}
      >
        <div>
          <h1 className="mb-3 text-xl font-semibold leading-7">
            {article.title}
          </h1>
          {article.metadata?.["Description"] ? (
            <p className="line-clamp-3 min-h-[4.5rem] text-gray-600">
              {article.metadata?.["Description"]?.toString() || ""}
            </p>
          ) : null}
        </div>
        <Link href={targetHref} className="mt-8">
          <Button size="large">View</Button>
        </Link>
      </div>
    </div>
  );
}

function GridItemCoverImage({
  imageSrc,
  imageAltText,
}: {
  imageSrc: string | null;
  imageAltText?: string | null | undefined;
}) {
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <>
      {imageSrc != null ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageSrc}
          alt={imageAltText || undefined}
          onLoad={() => setHasLoaded(true)}
          className={cn("h-full w-full object-cover", {
            block: hasLoaded,
            hidden: !hasLoaded,
          })}
        />
      ) : null}

      {imageSrc == null || !hasLoaded ? (
        <div className="h-full w-full bg-gradient-to-t from-neutral-800 to-neutral-100" />
      ) : null}
    </>
  );
}
