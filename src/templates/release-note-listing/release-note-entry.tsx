import Link from "next/link";
import { ReactNode } from "react";
import { formatLongDate } from "@/lib/format-date";
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
  <ul className="pan-docs-note-list">
    {entries.map((entry) => (
      <li key={entry.slug}>
        {entry.publishedDate && (
          <p className="pan-docs-note-date">
            {formatLongDate(entry.publishedDate)}
          </p>
        )}
        <h2>
          <Link href={`/${sanitizeSlug(entry.slug)}`}>{entry.title}</Link>
        </h2>
        {entry.summary && <p>{entry.summary}</p>}
        <ReleaseNoteTags categories={entry.categories} />
      </li>
    ))}
  </ul>
);
