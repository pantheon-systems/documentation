"use client";
import React, { useEffect, useState } from "react";
import { NavbarItem } from "../navbar-item";

import { ExpansionPanel } from "@/components/ui/pds-re-export";

import styles from "./style.module.css";

// REVIEW: types might be incorrect @aniketbiprojit
export const Navbar = ({
  title,
  items,
  activePage,
}: {
  title: string;
  items: any;
  activePage: string;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const menu = (
    <ul id="manual-guide-toc" className={styles.manualGuideTocMenu}>
      {items.map((item: any) => {
        return (
          <NavbarItem
            key={`${item.id}-item-key`}
            item={item}
            activePage={activePage}
          />
        );
      })}
    </ul>
  );

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Mobile nav */}
      <nav
        className={`manual-guide-toc ${styles.guideNavMobile}`}
        aria-labelledby="guide-nav"
      >
        <ExpansionPanel summary={title} className="guide-nav__expansion-panel">
          {menu}
        </ExpansionPanel>
      </nav>

      {/* Desktop/default nav */}
      <nav
        className={`manual-guide-toc ${styles.guideNavDefault}`}
        aria-labelledby="guide-nav"
      >
        <h2 id="guide-nav" className={styles.manualGuideTocHeading}>
          {title}
        </h2>

        {items && menu}
      </nav>
    </>
  );
};
