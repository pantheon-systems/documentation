// @vitest-environment node
import { describe, it, expect } from "vitest";
import {
  getAllVulnerabilities,
  getVulnerabilityTrackerIntro,
} from "@/lib/page-utils";
import { tagColors, tagSolidColors } from "@pantheon-systems/pds-toolkit-react";
import { VULNERABILITY_STATUSES } from "@/lib/vulnerability-statuses";

// Entries are hand-written markdown files, so catch authoring mistakes here
// rather than on the live site.
const entries = getAllVulnerabilities();

describe("vulnerability tracker intro", () => {
  const intro = getVulnerabilityTrackerIntro();

  it("has a title and description", () => {
    expect(intro.frontmatter.title).toBeTruthy();
    expect(intro.frontmatter.description).toBeTruthy();
  });

  it("explains every status in the key", () => {
    const meanings = intro.frontmatter.status_meanings ?? {};
    expect(Object.keys(meanings).sort()).toEqual(
      Object.keys(VULNERABILITY_STATUSES).sort()
    );
  });
});

// An unknown color makes the PDS Tag pick a random one, so check the status
// colors are ones it accepts.
describe("vulnerability statuses", () => {
  const valid: string[] = [...tagColors, ...tagSolidColors];

  it.each(Object.entries(VULNERABILITY_STATUSES))(
    "%s uses a valid PDS tag color",
    (_slug, status) => {
      expect(valid).toContain(status.color);
    }
  );
});

describe("vulnerability tracker entries", () => {
  it("finds entries", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("has unique slugs", () => {
    const slugs = entries.map((e) => e.fields.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  describe.each(entries.map((e) => [e.fields.fileName, e] as const))(
    "%s",
    (_name, entry) => {
      const fm = entry.frontmatter;

      it("has a title and a description", () => {
        expect(fm.title).toBeTruthy();
        expect(fm.description).toBeTruthy();
      });

      it("uses a known status", () => {
        expect(Object.keys(VULNERABILITY_STATUSES)).toContain(fm.status);
      });

      it("has a disclosure date that matches the filename", () => {
        expect(fm.published_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(entry.fields.fileName.startsWith(fm.published_date)).toBe(true);
      });

      it("lists well-formed CVE IDs and names each one in the title", () => {
        for (const cve of fm.cves ?? []) {
          expect(cve).toMatch(/^CVE-\d{4}-\d{4,}$/);
          expect(fm.title).toContain(cve);
        }
      });

      it("has the four required sections", () => {
        for (const heading of [
          "## What is the vulnerability?",
          "## Are sites on Pantheon affected?",
          "## What Pantheon has done",
          "## What you need to do",
        ]) {
          expect(entry.content).toContain(heading);
        }
      });
    }
  );
});
