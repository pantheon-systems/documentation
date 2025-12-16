import { describe, it, expect, vi } from "vitest";
import { normalizeAllCustomTags } from "@/components/ui/mdx-wrapper/default-components";
import { act, render, screen, waitFor } from "@testing-library/react";
import { MdxWrapper } from "@/components/ui/mdx-wrapper";
import { Alert } from "@/components/common/alert";
import { ComponentProps } from "react";

// Mock the components to avoid complex dependencies
vi.mock("@/components/common/alert", () => ({
  Alert: vi.fn(({ title, type, icon, children }: any) => (
    <div
      data-testid="alert-component"
      data-title={title}
      data-type={type}
      data-icon={icon}
    >
      {children}
    </div>
  )),
}));

describe("MdxWrapper", () => {
  it("should normalize custom tags in content", () => {
    const input = `
<Check />
<Callout title="Note" />
<Alert type="warning" />
<Accordion title="Test" />
<BuildTools />
<BuildToolsChangelog />
<DrushChangelog />
<DNSProviderDocs />
<Download />
<Icon />
<Releases />
<TerminusVersion />
<Commands />
<ReviewDate />
<Product />
<ProductGroup />
<Youtube />
<Partial />
<Example />
<Popover />
<Enablement />
`;

    const result = normalizeAllCustomTags(input);

    // Check that tags are converted to lowercase
    // Todo, remove the space characters after the tag names once convertJsxPropsToHtml is restored
    // removed in https://github.com/pantheon-systems/documentation-in-nextjs/pull/217
    expect(result).toContain("<check ></check>");
    expect(result).toContain('<callout title="Note" >');
    expect(result).toContain('<alert type="warning" >');
    expect(result).toContain('<accordion title="Test" >');
    expect(result).toContain("<buildtools >");
    expect(result).toContain("<buildtoolschangelog >");
    expect(result).toContain("<drushchangelog >");
    expect(result).toContain("<dnsproviderdocs >");
    expect(result).toContain("<download >");
    expect(result).toContain("<icon >");
    expect(result).toContain("<releases >");
    expect(result).toContain("<terminusversion >");
    expect(result).toContain("<commands >");
    expect(result).toContain("<reviewdate >");
    expect(result).toContain("<product >");
    expect(result).toContain("<productgroup >");
    expect(result).toContain("<youtube >");
    expect(result).toContain("<partial >");
    expect(result).toContain("<example >");
    expect(result).toContain("<popover >");
    expect(result).toContain("<enablement >");
  });

  it("should render Alert component with mocked props", () => {
    const mockProps = {
      title: "Test Alert",
      type: "warning",
      icon: "warning-icon",
      children: "This is a test alert message",
    };

    render(<Alert {...mockProps} />);

    const alertElement = screen.getByTestId("alert-component");
    expect(alertElement).toBeDefined();
    expect(alertElement.getAttribute("data-title")).toBe("Test Alert");
    expect(alertElement.getAttribute("data-type")).toBe("warning");
    expect(alertElement.getAttribute("data-icon")).toBe("warning-icon");
    expect(alertElement.textContent).toBe("This is a test alert message");
  });

  // it("render MdxWrapper with Alert component as text content", async () => {
  //   const props: ComponentProps<typeof MdxWrapper> = {
  //     article: {
  //       content: `<div data-testid="markdown-content"># Test Alert\n<Alert title="Test Alert" type="warning" icon="warning-icon">This is a test alert message</Alert></div>`,
  //       contentType: "TEXT_MARKDOWN",
  //       slug: "markdown-content",
  //     },
  //     componentMap: {
  //       alert: Alert,
  //     },
  //   };

  //   let resolved: React.ReactNode;

  //   // const rendered = await MdxWrapper(props);

  //   await act(async () => {
  //     resolved = await MdxWrapper(props); // server component
  //   });

  //   // console.log(await render(await waitFor(() => rendered)).container);
  //   console.log(await render(resolved));
  //   screen.debug();

  //   // Wait for the component to render and verify the markdown content is processed
  //   await waitFor(() => {
  //     expect(screen.getByTestId("markdown-content")).toBeDefined();
  //   });

  //   // // Verify that the Alert component is rendered with correct props
  //   // const alertElement = screen.getByTestId("alert-component");
  //   // expect(alertElement).toBeDefined();
  //   // expect(alertElement.getAttribute("data-title")).toBe("Test Alert");
  //   // expect(alertElement.getAttribute("data-type")).toBe("warning");
  //   // expect(alertElement.getAttribute("data-icon")).toBe("warning-icon");
  //   // expect(alertElement.textContent).toBe("This is a test alert message");
  // });
});
