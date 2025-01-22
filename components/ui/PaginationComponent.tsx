"use client";

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Move to the previous page
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 my-4 lg:mt-auto">
      <p className="text-sm text-slate-400">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        <button
          className={`w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center pl-1 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <MdArrowBackIos className="text-color-form" />
        </button>
        <button
          className={`w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos className="text-color-form" />
        </button>
      </div>
    </div>
  );
}
