"use client";

import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
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

  return (
    <Layout>
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
            <Link href="/">
              <Button size="large">Go to Documentation</Button>
            </Link>
            <Link href="https://pantheon.io/support">
              <Button variant="secondary" size="large">
                Contact support
              </Button>
            </Link>
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
    </Layout>
  );
}

export function generateMetadata() {
  return {
    title: "Internal server error",
    description:
      "An error occurred while processing your request. Try again or return to homepage.",
  };
}
