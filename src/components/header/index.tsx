"use server";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PantheonLogo from "@/assets/logos/pantheon-full-logo.svg";
import { Button } from "../ui/button";
import NavMenu from "./nav";
// import SearchBar from "./search-bar";
import { ClientHeader } from "./client-header";
import { navButtons } from "./common";

import styles from "./index.module.css";
import { Container } from "../ui/pds-re-export";
import { getOmniItems } from "../omni-components";

export default async function Header() {
  const omniLinks = await getOmniItems();
  return (
    <header className={styles.pdsTailwind}>
      <a id="skip-to-main" className="pds-skiplink" href="#docs-main">
        Skip to main content
      </a>

      <Container width={"x-wide"} className={styles.headerContainer}>
        <div>
          <nav className={styles.navContainer}>
            <Link href="/">
              <Image
                src={PantheonLogo}
                alt="Pantheon Logo"
                width={160}
                height={48}
              />
            </Link>
            <div className={styles.desktopNav}>
              <ClientHeader omniLinks={omniLinks} />
            </div>
          </nav>
        </div>

        <div className={styles.rightSection}>
          <nav className={styles.desktopButtons}>
            {navButtons.map((button) => (
              <Link href={button.href} key={button.href}>
                <Button variant={button.variant} size="full">
                  {button.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className={styles.mobileMenu}>
            <NavMenu omniLinks={omniLinks} />
          </div>
        </div>
      </Container>
    </header>
  );
}
