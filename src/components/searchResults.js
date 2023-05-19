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
                        "search_widget": {
                          "placeholder": "Search Pantheon Docs",
                          "show_search_suggestions": true,
                          "search_suggestion_position": "left",
                          "default_sortby": "relevance",
                          "display_date": false,
                          "display_meta_description": true,
                          "display_result_image": false,
                          "link_target": "_blank",
                          "hide_logo": false,
                          "direction": "ltr",
                          "api_throttle_time": 2000,
                          "automatic_filter_results_by_site_language": false,
                          "analytics_enabled": true
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
