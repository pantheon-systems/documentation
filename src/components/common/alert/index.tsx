import React from "react";

import { Callout, CalloutProps } from "@/components/ui/pds-re-export";

export const Alert = ({
  title,
  type,
  icon,
  children,
}: {
  title: string;
  type: string;
  icon: string;
  children: CalloutProps["children"];
}) => {
  // TODO: Recalibrate types for this site. @aniketbiprojit
  // There is type mismatch between the PDS toolkit and the gatsby website.
  if (type === "danger") {
    type = "warning";
  } else if (type === "export") {
    type = "code";
  } else {
    type = type;
  }

  return (
    <Callout
      children={children}
      type={type as CalloutProps["type"]}
      title={title}
      className="docs-alert"
    />
  );
};
