import React from "react";
import { Footer } from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
  withBorder?: boolean;
  /** The page's path, so the header can mark its section as the active trail. */
  activePage?: string;
}

export default function Layout({ children, withBorder = true, activePage }: Props) {
  // relative: the Navbar parks its closed mobile menu off-screen with absolute
  // positioning, which overflow-x-hidden only clips when this is positioned.
  return (
    <div className="pan-docs relative overflow-x-hidden min-w-screen max-w-screen">
      <Header activePage={activePage} />
      <main className="pan-docs__main" tabIndex={-1} id="docs-main">
        {children}
      </main>

      <Footer className="" withBorder={withBorder} />
    </div>
  );
}
