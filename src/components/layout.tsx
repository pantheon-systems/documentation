import React from "react";
import { Footer } from "./footer";
import Header from "./header";
import SearchBar from "./header/search-bar";
import { Container } from "@/components/ui/pds-re-export";

interface Props {
  children: React.ReactNode;
  excludeSearch?: boolean;
  containerWidth?: "standard" | "wide";
  withBorder?: boolean;
}

export default function Layout({
  children,
  excludeSearch = false,
  containerWidth = "standard",
  withBorder = true,
}: Props) {
  // relative: the Navbar parks its closed mobile menu off-screen with absolute
  // positioning, which overflow-x-hidden only clips when this is positioned.
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden min-w-screen max-w-screen">
      <Header />
      {!excludeSearch && (
        <Container width={"standard"} className={`p-default`}>
          <SearchBar />
        </Container>
      )}
      <main className="mb-auto" tabIndex={-1} id="docs-main">
        {children}

      </main>

      <Footer className="" withBorder={withBorder} />
    </div>
  );
}
