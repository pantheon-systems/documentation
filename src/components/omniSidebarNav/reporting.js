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
};

const InWrittenPathOrExceptions = (
  linkPath,
  flattened = [],
  allowedExceptions = [],
) => {
  // check any of the exceptions are present in the linkPath
  // if they are, return true
  for (let exception of allowedExceptions) {
    if (linkPath.includes(exception)) {
      return true;
    }
  }

  if (flattened.includes(linkPath)) {
    return true;
  } else {
    return false;
  }
};

const InMenuOrExceptions = (
  linkPath,
  flattened = [],
  allowedExceptions = [],
) => {
  // check any of the exceptions are present in the linkPath
  // if they are, return true
  for (let exception of allowedExceptions) {
    if (linkPath.includes(exception)) {
      return true;
    }
  }

  if (flattened.includes(linkPath)) {
    return true;
  } else {
    return false;
  }
};

const eliminateExceptions = (allPaths, exceptions, RegExExceptions = []) => {
  return allPaths.filter((path) => {
    for (let exception of exceptions) {
      if (path.includes(exception)) {
        return false;
      }
    }
    for (let RegExException of RegExExceptions) {
      //console.log(RegExException);
      if (path.match(RegExException)) {
        return false;
      }
    }
    return true;
  });
};

const CalculateFilteredPathsInMenu = (
  filteredWrittenPaths,
  flattenedOmniItems,
) => {
  // loop over all the filtered paths and check if they are in the menu
  const pathsNotInMenu = [];
  const pathsInMenu = [];
  for (let linkPath of filteredWrittenPaths) {
    if (!flattenedOmniItems.includes(linkPath)) {
      pathsNotInMenu.push(linkPath);
    } else {
      pathsInMenu.push(linkPath);
    }
  }

  const percentageInMenu =
    (pathsInMenu.length / filteredWrittenPaths.length) * 100;

  return {
    pathsInMenu: pathsInMenu,
    pathsNotInMenu: pathsNotInMenu,
    percentageInMenu: percentageInMenu,
    // Round up to the nearest whole number
    percentageInMenuRoundedUp: Math.ceil(percentageInMenu),
  };
};

export {
  flattenOmniItems,
  InMenuOrExceptions,
  eliminateExceptions,
  CalculateFilteredPathsInMenu,
};
