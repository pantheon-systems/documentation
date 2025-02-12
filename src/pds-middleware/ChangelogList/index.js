import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import "./styles.css"

const ChangelogList = (props) => {
  const { title, url, changelogs } = props
  const current = changelogs[0]
  return (
    <div className="changelog-preview">
      <ul className="changelog-list">
        {changelogs.map((changelog) => (
          <li key={changelog.node.id}>
            <Link to={`/${changelog.node.fields.slug}`}>
              {changelog.node.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={`${url}/`} className="pds-button">
        See all
      </Link>
    </div>
  )
}

ChangelogList.propTypes = {}

export default ChangelogList
