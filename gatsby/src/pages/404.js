import React from 'react';
import { Link, graphql } from 'gatsby';
import SearchResults from '../components/searchResults';
import Helmet from "react-helmet"
import Layout from '../layout/layout';
import SEO from "../layout/seo"
import SVG404 from  '../../../source/images/404_dark.svg'

class NotFoundPage extends React.Component {
  render() {
    const { pathname } = this.props.location
    const badTitle = pathname.replace(/\//g, '')
    const searchPath = pathname.replace(/\//g, ' ').replace(/-/g, ' ')

    return (
      <Layout>
        <SEO
          title="404"
          description="Zoinks! You've hit a URl that doesn't exist. Let's try a search:"
        />
        <div style={{ marginTop: '-20px' }} className="container">
          <div className=" doc-content-well">
            <div className="mb-70">
              <img className="notfound" src={SVG404} />
              <h2>Sorry, there's no page at <code>{badTitle}</code>.</h2>
              <h3>Wanna <Link to={`/search/?addsearch=${searchPath}`}>Search for {searchPath}</Link>?</h3>
              <h3>Or go <Link to="/"> Back to all docs</Link>?</h3>
            </div>
          </div>
        </div>
      </Layout>
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
