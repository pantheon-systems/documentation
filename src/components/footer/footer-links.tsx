import React from "react";
import { Icon, type PDSIcon } from "@pantheon-systems/pds-toolkit-react";

import styles from "./footer-links.module.css";

// PDS V2 removed FooterLinks, FooterHeading and SocialLinks. These are plain
// stand-ins so the footer keeps its V1 look until it is rebuilt on SiteFooter
// in Phase 2.

type HeadingLevel = "h2" | "h3" | "h4";

export const FooterHeading = ({
  headingText,
  headingLevel: Heading = "h2",
  className,
}: {
  headingText: string;
  headingLevel?: HeadingLevel;
  className?: string;
}) => (
  <Heading className={`pds-heading-m ${styles.heading} ${className ?? ""}`}>
    {headingText}
  </Heading>
);

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
    <ul className={styles.links}>
      {linkItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

const socialLinks: { href: string; label: string; icon: PDSIcon }[] = [
  { href: "https://www.facebook.com/getpantheon", label: "Pantheon on Facebook", icon: "facebook" },
  { href: "https://x.com/getpantheon", label: "Pantheon on X", icon: "xTwitter" },
  { href: "https://bsky.app/profile/pantheon.io", label: "Pantheon on BlueSky", icon: "bluesky" },
  { href: "https://www.linkedin.com/company/getpantheon", label: "Pantheon on LinkedIn", icon: "linkedin" },
  { href: "https://www.youtube.com/user/GetPantheon", label: "Pantheon on YouTube", icon: "youtube" },
  { href: "https://www.instagram.com/getpantheon", label: "Pantheon on Instagram", icon: "instagram" },
];

export const SocialLinks = ({ className }: { className?: string }) => (
  <ul className={`${styles.social} ${className ?? ""}`}>
    {socialLinks.map(({ href, label, icon }) => (
      <li key={href}>
        <a href={href} aria-label={label} target="_blank" rel="noreferrer">
          <Icon iconName={icon} size="xl" />
        </a>
      </li>
    ))}
  </ul>
);
