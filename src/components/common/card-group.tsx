import React from "react";

export const CardGroup = (props: any) => {
  return (
    <div className="pds-grid pds-pad-block-start-l pds-pad-block-end-3xl">
      {props.children.map((card: React.ReactNode | unknown) => {
        return card;
      })}
    </div>
  );
};
