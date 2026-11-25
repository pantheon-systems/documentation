import { describe, it, expect } from "vitest";
import { stripMarkdown } from "@/lib/strip-markdown";

describe("stripMarkdown", () => {
  it("keeps link text but drops the URL, images, code fences and tags", () => {
    const text = stripMarkdown(
      "## Heading\n\nSee [the docs](https://example.com) and `inline` code.\n\n```bash\nterminus site:info\n```\n\n<Callout>Careful</Callout> ![alt](x.png)"
    );
    expect(text).toBe("Heading See the docs and inline code. Careful");
  });
});
