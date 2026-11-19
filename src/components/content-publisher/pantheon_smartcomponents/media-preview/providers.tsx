"use client";

import Script from "next/script";
import useSWR from "swr";

export const SUPPORTED_PROVIDERS = [
  "Youtube",
  "Vimeo",
  "Twitter",
  "X",
  "Instagram",
  "DailyMotion",
  "Loom",
  "Any URL (generic iframe)",
];

interface EmbedProps {
  url: string;
}

export function getPreviewComponentFromURL(url: string) {
  if (!url) return null;

  try {
    let urlWithProtocol = url;

    if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
      urlWithProtocol = `https://${url}`;
    } else if (url.indexOf("http://") === 0) {
      url = url.replace("http://", "https://");
    }

    const urlObj = new URL(urlWithProtocol);
    const hostname = urlObj.hostname;
    const hostnameParts = hostname.split(".");
    const provider = hostnameParts[hostnameParts.length - 2];

    switch (provider.toLowerCase()) {
      case "youtube":
      case "youtu":
      case "yt":
        return <YoutubePreview url={urlWithProtocol} />;

      case "twitter":
      case "x":
        return <TwitterPreview url={urlWithProtocol} />;

      case "vimeo":
        return <VimeoPreview url={urlWithProtocol} />;
      case "instagram":
        return <InstagramPreview url={urlWithProtocol} />;
      case "dailymotion":
        return <DailyMotionPreview url={urlWithProtocol} />;
      case "loom":
        return <LoomPreview url={urlWithProtocol} />;
      default:
        return <GenericIframe url={urlWithProtocol} />;
    }
  } catch (e) {
    console.error("Media smart component render failed", e, { url });
    return null;
  }
}

function extractVideoId(url: string) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const pathnameParts = pathname.split("/");
  return pathnameParts[pathnameParts.length - 1];
}

function VimeoPreview({ url }: EmbedProps) {
  const embedUrl = `https://player.vimeo.com/video/${extractVideoId(url)}`;

  return (
    <iframe src={embedUrl} className="w-full max-w-[560px] h-80 rounded-2xl" />
  );
}

function DailyMotionPreview({ url }: EmbedProps) {
  const embedUrl = `https://www.dailymotion.com/embed/video/${extractVideoId(
    url
  )}`;

  return (
    <iframe src={embedUrl} className="w-full max-w-[560px] h-96 rounded-2xl" />
  );
}

interface OEmbedResponse {
  html: string;
  width: number;
  thumbnail_width: number;
  thumbnail_height: number;
  status?: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function YoutubePreview({ url }: EmbedProps) {
  const { data, error, isLoading, ...rest } = useSWR<OEmbedResponse>(
    `/api/utils/oembed?url=${encodeURIComponent(url)}&type=youtube`,
    fetcher
  );

  if (data?.status === 401)
    return (
      <div className="my-2 text-gray-400 leading-7">
        Video unavailable - <br />
        playback on other websites has been disabled by the video owner
        <br />
        <a href={url} target="_blank">
          Watch on YouTube
        </a>
      </div>
    );
  if (error || !data?.html)
    return (
      <div className="my-2 text-gray-400">Error loading Youtube preview</div>
    );
  if (isLoading) return <div>Loading...</div>;

  // Set width of iframe to thumbnail width and height
  const html = data.html
    .replace(/width="(\d+)"/, `width="${data.thumbnail_width}"`)
    .replace(/height="(\d+)"/, `height="${data.thumbnail_height}"`);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      className="[&>iframe]:rounded-2xl"
    />
  );
}

function TwitterPreview({ url }: EmbedProps) {
  // Replace X with Twitter
  const twitterURL = url.replace("x.com", "twitter.com");

  const { data, error, isLoading } = useSWR<OEmbedResponse>(
    `/api/utils/oembed?url=${encodeURIComponent(twitterURL)}&type=twitter`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.html) return <div>Error loading Twitter preview</div>;

  return (
    <>
      <div
        style={{ maxWidth: data.width }}
        dangerouslySetInnerHTML={{ __html: data.html }}
      />
      <Script src="https://platform.twitter.com/widgets.js" />
    </>
  );
}

function LoomPreview({ url }: EmbedProps) {
  return (
    <div>
      <iframe
        src={`https://www.loom.com/embed/${extractVideoId(url)}`}
        allowFullScreen
        className="w-full max-w-[560px] h-96 rounded-2xl"
      ></iframe>
    </div>
  );
}

function GenericIframe({ url }: EmbedProps) {
  return (
    <div>
      <iframe
        src={url}
        allowFullScreen
        className="w-full max-w-[560px] h-96 rounded-2xl"
      ></iframe>
    </div>
  );
}

function InstagramPreview({ url }: EmbedProps) {
  const { data, error, isLoading } = useSWR<OEmbedResponse>(
    `/api/utils/oembed?url=${encodeURIComponent(url)}&type=instagram`,
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !data?.html) return <div>Error loading Instagram preview</div>;

  return (
    <>
      <div
        style={{ maxWidth: data.width }}
        dangerouslySetInnerHTML={{ __html: data.html }}
        className="[&>iframe]:!rounded-2xl"
      />
      <Script src="https://www.instagram.com/embed.js" />
    </>
  );
}
