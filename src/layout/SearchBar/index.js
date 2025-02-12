import React from "react"
import { Link } from "gatsby"

import AddSearch from "../../components/addSearch"
import { TextInput } from "@pantheon-systems/pds-toolkit-react"

import "./style.css"

const SearchBar = ({ page }) => (
  <form
    id="searchform"
    action="/search"
    role="search"
    acceptCharset="UTF-8"
    encType="application/x-www-form-urlencoded"
    title="Search Pantheon Documentation"
    className="pds-spacing-pad-block-start-l pds-spacing-pad-block-end-2xl"
  >
    <TextInput
      id="search"
      placeholder="Search Pantheon Documentation"
      type="search"
      data-addsearch-id="search_widget"
      label="Search Pantheon Documentation"
      showLabel={false}
    />
    {page == "default" ? <AddSearch /> : null}
  </form>
)

export default SearchBar
