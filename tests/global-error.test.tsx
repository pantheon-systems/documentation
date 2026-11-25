/// <reference types="vitest-fetch-mock/types" />
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import GlobalError from "@/app/global-error";

// The 500 page only mounts when the app itself fails, so render it here to
// make sure it still works. The shell around it is not what's under test.
vi.mock("next/navigation", () => ({ usePathname: () => "/broken" }));
vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));
vi.mock("@/components/footer", () => ({ Footer: () => <footer /> }));
vi.mock("@/components/header/site-header", () => ({
  default: () => <header />,
}));

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("GlobalError", () => {
  it("offers the way home and support, as PDS button links", () => {
    render(<GlobalError error={new Error("boom")} />);

    const home = screen.getByRole("link", { name: "Go to Documentation" });
    const support = screen.getByRole("link", { name: "Contact support" });
    expect(home.getAttribute("href")).toBe("/");
    expect(support.getAttribute("href")).toBe("https://pantheon.io/support");
    expect(home.closest(".pds-button-link")).not.toBeNull();
    expect(screen.getByRole("heading", { name: /500/ })).toBeTruthy();
  });

  it("logs the error", () => {
    render(<GlobalError error={new Error("boom")} />);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/utils/logs",
      expect.objectContaining({ method: "POST" })
    );
  });
});
