import { describe, it, expect } from "vitest";
import { releaseNoteSummary } from "@/lib/release-note-summary";
import type { ProcessedFile } from "@/server/processor/mdx";

const note = (content: string, description?: string) =>
  ({ content, frontmatter: { description } }) as unknown as ProcessedFile;

describe("releaseNoteSummary", () => {
  it("uses the description when the note has one", () => {
    expect(releaseNoteSummary(note("Body text.", "A short description."))).toBe(
      "A short description."
    );
  });

  it("falls back to the opening paragraph, without markdown", () => {
    const text = releaseNoteSummary(
      note(
        "## Heading\n\nPantheon now provides [WordPress 7.1.5](https://x.test), a **security** release.\n\nSecond paragraph."
      )
    );
    expect(text).toBe(
      "Pantheon now provides WordPress 7.1.5, a security release."
    );
  });

  it("skips a leading list to find a paragraph", () => {
    expect(
      releaseNoteSummary(note("- item one\n- item two\n\nThe real summary."))
    ).toBe("The real summary.");
  });

  it("cuts a long paragraph at a word boundary", () => {
    const text = releaseNoteSummary(note("word ".repeat(200)));
    expect(text.endsWith("…")).toBe(true);
    expect(text.length).toBeLessThanOrEqual(262);
    expect(text).not.toMatch(/wor…$/);
  });
});
