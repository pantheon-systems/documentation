"use server";
import React from "react";
import { TabListClientComponent } from "./client-component";

const recursivelyPrintChildren = (e: { props: any }) => {
  if (e.props === undefined) {
    return;
  }
  const props = e.props;
  if (props?.children) {
    props.chilren?.forEach((e: any) => recursivelyPrintChildren(e));
  }
};

export const TabList = async ({ children }: { children: any }) => {
  // Convert tab data to be useful for the PDS Tabs component.
  const processedTabs: any[] = [];

  children
    .filter((tab: any) => {
      return tab?.props !== undefined;
    })
    .map((tab: { props: any }) => {
      const tabData = {
        tabLabel: tab.props?.title ?? "Title",
        panelContent: tab.props.children.filter((e: any) => e !== "\n"),
      };

      processedTabs.push(tabData);
    });

  return (
    <>
      <TabListClientComponent processedTabs={processedTabs} />
    </>
  );
};
