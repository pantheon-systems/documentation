"use server";
import React from "react";
import Link from "next/link";
import { processDirectoryForMarkDown } from "@/server/processor/mdx";

export const DNSProviderDocs = async () => {
  const pages = processDirectoryForMarkDown(
    "source/content/dns-providers"
  // This conditional is a somewhat confusing
  // double-negative, but it's necessary to filter out drafts
  ).filter((page) => !page.frontmatter.draft == true);

  return (
    <>
      <ul>
        {pages.map((page, i) => {
          return (
            <li key={i}>
              <Link href={page.fields.slug} title={page.frontmatter.provider}>
                {page.frontmatter.provider}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
