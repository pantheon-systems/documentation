import React from "react"
import ghlogo from "../../../source/images/github-logo.svg"
import circlelogo from "../../../source/images/circleci-logo.svg"
import composerlogo from "../../../source/images/composer-logo.svg"

const BuildTools = ({}) => {
  const h4Style = `margin-top:10px;fontSize:larger`
  return (
    <>
      <div className="flex-panel-group">
        <div className="flex-panel-item">
          <div className="flex-panel-body">
            <div className="flex-panel-title">
              <h4
                className="info"
                style={{ marginTop: "10px", fontSize: "larger" }}
              >
                GitHub
              </h4>
              <div className="pantheon-official">
                <img
                  alt="GitHub Logo"
                  src={ghlogo}
                  className="mainTopic-info__plugin-image"
                  style={{ maxWidth: "40px", marginBottom: "10px!important" }}
                />
                <p className="pantheon-official"></p>
              </div>
            </div>
            <p className="topic-info__description">
              <a href="https://github.com" className="external">
                GitHub
              </a>{" "}
              is an online service that provides cloud storage Git repositories
              that may be cloned and used locally, or edited directly through
              their web-based management interface. These features are very
              useful to teams collaborating on a project together.
            </p>
          </div>
        </div>
        <div className="flex-panel-item">
          <div className="flex-panel-body">
            <div className="flex-panel-title">
              <h4
                className="info"
                style={{ marginTop: "10px", fontSize: "larger" }}
              >
                CircleCI
              </h4>
              <div className="pantheon-official">
                <img
                  alt="CircleCI Logo"
                  src={circlelogo}
                  className="main-topic-info__plugin-image"
                  style={{ maxWidth: "40px", marginBottom: "10px!important" }}
                />
                <p className="pantheon-official"></p>
              </div>
            </div>
            <p className="topic-info__description">
              <a href="https://circleci.com" className="external">
                CircleCI
              </a>{" "}
              provides hosted services to run automated tests for a project, and
              GitHub provides an integration to run these tests to whenever a
              change is submitted. The process of testing each set of changed
              files prior to merging them into the main branch is called
              continuous integration.
            </p>
          </div>
        </div>
        <div className="flex-panel-item">
          <div className="flex-panel-body">
            <div className="flex-panel-title">
              <h4
                className="info"
                style={{ marginTop: "10px", fontSize: "larger" }}
              >
                Composer
              </h4>
              <div className="pantheon-official">
                <img
                  alt="Composer Logo"
                  src={composerlogo}
                  className="main-topic-info__plugin-image"
                  style={{ maxWidth: "40px", marginBottom: "10px!important" }}
                />
                <p className="pantheon-official"></p>
              </div>
            </div>
            <p className="topic-info__description">
              <a href="/docs/composer/" className="external">
                Composer
              </a>{" "}
              is a PHP dependency manager that provides an alternative, more
              modern way to manage the external code used by a project. For
              example, Composer may be used to install the plugins, modules and
              themes used by a Drupal or WordPress site.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default BuildTools
