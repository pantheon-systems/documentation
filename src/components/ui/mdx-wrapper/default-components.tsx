import { ComponentProps } from "react";
import { ArticleRenderer } from "../pds-re-export";
import { Alert } from "@/components/common/alert";
import { Callout } from "@/components/common/callout";
import { Accordion } from "@/components/common/accordion";
import { BuildTools } from "@/components/common/build-tools";
import { DNSProviderDocs } from "@/components/common/dns-provider-docs";
import { Download } from "@/components/common/download";
import { Icon } from "@/components/common/icon";
import { Releases } from "@/components/common/releases";
import { BuildToolsChangelog } from "@/components/common/build-tools-changelog";
import { DrushChangelog } from "@/components/common/drush-changelog";
import { TerminusVersion } from "@/components/common/terminus-version";
import { Commands } from "@/components/common/commands";
import { ReviewDate } from "@/components/common/review-date";
import { Check } from "@/components/common/check";
import { convertJsxPropsToHtml, normalizeCustomTags } from "./helper";
import { Product } from "@/components/common/product";
import { ProductGroup } from "@/components/common/product-group";
import { Youtube } from "@/components/common/youtube";
import path from "path";
import { existsSync } from "fs";
import { TabList } from "@/components/common/tab-list";
import { Pre } from "./pre";
import { Example } from "@/components/common/style-example";
import { CardGroup } from "@/components/common/card-group";
import Card from "@/components/common/card";
import { Popover } from "@/components/common/popover";
import { Wistia } from "@/components/common/wistia";
import Enablement from "@/components/common/enablement";

export type MdxWrapperProps = ComponentProps<typeof ArticleRenderer>;

const ImageRenderer = async ({ src = "", alt }: any) => {
  let resolvedSrc = path.join(process.cwd(), "src", "source", "images", src);
  let importPath = src;
  if (src.includes("/images/")) {
    const [, imagePath] = src.split("/images/");
    resolvedSrc = path.join(
      process.cwd(),
      "src",
      "source",
      "images",
      imagePath
    );
    importPath = imagePath;
  }

  // For dev only – validate path exists
  if (!existsSync(resolvedSrc)) {
    console.warn(`Image not found at ${resolvedSrc}`, src);
    return null;
  }

  if (!importPath) {
    console.warn(`Image path not found at ${resolvedSrc}`, src);
    return null;
  }

  const image = await import(`@/source/images/${importPath}`);

  return (
    <span className="next-resp-image-container">
      <img
        src={image.default.src} // You may copy your images to `public/images` in build step
        alt={alt || ""}
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </span>
  );
};

export const defaultComponentMap: MdxWrapperProps["componentMap"] = {
  callout: Callout,
  alert: Alert,
  accordion: Accordion,
  buildtools: BuildTools,
  buildtoolschangelog: BuildToolsChangelog,
  // // ResourceSelector
  drushchangelog: DrushChangelog,
  dnsproviderdocs: DNSProviderDocs,
  download: Download,
  icon: Icon,
  releases: Releases,
  terminusversion: TerminusVersion,
  commands: Commands,
  reviewdate: ReviewDate,
  check: Check,
  product: Product,
  productgroup: ProductGroup,
  youtube: Youtube,
  wistia: Wistia,
  img: ImageRenderer,

  card: Card,
  cardgroup: CardGroup,

  // tab: Tab,
  tablist: TabList,
  pre: Pre,
  example: Example,
  popover: Popover,

  enablement: Enablement,
};

export const normalizeAllCustomTags = (input: string) => {
  input = normalizeCustomTags(input, "Check");
  input = normalizeCustomTags(input, "Callout");
  input = normalizeCustomTags(input, "Alert");
  input = normalizeCustomTags(input, "Accordion");
  input = normalizeCustomTags(input, "BuildTools");
  input = normalizeCustomTags(input, "BuildToolsChangelog");
  input = normalizeCustomTags(input, "DrushChangelog");
  input = normalizeCustomTags(input, "DNSProviderDocs");
  input = normalizeCustomTags(input, "Download");
  input = normalizeCustomTags(input, "Icon");
  input = normalizeCustomTags(input, "Releases");
  input = normalizeCustomTags(input, "TerminusVersion");
  input = normalizeCustomTags(input, "Commands");
  input = normalizeCustomTags(input, "ReviewDate");

  input = normalizeCustomTags(input, "Product");
  input = normalizeCustomTags(input, "ProductGroup");

  input = normalizeCustomTags(input, "Youtube");
  input = normalizeCustomTags(input, "Partial");
  input = normalizeCustomTags(input, "Example");

  input = normalizeCustomTags(input, "Popover");

  input = input.replaceAll("bash{promptUser: ", "bash{promptUser:");
  input = input.replaceAll("bash{outputLines: ", "bash{outputLines:");

  input = normalizeCustomTags(input, "Enablement");
  // TabList not added here
   return input;
  // This function call caused errors fixed in https://github.com/pantheon-systems/documentation-in-nextjs/pull/217
  // Todo, consider if it should be re-added later.
  // return convertJsxPropsToHtml(input);
};
