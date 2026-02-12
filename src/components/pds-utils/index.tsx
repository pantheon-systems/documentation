import React, { Children, isValidElement } from "react";

export const initiateSlots = (children: React.ReactNode) => {
  const slots: { [key: string]: React.ReactNode[] } = {};
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      const slotName = (child as any).props.slot;
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
export const mergeClasses = (styles: string[]) =>
  styles.join(" ").trim().replace(/\s+/g, " ");
