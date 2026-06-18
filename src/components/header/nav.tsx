"use client";

import * as Popover from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RemoveScroll } from "react-remove-scroll";

import CloseIcon from "@/assets/icons/close.svg";
import HamburgerMenuIcon from "@/assets/icons/hamburger-menu.svg";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import * as React from "react";
import { ClientHeader } from "./client-header";
import { navButtons } from "./common";
import styles from "./nav.module.css";

export default function NavMenu({
  omniLinks,
}: {
  omniLinks: { link: string; title: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <Button variant="secondary" size="icon">
          {open ? (
            <Image
              src={CloseIcon}
              alt="Close"
              title="Close"
              width={16}
              height={16}
            />
          ) : (
            <Image
              src={HamburgerMenuIcon}
              alt="Hamburger Menu"
              title="Hamburger Menu"
              width={16}
              height={16}
            />
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        style={{}}
        className={styles.popoverContent}
        align="start"
      >
        <RemoveScroll>
          <div className={styles.mobileNavContainer}>
            <div className={styles.mobileNavContent}>
              <ClientHeader omniLinks={omniLinks} />
            </div>

            <div className={styles.mobileButtonsContainer}>
              {navButtons.map((button) => (
                <Link
                  className={styles.mobileButtonLink}
                  href={button.href}
                  key={button.href}
                >
                  <Button
                    variant={button.variant}
                    className={styles.mobileButton}
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </RemoveScroll>
      </Popover.Content>
    </Popover.Root>
  );
}
