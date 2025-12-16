"use client";
import React from "react";
import Link from "next/link";

import style from "./style.module.css";

export function ChangelogList(props: {
  title: string;
  url: string;
  changelogs: { id: string; slug: string; title: string }[];
}) {
  const { url, changelogs } = props;
  changelogs[0];

  return (
    <div className={style.changelogPreview}>
      <ul className={style.changelogList}>
        {changelogs.map((changelog) => (
          <li key={changelog.id}>
            <Link
              style={{
                color: "var(--pds-color-interactive-link-default)",
              }}
              href={`${changelog.slug}`}
            >
              {changelog.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link href={`${url}/`} className="pds-button">
        See all
      </Link>
    </div>
  );
}

ChangelogList.propTypes = {};

export default ChangelogList;
