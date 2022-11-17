import React, { useState } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import './style.css';

const Commands = ({ data }) => {
  const [search, setSearch] = useState("")
  const slugRegExp = /:/g
  return (
    <div className="container col-md-12">
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">
            <i className="fa fa-search" />
          </div>
          <input
            type="text"
            id="command-search"
            className="form-control"
            placeholder="Search Terminus Commands"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <div
            style={{ background: "#fff; cursor:pointer" }}
            className="input-group-addon"
            id="clear-filter"
            onClick={e => setSearch("")}
          >
            <span className="fa fa-times" />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-commands table-bordered table-striped">
          <thead>
            <tr>
              <th width="60%">Command</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {data.dataJson.commands
              .filter(command => {
                return command.name.indexOf(search) >= 0
              })
              .map((command, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link className="command-name" to={`/terminus/commands/${command.name.replace(slugRegExp, "-")}`}>{command.name}</Link>
                      <br />
                      <small>{command.description}</small>
                    </td>
                    <td>
                      <li className="terminus-usage">
                        <span style={{ whiteSpace: "pre-line" }}>
                          <small />
                          <br />
                          <small>{command.usage[0].replace(/\[|\]/g, '')}</small>
                        </span>
                      </li>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        dataJson {
          commands {
            name
            description
            usage
          }
        }
      }
    `}
    render={data => <Commands data={data} {...props} />}
  />
)
