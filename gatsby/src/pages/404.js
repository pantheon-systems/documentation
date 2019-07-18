import React from "react"
// import { graphql } from "gatsby"

// import Layout from "../layout/layout"
// import SEO from "../layout/seo"

class NotFoundPage extends React.Component {
  render() {
    // const { data } = this.props
    // const siteTitle = data.site.siteMetadata.title

    return (
      <div>404</div>
      // <Layout location={this.props.location} title={siteTitle}>
      //   <SEO title="404: Not Found" />
      //   <h1>Not Found</h1>
      //   <p>You just hit a route that doesn&#39;t exist... the sadness...</p>
      // </Layout>
    )
  }
}

export default NotFoundPage

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
