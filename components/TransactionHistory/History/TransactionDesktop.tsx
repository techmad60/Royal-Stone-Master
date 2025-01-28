import FilterModal from "@/components/TransactionHistory/FilterModal";
import Icon from "@/components/ui/Icon";
import { useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { IoFilter } from "react-icons/io5";
import TableHeader from "../../ui/TableHeader";
interface Transactions {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

export default function AllTransactionsDesktop({
  transactions,
}: {
  transactions: Transactions[];
}) {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };
  return (
    <div className="hidden mt-7 lg:grid">
      <div className="flex items-center gap-2" onClick={handleOpenFilter}>
        <span>
          <IoFilter className="text-color-one" />
        </span>
        <p className="text-sm border-b leading-none border-color-one text-color-one cursor-pointer hover:text-green-700 duration-300 hover:border-green-700">
          Filter
        </p>
      </div>
      <hr className="my-4" />
      <TableHeader />
      {transactions.map((transaction) => (
        <section
          key={transaction.id}
          className="grid grid-cols-7 px-3 mr-8 border-b py-4 my-4"
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
          <button className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150">
            <p className="text-xs text-color-form hover:text-green-700">View</p>
            <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
          </button>
        </section>
      ))}
      {isFilterModalOpen && (
        <FilterModal
          onClose={() => setIsFilterModalOpen(false)}
          // Added required onProceed prop
        />
      )}
    </div>
  );
}
