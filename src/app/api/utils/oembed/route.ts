import { NextResponse } from "next/server";
import queryString from "query-string";

const oembedURLs = {
  twitter: "https://publish.twitter.com/oembed",
  instagram: "https://www.instagram.com/api/v1/oembed",
  youtube: "https://www.youtube.com/oembed",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  let type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: "type query required" }, { status: 400 });
  }

  const oembedUrl = oembedURLs[type as keyof typeof oembedURLs];

  if (!oembedUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const queryParams = { url };

  const response = await fetch(
    `${oembedUrl}?${queryString.stringify(queryParams)}`
  );

  if (response.ok) {
    const json = await response.json();
    return NextResponse.json(json);
  } else {
    console.error(await response.text());
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
