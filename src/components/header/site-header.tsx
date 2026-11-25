"use client";

// A client component on purpose: the menu items hold Link elements, and passing
// elements from a server component to the PDS client components fails during
// the production prerender (it works in dev). The server `Header` passes only
// plain menu data, and the elements are built here.
import Link from "next/link";
import React from "react";
import type { NavMenuItem } from "@pantheon-systems/pds-toolkit-react";
import {
  ButtonLink,
  Navbar,
  PantheonLogo,
  SiteMenu,
} from "@/components/ui/pds-re-export";
import type {
  HeaderMenuEntry,
  HeaderMenuLink,
} from "@/components/omni-components/header-menu";
import { navButtons } from "./common";

const isExternal = (href: string) => /^https?:\/\//.test(href);

const toNavLink = ({ label, href }: HeaderMenuLink): NavMenuItem => ({
  label,
  linkContent: isExternal(href) ? (
    <a href={href}>{label}</a>
  ) : (
    <Link href={href}>{label}</Link>
  ),
});

const toNavItem = (entry: HeaderMenuEntry): NavMenuItem => {
  if (entry.type === "link") return toNavLink(entry);

  return {
    label: entry.label,
    links: entry.groups.flatMap((group) => [
      ...(group.heading
        ? [{ isHeading: true, label: group.heading } as NavMenuItem]
        : []),
      ...group.links.map(toNavLink),
    ]),
  };
};

// Support is the dashboard's support page, not a docs section, so it is not in
// the omni list.
const supportItem: NavMenuItem = {
  label: "Support",
  linkContent: (
    <a href="https://dashboard.pantheon.io/#support" target="_blank">
      Support
    </a>
  ),
};

export default function SiteHeader({ menu }: { menu: HeaderMenuEntry[] }) {
  const menuItems = [...menu.map(toNavItem), supportItem];

  return (
    <>
      <a id="skip-to-main" className="pds-skiplink" href="#docs-main">
        Skip to main content
      </a>

      <Navbar>
        <PantheonLogo
          slot="logo"
          linkContent={<Link href="/">Pantheon Docs</Link>}
        />
        <SiteMenu
          slot="items-left"
          ariaLabel="Main navigation"
          menuItems={menuItems}
        />
        {navButtons.map((button) => (
          <ButtonLink
            key={button.href}
            slot="items-right"
            variant={button.variant}
            size="s"
            linkContent={<a href={button.href}>{button.label}</a>}
          />
        ))}
      </Navbar>
    </>
  );
}
