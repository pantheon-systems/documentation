"use client";

import classNames from "clsx";
import { useCallback } from "react";

interface Props {
  title: string;
  primaryButtonText: string;
  primaryButtonAction: () => void;
  secondaryButtonText?: string;
  secondaryButtonAction?: () => void;
  description?: React.ReactNode;
  kickerText?: string;
  imageUrl?: string;
  fullWidth?: boolean;
  clickable?: boolean;
  imagePlaceholder?: boolean;
}

export default function Card({
  title,
  primaryButtonText,
  primaryButtonAction,
  description,
  kickerText,
  imageUrl,
  secondaryButtonText,
  secondaryButtonAction,
  fullWidth,
  clickable,
  imagePlaceholder,
}: Props) {
  const handleClick = useCallback(() => {
    if (clickable) primaryButtonAction();
  }, [clickable, primaryButtonAction]);
  return (
    <div className={classNames("card-container", fullWidth && "w-full")}>
      {imageUrl && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className={classNames(
            "object-contain max-h-48 m-0",
            clickable && "cursor-pointer"
          )}
          src={imageUrl}
          alt="Product Image"
          onClick={handleClick}
        />
      )}
      {imagePlaceholder && (
        <div
          className={classNames(
            "h-48 w-full bg-gradient-to-b from-base-100 to-base-200",
            clickable && "cursor-pointer"
          )}
          onClick={handleClick}
        />
      )}
      <div className="card-content">
        <div className="flex flex-col gap-3 mb-8">
          <div className="uppercase font-bold text-neutral-content">
            {kickerText}
          </div>
          <div
            className={classNames(
              "text-2xl font-bold",
              clickable && "cursor-pointer"
            )}
            onClick={handleClick}
          >
            {title}
          </div>
          <div className="text-neutral-content">{description}</div>
        </div>
        <div className="flex gap-3">
          {primaryButtonAction && primaryButtonText && (
            <a className="primary-button" onClick={primaryButtonAction}>
              {primaryButtonText}
            </a>
          )}
          {secondaryButtonAction && secondaryButtonText && (
            <button
              className="secondary-button"
              onClick={secondaryButtonAction}
            >
              {secondaryButtonText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
