

const findSubMenuItemsToUse = function (maximumParent, NestedItems) {
  for (let item of NestedItems) {
    if (item.link === maximumParent) {
      return item;
    }
  }
  return undefined;
}

export {findSubMenuItemsToUse };
