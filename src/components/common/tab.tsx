import React from "react";

export const Tab = ({
  id,
  active,
  children,
}: {
  id: string;
  active: boolean;
  children: React.ReactNode;
}) => (
  <div role="tabpanel" className={`tab-pane ${active ? "active" : ""}`} id={id}>
    {children}
  </div>
);

