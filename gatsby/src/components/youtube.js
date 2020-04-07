import React from "react"

const Youtube = ({ title, src }) => {
  return (
    <>
      <div
        class="gatsby-resp-iframe-wrapper"
        style={{
          paddingBottom: "56.5%",
          position: "relative",
          height: "0px",
          overflow: "hidden"
        }}
      >
        <div class="embedVideo-container">
          <iframe
            title={`${title}`}
            src={`https://www.youtube.com/embed/${src}?rel=0"`}
            className="embedVideo-iframe"
            allowfullscreen=""
            style={{
              border: "0px",
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      </div>
      <br />
    </>
  )
}

export default Youtube
