import React from "react"

class AddSearch extends React.Component {
  componentDidMount() {
    const resultPage = document.URL
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
