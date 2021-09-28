import React from "react"
import './style.css';

const Download = ({ file }) => {
  const downloadPath = `/docs/scripts/${file}.txt`
  return (
    <>
      <div
        className="script-file-header"
      >
        {file}

        <a href={downloadPath}
          download={file}
        >
          <button
            className="btn btn-default btn-download"
          >
            <i
              className="fa fa-download"
              aria-hidden="true"
            >
            </i>
            {` Download File`}
          </button>
        </a>
      </div>
    </>
  )
}

export default Download
