"use client";

import { ExpansionPanel } from "@/components/ui/pds-re-export";
import { cn } from "@/lib/utils";
import styles from "./style.module.css";
import { useEffect, useState } from "react";

export const AccordionClient = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: any;
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ExpansionPanel
      id={id}
      summary={title}
      className={cn("docs-accordion", styles.docsAccordion)}
    >
      {children}
    </ExpansionPanel>
  );
};
