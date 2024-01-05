import releaseNoteCategoriesObject from "../../source/releasenotescategories/releaseNoteCategories.json"

export const releaseNoteCategoryLoader = function (categorySlug) {
// loop over all releaseNoteCategoriesObject.categories return the first one
// that matches the categorySlug
  for (let i = 0; i < releaseNoteCategoriesObject.categories.length; i++) {
    if (releaseNoteCategoriesObject.categories[i].slug === categorySlug) {
      return releaseNoteCategoriesObject.categories[i]
    }
  }
  // Todo more elegant error handling when category not found.
}
