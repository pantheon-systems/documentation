import { Tag } from "@/components/ui/pds-re-export";
import { releaseNoteCategoryLoader } from "./release-note-categories";

/** A release note's categories as tags, in alphabetical order. */
export const ReleaseNoteTags = ({ categories }: { categories: string[] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <span className="pan-docs-tags">
      {[...categories].sort().map((slug) => {
        const category = releaseNoteCategoryLoader(slug);
        return (
          <Tag
            key={slug}
            size="s"
            tagLabel={category?.displayName ?? slug}
            tagColor={category?.color}
          />
        );
      })}
    </span>
  );
};
