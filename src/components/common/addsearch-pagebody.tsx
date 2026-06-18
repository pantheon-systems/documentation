'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, TextInput } from "@pantheon-systems/pds-toolkit-react";

// Define the expected global properties for TypeScript compatibility
declare global {
  interface Window {
    AddSearchClient: any;
    AddSearchUI: any;
  }
}

const ADDSEARCH_CLIENT_KEY = 'a7b957b7a8f57f4cc544c54f289611c6';

export const AddSearchClientComponent: React.FC = () => {
  const searchParams = useSearchParams();

  /**
   * Initializes the AddSearch UI components after the scripts are loaded.
   */
  const addSearchStuff = () => {
    if (typeof window.AddSearchClient === 'undefined' || typeof window.AddSearchUI === 'undefined') {
      console.error('AddSearch scripts not loaded correctly.');
      return;
    }

    const initialQuery = searchParams.get('search');
    const client = new window.AddSearchClient(ADDSEARCH_CLIENT_KEY);

    const searchui_conf = {
      searchResultsPageUrl: 'search',
      initialSearchQuery: initialQuery || '',
    };

    // Search UI instance
    const searchui = new window.AddSearchUI(client, searchui_conf);

    searchui.searchField({
      containerId: 'search',
      searchAsYouType: true,
      selectorToBind: '.pds-text-input__input',
      ignoreSearchResultsPageUrl: true,
    });
    searchui.searchResults({
      containerId: 'results',
    });
    searchui.pagination({
      containerId: 'pagination',
    });
    // All components added. Start
    searchui.start();
  };

  /**
   * Loads the external scripts and CSS, and runs the setup function.
   */
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (e) => {
          console.error(`Failed to load script: ${src}`, e);
          reject(e);
        };
        document.body.appendChild(script);
      });
    };

    const loadCss = (href: string) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        return;
      }
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    };

    // Load the CSS file
    const CSS_HREF = `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.css`;
    loadCss(CSS_HREF);

    // Load the two JS files sequentially and then call the setup function
    const JS_CLIENT = `https://cdn.jsdelivr.net/npm/addsearch-js-client@0.8/dist/addsearch-js-client.min.js`;
    const JS_UI = `https://cdn.jsdelivr.net/npm/addsearch-search-ui@0.7/dist/addsearch-search-ui.min.js`;

    Promise.all([
      loadScript(JS_CLIENT),
      loadScript(JS_UI),
    ]).then(() => {
      // Scripts are loaded, now initialize the UI
      addSearchStuff();
    }).catch(error => {
      console.error("Error loading AddSearch scripts:", error);
    });

  }, [searchParams]);

  return (
    <Container width="standard" className="search-results">
      <div className="search-results__heading">
        <h1>Search Results</h1>
      </div>

        <TextInput
          id="search"
          placeholder={searchParams.get('search') || ''}
          type="search"
          data-addsearch-id="search_widget"
          label="Search Pantheon Documentation"
          showLabel={false}
          className="pds-text-input__input"
        />

      <div className="addsearch search-results__items" id="results"></div>
      <div className="search-results__pager" id="pagination"></div>
    </Container>
  );
};
