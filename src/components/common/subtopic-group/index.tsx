"use client";

import React from "react";
import Link from "next/link";

import {
  Container,
  Icon,
  Panel,
  type PDSIcon,
} from "@/components/ui/pds-re-export";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";

export function SubTopicGroup(props: {
  title: string;
  subTitle: string;
  topics: {
    title: string;
    links: { text: string; url: string; icon?: string }[];
  }[];
}) {
  const { title, subTitle, topics } = props;
  return (
    <Container width="full">
      <Panel>
        <h2 className={cn(styles.subtopic__heading, "text-3xl font-bold")}>
          {title}
        </h2>
        {subTitle && (
          <p className="pds-lead-text pds-lead-text--sm">{subTitle}</p>
        )}
        <hr />
        {topics &&
          topics.map((topic) => (
            <div key={topic.title} className={styles["subtopic__list-group"]}>
              {topic.title && (
                <h3 className="text-2xl font-bold">{topic.title}</h3>
              )}
              <ul className={styles.subtopic__list}>
                {topic.links &&
                  topic.links.map((link, idx) => (
                    <li key={`${link.url}-${idx}`}>
                      <Link href={link.url ?? "#"}>
                        {link.icon && (
                          <Icon
                            iconName={link.icon as PDSIcon}
                            iconSize="lg"
                            className={styles.subtopic__icon}
                          />
                        )}
                        {link.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </Panel>
    </Container>
  );
}
