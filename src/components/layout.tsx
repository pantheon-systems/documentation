import React from "react";
import { Footer } from "./footer";
import Header from "./header";
import SearchBar from "./header/search-bar";
import { ButtonLink, Container, CTASlice } from "@/components/ui/pds-re-export";

const primaryCTA = (
  <ButtonLink
    variant="primary"
    size="lg"
    linkContent={
      <a
        href="https://pantheon.io/learn-pantheon?docs"
        className="pds-button pds-button--lg"
        target="_blank"
      >
        Learn Pantheon
      </a>
    }
  />
);

const secondaryCTA = (
  <ButtonLink
    variant="secondary"
    size="lg"
    linkContent={
      <a
        href="https://pantheon.io/developers/office-hours?docs"
        className="pds-button pds-button--lg pds-button--secondary"
        target="_blank"
      >
        Office Hours
      </a>
    }
  />
);

interface Props {
  children: React.ReactNode;
  excludeSearch?: boolean;
  containerWidth?: "standard" | "wide";
  hasCta?: boolean;
  withBorder?: boolean;
}

export default function Layout({
  children,
  excludeSearch = false,
  containerWidth = "standard",
  hasCta = false,
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

        {hasCta && (
          <CTASlice
            backgroundColor="secondary"
            headingText="Got questions? We've got answers!"
            primaryLinkContent={primaryCTA}
            secondaryLinkContent={secondaryCTA}
            className="pre-footer-slice"
          />
        )}
      </main>

      <Footer className="" withBorder={withBorder} />
    </div>
  );
}
