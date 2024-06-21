
console.log("hello");


const OmniItems = [

  {
    link: "/get-started",
    title: "Get Started",
  },
  {
    link: "/certification",
    title: "WebOps Certification",
    children:
    {
      link: "/certification/about",
      title: "About the Certification Program",
    }
  }
];


function findSubMenuItemsToUse(maximumParent, NestedItems) {
  // recursively search through OmniItems to find the object with the link that matches maximumParent
  // return that object.

console.log(maximumParent);
console.log(NestedItems);

  NestedItems.forEach((item) => {

    if (item.link === maximumParent) {

      console.log('in the if');
      console.log(maximumParent);

      return item;
    }
  });
}


const activeParent = findSubMenuItemsToUse("/certification", OmniItems);

console.log(activeParent);
