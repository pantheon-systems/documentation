"use client";

// A client component: the link is a next/link element, which a server component
// can't pass to the PDS client components.
import React from "react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/pds-re-export";
import Image from "next/image";
import { cn } from "@/lib/utils";
import heroImage from "@/source/images/homepage.png";

import styles from "./styles.module.css";

type Props = {
  dark?: boolean;
  url: string;
  title: string;
  subTitle: string;
  type?: string;
  linkText?: string;
};

export function HeroCTA(props: Props) {
  const { url, title, subTitle, linkText } = props;

  return (
    <div className={cn("pds-grid", styles.heroCta)}>
      <div
        className={cn("pds-grid-item pds-grid-item--lg-6", styles.heroCtaImage)}
        slot="first-item"
      >
        <Image
          src={heroImage}
          alt={"hero image"}
          className={styles.heroImage}
        />
      </div>
      <div
        className="pds-grid-item pds-grid-item--lg-6 hero-cta-text"
        slot="second-item"
      >
        <h1 className={`pds-heading-4xl ${styles.heroTitle}`}>{title}</h1>
        <p className="docs-lead-text">{subTitle}</p>
        <div className="pds-mar-block-start-m">
          <ButtonLink
            displayType="icon-end"
            iconName="arrowRight"
            linkContent={<Link href={url}>{linkText}</Link>}
            size="m"
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
}
