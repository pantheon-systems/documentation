import React, { PropsWithChildren } from "react";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export const Example = ({ children }: PropsWithChildren) => (
  <div className={cn(styles.styleExample, "styleExample", "style-example")}>
    {children}
  </div>
);
