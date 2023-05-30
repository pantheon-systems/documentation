import React from "react"
import { Helmet } from "react-helmet"

class SearchResults extends React.Component {
  render() {
    return (
      <div className="addsearch-container">
        <Helmet>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                        function parseParamsFromUrl() {
                        var queryString = window.location.search;
                            queryString = queryString.substring(11);
                            queryString = queryString.split("+").join(" ");
                        return queryString;
                        }
                        var urlParams = parseParamsFromUrl();
                        document.getElementById('piodocsearch').setAttribute('value', urlParams);
                    `,
            }}
          />
        </Helmet>

        <div id="addsearch-results"></div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
                    window.addsearch_settings = {
                      "arp_01": {
                        "show_search_suggestions": false,
                        "automatic_match_all_query": false,
                        "default_sortby": "relevance",
                        "display_category": true,
                        "display_date": false,
                        "display_meta_description": false,
                        "display_results_count": true,
                        "display_result_image": true,
                        "display_url": false,
                        "display_sortby": true,
                        "link_target": "_self",
                        "hide_logo": false,
                        "direction": "ltr",
                        "analytics_enabled": false,
                        "automatic_filter_results_by_site_language": false,
                        "facets": {}
                      }
                    }
                    `,
          }}
        />
      </div>
    )
  }
}

export default SearchResults
