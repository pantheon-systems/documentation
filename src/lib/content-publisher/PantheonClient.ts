import { PantheonClient } from "@pantheon-systems/cpub-sdk-core";

function getCPUBHost() {
  return typeof window !== "undefined" && process.env.NEXT_PUBLIC_PCC_HOST
    ? process.env.NEXT_PUBLIC_PCC_HOST
    : process.env.PCC_HOST;
}

export function getSiteId(): string {
  const siteId = process.env.PCC_SITE_ID;
  if (!siteId) {
    throw new Error("PCC_SITE_ID is not set.");
  }
  return siteId;
}

export const getPantheonClient = ({
  siteId = getSiteId(),
  pccGrant,
}: {
  siteId?: string;
  pccGrant?: string | null;
} = {}) => {
  return new PantheonClient({
    pccHost: getCPUBHost(),
    siteId,
    // Preview links carry a short-lived grant; otherwise fall back to the
    // site's token. PCC_TOKEN is not NEXT_PUBLIC_, so it is only available
    // server-side and never shipped to the browser.
    apiKey: pccGrant ? `pcc_grant ${pccGrant}` : process.env.PCC_TOKEN ?? "",
  });
};
