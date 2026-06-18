import React from "react";
import Link from "next/link";

// REVIEW: types might be incorrect @aniketbiprojit
export const Contributors = ({ contributors }: { contributors: any[] }) => {
  if (contributors == null || contributors.length < 1) {
    return null;
  }

  return (
    <React.Fragment>
      <p>
        <small>
          <i className="fa fa-users" /> Contributors:{" "}
          {contributors.map((contributor, i, arr) => {
            let lastCharacter = ".";
            if (arr.length - 1 !== i) {
              lastCharacter = ", ";
            }
            return (
              <React.Fragment key={i}>
                <Link
                  href={`/contributors/${contributor.yamlId}`}
                  title={contributor.yamlId}
                >
                  {contributor.name}
                </Link>
                {lastCharacter}
              </React.Fragment>
            );
          })}
        </small>
      </p>
    </React.Fragment>
  );
};
