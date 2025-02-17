import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import { GetSavingsTarget, SavingsTargetTransaction } from "@/types/Type";
import { useState } from "react";
import { TbTargetArrow } from "react-icons/tb";
import TransactionHistoryModal from "../TransactionHistoryModal";

interface SavingsMobileProps {
  transactions: SavingsTargetTransaction[];
  targetID: string;
}

export default function SavingsTargetMobile({
  transactions = [],
  targetID,
}: SavingsMobileProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedTransaction, setSelectedTransaction] =
    useState<GetSavingsTarget | null>(null); // Selected transaction

  const fetchTransactionDetails = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setError(null);

      // Fetch details of the given transaction
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/savings/targets/transaction?savingsTargetID=${targetID}`,
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
        throw new Error("Failed to fetch transaction details.");
      }

      // Find the specific transaction by ID
      const transactionDetails = data.data.find(
        (transaction: GetSavingsTarget) => transaction.id === id
      );

      if (!transactionDetails) {
        console.error("Transaction not found");
        throw new Error("Transaction not found.");
      }

      // Set the selected transaction data and open modal
      console.log(transactionDetails);

      setSelectedTransaction(transactionDetails);
      setShowModal(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || "Failed to fetch data. Please try again later."
        );
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Group transactions by date
  const groupedTransactions = Array.isArray(transactions)
    ? transactions
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ) // Sort descending
        .reduce((acc, transaction) => {
          const transactionDate = new Date(transaction.createdAt);
          const formattedDate = transactionDate.toLocaleDateString("en-GB");

          // Get today's date in "DD/MM/YYYY" format
          const today = new Date();
          const todayFormatted = today.toLocaleDateString("en-GB");

          // If the transaction date is today, use "Today" instead of the date
          const displayDate =
            formattedDate === todayFormatted ? "Today" : formattedDate;

          if (!acc[displayDate]) acc[displayDate] = [];
          acc[displayDate].push(transaction);
          return acc;
        }, {} as Record<string, SavingsTargetTransaction[]>)
    : {};
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:hidden">
      {Object.keys(groupedTransactions).length > 0 ? (
        Object.entries(groupedTransactions).map(([date, items], index) => (
          
          <section key={index} >
            <div>
            {error && <p className="text-red-500">{error}</p>}
              <p className="text-sm text-color-form pb-2">{date}</p>
              <hr />
            </div>
            {items.map((item) => (
              <section
                key={item.id}
                className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
                onClick={() => fetchTransactionDetails(item.id)}>
                <div>
                  <p className="text-sm text-color-zero tracking-tight">
                    {item.type
                      .replace(/_/g, " ") // Replace underscores with spaces
                      .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                    {/* Capitalize first letter of each word */}
                  </p>
                  <p
                    className={`text-xs ${
                      item.status.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : item.status.toLowerCase() === "failed"
                        ? "text-red-500"
                        : "text-color-one"
                    }`}
                  >
                    {item.status.charAt(0).toUpperCase() +
                      item.status.slice(1).toLowerCase()}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p
                    className={`text-sm ${
                      item.type === "savings-target-funding" ||
                      "savings-direct-funding"
                        ? "text-color-six"
                        : "text-red-500"
                    }`}
                  >
                    ${item.amount}
                  </p>
                  <p className="text-xs text-[rgba(107,115,133,0.7)]">
                    {new Date(item.createdAt)
                      .toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toUpperCase()}
                  </p>
                </div>
              </section>
            ))}
          </section>
        ))
      ) : (
        <div className="lg:mr-8">
          <NoHistory
            icon={<TbTargetArrow />}
            text="No Transaction yet on this Savings Target"
          />
        </div>
      )}
       {showModal && selectedTransaction && (
        <TransactionHistoryModal
          savings={selectedTransaction}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
