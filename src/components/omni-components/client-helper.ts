import React from "react";
import { Icon } from "@/components/ui/pds-re-export";
import Link from "next/link";
import { OmniItem } from "./helpers";

export const turnItemsIntoLinks = (
  item: OmniItem,
  activePage: string
): {
  isActive: boolean;
  links: any;
  linkContent: any;
} => {
  let linkText: any = item.title;
  // If the link is external, add an icon to indicate that.
  // Internal links will start with a slash.
  if (item.link.startsWith("http")) {
    linkText = React.createElement(
      React.Fragment,
      null,
      item.title,
      " ",
      React.createElement(Icon, { iconName: "externalLink", iconSize: "sm" })
    );
  }

  const links = item.children && item.children.length > 0
    ? item.children
        .filter((child: any) => child && child.link) // Filter out invalid children
        .map((child: any) => turnItemsIntoLinks(child, activePage))
    : undefined;

  return {
    isActive: item.link === activePage || item.link === "/" + activePage,
    links: links && links.length > 0 ? links : undefined,
    linkContent: React.createElement(Link, { href: item.link }, linkText),
  };
};
