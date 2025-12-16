"use client";
import React from "react";
import Link from "next/link";

import { Tile } from "@pantheon-systems/pds-toolkit-react";

// This component translates the yaml data into something useful for PDS implementation of tiles.

export function TopicsGrid(props: {
  topics: {
    imageSrc: string;
    headingText: string;
    summary: string;
    url: string;
  }[];
}) {
  const { topics } = props;

  return (
    <div className="pds-tile-grid">
      {topics &&
        topics.map((topic, index) => (
          <Tile
            key={index}
            imageSrc={topic.imageSrc}
            headingLevel="h3"
            headingText={topic.headingText}
            summary={topic.summary}
            linkContent={
              <Link href={topic.url}>
                Learn more
                <span className="visually-hidden">
                  about {topic.headingText}
                </span>
              </Link>
            }
          />
        ))}
    </div>
  );
}
