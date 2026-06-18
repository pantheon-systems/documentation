import React from "react";
import { Tag } from "@/components/ui/pds-re-export";
import Link from "next/link";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { ProcessedJsonFile } from "@/server/processor/json";

const releaseNoteCategoryLoader = async (
  categorySlug: string,
  categories: ProcessedJsonFile[]
) => {
  const categoriesObject: {
    slug: string;
    displayName: string;
    color: string;
  }[] = categories[0].content.categories;

  for (let i = 0; i < categoriesObject.length; i++) {
    if (categoriesObject[i].slug === categorySlug) {
      return categoriesObject[i];
    }
  }

  return {
    displayName: categorySlug,
    color: "blue",
  };
};

const ReleaseNoteCategories = async ({
  categories,
  displayType,
  className,
  isLinkable = true,
  allCategoriesData,
}: {
  categories: string[];
  displayType: "page" | "list";
  className?: string;
  isLinkable?: boolean;
  allCategoriesData: ProcessedJsonFile[];
}) => {
  if (!categories) {
    return null;
  }

  // If there is one category display the singular form.
  const categoryHeading = categories.length === 1 ? "Category:" : "Categories:";

  // Change heading level based on displayType prop.
  const HeadingLevel = displayType === "page" ? "h2" : "h3";

  // Put categories in alphabetical order.
  const sortedCategories = categories.sort();

  return (
    <div className={className}>
      <HeadingLevel className="visually-hidden">{categoryHeading}</HeadingLevel>
      <div
        className={cn("docs-release-notes-tags", styles.docsReleaseNotesTags)}
      >
        {sortedCategories.map(async (categorySlug, index) => (
          <Tag
            key={index}
            linkContent={
              isLinkable && (
                <Link href={`/release-notes?category=${categorySlug}`} />
              )
            }
            tagLabel={
              (await releaseNoteCategoryLoader(categorySlug, allCategoriesData))
                .displayName
            }
            tagColor={
              (await releaseNoteCategoryLoader(categorySlug, allCategoriesData))
                .color
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReleaseNoteCategories;
