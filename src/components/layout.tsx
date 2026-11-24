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
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden min-w-screen max-w-screen">
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
