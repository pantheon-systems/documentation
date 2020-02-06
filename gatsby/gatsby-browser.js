import React from "react"
import { location, globalHistory } from "@reach/router"


// custom typefaces
import "prismjs/themes/prism-okaidia.css"

// Code block line numbering
import "prismjs/plugins/line-numbers/prism-line-numbers.css"

// Code block shell prompt
import "prismjs/plugins/command-line/prism-command-line.css"

// Previous version scripts and styles
// require("../source/docs/assets/js/main.js")

// // TOC generator
import "tocbot/dist/tocbot.css"
import "tocbot/dist/tocbot.min.js"

import "./src/styles/global.scss"

//Segment
export const onRouteUpdate = () => {
  window.locations = window.locations || [document.referrer];
  locations.push(window.location.href);
  window.previousPath = locations[locations.length - 2];
  window.analytics && window.analytics.page({
    url: window.location.href,
    referrer: window.previousPath,
    title: document.title
  })
  //console.log("Title: ", document.title) //For debugging
}
