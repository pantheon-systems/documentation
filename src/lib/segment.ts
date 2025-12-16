import { AnalyticsBrowser } from "@segment/analytics-next";
// Adapted from
// https://github.com/vercel/next.js/tree/7aa5d162311150921cc9441434b003aeb5800ca2/examples/with-segment-analytics

export const analytics = AnalyticsBrowser.load({
  writeKey: process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!,
});
