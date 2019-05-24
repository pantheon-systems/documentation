import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

class Index extends React.Component {
  render() {
    return (
      <Layout>
        <div style={{ marginTop: "-20px" }} className="container">
          <div className="row doc-content-well">
            <div className="row">
              <h1 className="title">Documentation Topics</h1>
            </div>
            <div className="row" style={{ marginBottom: "15px" }}>
              <div className="col-md-12">
                <Link to="/docs/guides/quickstart/">
                  <div
                    className="guide-cta-landing"
                    style={{ padding: "25px !important", display: "block" }}
                  >
                    <h1 className="hero-video__guide-cta-title">
                      Quick Start Guide
                      <i
                        className="fa fa-angle-right"
                        style={{ color: "#EFD01B" }}
                      />
                    </h1>
                    <p className="hero-video__guide-cta-subtitle">
                      New to our platform? Check out our step-by-step guide to
                      learn all the basics.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div class="row mb-70">
              <div class="col-md-12" />
            </div>
            <div class="row">
              <div class="col-md-12">
                <h2 class="subtitle">Popular Documentation</h2>
              </div>
            </div>
            <div class="row mb-70">
              <div class="col-md-12">
                <ul class="top-docs top-docs-3col">
                  <li>
                    <Link to="/docs/terminus/">Terminus Manual</Link>
                  </li>
                  <li>
                    <Link to="/docs/redis/">
                      Installing Redis on Drupal or WordPress
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Index
