"use client";
import React from "react";

import { Icon } from "@pantheon-systems/pds-toolkit-react";

import styles from "./style.module.css";

export const Product = ({
  title,
  link,
  children,
}: {
  title: string;
  link: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${styles.productCard} pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-12 pds-grid-item--lg-6 pds-grid-item--xl-4`}
    >
      <h3 className={styles.productCardTitle}>{title}</h3>

      <div className={styles.productCardText}>{children}</div>

      <div className="product-card__link">
        <a href={link} target="_blank" rel="noreferrer" className="pds-button">
          Learn More
          <Icon
            iconName="arrowRight"
            iconSize="md"
            className="pds-spacing-pad-inline-start-5xs"
          />
        </a>
      </div>
    </div>
  );
};
