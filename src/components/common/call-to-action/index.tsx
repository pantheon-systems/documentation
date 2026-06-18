"use client";

import Link from "next/link";

import { CTALink } from "@/components/ui/pds-re-export";

import "./styles.css";

export function CallToAction(props: {
  dark: boolean;
  url: string;
  title: string;
  subTitle: string;
  type?: string;
}) {
  const { url, title, type, subTitle, dark } = props;
  const linkContent = /https?/.test(url) ? (
    <a href={url}>{title}</a>
  ) : (
    <Link href={url}>{title}</Link>
  );

  return (
    <div className={`call-to-action ${dark && "call-to-action--alt"}`}>
      <div className="pds-overline-text pds-overline-text--sm">{type}</div>
      <CTALink linkContent={linkContent} />
      <p className="call-to-action__subtitle">{subTitle}</p>
    </div>
  );
}
