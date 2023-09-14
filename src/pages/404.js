import React from "react"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import SVG404 from "../../source/images/404_dark.svg"

import { Container, FlexContainer } from "@pantheon-systems/pds-toolkit-react"

class NotFoundPage extends React.Component {
  componentDidMount() {
    //On page load...

    window.addsearch_settings = {
      search_widget: {
        placeholder: "Search Pantheon Docs",
        show_search_suggestions: true,
        search_suggestion_position: "left",
        default_sortby: "relevance",
        display_date: false,
        display_meta_description: true,
        display_result_image: false,
        link_target: "_blank",
        hide_logo: false,
        direction: "ltr",
        api_throttle_time: 2000,
        automatic_filter_results_by_site_language: false,
        analytics_enabled: true,
      },
    }

    const script = document.createElement("script") // Loads the Addsearch JS blob from them
    script.setAttribute(
      "src",
      `https://cdn.addsearch.com/v5/addsearch-ui.min.js?key=a7b957b7a8f57f4cc544c54f289611c6&id=search_widget`
    )
    script.setAttribute("defer", true)

    document.body.appendChild(script)
  }

  render() {
    const { pathname } = this.props.location

    return (
      <Layout type="404">
        <SEO
          title="404"
          description="Zoinks! You've hit a URL that doesn't exist. Let's try a search:"
        />
        <Container width="narrow">
          <main className=" doc-content-well" id="docs-main">
            <FlexContainer
              alignContent="start"
              alignItems="center"
              flexDirection="column"
              mobileFlex="same"
              className="pds-spacing-mar-block-end-6xl"
            >
              <h1>Sorry, there's no page at that URL.</h1>
              <img
                className="notfound"
                style={{ maxWidth: 400 }}
                src={SVG404}
              />
            </FlexContainer>
          </main>
        </Container>
      </Layout>
    )
    return <div className="addsearch-container" />
  }
}

export default NotFoundPage
