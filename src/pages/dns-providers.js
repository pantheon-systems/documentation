import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../layout/layout"
import SEO from "../layout/seo"
import DNSProviderDocs from "../components/dns-provider-docs"

{
  /* @TODO Convert to a React Component */
}
const previewFlexPanelItem = {
  flex: "1 46%",
  margin: "0px 0px 15px 15px",
  color: "#333",
}

class dnsProviders extends React.Component {
  render() {
    return (
      <>
        <SEO title="DNS Providers" />
        <Layout>
          <div style={{ marginTop: "-20px" }} className="container">
            <div className="container doc-content-well">
              <div className="row">
                <h1 className="title">DNS Providers</h1>
              </div>
              <div className="row mb-70">
                <DNSProviderDocs />
              </div>
            </div>
          </div>
        </Layout>
      </>
    )
  }
}

export default dnsProviders
