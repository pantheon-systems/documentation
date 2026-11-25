import Link from "next/link";
import { ReactNode } from "react";
import PublishedDate from "@/components/common/published-date";
import { sanitizeSlug } from "@/lib/utils";
import { ReleaseNoteTags } from "./release-note-tags";

export type ReleaseNoteEntryData = {
  slug: string;
  title: ReactNode;
  publishedDate: string | null;
  summary: ReactNode;
  categories: string[];
};

/**
 * The release notes list: the date, a linked title, a short summary and the
 * categories. The browsing list and the keyword search results both render
 * through this, so a search narrows the same list instead of changing format.
 */
export const ReleaseNoteList = ({
  entries,
}: {
  entries: ReleaseNoteEntryData[];
}) => (
  <ul className="docs-note-list">
    {entries.map((entry) => (
      <li key={entry.slug} className="docs-note">
        {entry.publishedDate && (
          <PublishedDate
            dateString={entry.publishedDate}
            className="docs-note__date"
          />
        )}
        <h2 className="docs-note__title">
          <Link href={`/${sanitizeSlug(entry.slug)}`}>{entry.title}</Link>
        </h2>
        {entry.summary && <p className="docs-note__summary">{entry.summary}</p>}
        <ReleaseNoteTags categories={entry.categories} />
      </li>
    ))}
  </ul>
);
