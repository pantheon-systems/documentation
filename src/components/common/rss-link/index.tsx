import { Icon } from "@/components/ui/pds-re-export";

/** The "Subscribe to RSS feed" link of the PDS docs site release notes pages. */
export const RssLink = ({ href }: { href: string }) => (
  <a
    className="pan-docs-icon-link pds-ts-s"
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    <Icon iconName="rss" size="s" />
    <span>Subscribe to RSS feed</span>
  </a>
);
