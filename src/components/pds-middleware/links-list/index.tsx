import style from "./style.module.css";
import React from "react";
import Link from "next/link";

import { CTALink } from "@/components/ui/pds-re-export";

import { cn } from "@/lib/utils";

export function LinksList(props: {
  title: string;
  links: { url: string; text: string }[];
}) {
  const { links } = props;

  const processedLinks = links.map((link, index) => (
    <li key={index}>
      <CTALink
        className={style.linksListAnchor}
        linkContent={
          <div className={style.linksListAnchor}>
            <Link href={link.url}>{link.text}</Link>
          </div>
        }
      />
    </li>
  ));

  return (
    <ul className={cn(style.linksList, "pds-spacing-mar-block-end-6xl")}>
      {processedLinks}
    </ul>
  );
}
