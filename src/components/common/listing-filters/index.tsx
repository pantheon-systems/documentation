"use client";

import { Button, CheckboxGroup } from "@/components/ui/pds-re-export";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * The checkbox filter in a listing's sidebar (release notes by category, the
 * vulnerability tracker by status) with "Clear all". The selection lives in a
 * URL param, repeated for several, so the server renders the filtered list and
 * the keyword search reads it too. Changing it goes back to `basePath`, the
 * listing's first page.
 */
export const ListingFilters = ({
  paramName,
  basePath,
  label,
  idPrefix,
  options,
}: {
  paramName: string;
  basePath: string;
  label: string;
  idPrefix: string;
  options: { value: string; label: string }[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams?.getAll(paramName) ?? [];

  const select = (values: string[]) => {
    const query = values
      .map((value) => `${paramName}=${encodeURIComponent(value)}`)
      .join("&");
    router.push(`${basePath}${query ? `?${query}` : ""}`, { scroll: false });
  };

  return (
    <div className="pan-docs-filters">
      <div>
        {/* Keyed on the selection so the checkboxes follow the URL, including
          after "Clear all" or the browser's back button. */}
        <CheckboxGroup
          key={selected.join("|")}
          id={idPrefix}
          label={label}
          labelVariant="heading"
          options={options.map((option) => ({
            id: `${idPrefix}-${option.value}`,
            label: option.label,
            value: option.value,
            checked: selected.includes(option.value),
          }))}
          onValueChange={select}
        />
        <Button
          className="pan-docs-filters__clear"
          label="Clear all"
          variant="subtle"
          size="s"
          onClick={() => select([])}
          disabled={selected.length === 0}
        />
      </div>
    </div>
  );
};
