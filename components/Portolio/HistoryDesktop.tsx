import { usePathname } from "next/navigation";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import Icon from "../ui/Icon";

interface Transactions {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

export default function HistoryDesktop({
  transactions,
}: {
  transactions: Transactions[];
}) {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [showModal, setShowModal] = useState(false); // Modal visibility state
  // const [selectedTransaction, setSelectedTransaction] =
  // useState<Transactions | null>(null); // Selected investment


  // const fetchTransactionDetails = async (id: string, type: string) => {
  //   const token = localStorage.getItem('accessToken')
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Fetch details of the given type
  //     const response = await fetch(
  //       `https://api-royal-stone.softwebdigital.com/api/transaction?type=${type}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     const data = await response.json();

  //     if (!data.status) {
  //       throw new Error("Failed to fetch transaction details.");
  //     }

  //     // Find the specific investment by ID
  //     const transactionDetails = data.data.data.find(
  //       (transaction: Transactions) => transaction.id === id
  //     );

  //     if (!transactionDetails) {
  //       throw new Error("Transaction not found.");
  //     }
  //     // Set the selected investment data and open modal
  //     setSelectedTransaction(transactionDetails);
  //     setShowModal(true);

  //     // Navigate to the details page (or handle as needed)
  //     console.log("Transaction Details:", transactionDetails);
  //     // Use router.push to navigate to the details page with full investment data
  //   } catch (err: any) {
  //     setError(err.message || "An error occurred.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const pathName = usePathname()

  // Sort investments by createdAt in descending order and get the top 2
  const latestTransactions = transactions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, pathName === "/main/dashboard" ? 2 : 5); // Adjust slice based on route

  return (
    <div className="hidden lg:grid">
      <div className="hidden lg:grid grid-cols-7 items-center bg-light-grey rounded-common py-4 px-3 shadow-sm mr-8">
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
          Transaction Name
        </p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
          Transaction Date & Time
        </p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
      </div>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      {latestTransactions.map((transaction, index) => (
        <section
          key={transaction.id}
          className={`grid grid-cols-7 px-3 mr-8 py-4 my-4 ${index === latestTransactions.length - 1 ? "border-none" : "border-b"}`}
        >
          <div className="flex items-center gap-3 col-span-2">
            <Icon
              icon={
                transaction.type === "investment-wallet-funding" ? (
                  <GoPlus className="text-color-one" />
                ) : (
                  <BsFileBarGraphFill className="text-color-one" />
                )
              }
            />
            <p className="text-sm text-color-zero">
              {transaction.type
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
          <p className="text-sm text-color-zero">${transaction.amount}</p>
          <p className="text-sm text-color-zero col-span-2">
            {new Date(transaction.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
            {new Date(transaction.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p
            className={`text-sm ${
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
          <button
            // onClick={() => fetchTransactionDetails(transaction.id, transaction.type)}
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
            // disabled={loading}
          >
            <>
              <p className="text-xs text-color-form hover:text-green-700">
                View
              </p>
              <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
            </>
          </button>
        </section>
      ))}
       {/* Modal for displaying transaction details */}
       {/* {showModal && selectedTransaction && (
        <InvestmentHistoryModal
          investment={selectedTransaction} // Passing selected transaction as prop
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )} */}
    </div>
  );
}
