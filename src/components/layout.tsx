import React from "react";
import { Footer } from "./footer";
import Header from "./header";

interface Props {
  children: React.ReactNode;
  withBorder?: boolean;
}

export default function Layout({ children, withBorder = true }: Props) {
  // relative: the Navbar parks its closed mobile menu off-screen with absolute
  // positioning, which overflow-x-hidden only clips when this is positioned.
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden min-w-screen max-w-screen">
      <Header />
      <main className="mb-auto" tabIndex={-1} id="docs-main">
        {children}
      </main>

      <Footer className="" withBorder={withBorder} />
    </div>
  );
}
