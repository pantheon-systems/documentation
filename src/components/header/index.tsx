"use client";

// A client component on purpose: the menu items hold Link elements, and passing
// elements from a server component to the PDS client components fails during
// the production prerender (it works in dev).
import Link from "next/link";
import React from "react";
import {
  ButtonLink,
  Navbar,
  PantheonLogo,
  SiteMenu,
} from "@/components/ui/pds-re-export";
import { navButtons } from "./common";
import { siteMenuItems } from "./menu";

export default function Header() {
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
          menuItems={siteMenuItems}
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
