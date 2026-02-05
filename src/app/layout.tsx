import { Poppins, Aleo, Source_Code_Pro } from "next/font/google";
import Script from "next/script";
import * as React from "react";

import "@/styles/globals.css";
import { PropsWithChildren } from "react";


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

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />

        <Script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          type="text/javascript"
          data-domain-script="fba5027b-04c0-4165-8778-4e10fb9f5fa3"
        />
      </head>

      <body
        className={`${poppins.className} ${aleo.className} ${sourceCodePro.className}`}
      >
        {children}

      </body>

    </html>
  );
}

export default MyApp;
