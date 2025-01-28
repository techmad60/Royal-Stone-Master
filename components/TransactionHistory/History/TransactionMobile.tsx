import Icon from "@/components/ui/Icon";
// import Loading from "@/components/ui/Loading";
import FilterModal from "@/components/TransactionHistory/FilterModal";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoFilter } from "react-icons/io5";
// import InvestmentHistoryModal from "./InvestmentHistoryModal";

interface Transactions {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

interface HistoryMobileProps {
  transactions: Transactions[];
}

export default function AllTransactionsMobile({
  transactions,
}: HistoryMobileProps) {
  const [groupedTransactions, setGroupedTransactions] = useState<
    { date: string; items: Transactions[] }[]
  >([]);

  useEffect(() => {
    // Group investments by date
    const groupByDate = (transactions: Transactions[]) => {
      const grouped: { [key: string]: Transactions[] } = {};
      transactions.forEach((transaction) => {
        // Extract only the date part (yyyy-MM-dd) for grouping
        const dateKey = new Date(transaction.createdAt)
          .toISOString()
          .split("T")[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(transaction);
      });

      return Object.entries(grouped)
        .map(([date, items]) => ({ date, items }))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    };

    // Group transactions
    const groupedTransactions = groupByDate(
      transactions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );

    setGroupedTransactions(groupedTransactions);
    console.log("Transactionst Data:", transactions);
  }, [transactions]);

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  return (
    <div className="lg:hidden mt-4">
      {groupedTransactions.length > 0 ? (
        groupedTransactions.map(({ date, items }, index) => {
          const today = new Date().toISOString().split("T")[0];
          const yesterday = new Date(Date.now() - 86400000)
            .toISOString()
            .split("T")[0];

          let dateLabel = "";
          if (date === today) {
            dateLabel = "Today";
          } else if (date === yesterday) {
            dateLabel = "Yesterday";
          } else {
            dateLabel = new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            });
          }

          return (
            <section key={date}>
              <div>
                <div className="flex justify-between py-3">
                  {/* Show the filter only for the first date */}
                  {index === 0 && (
                    <div className="flex flex-row-reverse items-center gap-2" onClick={handleOpenFilter}>
                      <p className="text-sm border-b leading-none border-color-one text-color-one cursor-pointer hover:text-green-700 duration-300 hover:border-green-700">
                        Filter
                      </p>
                      <span>
                        <IoFilter className="text-color-one" />
                      </span>
                    </div>
                  )}
                  <p className="text-sm text-color-form pb-2">{dateLabel}</p>
                </div>

                <hr />
              </div>
              {items.map((transaction) => (
                <section
                  key={transaction.id}
                  className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
                >
                  <div className="flex gap-4">
                    <Icon
                      icon={
                        transaction.type === "investment-wallet-funding" ? (
                          <GoPlus className="text-color-one" />
                        ) : (
                          <BsFileBarGraphFill className="text-color-one" />
                        )
                      }
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium tracking-tight">
                        {transaction.type
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char: string) =>
                            char.toUpperCase()
                          )}
                      </p>
                      <p
                        className={`text-xs ${
                          transaction.status === "pending"
                            ? "text-yellow-500"
                            : transaction.status === "successful"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-color-six">
                      ${transaction.amount}
                    </p>
                    <p className="text-xs text-[rgba(107,115,133,0.7)]">
                      {new Date(transaction.createdAt).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </section>
              ))}
            </section>
          );
        })
      ) : (
        <p className="text-sm text-center text-gray-500 mt-4">
          No transactions available.
        </p>
      )}
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          // Added required onProceed prop
        />
      )}
    </div>
  );
}
