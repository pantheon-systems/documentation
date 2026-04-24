"use client";
import React from "react";
import Link from "next/link";
import { SideNavCompact, Icon } from "@/components/ui/pds-re-export";
import { MOBILE_MENU_BREAKPOINT } from "@/constants";

// Plain data structure (no React elements)
export interface NavItemData {
  link: string;
  title: string;
  isActive: boolean;
  children?: NavItemData[];
}

// Convert plain data to the format SideNavCompact expects (with React elements)
const convertToMenuItems = (items: NavItemData[]): any[] => {
  return items.map((item) => {
    let linkText: React.ReactNode = item.title;

    // If the link is external, add an icon
    if (item.link.startsWith("http")) {
      linkText = (
        <>
          {item.title}{" "}
          <Icon iconName="externalLink" iconSize="sm" />
        </>
      );
    }

    return {
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
    <SideNavCompact
      mobileMenuMaxWidth={MOBILE_MENU_BREAKPOINT}
      className="sidenav-compact"
      ariaLabel={headingText}
      headingText={headingText}
      menuItems={menuItems}
    />
  );
};
