import { describe, it, expect } from "vitest";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { rehypeSpanSectionRows } from "@/components/ui/mdx-wrapper/rehype-plugins";

const render = async (markdown: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSpanSectionRows)
      .use(rehypeStringify)
      .process(markdown)
  );

describe("rehypeSpanSectionRows", () => {
  it("spans a bold section label across every column", async () => {
    const html = await render(`
| Version | Available | Removal |
| --- | --- | --- |
| <span style="font-weight: bold">Fully Supported</span> | | |
| 8.5 | yes | TBD |
`);

    expect(html).toContain('colspan="3"');
    expect(html).toContain("docs-table-section");
    // The section row keeps one cell; the data row keeps all three.
    expect(html.match(/<td/g)?.length).toBe(1 + 3);
  });

  it("spans a section label written with strong", async () => {
    const html = await render(`
| A | B |
| --- | --- |
| **Section** | |
| x | y |
`);

    expect(html).toContain('colspan="2"');
  });

  it("leaves rows with a plain first cell alone", async () => {
    const html = await render(`
| A | B |
| --- | --- |
| plain | |
| x | y |
`);

    expect(html).not.toContain("colspan");
    expect(html.match(/<td/g)?.length).toBe(4);
  });

  it("leaves rows where another cell has content alone", async () => {
    const html = await render(`
| A | B |
| --- | --- |
| **bold** | value |
`);

    expect(html).not.toContain("colspan");
  });
});
