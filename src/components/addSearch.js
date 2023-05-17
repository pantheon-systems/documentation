import React from "react"

class AddSearch extends React.Component {
  componentDidMount() {
    const resultPage = document.URL
    const script = document.createElement("script")
    script.setAttribute(
      "src",
      `https://cdn.addsearch.com/v5/addsearch-ui.min.js?key=a77fb1eb2c3c8fafe2b301824369ed97&id=search_widget${
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
