import releaseNoteCategoriesObject from "@/source/releasenotescategories/releaseNoteCategories.json";

export const releaseNoteCategoryLoader = function (categorySlug: string) {
  // loop over all releaseNoteCategoriesObject.categories return the first one
  // that matches the categorySlug
  for (let i = 0; i < releaseNoteCategoriesObject.categories.length; i++) {
    if (releaseNoteCategoriesObject.categories[i].slug === categorySlug) {
      return releaseNoteCategoriesObject.categories[i];
    }
  }
  // Todo more elegant error handling when category not found.
};

// Function to determine active release notes categories.
// Checks all releasenotes for categories in use, then compares to approved categories.
export const activeReleaseNoteCategories = (
  releasenotes: {
    node: {
      frontmatter: {
        categories: string[];
      };
    };
  }[]
) => {
  // Determine which categories are in use via slug.
  const categoriesInUse: string[] = [];
  releasenotes.map((releasenote) => {
    const releasenoteCategories = releasenote.node.frontmatter.categories;

    if (releasenoteCategories) {
      releasenoteCategories.map((releasenoteCategory: string) => {
        if (!categoriesInUse.includes(releasenoteCategory)) {
          categoriesInUse.push(releasenoteCategory);
        }
      });
    }
  });

  // Get all approved categories from releaseNoteCategories.json.
  const allCategories: { slug: string; displayName: string }[] = [];
  releaseNoteCategoriesObject.categories.map((category) => {
    allCategories.push({
      slug: category.slug,
      displayName: category.displayName,
    });
  });

  // Make sure each item in the categoriesInUse array is a valid category, then create array of objects.
  const activeCategories: { slug: string; displayName: string }[] = [];
  categoriesInUse.map((category) => {
    const categoryObject = allCategories.find((item) => item.slug === category);
    if (categoryObject) {
      activeCategories.push(categoryObject);
    }
  });

  // Sort the categories alphabetically by display name.
  activeCategories.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

  return JSON.stringify(activeCategories);
};
