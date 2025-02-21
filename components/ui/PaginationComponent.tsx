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
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 10;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is 10 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); // Always show the first page

      let startPage = Math.max(2, currentPage - 4);
      let endPage = Math.min(totalPages - 1, currentPage + 4);

      if (currentPage <= 5) {
        endPage = 9;
      }
      if (currentPage >= totalPages - 4) {
        startPage = totalPages - 8;
      }

      if (startPage > 2) {
        pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages - 1) {
        pages.push("...");
      }

      pages.push(totalPages); // Always show the last page
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 my-4 lg:mt-auto">
      <p className="text-sm text-slate-400">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex items-center gap-2">
        {/* Previous Page Button */}
        <button
          className={`w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center pl-1 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdArrowBackIos className="text-color-form" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={index} className="text-sm text-slate-500 px-2">
              ...
            </span>
          ) : (
            <button
              key={index}
              className={`w-[32px] h-[32px] rounded-[4px] border shadow-sm flex items-center justify-center text-sm ${
                currentPage === page
                  ? "bg-green-700 text-white font-bold"
                  : "text-color-form"
              }`}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          )
        )}

        {/* Next Page Button */}
        <button
          className={`w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <MdArrowForwardIos className="text-color-form" />
        </button>
      </div>
    </div>
  );
}
