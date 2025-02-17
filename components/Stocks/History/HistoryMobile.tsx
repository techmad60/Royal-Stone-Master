import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import { StockPurchase } from "@/types/Type";
import { useCallback, useEffect, useState } from "react";
import { RiStockFill } from "react-icons/ri";
import TransactionHistoryModal from "./TransactionHistory";

interface HistoryMobileProps {
  stocks: StockPurchase[];
}

export default function HistoryMobile({ stocks }: HistoryMobileProps) {
  const [groupedTransactions, setGroupedTransactions] = useState<
    { date: string; items: StockPurchase[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockPurchase | null>(
    null
  ); // Selected investment

  useEffect(() => {
    // Group stocks by date
    const groupByDate = (stocks: StockPurchase[]) => {
      const grouped: { [key: string]: StockPurchase[] } = {};
      stocks.forEach((stock) => {
        // Extract only the date part (yyyy-MM-dd) for grouping
        const dateKey = new Date(stock.createdAt).toISOString().split("T")[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(stock);
      });

      return Object.entries(grouped)
        .map(([date, items]) => ({ date, items }))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    };

    // Group transactions
    const groupedStocks = groupByDate(
      stocks.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );

    setGroupedTransactions(groupedStocks);
    console.log("Stocks Data:", stocks);
  }, [stocks]);

  // Fetch stock transactions
  const fetchStocks = useCallback(async (id: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/stock/purchase`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!data.status) {
        throw new Error("Failed to fetch transactions.");
      }
      //Find the specific stock by ID
      const stockDetails = data.data.data.find(
        (stock: StockPurchase) => stock.id === id
      );
      setSelectedStock(stockDetails);
      setShowModal(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:hidden mt-4">
      {error && <p className="text-red-500">{error}</p>}
      {groupedTransactions.length > 0 ? (
        groupedTransactions.map(({ date, items }) => {
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
                <p className="text-sm text-color-form pb-2">{dateLabel}</p>
                <hr />
              </div>
              {items.map((stock) => (
                <section
                  key={stock.id}
                  className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
                  onClick={() => fetchStocks(stock.id)}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Icon
                        icon={<RiStockFill className="text-color-one" />}
                        containerSize="w-[39px] h-[39px]"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-color-zero font-medium tracking-tight">
                        {stock?.stockID?.ticker
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char: string) =>
                            char.toUpperCase()
                          )}
                      </p>
                      <p
                        className={`text-xs ${
                          stock.status === "pending"
                            ? "text-yellow-500"
                            : stock.status === "successful"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {stock.status.charAt(0).toUpperCase() +
                          stock.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-color-six">
                      ${stock.amount}
                    </p>
                    <p className="text-xs text-[rgba(107,115,133,0.7)]">
                      {new Date(stock.createdAt).toLocaleString("en-US", {
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
      {/* Modal for displaying stock details */}
      {showModal && selectedStock && (
        <TransactionHistoryModal
          stocks={selectedStock} // Passing selected stock as prop
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}
