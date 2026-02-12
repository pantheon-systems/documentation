import Image from "next/image";
import Link from "next/link";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <Layout>
      <div className="pds-container pds-spacing-pad-block-start-2xl pds-spacing-pad-block-end-4xl">
        <div style={{ textAlign: "center" }}>
          <main id="docs-main" tabIndex={-1}>
            <div>
              <h1 className="pds-spacing-mar-block-end-3xl">
                Sorry, there's no page at that URL.
              </h1>
              <img
                className="notfound"
                style={{
                  maxWidth: "400px",
                }}
                src="/images/not-found.svg"
              ></img>
            </div>
          </main>
        </div>
      </div>{" "}
    </Layout>
  );
}

export function generateMetadata() {
  return {
    title: "Page not found",
    description:
      "The page might not exist or is temporarily unavailable. Check the URL or return to homepage.",
  };
}
