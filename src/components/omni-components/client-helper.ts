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

  return {
    isActive: item.link === activePage || item.link === "/" + activePage,
    links: item.children
      ? item.children.map((child: any) => turnItemsIntoLinks(child, activePage))
      : false,
    linkContent: React.createElement(Link, { href: item.link }, linkText),
  };
};
