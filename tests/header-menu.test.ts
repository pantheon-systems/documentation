import { describe, it, expect } from "vitest";
import { getOmniItems } from "@/components/omni-components";
import { buildHeaderMenu } from "@/components/omni-components/header-menu";
import type { OmniItem } from "@/components/omni-components/helpers";

const links = (menu: ReturnType<typeof buildHeaderMenu>) =>
  menu.flatMap((entry) =>
    entry.type === "link"
      ? [entry.href]
      : entry.groups.flatMap((g) => g.links.map((l) => l.href))
  );

describe("buildHeaderMenu", () => {
  const item = (link: string, header?: OmniItem["header"]): OmniItem => ({
    link,
    title: link,
    header,
  });

  it("lists an item that sets no header options under Guides", () => {
    const menu = buildHeaderMenu([item("/new-section")]);
    expect(menu).toEqual([
      {
        type: "dropdown",
        label: "Guides",
        groups: [{ links: [{ label: "/new-section", href: "/new-section" }] }],
      },
    ]);
  });

  it("puts ungrouped guides under More once other groups exist", () => {
    const menu = buildHeaderMenu([item("/a", { group: "Build" }), item("/b")]);
    const guides = menu[0];
    expect(
      guides.type === "dropdown" && guides.groups.map((g) => g.heading)
    ).toEqual(["Build", "More"]);
  });

  it("skips menu: none and keeps omni order", () => {
    const menu = buildHeaderMenu([
      item("/", { menu: "none" }),
      item("/first", { menu: "top" }),
      item("/guide"),
      item("/last", { menu: "top" }),
    ]);
    expect(menu.map((e) => (e.type === "link" ? e.href : e.label))).toEqual([
      "/first",
      "Guides",
      "/last",
    ]);
  });
});

describe("header menu from the real omni list", () => {
  it("includes every omni section unless it opts out", async () => {
    const items = await getOmniItems();
    const inMenu = links(buildHeaderMenu(items));
    const missing = items
      .filter((i) => i.header?.menu !== "none" && i.header?.menu !== "cli")
      .filter((i) => !inMenu.includes(i.link))
      .map((i) => i.link);
    expect(missing).toEqual([]);
  });

  it("keeps the CLI dropdown to the pages that opt in", async () => {
    const menu = buildHeaderMenu(await getOmniItems());
    const cli = menu.find((e) => e.type === "dropdown" && e.label === "CLI");
    expect(
      cli?.type === "dropdown" && cli.groups.map((g) => g.heading)
    ).toEqual(["Terminus", "Other CLIs"]);
  });
});
