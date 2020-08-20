import React from "react"
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faDiscourse,
} from '@fortawesome/fontawesome-free-brands'


const Discourse = ({ pageTitle, path }) => {
  const text = `@getpantheon doc:${pageTitle} https://pantheon.io/docs/${path}`
  return (
        <a 
        className="btn btn-discourse fa"
        href={`https://twitter.com/intent/tweet?text=${text}`}
      > <FontAwesomeIcon icon={faDiscourse} size="1x" className="fa" /> Discuss in our Forum</a>
  )
}

export default Discourse

