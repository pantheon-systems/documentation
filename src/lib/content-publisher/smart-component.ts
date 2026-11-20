import {
  Article,
  PantheonAPI,
  PantheonClientConfig,
  type SmartComponentMap as CoreSmartComponentMap,
} from "@pantheon-systems/cpub-react-sdk";
import { withSmartComponentErrorBoundary } from "@/components/content-publisher/error-boundary";
import LeadCapture from "@/components/content-publisher/pantheon_smartcomponents/lead-capture";
import MediaPreview from "@/components/content-publisher/pantheon_smartcomponents/media-preview";
import ProductPreview from "@/components/content-publisher/pantheon_smartcomponents/product-preview";
import { SmartComponentMap } from "@pantheon-systems/cpub-react-sdk/components";

export const smartComponentSchema = {
  LEAD_CAPTURE: {
    title: "Lead Capture Form",
    iconUrl: null,
    exampleImageUrl:
      "https://storage.googleapis.com/pcc-prod-user-uploads/preview-lead-capture.png?v=2",
    fields: {
      title: {
        displayName: "Title",
        required: true,
        type: "string",
      },
      body: {
        displayName: "Body",
        required: false,
        type: "string",
      },
    },
  },
  PRODUCT_PREVIEW: {
    title: "Product Preview",
    iconUrl: null,
    exampleImageUrl:
      "https://storage.googleapis.com/pcc-prod-user-uploads/preview-product-preview.png",
    fields: {
      name: {
        displayName: "Name",
        required: true,
        type: "string",
      },
      external_url: {
        displayName: "External URL",
        required: true,
        type: "string",
      },
      price: {
        displayName: "Price",
        required: false,
        type: "string",
        defaultValue: "$2.50",
      },
      description: {
        displayName: "Description",
        required: false,
        type: "string",
      },
      image_url: {
        displayName: "Image URL",
        required: false,
        type: "string",
      },
    },
  },
  MEDIA_PREVIEW: {
    title: "Media Preview",
    iconUrl: null,
    exampleImageUrl:
      "https://storage.googleapis.com/pcc-prod-user-uploads/preview-media-preview.png",
    fields: {
      url: {
        displayName: "URL",
        required: true,
        type: "string",
      },
    },
  },
} satisfies CoreSmartComponentMap;

// Export raw components for server-side use (API routes)
// The error boundary wrapping happens in the client components that use these
export const smartComponentMap: SmartComponentMap = {
  LEAD_CAPTURE: {
    ...smartComponentSchema.LEAD_CAPTURE,
    reactComponent: LeadCapture as SmartComponentMap[string]["reactComponent"],
  },
  PRODUCT_PREVIEW: {
    ...smartComponentSchema.PRODUCT_PREVIEW,
    reactComponent: ProductPreview as SmartComponentMap[string]["reactComponent"],
  },
  MEDIA_PREVIEW: {
    ...smartComponentSchema.MEDIA_PREVIEW,
    reactComponent: MediaPreview as SmartComponentMap[string]["reactComponent"],
  },
};

export type ComponentAttributes<T extends keyof typeof smartComponentSchema> = {
  [key in keyof (typeof smartComponentSchema)[T]["fields"]]: string;
};

export type LeadCaptureAttributes = ComponentAttributes<"LEAD_CAPTURE">;
export type ProductPreviewAttributes = ComponentAttributes<"PRODUCT_PREVIEW">;
