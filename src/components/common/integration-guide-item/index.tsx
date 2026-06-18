import React from "react";
import Link from "next/link";

import { Panel } from "@/components/ui/pds-re-export";

// TODO: FIX this @aniketbiprojit
import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export async function IntegrationGuideItem(props: {
  url: string;
  image: string;
}) {
  const { url, image } = props;

  const imagePath = (await import(`@/source/images/assets/${image}`)).default;

  return (
    <Link
      href={url}
      // className={cn(
      //   "platform-integration__link",
      //   styles.platformIntegrationLink
      // )}
    >
      <Panel
        style={{
          maxWidth: "18rem",
          height: "6rem",
          display: "flex",
          padding: "0",
        }}
        className={cn(
          "platform-integration__container",
          styles.platformIntegrationContainer
        )}
      >
        <img
          alt={image}
          src={imagePath.src}
          style={{
            width: "90%",
          }}
          // className={cn(
          //   "platform-integration__image",
          //   styles.platformIntegrationImage
          // )}
        />
      </Panel>
    </Link>
  );
}
