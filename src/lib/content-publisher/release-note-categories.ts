import type { Article } from "@pantheon-systems/cpub-sdk-core";

export interface ReleaseNoteCategory {
  /** Value used in the Content Publisher "category" field and in URLs. */
  name: string;
  /** PDS tag color. */
  color: string;
}

/**
 * Known values of the collection's "category" field, with PDS tag colors.
 * Copied from the markdown release notes'
 * src/source/releasenotescategories/releaseNoteCategories.json so this code
 * does not depend on the markdown content that it is replacing.
 */
export const RELEASE_NOTE_CATEGORIES: ReleaseNoteCategory[] = [
  { name: "Account management", color: "color-3" },
  { name: "Action required", color: "color-2" },
  { name: "Billing & Finance", color: "color-5" },
  { name: "Deprecated", color: "color-6" },
  { name: "Pantheon Docs", color: "color-18" },
  { name: "Drupal", color: "color-7" },
  { name: "Next.js", color: "color-1" },
  { name: "Events", color: "color-4" },
  { name: "Front-End Sites", color: "color-12" },
  { name: "General", color: "color-6" },
  { name: "Infrastructure", color: "color-9" },
  { name: "Migration", color: "color-6" },
  { name: "New feature", color: "color-19" },
  { name: "Performance", color: "color-16" },
  { name: "Policy", color: "color-8" },
  { name: "Security", color: "color-15" },
  { name: "Tools & APIs", color: "color-1" },
  { name: "User interface", color: "color-11" },
  { name: "WordPress", color: "color-10" },
  { name: "Plugins", color: "color-10" },
  { name: "Modules", color: "color-7" },
  { name: "Content Publisher", color: "color-4" },
  { name: "P1", color: "color-18" },
];

const DEFAULT_COLOR = "blue";

const normalize = (category: string) => category.trim().toLowerCase();

const byName = new Map(
  RELEASE_NOTE_CATEGORIES.map((c) => [normalize(c.name), c])
);

export function getCategoryColor(category: string): string {
  return byName.get(normalize(category))?.color ?? DEFAULT_COLOR;
}

/** The known display name for a category, matched case-insensitively. */
export function getCategoryName(category: string): string {
  return byName.get(normalize(category))?.name ?? category;
}

/** The collection's "category" field: a list of display names. */
export function getCategories(article: Pick<Article, "metadata">): string[] {
  const value = article.metadata?.category;
  if (Array.isArray(value)) {
    return value.filter((v): v is string => typeof v === "string");
  }
  return typeof value === "string" ? [value] : [];
}

/** Listing URL filtered to the given categories (none = unfiltered). */
export function categoriesHref(categories: string[]): string {
  const query = categories
    .map((c) => `category=${encodeURIComponent(c)}`)
    .join("&");
  return query ? `/releasenotes?${query}` : "/releasenotes";
}

export function categoryHref(category: string): string {
  return categoriesHref([category]);
}

/** True if the article has any of the given categories (case-insensitive). */
export function hasAnyCategory(
  article: Pick<Article, "metadata">,
  categories: string[]
): boolean {
  const wanted = new Set(categories.map(normalize));
  return getCategories(article).some((c) => wanted.has(normalize(c)));
}

/**
 * Options for the category filter: every known category, plus any category
 * used by an article that is not in the known list, sorted by name.
 */
export function getCategoryOptions(
  articles: Pick<Article, "metadata">[]
): ReleaseNoteCategory[] {
  const options = new Map(byName);
  for (const article of articles) {
    for (const category of getCategories(article)) {
      if (!options.has(normalize(category))) {
        options.set(normalize(category), {
          name: category,
          color: DEFAULT_COLOR,
        });
      }
    }
  }
  return Array.from(options.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}
