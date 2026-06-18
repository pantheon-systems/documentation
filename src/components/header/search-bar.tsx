"use client";
import Script from "next/script";

import { FormEventHandler, useEffect, useState } from "react";
import { Container, TextInput } from "@pantheon-systems/pds-toolkit-react";
import styles from "./search-bar.module.css";
import AddSearchWidget from "../common/addsearch";

export default function SearchBar() {
  const [defaultSearchQuery, setDefaultSearchQuery] = useState<
    string | null | undefined
  >(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setDefaultSearchQuery(params.get("q"));
    }
  }, []);

  return (
    <Container width={"wide"} className={styles.searchContainer}>
      <div className={styles.desktopSearch}>
        <SearchBarForm defaultSearchQuery={defaultSearchQuery} />
      </div>
    </Container>
  );
}

function SearchBarForm({}: {
  defaultSearchQuery?: string | null | undefined;
}) {
  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const searchQuery = e.currentTarget.elements.namedItem(
      "search"
    ) as HTMLInputElement;
    window.location.href = `/search?search=${encodeURIComponent(searchQuery.value)}`;
  };

  return (
    <form onSubmit={onSubmit} className={styles.searchForm}>
      <TextInput
        id="search"
        placeholder="Search Pantheon Documentation"
        type="search"
        data-addsearch-id="search"
        label="Search Pantheon Documentation"
        showLabel={false}
        className={styles.searchInput}
      />
          <Script dangerouslySetInnerHTML={{
              __html: `
                window.addsearch_settings = {
                  "search": {
                    "placeholder": "Search Pantheon Docs",
                    "show_search_suggestions": true,
                    "search_suggestion_position": "left",
                    "default_sortby": "relevance",
                    "display_date": false,
                    "display_meta_description": true,
                    "display_result_image": false,
                    "link_target": "_blank",
                    "hide_logo": true,
                    "direction": "ltr",
                    "api_throttle_time": 2000,
                    "automatic_filter_results_by_site_language": false,
                    "analytics_enabled": true
                  }
                }`,
            }}
        />
       <AddSearchWidget />
    </form>
  );
}
