import React from "react";
import Link from "next/link";

import { Icon } from "@/components/ui/pds-re-export";

import styles from "./style.module.css";

const NavButtons = ({
  prev,
  next,
  prevTitle = "Previous",
  nextTitle = "Continue",
}: {
  prev: string;
  next: string;
  prevTitle?: string;
  nextTitle?: string;
}) => {
  return (
    <div>
      <ul
        className={`${styles.pagination} pager-guides pds-spacing-mar-block-end-2xl pds-spacing-mar-block-start-3xl`}
      >
        {prev && (
          <li className={styles.paginationPrev}>
            <Link href={prev} rel="prev" className="pds-button">
              <Icon iconName="angleLeft"></Icon>
              {prevTitle}
            </Link>
          </li>
        )}
        {next && (
          <li className={styles.paginationNext}>
            <Link href={next} rel="next" className="pds-button">
              {nextTitle}
              <Icon iconName="angleRight"></Icon>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavButtons;
