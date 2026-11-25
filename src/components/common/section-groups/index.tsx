"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Icon, Panel } from "@/components/ui/pds-re-export";
import styles from "./style.module.css";

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
    <Panel className={styles.group}>
      {group.title?.trim() && <h3 className={styles.title}>{group.title}</h3>}
      {group.description && (
        <p className={styles.description}>{group.description}</p>
      )}
      <ul id={listId} className={styles.links}>
        {links.map((link, index) => {
          return (
            <li key={`${link.url}-${index}`}>
              <Link href={link.url ?? "#"}>
                {isVideo(link) && <Icon iconName="play" size="s" />}
                {link.text}
              </Link>
            </li>
          );
        })}
      </ul>
      {total > VISIBLE_LINKS && (
        <button
          type="button"
          className={styles.viewAll}
          aria-expanded={isExpanded}
          aria-controls={listId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Show fewer" : `View all ${total}`}
          <Icon iconName={isExpanded ? "angleUp" : "arrowRight"} size="s" />
        </button>
      )}
    </Panel>
  );
};

/** The "In this section" grid of link cards on a section index page. */
export const SectionGroups = ({ groups }: { groups: SectionGroup[] }) => (
  <div className={styles.groups}>
    {groups.map((group, index) => (
      <SectionGroupCard key={`${group.title}-${index}`} group={group} />
    ))}
  </div>
);
