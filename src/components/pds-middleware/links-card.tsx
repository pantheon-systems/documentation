"use client";
import React from "react";

import { Card } from "@/components/ui/pds-re-export";

// PDS V2 removed LinksCard. This is a deliberately small stand-in built on
// Card so it is easy to swap for the toolkit's Links Card pattern later.

export function LinksCard({
  className,
  headingLevel: Heading = "h2",
  headingText,
  linkItems,
}: {
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
  headingText: string;
  linkItems: React.ReactNode[];
}) {
  return (
    <Card className={className}>
      <Heading className="pds-heading-l">{headingText}</Heading>
      <ul className="pds-spacing-mar-block-start-m">
        {linkItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
