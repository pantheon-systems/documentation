"use client";

import React, { useEffect, useState } from "react";
/*
This component creates embedded Wistia videos.

PARAMETERS:
src="wistiavideoID"
*/

export const Wistia = ({ src }: { src: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      const wistia_embed_video_id = document.createElement("script");

      wistia_embed_video_id.setAttribute(
        "src",
        "https://fast.wistia.com/embed/medias/" + `${src}` + ".jsonp"
      );
      wistia_embed_video_id.setAttribute("async", "/");

      document.body.appendChild(wistia_embed_video_id);

      const wistia_embed_external_js = document.createElement("script");
      wistia_embed_external_js.setAttribute(
        "src",
        `https://fast.wistia.com/assets/external/E-v1.js`
      );
      wistia_embed_external_js.setAttribute("async", "true");

      document.body.appendChild(wistia_embed_external_js);
    }
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    // Return the iframe, wrapped in a div.
    <div className="wistia_container">
      <div className="wistia_responsive_padding">
        <div className="wistia_responsive_wrapper">
          <div
            className={
              "wistia_embed wistia_async_" +
              `${src}` +
              " seo=true videoFoam=true"
            }
          >
            <div className="wistia_swatch">
              <img
                src={
                  "https://fast.wistia.com/embed/medias/" + `${src}` + "/swatch"
                }
                alt=""
                aria-hidden="true"
                onLoad={() => {
                  // this.parentNode.style.opacity = '1';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
