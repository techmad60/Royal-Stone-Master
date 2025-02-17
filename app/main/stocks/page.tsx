"use client";
import StockDesktopList from "@/components/Stocks/ui/StocksDesktop";
import StockListMobile from "@/components/Stocks/ui/StocksMobile";
import Loading from "@/components/ui/Loading";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { useStockStore } from "@/store/stockStore";
import { useEffect } from "react";

export default function StocksPage() {
  const {
    stocks,
    currentPage,
    setCurrentPage,
    totalPages,
    loading,
    error,
    fetchStocks,
  } = useStockStore();
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the page in the product store
  };

  useEffect(() => {
    fetchStocks(currentPage);
  }, [currentPage, fetchStocks]); // Fetch stocks when the component mounts

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4 lg:pr-8 h-screen">
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          {/* Ensure Responsiveness */}
          <StockListMobile stocks={stocks} />
          <StockDesktopList stocks={stocks} />
          {stocks.length !== 0 && (
            <div className="mt-4">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
