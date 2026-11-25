"use client";
import React from "react";

import { Contributors } from "../contributors";
import { ContributorGuest } from "../contributor-guest";
import {
  ButtonLink,
  StatusBadge,
  type PDSIcon,
} from "@pantheon-systems/pds-toolkit-react";

import { formatLongDate } from "@/lib/format-date";

type MetaLink = {
  icon: PDSIcon;
  label: string;
  href: string;
  external?: boolean;
};

const issueUrl = (title: string, slug: string) => {
  const body = [
    `Re: [${title}](https://docs.pantheon.io/${slug})`,
    "",
    "Priority: Low/Medium/High (choose one, remove the other options)",
    "",
    "## Issue Description:",
    "",
    "## Suggested Resolution",
  ].join("\n");
  const params = new URLSearchParams({
    title: `${title} Doc Update `,
    body,
  });
  return `https://github.com/pantheon-systems/documentation/issues/new?${params}`;
};

/**
 * The title, lede and meta row of a docs page: the page header block of the PDS
 * docs site recipes. `DocsPage` puts it inside `pan-docs-page-header`, after the
 * breadcrumb.
 */
const HeaderBody = ({
  title,
  subtitle,
  description,
  slug,
  contributors,
  featured,
  editPath,
  reviewDate,
}: {
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contributors: any[];
  featured: boolean;
  editPath: string;
  /** A string, or a Date when the frontmatter date is not quoted. */
  reviewDate: string | Date;
}) => {
  const contributor = contributors ? contributors[0] : null;
  const lastReviewed = reviewDate
    ? `Last reviewed ${formatLongDate(reviewDate)}`
    : null;

  const links: MetaLink[] = [
    {
      icon: "slack",
      label: "Discuss in Slack",
      href: "https://pantheon.io/customer-community",
    },
    ...(editPath
      ? [
          {
            icon: "github" as const,
            label: "Edit this page on GitHub",
            href: `https://github.com/pantheon-systems/documentation/edit/main/${editPath}`,
            external: true,
          },
          {
            icon: "circleExclamation" as const,
            label: "Report an issue with this doc",
            href: issueUrl(title, slug),
            external: true,
          },
        ]
      : []),
  ];

  return (
    <>
      {subtitle && (
        <p className="pds-overline-s pan-docs-page-header__eyebrow">{title}</p>
      )}
      <h1 className="pan-docs-page-header__title">{subtitle || title}</h1>
      {description && (
        <p className="pan-docs-page-header__lede">{description}</p>
      )}

      {!!featured && <Contributors contributors={contributors} />}

      <div className="pan-docs-article-meta">
        {lastReviewed && (
          <StatusBadge
            hasStatusIndicator={false}
            label={lastReviewed}
            color="neutral"
          />
        )}
        <ul className="pan-docs-article-meta__links">
          {links.map((link) => (
            <li key={link.href}>
              <ButtonLink
                displayType="icon-start"
                iconName={link.icon}
                linkContent={
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {link.label}
                  </a>
                }
                size="s"
                variant="link"
              />
            </li>
          ))}
        </ul>
      </div>

      {featured && <ContributorGuest contributor={contributor} />}
    </>
  );
};

export default HeaderBody;
