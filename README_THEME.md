# Theme-specific Readme

This is a working document to outline the theming infrastructure of this site as we work to integrate the Pantheon Design System.

## Stylesheets

Each of these global stylesheets are integrated to the site via `gatsby-browser.js`

1. pds-core.css — all global styles and utilities from PDS, imported from npm package
2. main.css — global styles for this site that augment PDS, `src/styles/main.css`
3. hacks.css — temporary global styles that should eventually be incorporated back into PDS, `src/styles/hacks.css`
