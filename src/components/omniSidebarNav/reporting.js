

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

const InWrittenPathOrExceptions = (linkPath, flattened, allowedExceptions = []) => {




  if (flattened.includes(linkPath) || allowedExceptions.includes(linkPath)) {
    return true;
  }
  else {
    return false;
  }
}


const calculateNumberOfPathsInMenu = (ArrayOfPaths, omniItems, allowedExceptions = []) => {

  const pathsInMenuOrExceptions = [];
  const pathsNotInMenuOrExceptions = [];
  const flattened = flattenOmniItems(omniItems);
  // Loop over flattened and check that each item is in allWrittenPaths
  for (let linkPath of ArrayOfPaths) {

    if (InWrittenPathOrExceptions(linkPath, flattened, allowedExceptions)) {
      pathsInMenuOrExceptions.push(linkPath);
    } else {
      pathsNotInMenuOrExceptions.push(linkPath);
    }
  }
  const percentageNotInMenu = (pathsNotInMenuOrExceptions.length / ArrayOfPaths.length) * 100;
  return {
    'pathsInMenuOrExceptions': pathsInMenuOrExceptions,
    'pathsNotInMenuOrExceptions': pathsNotInMenuOrExceptions,
    'percentageNotInMenu': percentageNotInMenu,
    // Round up to the nearest whole number
    'percentageNotInMenuRoundedUp': Math.ceil(percentageNotInMenu),
  }
}

export { flattenOmniItems, exceptions, calculateNumberOfPathsInMenu }
