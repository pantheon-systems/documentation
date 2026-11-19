import Link from "next/link";
import { Tag } from "@/components/ui/pds-re-export";
import { cn } from "@/lib/utils";
import styles from "@/components/common/release-note-categories/style.module.css";
import {
  categoryHref,
  getCategoryColor,
} from "@/lib/content-publisher/release-note-categories";

// Same markup as src/components/common/release-note-categories, but for the
// Content Publisher "category" field (display names) and /releasenotes links.
export default function ReleaseNoteCategories({
  categories,
  className,
}: {
  categories: string[];
  className?: string;
}) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h2 className="visually-hidden">
        {categories.length === 1 ? "Category:" : "Categories:"}
      </h2>
      <div
        className={cn("docs-release-notes-tags", styles.docsReleaseNotesTags)}
      >
        {[...categories].sort().map((category) => (
          <Tag
            key={category}
            linkContent={<Link href={categoryHref(category)} />}
            tagLabel={category}
            tagColor={getCategoryColor(category)}
          />
        ))}
      </div>
    </div>
  );
}
