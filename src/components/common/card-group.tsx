import React from "react";

export const CardGroup = (props: any) => {
  return (
    <div className="pds-grid pds-spacing-pad-block-start-l pds-spacing-pad-block-end-3xl">
      {props.children.map((card: React.ReactNode | unknown) => {
        return card;
      })}
    </div>
  );
};
