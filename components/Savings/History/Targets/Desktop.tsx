import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import TableHeader from "@/components/ui/TableHeader";
import { GetSavingsTarget, SavingsTargetTransaction } from "@/types/Type";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import TransactionHistoryModal from "../TransactionHistoryModal";
interface SavingsDesktopProps {
  onProceed?: () => void;
  transactions: SavingsTargetTransaction[];
  targetID: string;
}

export default function SavingsTargetDesktop({
  transactions = [],
  targetID,
}: SavingsDesktopProps) {
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
  // Sort transactions by createdAt in descending order (latest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="hidden lg:grid">
       {error && <p className="text-red-500">{error}</p>}
      {sortedTransactions.length > 0 && <TableHeader />}

      {sortedTransactions.length > 0 ? (
        sortedTransactions.map((transaction) => (
          <section
            key={transaction.id}
            className="grid grid-cols-7 px-3 mr-8 border-b py-4 my-4"
          >
            <div className="flex items-center gap-3 col-span-2">
              <p className="text-sm text-color-zero">
                {transaction.type
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            </div>
            <p className="text-sm text-color-zero">${transaction.amount}</p>
            <p className="text-sm text-color-zero col-span-2">
              {(() => {
                const transactionDate = new Date(transaction.createdAt);
                const today = new Date();
                const formattedToday = today.toLocaleDateString("en-GB");
                const formattedTransactionDate =
                  transactionDate.toLocaleDateString("en-GB");

                return formattedTransactionDate === formattedToday
                  ? "Today"
                  : formattedTransactionDate;
              })()}{" "}
              |{" "}
              {new Date(transaction.createdAt)
                .toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .toUpperCase()}
            </p>

            <p
              className={`text-sm ${
                transaction.status.toLowerCase() === "pending"
                  ? "text-yellow-500"
                  : transaction.status.toLowerCase() === "failed"
                  ? "text-red-500"
                  : "text-color-one"
              }`}
            >
              {transaction.status.charAt(0).toUpperCase() +
                transaction.status.slice(1).toLowerCase()}
            </p>
            <button
              className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
              onClick={() => fetchTransactionDetails(transaction.id)}
            >
              <p className="text-xs text-color-form hover:text-green-700">
                View
              </p>
              <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
            </button>
          </section>
        ))
      ) : (
        <div className="lg:mr-8">
          <NoHistory
            icon={<TbTargetArrow />}
            text="No Transaction yet on this Savings Target."
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
