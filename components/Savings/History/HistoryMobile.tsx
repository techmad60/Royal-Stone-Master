import Icon from "@/components/ui/Icon";
import NoHistory from "@/components/ui/NoHistory";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { toast } from "react-toastify";
import TransactionHistoryModal from "./TransactionHistoryModal";
import { apiFetch } from "@/utils/apiHelper";

interface Savings {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

export default function HistoryMobile() {
  const [savings, setSavings] = useState<Savings[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [latestTransactions, setLatestTransactions] = useState<Savings[]>([]);
  const [latestDateLabel, setLatestDateLabel] = useState<string>("");
  const [selectedSavings, setSelectedSavings] = useState<Savings | null>(null);

  // Fetch savings transactions
  const fetchSavings = useCallback(async () => {
    // const token = localStorage.getItem("accessToken");
    try {
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
        toast.error("Failed to fetch transactions");
      }
      setSavings(data.data.data);
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Please try again later."
      );
    }
  }, []);

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  useEffect(() => {
    if (!savings.length) return;

    const groupByDate = (transactions: Savings[]) => {
      const grouped: { [key: string]: Savings[] } = {};
      transactions.forEach((transaction) => {
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

    const groupedSavings = groupByDate(
      savings.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );

    if (groupedSavings.length > 0) {
      const today = new Date().toLocaleDateString();
      const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();
      const latestGroup = groupedSavings[0];
      const latestDate = latestGroup.date;

      if (latestDate === today) {
        setLatestDateLabel("Today");
      } else if (latestDate === yesterday) {
        setLatestDateLabel("Yesterday");
      } else {
        setLatestDateLabel(
          new Date(latestDate).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })
        );
      }

      setLatestTransactions(latestGroup.items);
    }
  }, [savings]);

  const handleTransactionClick = (id: string) => {
    const transaction = savings.find((s) => s.id === id);
    if (!transaction) {
      toast.error("Transaction not found.");
      return;
    }
    setSelectedSavings(transaction);
    setShowModal(true);
  };

  return (
    <div className="lg:hidden">
      <div className="flex justify-between my-4 lg:mr-8">
        <p className="text-base font-semibold text-color-zero">
          Recent Transactions
        </p>

        {latestTransactions.length > 0 && (
          <Link
            href="/main/savings/savings-history"
            className="text-sm text-color-one"
          >
            View All
          </Link>
        )}
      </div>
      {latestTransactions.length > 0 ? (
        <section>
          <div>
            <p className="text-sm text-color-form pb-2">{latestDateLabel}</p>
            <hr />
          </div>
          {latestTransactions.map((transaction) => (
            <section
              key={transaction.id}
              className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4 cursor-pointer"
              onClick={() => handleTransactionClick(transaction.id)}
            >
              <div className="flex gap-4">
                <Icon
                  icon={
                    transaction.type === "savings-wallet-funding" ? (
                      <GoPlus className="text-color-one" />
                    ) : transaction.type === "savings-withdrawal" ? (
                      <IoIosSend className="text-color-one" />
                    ) : (
                      <TbTargetArrow className="text-color-one" />
                    )
                  }
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium tracking-tight">
                    {transaction.type
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (char) => char.toUpperCase())}
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
      ) : (
        <div>
          <NoHistory
            icon={<TbTargetArrow />}
            text="No Recent Transactions Yet."
          />
        </div>
      )}
      {showModal && selectedSavings && (
        <TransactionHistoryModal
          savings={selectedSavings}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
