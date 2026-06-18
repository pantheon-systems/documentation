"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/segment";

// Adapted from
// https://github.com/vercel/next.js/tree/7aa5d162311150921cc9441434b003aeb5800ca2/examples/with-segment-analytics
export default function SegmentAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  return null;
}
