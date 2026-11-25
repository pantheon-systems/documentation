import type { TagColor } from "@pantheon-systems/pds-toolkit-react";
import releaseNoteCategoriesObject from "@/source/releasenotescategories/releaseNoteCategories.json";

export const releaseNoteCategoryLoader = function (categorySlug: string) {
  // loop over all releaseNoteCategoriesObject.categories return the first one
  // that matches the categorySlug
  for (let i = 0; i < releaseNoteCategoriesObject.categories.length; i++) {
    if (releaseNoteCategoriesObject.categories[i].slug === categorySlug) {
      const category = releaseNoteCategoriesObject.categories[i];
      // The JSON import types color as string; the values are PDS tag colors.
      return { ...category, color: category.color as TagColor };
    }
  }
  // Todo more elegant error handling when category not found.
};
