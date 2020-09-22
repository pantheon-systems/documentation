import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import './style.css';
//import AddSearch from "../../components/addSearch"
import Search from "../../components/search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const Header = ({ data, page }) => (
  <>
    <nav className="navbar navbar-fixed-top pio-docs-nav" role="navigation" id="header">
    <div id="skiptocontent"><a href="#docs-main">skip to main content</a></div>
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle"
          data-toggle="collapse"
          data-target="#navbar"
        >
          <span className="sr-only">Toggle navigation</span>
          <i className="fa fa-bars" />
        </button>
        <div className="docs">
          <a className="" href="https://pantheon.io/">
            <img
              alt="Pantheon Logo"
              className="pantheon-logo"
              src={data.logo.childImageSharp.fluid.src}
            />
          </a>
        </div>
        <button
          type="button"
          className="navbar-toggle search"
          data-toggle="collapse"
          data-target="#search-bar"
        >
          <span className="sr-only">Toggle search</span>
          <i className="fa fa-search" />
        </button>
      </div>
      <div id="navbar" className="main-navbar navbar-collapse collapse">
        <ul className="nav navbar-nav">
          <li className="create-account">
            <a
              href="https://pantheon.io/register"
              target="_blank"
              rel="noopener"
              className="ctaBtn cta cta-yellow docs-cta"
            >
              Get Free Account
            </a>
          </li>
          <li className="">
            <a
              href="https://dashboard.pantheon.io"
              target="_blank"
              rel="noopener"
            >
              Log In
            </a>
          </li>
          <li className="">
            <a
              href="https://dashboard.pantheon.io/#support/support/all"
              target="_blank"
              rel="noopener"
            >
              Support
            </a>
          </li>
          <li className="dropdown">
            <a
              href="/docs"
              className="dropdown-toggle active-trail"
              role="button"
              aria-haspopup="true"
              style={{ paddingLeft: "15px", paddingRight: "25px" }}
            >
              Documentation
            </a>

            <ul id="dropmenu" className="dropdown-menu">
              <div className="row sub-menu-top">
                <div className="col-xs-6">
                  <li>
                      <Link id="get-started" to="/get-started">
                      Get Started
                      </Link>
                  </li>
                  <li>
                    <Link id="develop" to="/develop">
                      Develop
                    </Link>
                  </li>
                  <li>
                    <Link id="go-live" to="/go-live">
                      Go Live
                    </Link>
                  </li>
                  <li>
                    <Link id="platform" to="/platform">
                      Explore Platform Architecture
                    </Link>
                  </li>
                </div>

                <div className="col-xs-6">
                  <li>
                    <Link id="automate" to="/automate">
                      Automate & Integrate
                    </Link>
                  </li>
                  <li>
                    <Link id="performance" to="/performance">
                      Optimize Performance
                    </Link>
                  </li>
                  <li>
                    <Link id="manage" to="/manage">
                      Manage Teams & Organizations
                    </Link>
                  </li>
                  <li>
                    <Link id="troubleshoot" to="/troubleshoot">
                      Troubleshoot
                    </Link>
                  </li>
                </div>
              </div>

              <div className="row sub-menu-bottom">
                <div className="col-xs-12">
                  <li>
                    <Link id="changelogs" to="/changelog">
                      Changelog
                    </Link>
                  </li>
                  <li>
                    <Link id="getting-started-guide" to="/guides/">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link id="terminus" to="/terminus">
                      Terminus Manual
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </li>
        </ul>
      </div>
      <div id="search-bar" className="search-bar navbar-collapse collapse">
        <div className="navsearch-container">
          <div className="navsearch form-group has-feedback">
            <div className="container container-navsearch-box-guide">
              <Search indices={searchIndices} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  </>
)

export default props => (

  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "Pantheon_Color_rev_clear.png" }) {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)
