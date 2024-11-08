import React, { useState } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';

import { InputText, Icon } from '@pantheon-systems/pds-toolkit-react';

import './style.css';

const Commands = ({ data }) => {
  const [search, setSearch] = useState('');
  const slugRegExp = /:/g;
  return (
    <div className="doc-commands">
      <div className="pds-text-input doc-commands__search">
        <div className="pds-input-field__input-wrapper">
          <div className="pds-input-field__decorators">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 512 512"
              fill="none"
              aria-hidden="true"
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              class="pds-icon pds-icon--md pds-icon--magnifyingGlass pds-input-field__decorator"
            >
              <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="command-search"
            className="pds-input-field__input"
            placeholder="Search Terminus Commands"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="pds-input-field__accessories">
            {search != '' && (
              <button
                type="button"
                class="pds-input-field__accessory pds-input-field__clear"
                title="Clear undefined input"
                onClick={(e) => setSearch('')}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 384 512"
                  fill="none"
                  aria-hidden="true"
                  preserveAspectRatio="xMidYMid meet"
                  focusable="false"
                  class="pds-icon pds-icon--md pds-icon--xmark"
                >
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                    fill="currentColor"
                  ></path>
                </svg>
              </button>
            )}
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
