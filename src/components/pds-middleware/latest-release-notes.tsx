"use client";

// A client component, like the header: the card links are next/link elements,
// and passing elements from a server component to the PDS client components
// fails during the production prerender. The server passes plain data.
import Link from "next/link";
import { ActionCard, CTALink, Tag } from "@/components/ui/pds-re-export";
import type { TagColor } from "@pantheon-systems/pds-toolkit-react";

export type LatestReleaseNote = {
  id: string;
  href: string;
  title: string;
  date: string;
  categories: { label: string; color?: TagColor }[];
};

/** The home page's "Latest release notes": a card for each note, then a link to all. */
export const LatestReleaseNotes = ({
  title,
  allUrl,
  notes,
}: {
  title: string;
  allUrl: string;
  notes: LatestReleaseNote[];
}) => (
  <section aria-labelledby="docs-notes-heading">
    <div className="pan-docs-section-head">
      <h2 className="pan-docs-section-title" id="docs-notes-heading">
        {title}
      </h2>
      <CTALink linkContent={<Link href={allUrl}>See all release notes</Link>} />
    </div>
    <div className="pan-docs-cards">
      {notes.map((note) => (
        <ActionCard
          key={note.id}
          primaryAction={{
            label: note.title,
            linkContent: <Link href={note.href} />,
          }}
        >
          <div className="pan-docs-note-card" slot="main">
            <span className="pan-docs-muted pds-ts-s">{note.date}</span>
            <h3 className="pds-heading-l">{note.title}</h3>
            {note.categories.length > 0 && (
              <span className="pan-docs-tags">
                {note.categories.map((category) => (
                  <Tag
                    key={category.label}
                    size="s"
                    tagColor={category.color}
                    tagLabel={category.label}
                  />
                ))}
              </span>
            )}
          </div>
        </ActionCard>
      ))}
    </div>
  </section>
);
