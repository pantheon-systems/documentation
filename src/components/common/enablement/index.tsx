"use client";

import React from "react";
import { Callout } from "@pantheon-systems/pds-toolkit-react";

const Enablement = ({
  title,
  link,
  campaign,
  children,
}: {
  title: string;
  link: string;
  campaign: string;
  children: React.ReactNode;
}) => {
  function _handleClick() {
    if (typeof window.gtag === "function") {
      window.gtag("event", "Docs Enablement Clicked", {
        campaign: { campaign },
      });
    }
  }

  return (
    <Callout title={title} type="info" className="docs-alert">
      <h4>{title}</h4>
      {children}{" "}
      <a href={link} onClick={_handleClick}>
        Learn more
      </a>
    </Callout>
  );
};

export default Enablement;
