"use client";

import { useEffect, useState } from "react";

export const AnalyticsGTM = () => {
  const [loaded, setLoaded] = useState(false);
  // Initialize to an empty string to be safe on the server
  const [url, setUrl] = useState("");

  useEffect(() => {
    setLoaded(true);

    const initialUrl = window.location.pathname + window.location.search;
    setUrl(initialUrl);

    const handleRouteChange = () => {
      const newUrl = window.location.pathname + window.location.search;
      setUrl(newUrl);
    };

    window.addEventListener("popstate", handleRouteChange);
    window.addEventListener("pushstate", handleRouteChange);
    window.addEventListener("replacestate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
      window.removeEventListener("pushstate", handleRouteChange);
      window.removeEventListener("replacestate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (!loaded || typeof window.dataLayer === "undefined") return;

    window.dataLayer.push({
      event: "pageview",
      page_path: window.location.pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [url, loaded]);

  // Web vitals support can be added via the `web-vitals` package if needed
  return null;
};
