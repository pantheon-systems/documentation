"use client";

import { TextInput } from "@/components/ui/pds-re-export";
import Link from "next/link";
import { useState } from "react";

import styles from "./style.module.css";
import { cn } from "@/lib/utils";
import { CommandsClientComponentProps } from "./types";

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
        <table className="table table-commands table-bordered table-striped">
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
                      <Link
                        className={styles.commandName}
                        href={`/terminus/commands/${command.name.replace(
                          slugRegExp,
                          "-"
                        )}`}
                      >
                        {command.name}
                      </Link>

                      <small>{command.description}</small>
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
