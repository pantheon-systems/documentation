import { getPreviewComponentFromURL, SUPPORTED_PROVIDERS } from "./providers";

interface Props {
  url: string;
}

const MediaPreview = ({ url }: Props) => {
  const previewComponent = getPreviewComponentFromURL(url);

  if (!previewComponent) {
    return (
      <div className="max-w-[400px] w-full outline outline-black/10 p-4 rounded-md">
        <p className="my-2 text-lg font-medium">
          Unsupported Media Preview URL &quot;{url}&quot;
        </p>
        <p className="text-sm">
          Supported Platforms: {SUPPORTED_PROVIDERS.join(", ")}
        </p>
      </div>
    );
  }

  return <div className="w-full">{previewComponent}</div>;
};

export default MediaPreview;
