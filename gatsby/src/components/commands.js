import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Commands = ({ data }) => (
  <div class="container col-md-12">
    <table class="table table-responsive table-bordered table-striped">
      <thead>
        <tr>
          <th>Command</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        {data.dataJson.commands.map((command, i) => {
          return (
            <tr key={i}>
              <td>
                <strong>{command.name}</strong>
                <br />
                <small>{command.description}</small>
              </td>
              <td>
                <li className="terminus-usage">
                  <span style={{ whiteSpace: "pre-line" }}>
                    <small />
                    <br />
                    <small>{command.usage[0]}</small>
                  </span>
                </li>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

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
