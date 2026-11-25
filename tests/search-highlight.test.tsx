import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { renderHighlight } from "@/components/search/search-ui";
import { highlightText } from "@/components/common/listing-search/text";
import { toHit } from "@/components/search/search-provider";

const html = (node: React.ReactNode) => {
  const { container } = render(<p>{node}</p>);
  return container;
};

describe("renderHighlight", () => {
  it("marks what AddSearch wraps in <em> and keeps the rest as text", () => {
    const c = html(renderHighlight("use the <em>Redis</em> CLI"));
    expect(c.querySelector("mark")?.textContent).toBe("Redis");
    expect(c.textContent).toBe("use the Redis CLI");
  });

  it("decodes entities once, not twice", () => {
    // "&amp;lt;" is the text "&lt;", not "<".
    expect(html(renderHighlight("a &amp;lt; b &amp; c")).textContent).toBe(
      "a &lt; b & c"
    );
  });

  it("never injects markup: other tags go and a script's code is dropped", () => {
    const c = html(
      renderHighlight(
        'x <img src=x onerror="alert(1)"> y <script>alert(1)</script> z'
      )
    );
    expect(c.querySelector("img, script")).toBeNull();
    expect(c.textContent).toBe("x  y  z");
  });
});

describe("highlightText", () => {
  it("marks every match, ignoring case", () => {
    const c = html(highlightText("Redis and redis again", "REDIS"));
    expect(c.querySelectorAll("mark")).toHaveLength(2);
    expect(c.textContent).toBe("Redis and redis again");
  });

  it("treats the query as plain text, not a pattern", () => {
    const c = html(highlightText("find a.b(c) and axb", "a.b(c"));
    expect(c.querySelectorAll("mark")).toHaveLength(1);
    expect(c.querySelector("mark")?.textContent).toBe("a.b(c");
  });

  it("returns the text unchanged with no query or no match", () => {
    expect(highlightText("plain", "")).toBe("plain");
    expect(highlightText("plain", "zzz")).toBe("plain");
  });
});

describe("toHit links", () => {
  const raw = { id: "1", title: "t", highlight: "h" };

  it("links out only over http(s)", () => {
    expect(
      toHit({ ...raw, url: "https://docs.p1.pantheon.io/x" }, {}).href
    ).toBe("https://docs.p1.pantheon.io/x");
    expect(toHit({ ...raw, url: "javascript:alert(1)" }, {}).href).toBe("#");
    expect(toHit({ ...raw, url: "data:text/html,<b>x</b>" }, {}).href).toBe(
      "#"
    );
  });
});
