import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import TransactionHistoryModal from "./TransactionHistoryModal";
import { apiFetch } from "@/utils/apiHelper";

interface Savings {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

// interface HistoryMobileProps {
//   savings: Savings[];
// }

export default function AllHistoryMobile() {
  const [groupedTransactions, setGroupedTransactions] = useState<
    { date: string; items: Savings[] }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [savings, setSavings] = useState<Savings[]>([]);
  const [selectedSavings, setSelectedSavings] = useState<Savings | null>(null);

  useEffect(() => {
    // Group savings by date
    const groupByDate = (savings: Savings[]) => {
      const grouped: { [key: string]: Savings[] } = {};
      savings.forEach((savings) => {
        // Extract only the date part (yyyy-MM-dd) for grouping
        const dateKey = new Date(savings.createdAt).toISOString().split("T")[0];
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(savings);
      });

      return Object.entries(grouped)
        .map(([date, items]) => ({ date, items }))
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    };

    // Group transactions
    const groupedSavings = groupByDate(
      savings.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );

    setGroupedTransactions(groupedSavings);
    console.log("Savings Data:", savings);
  }, [savings]);

  // Fetch savings transactions
  const fetchSavings = useCallback(async () => {
    // const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setError(null);

      const response = await apiFetch(
        `/savings/transactions`,
        {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!data.status) {
        throw new Error("Failed to fetch transactions.");
      }
      setSavings(data.data.data);
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

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  const handleTransactionClick = (id: string) => {
    const transaction = savings.find((s) => s.id === id);
    if (!transaction) {
      setError("Transaction not found.");
      return;
    }
    setSelectedSavings(transaction);
    setShowModal(true);
  };

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
              {items.map((savings) => (
                <section
                  key={savings.id}
                  className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
                  onClick={() => handleTransactionClick(savings.id)}
                >
                  <div className="flex gap-4">
                    <Icon
                      icon={
                        savings.type === "savings-wallet-funding" ? (
                          <GoPlus className="text-color-one" />
                        ) : savings.type === "savings-withdrawal" ? (
                          <IoIosSend className="text-color-one" />
                        ) : (
                          <TbTargetArrow className="text-color-one" />
                        )
                      }
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium tracking-tight">
                        {savings.type
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char: string) =>
                            char.toUpperCase()
                          )}
                      </p>
                      <p
                        className={`text-xs ${
                          savings.status === "pending"
                            ? "text-yellow-500"
                            : savings.status === "successful"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {savings.status.charAt(0).toUpperCase() +
                          savings.status.slice(1)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-sm text-color-six">
                      ${savings.amount}
                    </p>
                    <p className="text-xs text-[rgba(107,115,133,0.7)]">
                      {new Date(savings.createdAt).toLocaleString("en-US", {
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
        <div className="lg:mr-8">
        <NoHistory
          icon={<TbTargetArrow />}
          text="No Recent Transactions Yet."
        />
      </div>
      )}
      {/* Modal for displaying investment details */}
      {showModal && selectedSavings && (
        <TransactionHistoryModal
          savings={selectedSavings} // Passing selected investment as prop
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}
