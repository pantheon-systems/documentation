import React from "react";
import { ExternalLink } from "./external-link";

export const Callout = ({
  type,
  children,
  title,
  link,
}: {
  type: string;
  children: React.ReactNode;
  title: string;
  link: string;
}) => {
  return (
    <div className={`alert alert-${type}`}>
      <h4 className={type}>
        <ExternalLink text={title} link={link} />
      </h4>
      {children}
    </div>
  );
};
