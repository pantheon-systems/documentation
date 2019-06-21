import React from "react"

const Download = ({ file, }) => {
  const downloadPath = `../scripts/${file}`
  return (
    <div
      className="script-file-header"
    >
      {file}
      <a href={downloadPath} 
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
