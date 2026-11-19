"use client";

import { smartComponentMap } from "@/lib/content-publisher/smart-component";

interface Props {
  componentName: string;
  attrs?: string;
}

export default function SmartComponentPreviewContent({ componentName, attrs }: Props) {
  if (!componentName) return null;

  const decodedAttrs =
    attrs && typeof attrs === "string"
      ? JSON.parse(Buffer.from(attrs, "base64").toString())
      : {};

  const SmartComponent =
    smartComponentMap[componentName.toString().toUpperCase()]?.reactComponent;

  return (
    <div className="flex w-[100vw] h-[100vh] items-center justify-center">
      {SmartComponent ? (
        <div>
          <SmartComponent {...decodedAttrs} />
        </div>
      ) : (
        <div>Component not found</div>
      )}
    </div>
  );
}
