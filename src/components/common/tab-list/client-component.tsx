"use client";

import { Tabs } from "@pantheon-systems/pds-toolkit-react";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const TabListClientComponent = ({
  processedTabs,
}: {
  processedTabs: any;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Tabs
      ariaLabel="Tabbed content"
      tabs={processedTabs}
      className={cn("docs-tabs", styles.docsTabs)}
    />
  );
};
