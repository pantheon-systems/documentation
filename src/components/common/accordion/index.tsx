"use server";
import React from "react";

import { ExpansionPanel } from "@/components/ui/pds-re-export";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { AccordionClient } from "./client-component";

export const Accordion = async ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  // REVIEW: types might be incorrect @aniketbiprojit
  children: any;
}) => {
  return (
    <AccordionClient id={id} title={title}>
      {children}
    </AccordionClient>
  );
};
