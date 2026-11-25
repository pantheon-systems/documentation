import { describe, it, expect } from "vitest";
import { tagColors, tagSolidColors } from "@pantheon-systems/pds-toolkit-react";
import categories from "@/source/releasenotescategories/releaseNoteCategories.json";

// The category data is imported as plain JSON, so TypeScript can't check that
// each color is one the PDS Tag accepts. An unknown color makes Tag pick a random
// one, so check them here.
describe("release note categories", () => {
  const valid: string[] = [...tagColors, ...tagSolidColors];

  it.each(categories.categories.map((c) => [c.displayName, c.color]))(
    "%s uses a valid PDS tag color (%s)",
    (_name, color) => {
      expect(valid).toContain(color);
    }
  );
});
