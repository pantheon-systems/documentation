import React from "react"
import { Link } from "gatsby"

const Contributors = ({ contributors }) => {
  if (contributors == null || contributors.length < 1) {
    return null
  }

  return (
    <React.Fragment>
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
                <Link
                  to={`/contributors/${contributor.id}`}
                  title={contributor.id}
                >
                  {contributor.name}
                </Link>
                {lastCharacter}
              </React.Fragment>
            )
          })}
        </small>
      </p>
    </React.Fragment>
  )
}

export default Contributors
