import React from "react"

class TOC extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const windowGlobal = typeof window !== "undefined" && window

    if (windowGlobal && windowGlobal.tocbot) {
      windowGlobal.tocbot.init({
        // Where to render the table of contents.
        tocSelector: ".toc-placeholder",
        // Where to grab the headings to build the table of contents.
        contentSelector: "#doc",
        orderedList: false,
        headingSelector: "h1, h2, h3",
      })
    }
  }

  render() {
    const { title } = this.props

    return (
      <div id="toc" className="tocbot">
        <h4>{title || "Table of Contents"}</h4>
        <div className="toc-placeholder" />
      </div>
    )
  }
}

export default TOC
