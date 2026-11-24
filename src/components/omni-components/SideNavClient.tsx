"use client";
import React from "react";
import Link from "next/link";
import { TreeNav, Icon } from "@/components/ui/pds-re-export";

// Plain data structure (no React elements)
export interface NavItemData {
  link: string;
  title: string;
  isActive: boolean;
  children?: NavItemData[];
}

// Convert plain data to the format TreeNav expects (with React elements)
const convertToMenuItems = (items: NavItemData[]): any[] => {
  return items.map((item) => {
    let linkText: React.ReactNode = item.title;

    // If the link is external, add an icon
    if (item.link.startsWith("http")) {
      linkText = (
        <>
          {item.title}{" "}
          <Icon iconName="externalLink" size="xs" />
        </>
      );
    }

    return {
      // TreeNav requires path on any item that has children.
      path: item.link,
      isActive: item.isActive,
      links: item.children && item.children.length > 0
        ? convertToMenuItems(item.children)
        : undefined,
      linkContent: <Link href={item.link}>{linkText}</Link>,
    };
  });
};

export const SideNavClient = ({
  headingText,
  menuItemsData,
}: {
  headingText: string;
  menuItemsData: NavItemData[];
}) => {
  const menuItems = convertToMenuItems(menuItemsData);

  return (
    <TreeNav
      hasMobileDrilldown
      className="sidenav-compact"
      ariaLabel={headingText}
      headingText={headingText}
      menuItems={menuItems}
    />
  );
};
