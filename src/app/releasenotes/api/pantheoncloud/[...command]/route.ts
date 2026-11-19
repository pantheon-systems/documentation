import { NextRequest, NextResponse } from "next/server";
import {
  Article,
  PantheonAPI,
  type PantheonClientConfig,
} from "@pantheon-systems/cpub-react-sdk/server";
import Logger from "@/lib/content-publisher/Logger";
import { getPantheonClient } from "@/lib/content-publisher/PantheonClient";
import { smartComponentMap } from "@/lib/content-publisher/smart-component";

type RouteContext = {
  params: Promise<{ command: string[] }>;
};

function buildHandler() {
  return PantheonAPI({
    getPantheonClient: (props?: Partial<PantheonClientConfig>) =>
      getPantheonClient({
        pccGrant: props?.pccGrant || "",
      }),
    resolvePath: (article: Partial<Article> & Pick<Article, "id">) => {
      const identifier =
        article.publishingLevel === "PRODUCTION"
          ? article.slug || article.id
          : article.id;

      return `/releasenotes/${identifier}`;
    },
    componentPreviewPath: (componentName: string) =>
      `/releasenotes/pantheon/preview/${componentName}`,
    smartComponentMap,
  });
}

async function handle(request: NextRequest, context: RouteContext) {
  try {
    const handler = buildHandler();
    const result = await handler(request, context);
    return result ?? new NextResponse(null, { status: 204 });
  } catch (err) {
    // Log the error
    Logger.error(err);

    const message = (err as Error)?.message?.toLowerCase() ?? "";
    let errorMessage =
      "An error occurred while loading this preview. Please try opening a new preview from the add-on.";

    // Authentication/Authorization Errors
    if (
      message.includes("this preview link has expired") ||
      message.includes("jwt validation error") ||
      message.includes("error occurred during authorization") ||
      message.includes("an error occurred during authorization")
    ) {
      errorMessage =
        "This preview link is no longer valid. Please open a new preview from the add-on.";
    }
    // Not authorized
    else if (message.includes("not authorized")) {
      errorMessage = "You are not authorized to access this preview.";
      if (message.includes("gmail restricted workspace")) {
        errorMessage =
          "This preview is not available as this workspace is restricted to Gmail accounts.";
      } else if (message.includes("not part of same workspace")) {
        errorMessage =
          "This preview is not available to you as your email is not part of the same workspace.";
      }
    }
    // Content Type Errors
    else if (
      message.includes("tree_pantheon_v1 is deprecated") ||
      message.includes(
        "article was not transformed into the requested contenttype"
      )
    ) {
      errorMessage =
        "This article's content format is not supported. Please contact Pantheon support.";
    }
    // Bad Data Error
    else if (message.includes("either an id or a slug is required")) {
      errorMessage =
        "Invalid article reference. Please try opening a new preview from the add-on.";
    }
    // Server Errors
    else if (
      message.includes("error retrieving article") ||
      message.includes("there was an error processing this preview") ||
      message.includes("management access tokens may not be used for gql") ||
      message.includes("error during authorization")
    ) {
      errorMessage =
        "Unable to load the preview at this time. Please try again later.";
    }

    // Redirect to error page with appropriate message
    return NextResponse.redirect(
      new URL(`/releasenotes/error?message=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return handle(request, context);
}
