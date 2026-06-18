"use client";

import { MOBILE_MENU_BREAKPOINT } from "@/constants";
import {
  MenuItem,
  NavMenu as PDSNavMenu,
} from "@pantheon-systems/pds-toolkit-react";
import { createElement, useState } from "react";
import { useEffect } from "react";
import Link from "next/link";

export const ClientHeader: React.FC<{
  omniLinks: {
    link: string;
    title: string;
  }[];
}> = ({ omniLinks }) => {
  const OmniLinks = omniLinks.map((item) => {
    const theLink = createElement(Link, { href: item.link }, item.title);
    return {
      linkContent: theLink,
    };
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <PDSNavMenu
      slot="items-left"
      ariaLabel="Main Navigation"
      menuItems={[
        {
          label: "Documentation",
          links: OmniLinks as MenuItem[],
        },
        {
          label: "Support",
          linkContent: (
            <a href="https://dashboard.pantheon.io/#support" target="_blank">
              Support
            </a>
          ),
        },
      ]}
      mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
    />
  );
};
