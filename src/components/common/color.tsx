import React, { PropsWithChildren } from "react";

export const Color = ({ color, children }: { color: string } & PropsWithChildren) => {
  return <span style={{ color }}>{children}</span>;
};

