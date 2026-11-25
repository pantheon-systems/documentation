"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button, ButtonLink, Panel } from "@/components/ui/pds-re-export";

export type SectionGroupLink = { text: string; url: string; icon?: string };

export type SectionGroup = {
  title: string;
  description?: string;
  links: SectionGroupLink[];
};

// A card shows a few links and the rest behind "View all", as in the PDS docs
// site Section prototype.
const VISIBLE_LINKS = 4;

// Only videos are marked, with a play triangle; the data's other icons (the old
// "book" for a guide) aren't part of the design.
const isVideo = (link: SectionGroupLink) => link.icon === "video";

const SectionGroupCard = ({ group }: { group: SectionGroup }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listId = useId();
  const total = group.links.length;
  const links = isExpanded ? group.links : group.links.slice(0, VISIBLE_LINKS);

  return (
    <Panel className="pan-docs-group" padding="condensed">
      {group.title?.trim() && <h3>{group.title}</h3>}
      {group.description && (
        <p className="pan-docs-muted">{group.description}</p>
      )}
      <ul id={listId} className="pan-docs-group__links">
        {links.map((link, index) => (
          <li key={`${link.url}-${index}`}>
            <ButtonLink
              displayType={isVideo(link) ? "icon-start" : undefined}
              iconName={isVideo(link) ? "play" : undefined}
              linkContent={
                <Link href={link.url ?? "#"}>
                  {link.text}
                  {isVideo(link) && (
                    <span className="visually-hidden"> (video)</span>
                  )}
                </Link>
              }
              size="s"
              variant="link"
            />
          </li>
        ))}
      </ul>
      {total > VISIBLE_LINKS && (
        <Button
          aria-controls={listId}
          aria-expanded={isExpanded}
          className="pan-docs-group__all"
          displayType="icon-end"
          iconName={isExpanded ? "angleUp" : "arrowRight"}
          label={isExpanded ? "Show fewer" : `View all ${total}`}
          onClick={() => setIsExpanded((expanded) => !expanded)}
          size="s"
          variant="link"
        />
      )}
    </Panel>
  );
};

/** The "In this section" grid of link cards on a section index page. */
export const SectionGroups = ({ groups }: { groups: SectionGroup[] }) => (
  <div className="pan-docs-groups">
    {groups.map((group, index) => (
      <SectionGroupCard key={`${group.title}-${index}`} group={group} />
    ))}
  </div>
);
