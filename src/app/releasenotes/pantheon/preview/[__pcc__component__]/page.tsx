import { Metadata } from "next";
import SmartComponentPreviewContent from "@/components/content-publisher/smart-component-preview-content";

// Force dynamic rendering (SSR on every request)
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Component Preview",
    description: "Preview smart components",
  };
}

interface Props {
  params: Promise<{ __pcc__component__: string }>;
  searchParams: Promise<{ attrs?: string }>;
}

export default async function SmartComponentPreviewPage({ params, searchParams }: Props) {
  const { __pcc__component__ } = await params;
  const { attrs } = await searchParams;

  return (
    <SmartComponentPreviewContent
      componentName={__pcc__component__}
      attrs={attrs}
    />
  );
}
