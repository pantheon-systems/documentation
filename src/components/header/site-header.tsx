"use client";

// A client component on purpose: the menu items hold Link elements, and passing
// elements from a server component to the PDS client components fails during
// the production prerender (it works in dev). The server `Header` passes only
// plain menu data, and the elements are built here.
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { NavbarSearch } from "./navbar-search";

const isExternal = (href: string) => /^https?:\/\//.test(href);

// A link is on the active trail for the page's own section, or for any page
// under its path (the CLI dropdown lists pages deep inside a section).
const isOnTrail = (href: string, pathname: string, activeHref?: string) =>
  href === activeHref ||
  (!isExternal(href) &&
    href !== "/" &&
    (pathname === href || pathname.startsWith(`${href}/`)));

const toNavLink = (
  { label, href }: HeaderMenuLink,
  isActive: boolean
): NavMenuItem => ({
  label,
  isActive,
  linkContent: isExternal(href) ? (
    <a href={href}>{label}</a>
  ) : (
    <Link href={href}>{label}</Link>
  ),
});

const toNavItem = (
  entry: HeaderMenuEntry,
  pathname: string,
  activeHref?: string
): NavMenuItem => {
  const active = (link: HeaderMenuLink) =>
    isOnTrail(link.href, pathname, activeHref);

  if (entry.type === "link") return toNavLink(entry, active(entry));

  const links = entry.groups.flatMap((group) => group.links);

  return {
    label: entry.label,
    isActive: links.some(active),
    links: entry.groups.flatMap((group) => [
      ...(group.heading
        ? [{ isHeading: true, label: group.heading } as NavMenuItem]
        : []),
      ...group.links.map((link) => toNavLink(link, active(link))),
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

export default function SiteHeader({
  menu,
  activeHref,
}: {
  menu: HeaderMenuEntry[];
  activeHref?: string;
}) {
  const pathname = usePathname() ?? "";
  const menuItems = [
    ...menu.map((entry) => toNavItem(entry, pathname, activeHref)),
    supportItem,
  ];

  return (
    <>
      <a id="skip-to-main" className="pds-skiplink" href="#docs-main">
        Skip to main content
      </a>

      <Navbar containerWidth="x-wide">
        <PantheonLogo
          slot="logo"
          linkContent={<Link href="/">Pantheon Docs</Link>}
        />
        <SiteMenu
          slot="items-left"
          ariaLabel="Main navigation"
          data-mobile-order={2}
          menuItems={menuItems}
        />
        <NavbarSearch slot="search" />
        {/* The account buttons stay together, last in the mobile menu. */}
        <div
          className="pds-button-group"
          data-mobile-order={4}
          slot="items-right"
        >
          {navButtons.map((button) => (
            <ButtonLink
              key={button.href}
              variant={button.variant}
              size="s"
              linkContent={<a href={button.href}>{button.label}</a>}
            />
          ))}
        </div>
      </Navbar>
    </>
  );
}
