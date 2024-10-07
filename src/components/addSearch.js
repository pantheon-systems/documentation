import React from "react"

class AddSearch extends React.Component {
  componentDidMount() {
    const resultPage = document.URL
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
        "hide_logo": true,
        "direction": "ltr",
        "api_throttle_time": 2000,
        "automatic_filter_results_by_site_language": false,
        "analytics_enabled": true
      }
    }
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      `https://cdn.addsearch.com/v5/addsearch-ui.min.js?key=a7b957b7a8f57f4cc544c54f289611c6&id=search_widget${
        resultPage.includes("search") ? "&type=resultpage" : ""
      }`
    )
    script.setAttribute("defer", true)

    document.body.appendChild(script)
  }
  render() {
    return <div className="addsearch-container" />
  }
}

export default AddSearch
