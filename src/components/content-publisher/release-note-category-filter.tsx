"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Popover, Tag } from "@pantheon-systems/pds-toolkit-react";
import {
  categoriesHref,
  type ReleaseNoteCategory,
} from "@/lib/content-publisher/release-note-categories";

// Replicates the markdown listing's "Filter by category" popover
// (src/templates/release-note-listing/client-component.tsx and
// release-note-popover-category-selector.tsx). The selection lives in the
// URL (?category=...), so every change is a navigation.

const ITEMS_PER_COLUMN = 7;

const normalize = (category: string) => category.trim().toLowerCase();

export default function ReleaseNoteCategoryFilter({
  options,
  selected,
}: {
  options: ReleaseNoteCategory[];
  /** Currently selected categories, as display names. */
  selected: ReleaseNoteCategory[];
}) {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Update checkboxes and tags immediately, then re-sync from the URL once
  // the navigation completes and the server passes a new `selected`.
  const [current, setCurrent] = useState(selected);
  const selectedSignature = selected.map((c) => c.name).join("\n");
  useEffect(() => {
    setCurrent(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSignature]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const selectedKeys = new Set(current.map((c) => normalize(c.name)));

  const navigate = (categories: ReleaseNoteCategory[]) => {
    setCurrent(categories);
    router.push(categoriesHref(categories.map((c) => c.name)));
  };

  const toggle = (category: ReleaseNoteCategory) => {
    navigate(
      selectedKeys.has(normalize(category.name))
        ? current.filter((c) => normalize(c.name) !== normalize(category.name))
        : [...current, category],
    );
  };

  const totalColumns = Math.ceil(options.length / ITEMS_PER_COLUMN);

  const popoverContent = (
    <>
      <div className="rn-popover-content" id="popoverContent">
        {Array.from({ length: totalColumns }, (_, columnIndex) => (
          <div
            key={columnIndex}
            className="rn-popover-content-inner pds-spacing-pad-block-start-s@md"
          >
            {options
              .slice(
                columnIndex * ITEMS_PER_COLUMN,
                (columnIndex + 1) * ITEMS_PER_COLUMN,
              )
              .map((item) => {
                const id = `rn-category-${normalize(item.name).replace(/[^a-z0-9]+/g, "-")}`;
                return (
                  <div
                    key={item.name}
                    style={{ display: "flex", gap: "8px" }}
                    className="pds-spacing-pad-block-end-m category-checkbox-group"
                  >
                    <input
                      type="checkbox"
                      name={item.name}
                      id={id}
                      onChange={() => toggle(item)}
                      checked={selectedKeys.has(normalize(item.name))}
                    />
                    <label
                      htmlFor={id}
                      className="pds-spacing-mar-block-end-none"
                      style={{
                        fontWeight: 400,
                        fontSize: "var(--pds-typography-size-s)",
                      }}
                    >
                      {item.name}
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
        size="sm"
        onClick={() => navigate([])}
      />
    </>
  );

  const popoverTrigger = (
    <Button
      label="Filter by category"
      size="md"
      variant="secondary"
      iconName={isPopoverOpen ? "angleUp" : "angleDown"}
      displayType="icon-end"
      onClick={() => setIsPopoverOpen(true)}
      disabled={!isLoaded}
    />
  );

  return (
    <div
      style={{
        borderBottom: "1px solid var(--pds-color-border-default)",
        paddingBlockEnd: "var(--pds-spacing-3xl)",
        paddingBlockStart: "var(--pds-spacing-m)",
      }}
    >
      <div className="rn-popover-trigger-and-tags">
        <Popover
          customTrigger={popoverTrigger}
          title="Categories"
          content={popoverContent}
          hasCloseButton={true}
          className="rn-popover-categories"
          classNameContainer="rn-popover-categories"
          placement="bottom-start"
          onClose={() => setIsPopoverOpen(false)}
          offsetValue={18}
        />
        <div className="rn-tags-list">
          {current.map((item) => (
            <Tag
              key={item.name}
              tagLabel={item.name}
              tagColor={item.color}
              onRemove={() => toggle(item)}
              isRemovable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
