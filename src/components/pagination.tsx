import Image from "next/image";
import React, { useCallback } from "react";
import ChevronLeft from "@/assets/icons/chevron-left.svg";
import ChevronRight from "@/assets/icons/chevron-right.svg";

interface Props {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
  disabled?: boolean;
}

const Pagination = ({
  pageSize,
  currentPage,
  totalCount,
  onChange,
  disabled,
}: Props) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const showPrevButton = currentPage > 0;
  const showNextButton = currentPage + 1 < pageCount;

  const goToNextPage = useCallback(async () => {
    const newPage = Math.min(currentPage + 1, pageCount - 1);
    onChange(newPage);
  }, [currentPage]);

  const goToPreviousPage = useCallback(() => {
    const newPage = Math.max(currentPage - 1, 0);
    onChange(newPage);
  }, [currentPage]);

  return (
    <div className="my-5 flex items-center">
      <button
        aria-label="Previous"
        className="h-12 rounded-lg px-4 text-neutral-900 hover:bg-neutral-400 disabled:cursor-not-allowed disabled:opacity-30"
        onClick={goToPreviousPage}
        disabled={disabled || !showPrevButton}
      >
        <Image
          src={ChevronLeft}
          alt="Previous"
          title="Previous"
          width={11}
          height={16}
        />
      </button>
      <div className="px-3 text-lg">
        <div>{`${currentPage + 1} of ${pageCount}`}</div>
      </div>
      <button
        aria-label="Next"
        className="h-12 rounded-lg px-4 text-neutral-900 hover:bg-neutral-400 disabled:cursor-not-allowed disabled:opacity-30"
        onClick={goToNextPage}
        disabled={disabled || !showNextButton}
      >
        <Image
          src={ChevronRight}
          alt="Next"
          title="Next"
          width={11}
          height={16}
        />
      </button>
    </div>
  );
};

export default Pagination;
