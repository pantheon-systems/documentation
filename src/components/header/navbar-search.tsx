"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef } from "react";
import { TextInput } from "@/components/ui/pds-re-export";
import AddSearchWidget from "@/components/common/addsearch";

// The search field in the Navbar's `search` slot (the PDS docs site prototype).
// The AddSearch widget attaches its suggestions dropdown to the input through
// data-addsearch-id; submitting goes to the search results page.
// `slot` is read by the Navbar, which places this component in its search slot.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const NavbarSearch = (_props: { slot?: string }) => {
  const router = useRouter();
  const container = useRef<HTMLFormElement>(null);

  // "/" focuses the search, as the shortcut hint in the field says.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }
      const target = event.target as HTMLElement | null;
      if (
        target?.closest("input, textarea, select, [contenteditable='true']")
      ) {
        return;
      }
      const input = container.current?.querySelector("input");
      if (input) {
        event.preventDefault();
        input.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const term = (
      event.currentTarget.elements.namedItem("search") as HTMLInputElement
    )?.value.trim();
    if (term) router.push(`/search?search=${encodeURIComponent(term)}`);
  };

  return (
    <form ref={container} role="search" onSubmit={submit}>
      <TextInput
        id="search"
        type="search"
        label="Search docs"
        showLabel={false}
        placeholder="Search docs"
        hasSearchShortcut
        data-addsearch-id="search"
      />
      <Script id="addsearch-settings">
        {`
            window.addsearch_settings = {
              "search": {
                "placeholder": "Search docs",
                "show_search_suggestions": true,
                "search_suggestion_position": "left",
                "default_sortby": "relevance",
                "display_date": false,
                "display_meta_description": false,
                "display_result_image": false,
                "link_target": "_blank",
                "hide_logo": true,
                "direction": "ltr",
                "api_throttle_time": 2000,
                "automatic_filter_results_by_site_language": false,
                "analytics_enabled": true
              }
            }`}
      </Script>
      <AddSearchWidget />
    </form>
  );
};
