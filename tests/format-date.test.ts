import { describe, it, expect } from "vitest";
import { formatLongDate } from "@/lib/format-date";

describe("formatLongDate", () => {
  it("formats a quoted frontmatter date", () => {
    expect(formatLongDate("2026-07-06")).toBe("July 6, 2026");
  });

  it("formats an unquoted frontmatter date, which YAML parses as a Date", () => {
    expect(formatLongDate(new Date("2026-07-06"))).toBe("July 6, 2026");
  });

  it("keeps the day the file says, whatever the timezone", () => {
    // Midnight UTC is still the 1st in the evening of the 31st, US time.
    expect(formatLongDate(new Date(Date.UTC(2026, 0, 1)))).toBe(
      "January 1, 2026"
    );
  });

  it("returns what it can't parse instead of throwing", () => {
    expect(formatLongDate("sometime")).toBe("sometime");
    expect(formatLongDate(new Date("not a date"))).toBe("");
  });
});
