import React from "react";
import Link from "next/link";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export function GuideItem(props: {
  url: string;
  text: string;
  image?: string;
}) {
  const { url, text } = props;
  return (
    <Link className={cn("guide-item", styles.guideItem)} href={url}>
      {text}
    </Link>
  );
}
