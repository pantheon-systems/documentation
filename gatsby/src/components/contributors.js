import React from "react"

const Contributors = ({ contributors }) => {
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
              <>
                <a
                  key={i}
                  href={`/docs/contributors/${contributor.id}`}
                  title={contributor.id}
                >
                  {contributor.name}
                </a>
                {lastCharacter}
              </>
            )
          })}
        </small>
      </p>
    </>
  )
}

export default Contributors
