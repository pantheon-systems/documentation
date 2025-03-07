import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import { TextInput } from '@pantheon-systems/pds-toolkit-react';

import './style.css';

const Commands = ({ data }) => {
  const [search, setSearch] = useState('');
  const slugRegExp = /:/g;
  return (
    <div className="doc-commands">
      <TextInput
        type="search"
        id="command-search"
        placeholder="Search Terminus Commands"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="pds-spacing-mar-block-end-xl"
      />
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
              .filter((command) => {
                return command.name.indexOf(search) >= 0;
              })
              .map((command, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link
                        className="command-name"
                        to={`/terminus/commands/${command.name.replace(
                          slugRegExp,
                          '-',
                        )}`}
                      >
                        {command.name}
                      </Link>

                      <small>{command.description}</small>
                    </td>
                    <td>
                      <small>{command.usage[0].replace(/\[|\]/g, '')}</small>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default (props) => (
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
    render={(data) => <Commands data={data} {...props} />}
  />
);
