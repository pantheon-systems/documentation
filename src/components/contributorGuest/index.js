import React from "react"
import { Link } from "gatsby"
import './style.css';

const ContributorGuest = ({ contributor }) => {
  if (contributor == null) {
    return <></>
  }

  return (
    <>
      <div className="guest-contributor">
          <div className="media">
              <div className="pull-left">
                <div className="preview-info__img">
                  <Link
                    to={`/contributors/${contributor.id}`}
                    title={contributor.id}
                  >
                    <img
                      alt="Author photo"
                      typeof="foaf:Image"
                      src={contributor.avatar}
                      width="540"
                      height="540"
                    />
                  </Link>
                </div>
              </div>
              <div className="media-body__featured">
                <div className="media-heading">
                  <h3 className="toc-ignore">By
                    <Link
                      to={`/contributors/${contributor.id}`}
                      title={contributor.id}
                    >
                      {` ${contributor.name}`}
                    </Link>
                  </h3>
                </div>
                <div>
                  <p>{contributor.bio}</p>
                </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default ContributorGuest
