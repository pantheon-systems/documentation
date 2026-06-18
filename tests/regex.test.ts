import { describe, it, expect } from "vitest";
import {
  convertJsxPropsToHtml,
  normalizeCustomTags,
} from "@/components/ui/mdx-wrapper/helper";

describe("convertJsxPropsToHtml", () => {
  it("should handle simple self-closing tag", () => {
    const test = `<hr />`;
    const expected = `<hr/>`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Card component with complex props", () => {
    const test = `<Card title={"Build Tools"} isOfficial author={"Greg Anderson"} authorLink={"https://github.com/greg-1-anderson"} link={"https://github.com/pantheon-systems/terminus-build-tools-plugin"}>`;
    const expected = `<Card title="Build Tools" isOfficial="true" author="Greg Anderson" authorLink="https://github.com/greg-1-anderson" link="https://github.com/pantheon-systems/terminus-build-tools-plugin">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Alert component with simple props", () => {
    const test = `<Alert title="Note" type="info">`;
    const expected = `<Alert title="Note" type="info">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Alert component with JSX expression props", () => {
    const test = `<Alert title={"Note"} type={"info"}>`;
    const expected = `<Alert title="Note" type="info">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle self-closing Check component", () => {
    const test = `<Check/>`;
    const expected = `<Check/>`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Check component with boolean prop", () => {
    const test = `<Check checked={true}>`;
    const expected = `<Check checked="true">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle component with mixed prop types", () => {
    const test = `<Component id="test" disabled={true} className={"my-class"} data-value={123}>`;
    const expected = `<Component id="test" disabled="true" className="my-class" data-value="123">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle self-closing component with props", () => {
    const test = `<img src="image.jpg" alt="Description" />`;
    const expected = `<img src="image.jpg" alt="Description" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle component with complex JSX expression", () => {
    const test = `<Component title={"Complex \"quoted\" string"} data={{"key": "value"}}>`;
    const expected = `<Component title="Complex \"quoted\" string" data="{\"key\": \"value\"}">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle component with no props", () => {
    const test = `<div>`;
    const expected = `<div>`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Popover component", () => {
    const test = `A low Cache Hit Ratio <Popover title="Cache Hit Ratio" content="Serving requests from cache rather than by the CMS allows visitors to experience a faster response and removes load from the site's server resources. <a href='/metrics#cache-hit-ratio'> Read more</a>." /> from the Global CDN level is often a primary cause of slow site performance.`;
    const expected = `A low Cache Hit Ratio <Popover title="Cache Hit Ratio" content="Serving requests from cache rather than by the CMS allows visitors to experience a faster response and removes load from the site's server resources. <a href='/metrics#cache-hit-ratio'> Read more</a>." /> from the Global CDN level is often a primary cause of slow site performance.`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Alert with string props", () => {
    const test = `<Alert title="Note" type="info">`;
    const expected = `<Alert title="Note" type="info">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Accordion with multiple string props", () => {
    const test = `<Accordion title="DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">`;
    const expected = `<Accordion title="DNS Host-Specific Instructions" id="host-specific2" icon="info-sign">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Tab with boolean prop", () => {
    const test = `<Tab title="Terminus 4 (PHP 8.2+)" id="terminus4" active={true}>`;
    const expected = `<Tab title="Terminus 4 (PHP 8.2+)" id="terminus4" active="true">`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Product with curly-brace string props", () => {
    const test = `<Product title={"WordPress Hosting"} link={"/guides/wordpress-pantheon/"}/>`;
    const expected = `<Product title="WordPress Hosting" link="/guides/wordpress-pantheon/" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle self-closing Check tag", () => {
    const test = `<Check/>`;
    const expected = `<Check/>`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle hr with className", () => {
    const test = `<hr className="source-code" />`;
    const expected = `<hr className="source-code" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Partial with file prop", () => {
    const test = `<Partial file="solr-version.md" />`;
    const expected = `<Partial file="solr-version.md" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Download with file prop", () => {
    const test = `<Download file="pantheon-backup-to-s3.sh" />`;
    const expected = `<Download file="pantheon-backup-to-s3.sh" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });

  it("should handle Product with mixed curly and quoted props", () => {
    const test = `<Product title={"Drupal Hosting"} link="/drupal"/>`;
    const expected = `<Product title="Drupal Hosting" link="/drupal" />`;
    expect(convertJsxPropsToHtml(test)).toBe(expected);
  });
});

describe("normalizeCustomTags", () => {
  it("should handle simple self-closing tag", () => {
    const test = `<Check foo="bar" />`;
    const expected = `<check foo="bar" ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle opening tag", () => {
    const test = `<Check foo="bar">`;
    const expected = `<check foo="bar">`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle closing tag", () => {
    const test = `</Check>`;
    const expected = `</check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle mixed case tag name", () => {
    const test = `<ChEcK foo="bar" />`;
    const expected = `<check foo="bar" ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle multiple tags in content", () => {
    const test = `Here is a <Check foo="bar" /> and another <Check baz="qux">content</Check>`;
    const expected = `Here is a <check foo="bar" ></check> and another <check baz="qux">content</check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle tags with whitespace", () => {
    const test = `<  Check   foo="bar"   />`;
    const expected = `<check   foo="bar"   ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should preserve tags inside code blocks", () => {
    const test = `\`\`\`jsx
  <Check foo="bar" />
  \`\`\``;
    const expected = `\`\`\`jsx
  <Check foo="bar" />
  \`\`\``;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle mixed content with code blocks", () => {
    const test = `Here is a <Check foo=\"bar\" /> and some code:\n\`\`\`jsx\n<Check baz=\"qux\" />\n\`\`\`\nAnd more content <Check qux=\"baz\" />`;
    const expected = `Here is a <check foo=\"bar\" ></check> and some code:\n\`\`\`jsx\n<Check baz=\"qux\" />\n\`\`\`\nAnd more content <check qux=\"baz\" ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle unclosed code block", () => {
    const test = `Here is a <Check foo=\"bar\" /> and some code:\n\`\`\`jsx\n<Check baz=\"qux\" />`;
    const expected = `Here is a <check foo=\"bar\" ></check> and some code:\n\`\`\`jsx\n<check baz=\"qux\" ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle different tag name", () => {
    const test = `<Alert title=\"Note\" />`;
    const expected = `<alert title=\"Note\" ></alert>`;
    expect(normalizeCustomTags(test, "Alert")).toBe(expected);
  });

  it("should handle tag with complex attributes", () => {
    const test = `<Card title={"Build Tools"} isOfficial author={"Greg Anderson"} />`;
    const expected = `<card title={"Build Tools"} isOfficial author={"Greg Anderson"} ></card>`;
    expect(normalizeCustomTags(test, "Card")).toBe(expected);
  });

  it("should handle nested tags", () => {
    const test = `<Check foo="bar"><Check baz="qux" /></Check>`;
    const expected = `<check foo="bar"><check baz="qux" ></check></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle tag with no attributes", () => {
    const test = `<Check />`;
    const expected = `<check ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle tag with only opening tag", () => {
    const test = `<Check foo="bar">`;
    const expected = `<check foo="bar">`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle multiple code blocks", () => {
    const test = `First block:\n\`\`\`jsx\n<Check foo=\"bar\" />\n\`\`\`\nContent: <Check baz=\"qux\" />\nSecond block:\n\`\`\`html\n<Check qux=\"baz\" />\n\`\`\``;
    const expected = `First block:\n\`\`\`jsx\n<Check foo=\"bar\" />\n\`\`\`\nContent: <check baz=\"qux\" ></check>\nSecond block:\n\`\`\`html\n<Check qux=\"baz\" />\n\`\`\``;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle case insensitive tag matching", () => {
    const test = `<check foo=\"bar\" />`;
    const expected = `<check foo=\"bar\" ></check>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle tag with mixed case in search", () => {
    const test = `<Check foo=\"bar\" />`;
    const expected = `<check foo=\"bar\" ></check>`;
    expect(normalizeCustomTags(test, "cHeCk")).toBe(expected);
  });

  it("should handle empty input", () => {
    const test = ``;
    const expected = ``;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle no matching tags", () => {
    const test = `<div>Hello world</div>`;
    const expected = `<div>Hello world</div>`;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle code block with language identifier", () => {
    const test = `\`\`\`typescript
  <Check foo="bar" />
  \`\`\``;
    const expected = `\`\`\`typescript
  <Check foo="bar" />
  \`\`\``;
    expect(normalizeCustomTags(test, "Check")).toBe(expected);
  });

  it("should handle Popover tag normalization", () => {
    const test = `A low Cache Hit Ratio <Popover title="Cache Hit Ratio" content="Serving requests from cache rather than by the CMS allows visitors to experience a faster response and removes load from the site's server resources. <a href='/metrics#cache-hit-ratio'> Read more</a>." ></Popover> from the Global CDN level is often a primary cause of slow site performance.`;
    const expected = `A low Cache Hit Ratio <popover title="Cache Hit Ratio" content="Serving requests from cache rather than by the CMS allows visitors to experience a faster response and removes load from the site's server resources. <a href='/metrics#cache-hit-ratio'> Read more</a>." ></popover> from the Global CDN level is often a primary cause of slow site performance.`;
    expect(normalizeCustomTags(test, "Popover")).toBe(expected);
  });
});
