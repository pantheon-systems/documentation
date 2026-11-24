import Link from "next/link";
import type { NavMenuItem } from "@pantheon-systems/pds-toolkit-react";

const internal = (href: string, text: string): NavMenuItem => ({
  label: text,
  linkContent: <Link href={href}>{text}</Link>,
});

const external = (href: string, text: string): NavMenuItem => ({
  label: text,
  linkContent: <a href={href}>{text}</a>,
});

const heading = (label: string): NavMenuItem => ({ isHeading: true, label });

// The top-level menu, following the PDS docs site pattern: Get started, grouped
// Guides and CLI menus, Release notes and Support.
export const siteMenuItems: NavMenuItem[] = [
  internal("/get-started", "Get started"),
  {
    label: "Guides",
    links: [
      heading("Build"),
      internal("/develop", "Development workflows"),
      internal("/go-live", "Going live"),
      external("https://docs.content.pantheon.io/", "Content Publisher"),
      external("https://docs.p1.pantheon.io/", "P1"),
      heading("Run"),
      internal("/platform", "Web infrastructure"),
      internal("/guides/account-mgmt", "Manage accounts and workspaces"),
      internal("/guides/security", "Security"),
      internal("/support", "Support and troubleshooting"),
      heading("Learn"),
      internal("/learning", "Learning and certification"),
      internal("/contribute", "About our docs"),
    ],
  },
  {
    label: "CLI",
    links: [
      heading("Terminus"),
      internal("/terminus", "Terminus user manual"),
      internal("/terminus/install", "Install and update Terminus"),
      internal("/terminus/commands", "Command directory"),
      internal("/terminus/plugins", "Install plugins"),
      internal(
        "/terminus/updates#php-version-compatibility-matrix",
        "Supported Terminus and PHP versions"
      ),
      heading("Other CLIs"),
      internal("/guides/wp-cli", "WP-CLI"),
      internal("/guides/drush", "Drush (the Drupal CLI)"),
    ],
  },
  internal("/release-notes", "Release notes"),
  {
    label: "Support",
    linkContent: (
      <a href="https://dashboard.pantheon.io/#support" target="_blank">
        Support
      </a>
    ),
  },
];
