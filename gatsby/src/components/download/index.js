import React from "react"
import './style.css';

const Download = ({ file }) => {
  const downloadPath = `${file}`
  return (
    <div
      className="script-file-header"
    >
      {file}
      <a href={`https://pantheon.io/docs/scripts/${downloadPath}`}
        download
      >
        <button
          className="btn btn-default btn-download"
        >
          <i
            className="fa fa-download"
            aria-hidden="true"
          >
          </i>
          Download Script
        </button>
      </a>
    </div>
  )
}

export default Download
