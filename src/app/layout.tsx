import {
  IBM_Plex_Serif,
  Inter,
  Inter_Tight,
  Source_Code_Pro,
} from "next/font/google";
import Script from "next/script";
import * as React from "react";
import { Suspense } from "react";

import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import { GlobalWrapper } from "@/components/ui/pds-re-export";
import { AnalyticsGTM } from "./analytics-gtm";
import SegmentAnalytics from "./analytics-segment";

// The V2 fonts. pds-core.css also loads them, but through an @import that ends
// up mid-file once the bundler concatenates the CSS, where browsers ignore it,
// so nothing loaded and every font fell back to the system sans. Self-host
// them here and point the --pds-typography-ff-* tokens at them (see
// globals.css).
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-ibm-plex-serif",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code-pro",
});

const fontVariables = [
  inter.variable,
  interTight.variable,
  ibmPlexSerif.variable,
  sourceCodePro.variable,
].join(" ");

function MyApp({ children }: PropsWithChildren) {
  const enableAnalytics = process.env.NODE_ENV !== "development";

  const enableGTM =
    enableAnalytics && process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

        {enableGTM && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
    `,
            }}
          />
        )}

        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          data-domain-script="fba5027b-04c0-4165-8778-4e10fb9f5fa3"
        />
      </head>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <AnalyticsGTM />
      )}

      <body>
        {/* The V2 header needs about 1260px, so the nav collapses below 1280px.
            Page layouts keep the default 767px mobile breakpoint. */}
        <GlobalWrapper navMobileMaxWidth={1279}>{children}</GlobalWrapper>
      </body>
      <Suspense>
        <SegmentAnalytics />
      </Suspense>

    </html>
  );
}

export default MyApp;
