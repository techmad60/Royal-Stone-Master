"use client";
import FilterModal from "@/components/TransactionHistory/FilterModal";
import AllTransactionsDesktop from "@/components/TransactionHistory/History/TransactionDesktop";
import AllTransactionsMobile from "@/components/TransactionHistory/History/TransactionMobile";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import PaginationComponent from "@/components/ui/PaginationComponent";
import useTransactionStore from "@/store/transactionStore";
import { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa6";

export default function TransactionHistory() {
  const {
    fetchTransactions,
    transactions,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useTransactionStore();

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [fetchTransactions, currentPage]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // const handleOpenFilter = () => {
  //   setIsFilterModalOpen(true);
  // };

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the page in the product store
  };
  const noHistoryCondition = currentPage === 1 && transactions.length === 0;

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        <p>Oops! Something went wrong.</p>
        {error && (
          <p>
            {typeof error === "string"
              ? error
              : error.message || "Unable to fetch investments at the moment."}
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="">
      {noHistoryCondition ? (
        <div className="lg:mr-8">
          <NoHistory icon={<FaClock />} text="No Transaction History" />
        </div>
      ) : (
        <>
          <AllTransactionsMobile transactions={transactions} />
          <AllTransactionsDesktop transactions={transactions} />
          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {isFilterModalOpen && (
            <FilterModal
              onClose={() => setIsFilterModalOpen(false)}
              // Added required onProceed prop
            />
          )}
        </>
      )}
    </div>
  );
}
