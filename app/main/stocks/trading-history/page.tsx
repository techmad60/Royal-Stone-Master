"use client";
import HistoryDesktop from "@/components/Stocks/History/HistoryDesktop";
import HistoryMobile from "@/components/Stocks/History/HistoryMobile";
import StockLinks from "@/components/Stocks/StockLinks";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import PaginationComponent from "@/components/ui/PaginationComponent";
import useStockHistoryStore from "@/store/stockHistoryStore";
import { useEffect } from "react";
import { RiStockLine } from "react-icons/ri";

export default function TradingHistory() {
  const { stocks, currentPage, totalPages, fetchStocks, setCurrentPage, isLoading } = useStockHistoryStore();

  useEffect(() => {
    fetchStocks(currentPage);
  }, [currentPage, fetchStocks]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:mr-8">
      <div className="flex flex-col lg:border-b py-4">
        <StockLinks />
      </div>
      {stocks.length === 0 ? (
        <div className="lg:mr-8">
          <NoHistory icon={<RiStockLine />} text="No Transaction History" />
        </div>
      ) : (
        <>
          <HistoryMobile stocks={stocks} />
          <HistoryDesktop stocks={stocks} />
          {stocks.length > 0 && (
            <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          )}
          
        </>
      )}
    </div>
  );
}