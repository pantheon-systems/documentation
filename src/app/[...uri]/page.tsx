"use server";
import { notFound } from "next/navigation";
import {
  fetchArticleBySlug,
  getAllPages,
  singleSlugForFetch,
} from "@/lib/page-utils";
import { resolveComponent, serveLocalAsync } from "@/lib/resolve-component";
import { LandingTemplate } from "@/templates/landing";
import { getMdxProcessed } from "@/server/processor/mdx";
import { basename, join } from "path";
import {
  generateMetadataFromUri,
  GenerateMetadataParams,
} from "@/lib/site-metadata";

export interface DynamicViewProps {
  params: { uri: string[] };
  searchParams: {
    publishingLevel: "PRODUCTION" | "REALTIME";
    pccGrant: string | undefined;
    local: "true" | "false" | undefined;
  };
}

const getPages = async (
  uri: string[],
): Promise<{
  Component: React.ReactNode;
  title: string;
  description: string;
  seoMetadata: GenerateMetadataParams;
}> => {
  try {

    const allPages = await getAllPages(uri);

    const page = allPages.find((page) => page.uri === uri.join("/"));

    if (!page) {
      console.log("page not found", uri.join("/"));
      return {
        Component: null,
        title: "Not Found",
        description: "Not Found",
        seoMetadata: {
          title: "Not Found",
          description: "Not Found",
        },
      };
    }

    const { Component, template } = await resolveComponent(page);

    if (template === "terminus-command") {
      return {
        Component,
        title: page.title,
        description: page.description,
        seoMetadata: {
          title: `${page.title} | Terminus Commands`,
          description: page.description,
          image: "/images/terminus-Largethumb.png",
        },
      };
    }

    return {
      Component,
      title: page.title,
      description: page.description,
      seoMetadata: {
        title: page.title,
        description: page.description,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      Component: notFound(),
      title: "Not Found",
      description: "Not Found",
      seoMetadata: {
        title: "Not Found",
        description: "Not Found",
      },
    };
  }
};

export default async function Page(props: {
  params: Promise<DynamicViewProps["params"]>;
  searchParams: Promise<DynamicViewProps["searchParams"]>;
}) {
  // create landing pages for each of the pages in the data/landings.yaml file

  const { uri } = await props.params;

  if (uri.join().startsWith("_next") || uri.join().startsWith(".well-known")) {
    return notFound();
  }

  const { Component } = await getPages(
    uri,
    // await serveLocalAsync(props.searchParams)
  );

  if (Component === null) {
    return notFound();
  }

  return Component;
}

export async function generateMetadata(props: {
  params: Promise<DynamicViewProps["params"]>;
  searchParams: Promise<DynamicViewProps["searchParams"]>;
}) {
  const { uri } = await props.params;

  if (uri.join().startsWith("_next") || uri.join().startsWith(".well-known")) {
    return {
      title: "Not Found",
      description: "Not Found",
    };
  }

  const { seoMetadata } = await getPages(
    uri,
   // await serveLocalAsync(props.searchParams)
  );

  const { authors, ...returnData } = generateMetadataFromUri({
    ...seoMetadata,
  });

  return {
    ...returnData,
    authors: authors
      .map((author) => {
        if (typeof author === "string") {
          return { name: author };
        }
        return null;
      })
      .filter((e) => e !== null),
  };
}
