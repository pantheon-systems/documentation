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
                        "display_meta_description": true,
                        "display_result_image": false,
                        "hide_logo": true,
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
