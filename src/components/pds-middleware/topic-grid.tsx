"use client";
import React from "react";
import Link from "next/link";

import { Tile, type PDSIcon } from "@pantheon-systems/pds-toolkit-react";

// This component translates the yaml data into something useful for PDS implementation of tiles.
// V2 tiles show an icon instead of an illustration, so each topic names a PDS icon.

export function TopicsGrid(props: {
  topics: {
    icon: PDSIcon;
    headingText: string;
    summary: string;
    url: string;
  }[];
}) {
  const { topics } = props;

  return (
    <div className="docs-tile-grid">
      {topics &&
        topics.map((topic, index) => (
          <Tile
            key={index}
            headingLevel="h3"
            icon={topic.icon}
            headingText={topic.headingText}
            summary={topic.summary}
            linkContent={<Link href={topic.url} />}
          />
        ))}
    </div>
  );
}
