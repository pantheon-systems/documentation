import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NavbarSearch } from "@/components/header/navbar-search";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
// The AddSearch suggestions widget loads third-party scripts.
vi.mock("next/script", () => ({ default: () => null }));
vi.mock("@/components/common/addsearch", () => ({ default: () => null }));

// jsdom has no matchMedia, which PDS inputs may call.
window.matchMedia =
  window.matchMedia ||
  ((query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList);

beforeEach(() => push.mockClear());

describe("NavbarSearch", () => {
  it("goes to the search results with the term when submitted", () => {
    render(<NavbarSearch slot="search" />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "pantheon yml" } });
    fireEvent.submit(input.form!);

    expect(push).toHaveBeenCalledWith("/search?search=pantheon%20yml");
  });

  it("does nothing for an empty search", () => {
    render(<NavbarSearch slot="search" />);
    const input = screen.getByRole("searchbox") as HTMLInputElement;

    fireEvent.submit(input.form!);

    expect(push).not.toHaveBeenCalled();
  });

  it("focuses the field when / is pressed outside an input", () => {
    render(<NavbarSearch slot="search" />);
    const input = screen.getByRole("searchbox");

    fireEvent.keyDown(document.body, { key: "/" });

    expect(document.activeElement).toBe(input);
  });
});
