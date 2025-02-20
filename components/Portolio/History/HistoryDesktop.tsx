"use client";
import TableHeader from "@/components/ui/TableHeader";
import { usePathname, useRouter } from "next/navigation";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "../../ui/Icon";

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
  const pathName = usePathname();
  const router = useRouter();

  const handleViewClick = (transaction: Transactions) => {
    if (transaction.type.includes("savings")) {
      router.push(`/main/savings?transactionId=${transaction.id}`);
    } else if (transaction.type.includes("investment")) {
      router.push(`/main/investments?transactionId=${transaction.id}`);
    }
  };

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
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
            onClick={() => handleViewClick(transaction)}
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
    </div>
  );
}
