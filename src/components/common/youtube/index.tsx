"use client";
import React from "react";
import styles from "./style.module.css";
import { cn } from "@/lib/utils";
/*
This component creates an embedded YouTube video. You can give it a video ID
or playlist ID, and it can be customized to include start and stop times.

PARAMETERS:
title="Video title" (required for accessibility)
src="youtubeVideoIdHash" If embedding a playlist, include only the playlist ID (starts with PL)
start="60" integer value for start point of video clip, as number of seconds from video beginning
end="120" integer value for end point of video clip, as number of seconds from video beginning
  Note this value is measured from the start of the video, not the start of the video clip.

For reference, see https://developers.google.com/youtube/player_parameters
*/

export const Youtube = (props: {
  title: string;
  src: string;
  start?: string;
  end?: string;
}) => {
  //Construct our component as a function

  const title = props.title;

  // Define the base URL for YouTube links
  var pathBase = new URL("../embed", "https://www.youtube.com");
  // Create an object to hold UTM parameters
  var ytParams = new URLSearchParams();
  // Construct the video ID or playlist UTM
  if (props.src.indexOf("PL") === 0) {
    ytParams.append("listType", "playlist");
    ytParams.append("list", props.src);
  } else {
    pathBase.pathname = `../embed/${props.src}`;
  }
  // Add Start and Stop times
  if (props.start) {
    ytParams.append("start", props.start);
  }
  if (props.end) {
    ytParams.append("end", props.end);
  }
  ytParams.append("rel", 0 as any);

  //console.log(`pathBase ${typeof pathBase}: ${pathBase}`) // For Debugging
  //console.log(`ytParams ${typeof ytParams}: ${ytParams}`) // For Debugging

  return (
    // Return the iframe, wrapped in a div.
    <div className={cn("gatsby-resp-iframe-wrapper", styles.articleYtWrapper)}>
      <div className={styles.ytWrapper}>
        <iframe
          title={`${title} Video`}
          src={pathBase.toString() + "?" + ytParams.toString()}
          allowFullScreen={"" as any}
          frameBorder="0"
          style={{
            zIndex: 10,
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
  );
};
