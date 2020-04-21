import React from "react"
import { Link } from "gatsby"
import './style.css';

const ChecklistItem = ({ title, link}) => {
  return (
    <>
    <p>
    <span className={`glyphicon glyphicon-unchecked`} ></span> 
    <Link to={link} title={title}> {title}</Link>
    </p>
    </>
  )
}

export default ChecklistItem
