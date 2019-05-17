import React from "react"

const Twitter = ({ pageTitle, path }) => {
  return (
    <iframe
      id="twitter-widget-0"
      scrolling="no"
      frameBorder="0"
      allowtransparency="true"
      className="twitter-share-button twitter-share-button-rendered twitter-tweet-button"
      title="Twitter Tweet Button"
      src={`https://platform.twitter.com/widgets/tweet_button.fb066ff7f5f4afee7716887031da2ea8.en.html#dnt=false;
        id=twitter-widget-0;
        lang=en;
        original_referer=https%3A%2F%2Fpantheon.io${path};
        size=m;
        text=%40getpantheon%20doc%3A%20${pageTitle};
        time=${Date.now()};
        type=share;
        url=https%3A%2F%2Fpantheon.io${path}`}
      style={{ width: 60, height: 25 }}
    />
  )
}

export default Twitter
