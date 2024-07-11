

const flattenOmniItems = (menuItems) => {
  // loop over the omniItems and make a flattened array of all the links
  // this function should be recursive.
  // return the array
  let flattened = [];
  for (let item of menuItems) {
    flattened.push(item.link);
    if (item.children) {
      flattened = flattened.concat(flattenOmniItems(item.children));
    }
  }
  // return flattened with duplicates removed
  return [...new Set(flattened)];
}

export { flattenOmniItems }
