import React from "react"

/* This function creates a search field  component. it accepts as arguments
the object and object setter used to represent the data it's filtering on,*/
const SearchField = props => {
  const title = props.title
  const data = props.data
  const dataSetter = props.dataSetter

  return (
    <div className="form-group">
      <div className="input-group">
        <div className="input-group-addon">
          <i className="fa fa-search" />
        </div>
        <input
          type="text"
          id={`command-search-${title}`}
          className="form-control"
          placeholder={`Filter by ${title}`}
          onChange={e => dataSetter(e.target.value)}
          value={data}
        />
        <div
          style={{ background: "#fff; cursor:pointer" }}
          className="input-group-addon"
          id="clear-filter"
          onClick={e => dataSetter("")}
        >
          <span className="fa fa-times" />
        </div>
      </div>
    </div>
  )
}

export default SearchField