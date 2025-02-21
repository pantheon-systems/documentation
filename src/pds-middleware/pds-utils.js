import { Children, isValidElement } from 'react';

// Function to generate a random ID.
export const createRandomID = () => {
  return Math.random().toString(32).substring(2, 13);
};

// Function to collect all descendants of an element.
export const getDescendants = (node, collect) => {
  // Check for children first.
  if (!node?.childNodes) {
    return;
  }

  // Collect all children.
  let i;
  collect = collect || [];
  for (i = 0; i < node.childNodes.length; i++) {
    collect.push(node.childNodes[i]);
    getDescendants(node.childNodes[i], collect);
  }
  return collect;
};

// Function to initiate slots from a children prop.
export const initiateSlots = (children) => {
  const slots = {};
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const slotName = child.props.slot;
      if (slotName) {
        if (slots[slotName]) {
          slots[slotName].push(child);
        } else {
          slots[slotName] = [child];
        }
      }
    }
  });
  return slots;
};

// Function to merge css classes
export const mergeClasses = (styles) =>
  styles.join(' ').trim().replace(/\s+/g, ' ');
