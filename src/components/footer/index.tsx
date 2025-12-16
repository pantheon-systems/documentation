"use client";
import style from "./style.module.css";

import React from "react";
import {
  FooterLinks,
  FooterHeading,
  SiteFooter,
  SocialLinks,
  ThreeItemLayout,
} from "@/components/ui/pds-re-export";
import Link from "next/link";

import { MarketoForm } from "../common/marketo-form";
import CCLogo from "@/source/images/CC-BY-SA_icon.png";
import { cn } from "@/lib/utils";

const topicLinks = [
  <Link href="/get-started/">Get Started</Link>,
  <Link href="/develop/">Develop</Link>,
  <Link href="/go-live/">Go Live</Link>,
  <Link href="/platform/">Explore Platform Architecture</Link>,
  <Link href="/automate/">Automate & Integrate</Link>,
  <Link href="/performance/">Optimize Performance</Link>,
  <Link href="/manage/">Manage Teams & Organizations</Link>,
  <Link href="/troubleshoot/">Troubleshoot</Link>,
];

const helpLinks = [
  <a href="https://pantheon.io/contact-us" className="cta docs-cta">
    Contact
  </a>,
  <a
    href="https://directory.pantheon.io/agencies?docs"
    className="cta docs-cta"
  >
    Hire an Agency
  </a>,
  <a href="https://status.pantheon.io/">Status</a>,
  <Link href="/guides/support/">Support</Link>,
];

const communityLinks = [
  <Link href="/code-of-conduct/">Code of Conduct</Link>,
  <Link href="/contributors/">Contributors</Link>,
  <Link href="/pantheon-community/">Community & Power Users Group</Link>,
  <Link href="/contribute/">Learn to Contribute</Link>,
];

export const Footer = ({
  className,
  withBorder = true,
}: {
  className: string;
  withBorder?: boolean;
}) => {
  return (
    <SiteFooter
      containerWidth="standard"
      className={cn(
        className,
        "pds-site-footer",
        withBorder && style.withBorder
      )}
    >
      <div className="pds-footer__links-area pds-grid pds-grid--wide">
        <div className="pds-footer__links-area-column pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-12 pds-grid-item--lg-8">
          <ThreeItemLayout>
            <FooterLinks
              slot="first-item"
              headingText="Topics"
              headingLevel="h2"
              linkItems={topicLinks}
            />
            <FooterLinks
              slot="second-item"
              headingText="Help"
              headingLevel="h2"
              linkItems={helpLinks}
              className="pds-spacing-mar-block-start-xl@sm"
            />
            <FooterLinks
              slot="third-item"
              headingText="Community"
              headingLevel="h2"
              linkItems={communityLinks}
              className="pds-spacing-mar-block-start-xl@sm"
            />
          </ThreeItemLayout>
        </div>
        <div className="pds-footer__links-area-column pds-grid-item pds-grid-item--sm-4 pds-grid-item--md-12 pds-grid-item--lg-4">
          <FooterHeading
            headingText="Connect"
            headingLevel="h2"
            className="pds-spacing-pad-block-start-xl pds-spacing-pad-block-start-none@lg"
          />
          <p className={cn(style.footerFormIntro, "pds-ts-s")}>
            Awesome development news, tutorials, and tips. Plus get three free
            downloads, just for signing up. If you don't love it, unsubscribe
            with just a click.
          </p>
          <div className="pds-spacing-mar-block-xl">
            <MarketoForm
              baseUrl="https://app-ab05.marketo.com"
              munchkinId="316-GSV-089"
              formId={2014}
              formName="mktoForm_2014"
            />
          </div>
          <SocialLinks className="pds-spacing-mar-block-start-xl" />
        </div>
      </div>

      <div className={cn(style.ccLicense, "pds-spacing-mar-block-start-5xl")}>
        <div className={style.ccLicenseLogoImage}>
          <img
            className={style.ccLicenseLogoImage}
            src={CCLogo.src}
            alt="Creative Commons Attribution-ShareAlike Logo"
          />
        </div>
        <p className={cn(style.ccLicenseLogoText, "pds-ts-s")}>
          Our Documentation is licensed under a Creative Commons
          Attribution-ShareAlike 4.0 International License. Code snippets are
          additionally licensed under The MIT License.
        </p>
      </div>
    </SiteFooter>
  );
};
