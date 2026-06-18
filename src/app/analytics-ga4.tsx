"use client";

import { useEffect, useState } from "react";

export const AnalyticsGA4 = () => {
  const [loaded, setLoaded] = useState(false);

  // Track URL changes manually
  const [url, setUrl] = useState(() => {
    return window.location.pathname + window.location.search;
  });

  useEffect(() => {
    setLoaded(true);

    const handleRouteChange = () => {
      const newUrl = window.location.pathname + window.location.search;
      setUrl(newUrl);
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushstate", handleRouteChange); // for custom router support
    window.addEventListener("replacestate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("replacestate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    if (typeof window.gtag !== "function") return;

    window.gtag("event", "route-change", {
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [url, loaded]);

  // Remove useReportWebVitals. You can hook this up with an external vitals lib if needed
  return null;
};
