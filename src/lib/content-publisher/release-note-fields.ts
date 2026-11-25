import type { Article } from "@pantheon-systems/cpub-sdk-core";

type ArticleLike = Pick<Article, "id" | "slug" | "metadata" | "publishedDate">;

/**
 * The collection's custom "published_date" date field, as ms since epoch.
 * Content Publisher returns it as { msSinceEpoch } at UTC midnight.
 */
export function getReleaseDate(article: ArticleLike): number | null {
  const field = article.metadata?.published_date as
    | { msSinceEpoch?: number }
    | undefined;
  return typeof field?.msSinceEpoch === "number" ? field.msSinceEpoch : null;
}

/** "published_date" as YYYY-MM-DD (UTC, since the field is date-only). */
export function getReleaseDateString(article: ArticleLike): string | null {
  const ms = getReleaseDate(article);
  return ms == null ? null : new Date(ms).toISOString().slice(0, 10);
}

/** Newest "published_date" first; ties fall back to CPUB's publish time. */
export function compareReleaseNotes(a: ArticleLike, b: ArticleLike): number {
  return (
    (getReleaseDate(b) ?? 0) - (getReleaseDate(a) ?? 0) ||
    (b.publishedDate ?? 0) - (a.publishedDate ?? 0)
  );
}

/**
 * The article's slug. The list query does not return `slug`, but the
 * collection also stores it in metadata.
 */
export function getReleaseNoteSlug(article: ArticleLike): string {
  const metaSlug = article.metadata?.slug;
  return (
    article.slug ||
    (typeof metaSlug === "string" && metaSlug) ||
    article.id
  );
}
