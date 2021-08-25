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
                        display_url: true,
                        display_resultscount: true,
                        display_date: true,
                        display_sortby: true,
                        display_category: true
                    }
                    `,
          }}
        />
      </div>
    )
  }
}

export default SearchResults
