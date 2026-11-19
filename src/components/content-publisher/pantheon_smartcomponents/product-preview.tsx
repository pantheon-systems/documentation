import { useCallback } from "react";
import Card from "../card";
import { ProductPreviewAttributes } from "@/lib/content-publisher/smart-component";

const ProductPreview = ({
  name,
  price,
  description,
  external_url,
  image_url,
}: ProductPreviewAttributes) => {
  const viewProduct = useCallback(
    () => window.open(external_url),
    [external_url]
  );
  return (
    <Card
      title={name}
      description={
        <div className="flex flex-col gap-3">
          {price && (
            <div className="text-neutral text-lg font-bold">{price}</div>
          )}
          {description && <div>{description}</div>}
        </div>
      }
      imageUrl={image_url}
      primaryButtonText="View Product"
      primaryButtonAction={viewProduct}
    />
  );
};

export default ProductPreview;
