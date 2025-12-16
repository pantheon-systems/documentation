import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/pds-re-export";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
          src="https://cdn.bfldr.com/MEM5087K/at/933t7sx45wwnmsrrjq94z4f/front-page-hero.png?auto=webp&format=png"
          width={1080}
          height={704}
          alt={"hero image"}
          className={styles.heroImage}
        />
      </div>
      <div
        className="pds-grid-item pds-grid-item--lg-6 hero-cta-text"
        slot="second-item"
      >
        <h1 className={styles.heroTitle}>{title}</h1>
        <p className="pds-lead-text">{subTitle}</p>
        <Link
          href={url}
          className="pds-button pds-button--lg pds-spacing-mar-block-start-m"
        >
          {linkText}
          <Icon iconName="arrowRight" iconSize="lg" />
        </Link>
      </div>
    </div>
  );
}
