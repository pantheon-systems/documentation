import React from "react";

// PDS V2 removed FooterLinks and FooterHeading. These are plain stand-ins so the
// footer keeps working until it is rebuilt on SiteFooter in Phase 2.

type HeadingLevel = "h2" | "h3" | "h4";

export const FooterHeading = ({
  headingText,
  headingLevel: Heading = "h2",
  className,
}: {
  headingText: string;
  headingLevel?: HeadingLevel;
  className?: string;
}) => <Heading className={`pds-heading-m ${className ?? ""}`}>{headingText}</Heading>;

export const FooterLinks = ({
  headingText,
  headingLevel,
  linkItems,
  className,
  slot,
}: {
  headingText: string;
  headingLevel?: HeadingLevel;
  linkItems: React.ReactNode[];
  className?: string;
  slot?: string;
}) => (
  <div className={className} slot={slot}>
    <FooterHeading headingText={headingText} headingLevel={headingLevel} />
    <ul>
      {linkItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
