// @vitest-environment node
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

// landings.yaml is hand-edited and drives every section index page, so catch
// authoring slips here: a card without a title, or a link entry with no text
// or URL (which draws as an empty item).
type Link = { text?: string; url?: string };
type Landing = {
  path: string;
  subtopics?: { title?: string; "subtopic-lists"?: { links?: Link[] }[] }[];
  "topics-groups"?: { title?: string; links?: Link[] }[];
};

const landings = yaml.load(
  fs.readFileSync(
    path.join(process.cwd(), "src/source/data/landings.yaml"),
    "utf8"
  )
) as Landing[];

const cards = landings.flatMap((landing) => [
  ...(landing.subtopics ?? []).map((subtopic) => ({
    page: landing.path,
    title: subtopic.title,
    links: (subtopic["subtopic-lists"] ?? []).flatMap((l) => l.links ?? []),
  })),
  ...(landing["topics-groups"] ?? []).map((group) => ({
    page: landing.path,
    title: group.title,
    links: group.links ?? [],
  })),
]);

describe("landings.yaml section cards", () => {
  it.each(
    cards.map((c) => [`${c.page}: ${c.title || "(untitled)"}`, c] as const)
  )("%s has a title and only complete links", (_name, card) => {
    expect(card.title?.trim()).toBeTruthy();
    const incomplete = card.links.filter(
      (link) => !link.text?.trim() || !link.url
    );
    expect(incomplete).toEqual([]);
  });
});
