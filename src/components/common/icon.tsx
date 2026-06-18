"use client"
import React from "react";
import {
  Icon as PDSIcon,
  type IconProps,
} from "@pantheon-systems/pds-toolkit-react";

// List of legacy icons from Hermes that will be not available in the PDS icon set.
// These icons are rendered using the glyphicons font.
const legacyIcons = [
  "charts",
  "cleaning",
  "cloud-upload",
  "equalizer",
  "global",
  "server",
];

// The size prop only affects the PDS icons, not the legacy icons.
// The legacy icons adapt to the size of the parent container.

export const Icon = ({
  icon,
  text,
  size,
}: {
  icon: IconProps["iconName"];
  text: string;
  size: IconProps["iconSize"];
}) => {
  return legacyIcons.includes(icon) ? (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "0.8rem",
      }}
    >
      <strong>
        <span
          className={`glyphicons glyphicons-${icon}`}
          style={{
            display: "inline-block",
            height: "0.8rem",
          }}
        />{" "}
        {text}
      </strong>
    </span>
  ) : (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      <strong>
        <PDSIcon
          iconName={icon}
          iconSize={size ? size : "md"}
          // FIXME: No types exist for style prop @aniketbiprojit
          // style={{ paddingInline: ".125rem" }}
        />{" "}
        {text}
      </strong>
    </span>
  );
};
