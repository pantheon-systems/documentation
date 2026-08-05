import { Poppins, Aleo, Source_Code_Pro } from "next/font/google";
import Script from "next/script";
import * as React from "react";
import { Suspense } from "react";

import "@/styles/globals.css";
import { PropsWithChildren } from "react";
import { AnalyticsGTM } from "./analytics-gtm";
import SegmentAnalytics from "./analytics-segment";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const aleo = Aleo({
  subsets: ["latin"],
  weight: ["400", "700"],
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["600"],
});

function MyApp({ children }: PropsWithChildren) {
  const enableAnalytics = process.env.NODE_ENV !== "development";

  const enableGTM =
    enableAnalytics && process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html>
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

      <body
        className={`${poppins.className} ${aleo.className} ${sourceCodePro.className}`}
      >
        {children}

      </body>
      <Suspense>
        <SegmentAnalytics />
      </Suspense>

    </html>
  );
}

export default MyApp;
