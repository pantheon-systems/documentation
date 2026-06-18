import React from "react";

import { Icon, PantheonLogo } from "@/components/ui/pds-re-export";
import { cn } from "@/lib/utils";

import styles from "./style.module.css";

const Card = ({
  title,
  isOfficial,
  author,
  authorLink,
  link,
  children,
  ...props
}: {
  title: string;
  isOfficial: boolean;
  isofficial: string;
  author: string;
  authorLink: string;
  link: string;
  children: React.ReactNode;
} & any) => {
  isOfficial = isOfficial ?? props?.isofficial === "true";
  authorLink = authorLink ?? props?.authorlink;
  return (
    <div
      className={cn(
        "plugin-card pds-grid-item pds-grid-item--sm-6 pds-grid-item--md-12 pds-grid-item--lg-6",
        "pluginCard",
        styles.pluginCard
      )}
    >
      <div
        className={cn(
          "plugin-card__header",
          "pluginCardHeader",
          styles.pluginCardHeader
        )}
      >
        {isOfficial && <PantheonLogo displayType="icon" />}

        <div
          className={cn(
            "plugin-card__title-wrapper",
            "pluginCardTitleWrapper",
            styles.pluginCardTitleWrapper
          )}
        >
          <h2
            className={cn(
              "plugin-card__title",
              "pluginCardTitle",
              styles.pluginCardTitle
            )}
          >
            {title}
          </h2>
          {isOfficial && (
            <div
              className={cn(
                "plugin-card__pantheon-official",
                "pluginCardPantheonOfficial",
                styles.pluginCardPantheonOfficial
              )}
            >
              Pantheon Official
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "plugin-card__text",
          "pluginCardText",
          styles.pluginCardText
        )}
      >
        <span
          className={cn(
            "plugin-card__author",
            "pluginCardAuthor",
            styles.pluginCardAuthor
          )}
        >
          Author: <a href={authorLink}>{author}</a>
        </span>
        <span className="plugin-card__description">{children}</span>
      </div>

      <div className="plugin-card__link">
        <a
          href={link}
          target="_blank"
          className="pds-button pds-button--secondary"
        >
          Get plugin
          <Icon
            iconName="externalLink"
            iconSize="md"
            className="pds-spacing-pad-inline-start-5xs"
          />
        </a>
      </div>
    </div>
  );
};

export default Card;
