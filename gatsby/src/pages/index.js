import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container">
          <div className="row doc-content-well">
            <h1>No landing page yet</h1>
            <h4>Try accesing one of the available pages:</h4>
            <ul>
              <li>
                <Link to="/docs/redis">Redis</Link>
              </li>
              <li>
                <Link to="/docs/terminus">Terminus</Link>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
