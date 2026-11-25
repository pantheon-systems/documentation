"use client";
import React from "react";
import {
  Icon,
  PantheonLogo,
  SiteFooter,
  type PDSIcon,
} from "@/components/ui/pds-re-export";
import Link from "next/link";

import { MarketoForm } from "../common/marketo-form";
import CCLogo from "@/source/images/CC-BY-SA_icon.png";

const linkGroups = [
  {
    heading: "Topics",
    links: [
      { href: "/get-started/", label: "Get started" },
      { href: "/develop/", label: "Develop" },
      { href: "/go-live/", label: "Go live" },
      { href: "/platform/", label: "Explore platform architecture" },
      { href: "/automate/", label: "Automate & integrate" },
      { href: "/performance/", label: "Optimize performance" },
      { href: "/manage/", label: "Manage teams & organizations" },
      { href: "/troubleshoot/", label: "Troubleshoot" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "https://pantheon.io/contact-us", label: "Contact" },
      {
        href: "https://pantheon.io/developers/office-hours?docs",
        label: "Office Hours",
      },
      {
        href: "https://pantheon.io/learn-pantheon?docs",
        label: "Learn Pantheon",
      },
      {
        href: "https://directory.pantheon.io/agencies?docs",
        label: "Hire an agency",
      },
      { href: "https://status.pantheon.io/", label: "Status" },
      { href: "/guides/support/", label: "Support" },
    ],
  },
  {
    heading: "Community",
    links: [
      { href: "/code-of-conduct/", label: "Code of conduct" },
      { href: "/contributors/", label: "Contributors" },
      {
        href: "/pantheon-community/",
        label: "Community & Power Users Group",
      },
      { href: "/contribute/", label: "Learn to contribute" },
    ],
  },
];

const socialLinks: { href: string; label: string; icon: PDSIcon }[] = [
  {
    href: "https://www.facebook.com/getpantheon",
    label: "Pantheon on Facebook",
    icon: "facebook",
  },
  {
    href: "https://x.com/getpantheon",
    label: "Pantheon on X",
    icon: "xTwitter",
  },
  {
    href: "https://bsky.app/profile/pantheon.io",
    label: "Pantheon on BlueSky",
    icon: "bluesky",
  },
  {
    href: "https://www.linkedin.com/company/getpantheon",
    label: "Pantheon on LinkedIn",
    icon: "linkedin",
  },
  {
    href: "https://www.youtube.com/user/GetPantheon",
    label: "Pantheon on YouTube",
    icon: "youtube",
  },
  {
    href: "https://www.instagram.com/getpantheon",
    label: "Pantheon on Instagram",
    icon: "instagram",
  },
];

// The footer from the PDS docs site Global recipe: a brand column with the
// license, three link groups and a connect column, in a grid that follows its
// own width (five columns, three, then two on phones; see docs-site.css).
export const Footer = ({
  className,
  withBorder = true,
}: {
  className?: string;
  withBorder?: boolean;
}) => {
  return (
    <SiteFooter
      legalLinks={[
        "privacy",
        "dataSubjectRequest",
        "cookiePolicy",
        <button
          key="cookie-settings"
          id="ot-sdk-btn"
          className="ot-sdk-show-settings"
        />,
        "termsOfUse",
        "acceptableUse",
        "accessibilityStatement",
      ]}
      containerWidth="x-wide"
      hasTopBorder={withBorder}
      className={className}
    >
      <div className="pan-docs-footer-wrap">
        <div className="pan-docs-footer">
          <div className="pan-docs-footer__brand">
            <PantheonLogo linkContent={<Link href="/">Pantheon Docs</Link>} />
            <p className="pan-docs-muted pds-ts-xs">
              Our documentation is licensed under a{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                Creative Commons Attribution-ShareAlike 4.0 International
                License
              </a>
              . Code snippets are additionally licensed under{" "}
              <a href="https://opensource.org/license/mit">The MIT License</a>.
            </p>
            <a
              className="pan-docs-footer__cc"
              href="https://creativecommons.org/licenses/by-sa/4.0/"
            >
              <img
                src={CCLogo.src}
                alt="Creative Commons Attribution-ShareAlike 4.0 International License"
              />
            </a>
          </div>

          {linkGroups.map((group) => (
            <nav
              key={group.heading}
              aria-label={group.heading}
              className="pan-docs-footer__group"
            >
              <h2>{group.heading}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("/") ? (
                      <Link href={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section
            aria-labelledby="docs-footer-connect"
            className="pan-docs-footer__connect"
          >
            <h2 id="docs-footer-connect">Connect</h2>
            <p className="pds-ts-s">
              Awesome development news, tutorials, and tips. Plus get three free
              downloads, just for signing up. If you don&apos;t love it,
              unsubscribe with just a click.
            </p>
            <MarketoForm
              baseUrl="https://app-ab05.marketo.com"
              munchkinId="316-GSV-089"
              formId={2014}
              formName="mktoForm_2014"
            />
            <ul className="pan-docs-footer__social">
              {socialLinks.map(({ href, label, icon }) => (
                <li key={href}>
                  <a href={href} aria-label={label}>
                    <Icon iconName={icon} size="l" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </SiteFooter>
  );
};
