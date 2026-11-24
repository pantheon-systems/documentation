"use client";
import style from "./style.module.css";

import React from "react";
import { PantheonLogo, SiteFooter } from "@/components/ui/pds-re-export";
import { FooterHeading, FooterLinks, SocialLinks } from "./footer-links";
import Link from "next/link";

import { MarketoForm } from "../common/marketo-form";
import CCLogo from "@/source/images/CC-BY-SA_icon.png";
import { cn } from "@/lib/utils";

const topicLinks = [
  <Link href="/get-started/">Get started</Link>,
  <Link href="/develop/">Develop</Link>,
  <Link href="/go-live/">Go live</Link>,
  <Link href="/platform/">Explore platform architecture</Link>,
  <Link href="/automate/">Automate & integrate</Link>,
  <Link href="/performance/">Optimize performance</Link>,
  <Link href="/manage/">Manage teams & organizations</Link>,
  <Link href="/troubleshoot/">Troubleshoot</Link>,
];

const helpLinks = [
  <a href="https://pantheon.io/contact-us">Contact</a>,
  <a href="https://pantheon.io/developers/office-hours?docs">Office Hours</a>,
  <a href="https://pantheon.io/learn-pantheon?docs">Learn Pantheon</a>,
  <a href="https://directory.pantheon.io/agencies?docs">Hire an agency</a>,
  <a href="https://status.pantheon.io/">Status</a>,
  <Link href="/guides/support/">Support</Link>,
];

const communityLinks = [
  <Link href="/code-of-conduct/">Code of conduct</Link>,
  <Link href="/contributors/">Contributors</Link>,
  <Link href="/pantheon-community/">Community & Power Users Group</Link>,
  <Link href="/contribute/">Learn to contribute</Link>,
];

// The layout follows the PDS docs site prototype: a brand column with the
// license, three link groups, and a connect column.
export const Footer = ({
  className,
  withBorder = true,
}: {
  className: string;
  withBorder?: boolean;
}) => {
  return (
    <SiteFooter
      legalLinks={[
        "privacy",
        "dataSubjectRequest",
        "cookiePolicy",
        <button id="ot-sdk-btn" className="ot-sdk-show-settings" />,
        "termsOfUse",
        "acceptableUse",
        "accessibilityStatement",
      ]}
      containerWidth="x-wide"
      className={cn(
        className,
        "pds-site-footer",
        withBorder && style.withBorder
      )}
    >
      <div className={style.footer}>
        <div className={style.brand}>
          <PantheonLogo linkContent={<Link href="/">Pantheon Docs</Link>} />
          <p className={cn(style.license, "pds-ts-s")}>
            Our documentation is licensed under a{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/">
              Creative Commons Attribution-ShareAlike 4.0 International License
            </a>
            . Code snippets are additionally licensed under{" "}
            <a href="https://opensource.org/license/mit">The MIT License</a>.
          </p>
          <img
            className={style.licenseLogo}
            src={CCLogo.src}
            alt="Creative Commons Attribution-ShareAlike Logo"
          />
        </div>

        <FooterLinks headingText="Topics" linkItems={topicLinks} />
        <FooterLinks headingText="Help" linkItems={helpLinks} />
        <FooterLinks headingText="Community" linkItems={communityLinks} />

        <section className={style.connect} aria-labelledby="footer-connect">
          <FooterHeading headingText="Connect" headingId="footer-connect" />
          <p className={cn(style.connectIntro, "pds-ts-s")}>
            Awesome development news, tutorials, and tips. Plus get three free
            downloads, just for signing up. If you don't love it, unsubscribe
            with just a click.
          </p>
          <div className="pds-mar-block-xl">
            <MarketoForm
              baseUrl="https://app-ab05.marketo.com"
              munchkinId="316-GSV-089"
              formId={2014}
              formName="mktoForm_2014"
            />
          </div>
          <SocialLinks />
        </section>
      </div>
    </SiteFooter>
  );
};
