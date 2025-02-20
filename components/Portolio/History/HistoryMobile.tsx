"use client";
import Icon from "@/components/ui/Icon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";

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

export default function HistoryMobile({ transactions }: HistoryMobileProps) {
  const [latestTransactions, setLatestTransactions] = useState<Transactions[]>(
    []
  );
  const [latestDateLabel, setLatestDateLabel] = useState<string>("");
  const pathname = usePathname();
  const isDashboard = pathname === "/main/dashboard";
  const router = useRouter();

  const groupByDate = (transactions: Transactions[]) => {
    const grouped: { [key: string]: Transactions[] } = {};
    transactions.forEach((transaction) => {
      const dateKey = new Date(transaction.createdAt).toISOString().split("T")[0];
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(transaction);
    });

    return Object.entries(grouped)
      .map(([date, items]) => ({ date, items }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const groupedTransactions = useMemo(() => {
    return groupByDate(
      transactions.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }, [transactions]);

  useEffect(() => {
    if (groupedTransactions.length > 0) {
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

      const latestGroup = groupedTransactions[0];
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
  }, [groupedTransactions]);

  const displayedTransactions = isDashboard
    ? latestTransactions.slice(0, 2)
    : latestTransactions;

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
        return <BsFileBarGraphFill className="text-color-one" />;
    }
  };

  const handleTransactionClick = (type: string) => {
    if (type.includes("investment")) {
      router.push("/main/investments");
    } else if (type.includes("savings")) {
      router.push("/main/savings");
    }
  };

  return (
    <div className="lg:hidden">
      {displayedTransactions.length > 0 ? (
        <section>
          <div>
            <p className="text-sm text-color-form pb-2">{latestDateLabel}</p>
            <hr />
          </div>
          {displayedTransactions.map((transaction: Transactions) => (
            <section
              key={transaction.id}
              className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
              onClick={() => handleTransactionClick(transaction.type)}
            >
              <div className="flex gap-4">
                <Icon
                  icon={getIconForTransactionType(transaction.type)}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
                />

                <div>
                  <p className="text-sm text-color-zero font-medium tracking-tight">
                    {transaction.type
                      .replace(/-/g, " ")
                      .replace(/\b\w/g, (char: string) => char.toUpperCase())}
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
        <p className="text-sm text-center text-gray-500 mt-4">
          No transactions available.
        </p>
      )}
    </div>
  );
}
