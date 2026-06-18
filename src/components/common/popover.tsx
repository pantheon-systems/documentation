"use client";
import React, { useState, useEffect } from "react";

import { Popover as PDSPopover } from "@pantheon-systems/pds-toolkit-react";

export const Popover = ({
  icon,
  title,
  content,
  children,
}: {
  icon: string;
  title: string;
  content: string | TrustedHTML;
  children?: React.ReactNode;
}) => {
  const processedContent = (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <PDSPopover content={processedContent} title={title} />
      {children}
    </>
  );
};
