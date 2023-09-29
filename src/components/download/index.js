import React from "react"

import { Icon } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const Download = ({ file }) => {
  const downloadPath = `/docs/scripts/${file}.txt`
  return (
    <div className="script-file-download">
      <a href={downloadPath} download={file} className="pds-button">
        {file}
        <Icon iconName="download" iconSize="lg" />
      </a>
    </div>
  )
}

export default Download
