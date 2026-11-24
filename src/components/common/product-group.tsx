"use client";
import React from "react";

export const ProductGroup = (props: { children: React.ReactNode[] }) => {
  return (
    <div className="pds-grid pds-pad-block-start-s pds-pad-block-end-3xl">
      {props?.children?.map?.((product) => {
        return product;
      })}
    </div>
  );
};
