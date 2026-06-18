"use server";
import React from "react";
import { CommandsClientComponentProps } from "./types";
import { CommandsClientComponent } from "./client-component";
import { processDirectoryForJson } from "@/server/processor/json";

export const Commands = async () => {
  const data = (
    await processDirectoryForJson("source/data", "commands.json")
  )[0].content as {
    commands: CommandsClientComponentProps["commands"];
  };

  return <CommandsClientComponent commands={data.commands} />;
};
