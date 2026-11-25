"use client";

import { Button, CheckboxGroup } from "@/components/ui/pds-re-export";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * The "Filter by category" sidebar: a checkbox per category and "Clear all".
 * The selection lives in the `category` URL param (repeated for several), so
 * the server renders the filtered list and the keyword search reads it too.
 * Changing it goes back to the first page.
 */
export const ReleaseNoteFilters = ({
  categories,
}: {
  categories: { slug: string; displayName: string }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams?.getAll("category") ?? [];

  const select = (slugs: string[]) => {
    const query = slugs
      .map((slug) => `category=${encodeURIComponent(slug)}`)
      .join("&");
    router.push(`/release-notes/1${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className="docs-note-filters">
      {/* Keyed on the selection so the checkboxes follow the URL, including
          after "Clear all" or the browser's back button. */}
      <CheckboxGroup
        key={selected.join("|")}
        id="release-note-categories"
        label="Filter by category"
        labelVariant="heading"
        options={categories.map((category) => ({
          id: `release-note-category-${category.slug}`,
          label: category.displayName,
          value: category.slug,
          checked: selected.includes(category.slug),
        }))}
        onValueChange={select}
      />
      <Button
        label="Clear all"
        variant="subtle"
        size="s"
        onClick={() => select([])}
        disabled={selected.length === 0}
      />
    </div>
  );
};
