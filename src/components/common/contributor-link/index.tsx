import React from "react";

import { Icon, type PDSIcon } from "@/components/ui/pds-re-export";

import styles from "./style.module.css";

export const ContributorLink = ({
  url,
  icon,
}: {
  url: string;
  icon: PDSIcon;
}) => {
  return (
    <div className="docs-contributor-link">
      <a aria-hidden="true" href={url} target="_blank">
        <Icon iconName={icon} iconSize="2xl" />
      </a>
    </div>
  );
};
