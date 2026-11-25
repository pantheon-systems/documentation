import React, { Dispatch, SetStateAction, useState } from "react";
import { Button, Popover } from "@pantheon-systems/pds-toolkit-react";
import { activeReleaseNoteCategories } from "./release-note-categories";

const ReleaseNotePopoverCategorySelector = ({
  filters,
  setFilters,
  setCurrentPage,
  isDisabled,
  allCategories,
  categories,
  buttonLabel = "Filter by category",
  popoverTitle = "Categories",
}: {
  allCategories: {
    slug: string;
    displayName: string;
    color: string;
    description: string;
  }[];
  filters: {
    categories: { slug: string; displayName?: string }[];
  };
  setFilters: Dispatch<
    SetStateAction<{
      categories: { slug: string; displayName?: string }[];
    }>
  >;
  /** Moves a pager back to the first page. Listings without paging omit it. */
  setCurrentPage?: (page: number) => void;
  isDisabled: boolean;
  categories?: {
    node: {
      frontmatter: {
        categories: string[];
      };
    };
  }[];
  /** Also used by the vulnerability tracker, which filters by status. */
  buttonLabel?: string;
  popoverTitle?: string;
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const activeCategories = allCategories;

  const handleCheckbox = (cat: { slug: string }) => {
    // Find the index of the category in the filters.categories array by matching the slug
    const index = filters.categories.findIndex(
      (category) => category.slug === cat.slug
    );
    let updatedCategories: { slug: string; displayName?: string }[] = [];

    if (index !== -1) {
      // If category is selected, remove it
      updatedCategories = filters.categories.filter(
        (item) => item.slug !== cat.slug
      );
      setFilters((prevState) => ({
        ...prevState,
        categories: updatedCategories,
      }));
    } else {
      // If category is not selected, add it
      updatedCategories = [...filters.categories, cat];
      setFilters((prevState) => ({
        ...prevState,
        categories: [...prevState.categories, cat],
      }));
    }

    // Move pager to the first page
    setCurrentPage?.(1);
  };

  const handleClearCategoriesFilters = () => {
    setFilters((prevState) => ({ ...prevState, categories: [] }));

    // Move pager to the first page
    setCurrentPage?.(1);
  };

  const handlePopoverClose = () => {
    setIsPopoverOpen(false);
  };

  // Set the icon based on the popover state: 'angleUp' if open, 'angleDown' if closed
  const popoverTriggerIcon = isPopoverOpen
    ? ("angleUp" as const)
    : ("angleDown" as const);
  // Popover columns config
  const itemsPerColumn = 7;
  const totalItems = activeCategories.length;
  const totalColumns = Math.ceil(totalItems / itemsPerColumn);

  const popoverContent = (
    <>
      <div className="rn-popover-content" id="popoverContent">
        {/* Create an array, with length defined in `totalColumns` */}
        {Array.from({ length: totalColumns }, (_, columnIndex) => (
          // Iterate over each column
          <div
            key={columnIndex}
            className="rn-popover-content-inner pds-pad-block-start-s@md"
          >
            {/* For each column, render items within the specified range based on `itemsPerColumn`
            and slice `activeCategories` to get the items for the current column. */}
            {activeCategories
              .slice(
                columnIndex * itemsPerColumn,
                (columnIndex + 1) * itemsPerColumn
              )
              .map((item: { slug: string; displayName?: string }) => {
                // Check in the state if the category/item is selected
                const isChecked = filters.categories.some(
                  (category) => category.slug === item.slug
                );
                return (
                  // Render each category/item with a checkbox and label
                  <div
                    key={item.slug}
                    style={{ display: "flex", gap: "8px" }}
                    className="pds-pad-block-end-m category-checkbox-group"
                  >
                    <input
                      type="checkbox"
                      name={item.displayName}
                      id={item.displayName}
                      onChange={() => handleCheckbox(item)}
                      checked={isChecked}
                    />
                    <label
                      htmlFor={item.displayName}
                      className="pds-mar-block-end-none"
                      style={{
                        fontWeight: 400,
                        fontSize: "var(--pds-typography-size-s)",
                      }}
                    >
                      {item.displayName}
                    </label>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
      <Button
        label="Clear all filters"
        variant="subtle"
        size="s"
        onClick={handleClearCategoriesFilters}
      />
    </>
  );

  const popoverTrigger = (
    <Button
      label={buttonLabel}
      size="m"
      variant="secondary"
      iconName={popoverTriggerIcon}
      displayType="icon-end"
      onClick={() => setIsPopoverOpen(true)}
      disabled={isDisabled}
    />
  );

  return (
    <>
      <Popover
        customTrigger={popoverTrigger}
        title={popoverTitle}
        content={popoverContent}
        hasCloseButton={true}
        className={"rn-popover-categories"}
        classNameContainer={"rn-popover-categories"}
        placement="bottom-start"
        onClose={handlePopoverClose}
        offsetValue={4}
      />
    </>
  );
};

export default ReleaseNotePopoverCategorySelector;
