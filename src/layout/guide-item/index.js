import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Image from "../image"
import "./style.css"

const propTypes = {
  url: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
}

function GuideItem(props) {
  const { url, text } = props
  return (
    <Link className="guide-item" to={url}>
      {text}
    </Link>
  )
}

GuideItem.propTypes = propTypes

export default GuideItem
