"use client";
import React from "react";

import { Icon } from "@/components/ui/pds-re-export";

export const Check = () => {
  return (
    <Icon
      iconName="check"
      size="xl"
      className="pantheon-icon-success"
      // TO-REVIEW: style={{ color: "var(--pds-color-input-foreground-success" }} @aniketbiprojit
    />
  );
};
