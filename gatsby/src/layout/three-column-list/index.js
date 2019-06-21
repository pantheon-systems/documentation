import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';

const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

function ThreeColumnList(props) {
  const {title, links} = props;
  return (
    <React.Fragment>  
      <div class="row">
        <div class="col-md-12">
          <h2 class="subtitle">{title}</h2>
        </div>
      </div>
      <div class="row mb-70">
        <div class="col-md-12">
          <ul class="top-docs top-docs-3col">
            {links.map((link)=>(
              <li key={link.url}>
                <Link to={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}

ThreeColumnList.propTypes = propTypes

export default ThreeColumnList
