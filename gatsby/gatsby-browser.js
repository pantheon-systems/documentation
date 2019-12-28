// custom typefaces
require("prismjs/themes/prism-okaidia.css")

// Code block line numbering
require("prismjs/plugins/line-numbers/prism-line-numbers.css")

// Code block shell prompt
require("prismjs/plugins/command-line/prism-command-line.css")

// Previous version scripts and styles
// require("../source/docs/assets/js/main.js")

// // TOC generator
require("tocbot/dist/tocbot.css")
require("tocbot/dist/tocbot.min.js")

require("./src/styles/global.scss")

<<<<<<< HEAD
//Segment
exports.onRouteUpdate = () => {
    window.analytics && window.analytics.page({url: window.location.href});
=======
// track pageview onRouteUpdate
exports.onRouteUpdate = () => {
    window.analytics && window.analytics.page();
>>>>>>> add track pageivew on routeupdate
};