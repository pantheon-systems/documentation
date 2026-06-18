"use client";
import React from "react";

import { Contributors } from "../contributors";
import { Github } from "../github";
import { Slack } from "../slack";
import { ContributorGuest } from "../contributor-guest";
import { StatusBadge } from "@pantheon-systems/pds-toolkit-react";

import styles from "./style.module.css";

const HeaderBody = ({
  title,
  subtitle,
  description,
  slug,
  contributors,
  featured,
  editPath,
  reviewDate,
}: {
  title: string;
  subtitle: string;
  description: string;
  slug: string;
  contributors: any[];
  featured: boolean;
  editPath: string;
  reviewDate: string;
}) => {
  const contributor = contributors ? contributors[0] : null;
  const lastReviewed = reviewDate ? "Last Reviewed: " + reviewDate : null;
  return (
    <>
      <header className={styles.docContentHeader}>
        {lastReviewed && (
          <StatusBadge
            hasStatusIndicator={false}
            label={lastReviewed}
            color="transparent"
            className="pds-spacing-mar-block-end-m"
          />
        )}
        {/* <p className="review-date">
          <time dateTime={isoDate} pubdate="pubdate">
            {lastReviewed}
          </time>
        </p> */}
        {!subtitle && <h1 className="docs-title">{title}</h1>}

        {subtitle && <h1>{subtitle}</h1>}

        <p className="pds-lead-text pds-lead-text--sm pds-spacing-mar-block-end-xl">
          {description}
        </p>

        {!!featured && <Contributors contributors={contributors} />}
        <div className={styles.docContentHeaderActions}>
          <div className={styles.docContentHeaderDiscuss}>
            <Slack />
          </div>
          <Github
            // REVIEW: className is not defined in the component @aniketbiprojit
            // className="doc-content-header__github"
            pageTitle={title}
            path={slug}
            editPath={editPath}
          />
        </div>

        {featured && <ContributorGuest contributor={contributor} />}
        <br />
      </header>
    </>
  );
};

export default HeaderBody;
