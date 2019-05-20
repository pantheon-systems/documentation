import React from "react"

const Contributors = ({ contributors }) => {
  if (contributors == null || contributors.length < 1) {
    return <></>
  }
  return (
    <>
      <p>
        <small>
          <i className="fa fa-users" /> Contributors:{" "}
          {contributors.map((contributor, i, arr) => {
            let lastCharacter = "."
            if (arr.length - 1 !== i) {
              lastCharacter = ", "
            }
            return (
              <React.Fragment key={i}>
                <a
                  key={i}
                  href={`/docs/contributors/${contributor.id}`}
                  title={contributor.id}
                >
                  {contributor.name}
                </a>
                {lastCharacter}
              </React.Fragment>
            )
          })}
        </small>
      </p>
    </>
  )
}

export default Contributors
