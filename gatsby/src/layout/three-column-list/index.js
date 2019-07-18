import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby';
import './style.css';

const propTypes = {
  title: PropTypes.string,
  links: PropTypes.array,
}

function ThreeColumnList(props) {
  const {title, links} = props;
  return (
    <React.Fragment>  
      <div className="row">
        <div className="col-md-12">
          <h2 className="subtitle">{title}</h2>
        </div>
      </div>
      <div className="row mb-70">
        <div className="col-md-12">
          <ul className="top-docs top-docs-3col">
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
