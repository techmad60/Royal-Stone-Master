"use client";
import TableHeader from "@/components/ui/TableHeader";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "../../ui/Icon";
import TransactionHistoryModal from "./TransactionHistoryModal";

interface Transactions {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  paymentMade: boolean;
  status: string;
}

export default function HistoryDesktop({
  transactions,
}: {
  transactions: Transactions[];
}) {
  const pathName = usePathname();
  // const router = useRouter();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transactions | null>(null);

  // Sort investments by createdAt in descending order and get the top 2
  const latestTransactions = transactions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, pathName === "/main/dashboard" ? 2 : 5); // Adjust slice based on route

  const getIconForTransactionType = (type: string) => {
    switch (type) {
      case "investment-wallet-funding":
        return <GoPlus className="text-color-one" />;
      case "investment-withdrawal":
        return <IoIosSend className="text-color-one" />;
      case "savings-wallet-funding":
        return <GoPlus className="text-color-one" />;
      case "savings-withdrawal":
        return <IoIosSend className="text-color-one" />;
      case "savings-target-funding":
        return <TbTargetArrow className="text-color-one" />;
      default:
        return <BsFileBarGraphFill className="text-color-one" />; // Default fallback icon
    }
  };

  const handleTransactionClick = async (transactionID: string) => {
    const token = localStorage.getItem("accessToken");
    // setLoading(true);
    try {
      const res = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/transaction?transactionID=${transactionID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch transaction details");

      const data = await res.json();
      setSelectedTransaction(data.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
    // finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="hidden lg:grid">
      <TableHeader />

      {/* Table */}
      {latestTransactions.map((transaction, index) => (
        <section
          key={transaction.id}
          className={`grid grid-cols-7 px-3 mr-8 py-4 my-4 ${
            index === latestTransactions.length - 1 ? "border-none" : "border-b"
          }`}
        >
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={getIconForTransactionType(transaction.type)} />
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
            className={`text-xs ${
              transaction.status?.toLowerCase() === "pending"
                ? "text-yellow-500"
                : transaction.status?.toLowerCase() === "ongoing"
                ? "text-blue-500"
                : transaction.status?.toLowerCase() === "matured" ||
                  transaction.status?.toLowerCase() === "successful"
                ? "text-green-500"
                : transaction.status?.toLowerCase() === "canceled" ||
                  transaction.status?.toLowerCase() === "failed"
                ? "text-red-700"
                : "text-gray-500"
            }`}
          >
            {transaction.status.charAt(0).toUpperCase() +
              transaction.status.slice(1)}
          </p>
          <button
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
            onClick={() => handleTransactionClick(transaction.id)}
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
       {selectedTransaction && (
        <TransactionHistoryModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
