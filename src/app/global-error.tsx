"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import SiteHeader from "@/components/header/site-header";
import { ButtonLink } from "@/components/ui/pds-re-export";
import styles from "./not-found.module.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const pathname = usePathname();

  const logEvent = async (errorStack: string) => {
    await fetch("/api/utils/logs", {
      method: "POST",
      body: JSON.stringify({
        message: errorStack,
        digest: error.digest,
        logLevel: "error",
        pathname,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    logEvent(error.message);
  }, [error]);

  // Not Layout: this is a client component, and Layout's header reads the omni
  // list from disk. An error page shouldn't depend on that anyway, so it gets
  // the header with just the fixed items.
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <SiteHeader menu={[]} />
      <main className="mb-auto" tabIndex={-1} id="docs-main">
        <div className={styles.container}>
          <div className={styles.content}>
            <div>
              <h1 className={styles.title}>500</h1>
              <h2 className={styles.subtitle}>Internal server error</h2>
              <p className={styles.description}>
                An error occurred while processing your request. Try again or
                return to homepage.
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <ButtonLink
                variant="primary"
                size="l"
                linkContent={<Link href="/">Go to Documentation</Link>}
              />
              <ButtonLink
                variant="secondary"
                size="l"
                linkContent={
                  <a href="https://pantheon.io/support">Contact support</a>
                }
              />
            </div>
          </div>
          <div className={styles.imageContainer}>
            <Image
              src="/images/error.png"
              alt="Pantheon Logo"
              fill
              className={styles.errorImage}
            />
          </div>
        </div>
      </main>
      <Footer className="" withBorder />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: "Internal server error",
    description:
      "An error occurred while processing your request. Try again or return to homepage.",
  };
}
