"use client";

import { TextInput } from "@/components/ui/pds-re-export";
import Link from "next/link";
import { Fragment, useState } from "react";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { CommandsClientComponentProps } from "./types";

// Escapes characters that are meaningful to RegExp so a search term typed by
// a user (e.g. "site:info") can be used to build a safe matching pattern.
const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Wraps every occurrence of `query` inside `text` in a <mark> so it matches
// the same (case-sensitive) substring matching the filter above uses.
const highlightMatch = (text: string, query: string) => {
  if (!query) {
    return text;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, "g"));

  return parts.map((part, index) =>
    part === query ? (
      <mark key={index} className={styles.highlight}>
        {part}
      </mark>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
};

export const CommandsClientComponent = ({
  commands,
}: CommandsClientComponentProps) => {
  const [search, setSearch] = useState("");
  const slugRegExp = /:/g;
  return (
    <div className={styles.docCommands}>
      <TextInput
        type="search"
        id="command-search"
        placeholder="Search Terminus Commands"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className="pds-spacing-mar-block-end-xl"
        label={""}
      />
      <div className={cn("table-responsive", styles.tableResponsive)}>
        <table className="table table-commands">
          <thead>
            <tr>
              <th style={{ width: "60%" }}>Command</th>
              <th>Usage</th>
            </tr>
          </thead>
          <tbody>
            {commands
              .filter((command) => {
                return command.name.indexOf(search) >= 0;
              })
              .map((command, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <div className={styles.commandCell}>
                        <Link
                          className={styles.commandName}
                          href={`/terminus/commands/${command.name.replace(
                            slugRegExp,
                            "-",
                          )}`}
                        >
                          {highlightMatch(command.name, search)}
                        </Link>

                        <small>{command.description}</small>
                      </div>
                    </td>
                    <td>
                      <small>{command.usage[0].replace(/\[|\]/g, "")}</small>
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
