import React, { Component } from "react"

class Header extends Component {
  render() {
    return (
      <>
        <div className="navbar navbar-fixed-top pio-docs-nav" role="navigation">
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
                  src="/source/docs/assets/images/Pantheon_Color_rev_clear.png"
                />
              </a>
            </div>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li className="create-account">
                <a
                  href="https://pantheon.io/register"
                  target="_blank"
                  className="cta cta-yellow"
                >
                  Get Free Account
                </a>
              </li>
              <li className="">
                <a href="https://dashboard.pantheon.io" target="_blank">
                  Log In
                </a>
              </li>
              <li className="">
                <a
                  href="https://dashboard.pantheon.io/#support/support/all"
                  target="_blank"
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
                  aria-expanded="false"
                 style={{ paddingLeft:'15px', paddingRight:'25px'}}
                >
                  Documentation
                </a>

                <ul id="dropmenu" className="dropdown-menu">
                  <div className="row sub-menu-top">
                    <div className="col-xs-6">
                      <li>
                        <a id="get-started" href="/docs/get-started">
                          Get Started
                        </a>
                      </li>
                      <li>
                        <a id="develop" href="/docs/develop">
                          Develop
                        </a>
                      </li>
                      <li>
                        <a id="go-live" href="/docs/go-live">
                          Go Live
                        </a>
                      </li>
                      <li>
                        <a id="platform" href="/docs/platform">
                          Explore Platform Architecture
                        </a>
                      </li>
                    </div>

                    <div className="col-xs-6">
                      <li>
                        <a id="automate" href="/docs/automate">
                          Automate & Integrate
                        </a>
                      </li>
                      <li>
                        <a id="performance" href="/docs/performance">
                          Optimize Performance
                        </a>
                      </li>
                      <li>
                        <a id="manage" href="/docs/manage">
                          Manage Teams & Organizations
                        </a>
                      </li>
                      <li>
                        <a id="troubleshoot" href="/docs/troubleshoot">
                          Troubleshoot
                        </a>
                      </li>
                    </div>
                  </div>

                  <div className="row sub-menu-bottom">
                    <div className="col-xs-12">
                      <li>
                        <a id="changelogs" href="/docs/changelog">
                          Changelog
                        </a>
                      </li>
                      <li>
                        <a id="getting-started-guide" href="/docs/guides/">
                          Guides <span className="label label-info">NEW</span>
                        </a>
                      </li>
                      <li>
                        <a id="terminus" href="/docs/terminus">
                          Terminus Manual
                        </a>
                      </li>
                    </div>
                  </div>
                </ul>
              </li>
            </ul>
            <div className="navsearch-container">
              <div className="navsearch form-group has-feedback">
                <div className="container container-navsearch-box">
                <form id="searchform" action="/docs/search" acceptCharset="UTF-8" encType="application/x-www-form-urlencoded">
                    <input type="search" className="addsearch"  placeholder="Search Pantheon Documentation" />
                </form>

                  <span
                    className="glyphicon glyphicon-search form-control-feedback"
                    aria-hidden="true"
                  />
                  <span className="sr-only">(search)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Header
