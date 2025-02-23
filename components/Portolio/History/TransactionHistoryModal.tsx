import { Transactions } from "@/types/Type";
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "../../ui/Icon";

interface TransactionHistoryProps {
  transaction: Transactions;
  onClose: () => void;
}

export default function TransactionHistoryModal({
  onClose,
  transaction,
}: TransactionHistoryProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const getIconForTransactionType = (type: string) => {
    switch (type) {
      case "investment-wallet-funding":
        return <GoPlus className="text-color-one text-2xl" />;
      case "investment-withdrawal":
        return <IoIosSend className="text-color-one text-2xl" />;
      case "savings-wallet-funding":
        return <GoPlus className="text-color-one text-2xl" />;
      case "savings-withdrawal":
        return <IoIosSend className="text-color-one text-2xl" />;
      case "savings-target-funding":
        return <TbTargetArrow className="text-color-one text-2xl" />;
      default:
        return <BsFileBarGraphFill className="text-color-one text-2xl" />;
    }
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[500]">
      <div
        className={`flex flex-col bg-white rounded-t-[15px] w-full lg:rounded-[20px] h-[410px] lg:h-[400px] lg:max-w-[621px] `}
      >
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Transaction Details
          </p>
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            <XCircleIcon className="text-color-form" />
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <Icon
            icon={getIconForTransactionType(transaction.type)}
            containerSize="w-[41px] h-[41px]"
          />

          <div className="flex flex-col gap-1">
            <p className="text-color-zero font-medium text-sm lg:text-base">
              {transaction?.type?.toUpperCase()}
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
                {transaction.status?.toUpperCase() || "N/A"}
              </p>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 mt-4 p-[15px] text-sm w-[345px] h-[218px] lg:p-5 lg:w-[572px] lg:h-[228px]">
          <div
            className={`flex flex-col ${
              transaction?.type !== "savings-purchase"
                ? "space-y-8"
                : "space-y-3"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${transaction?.amount}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {new Date(transaction?.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-color-form">Payment Made</p>
              <p className="text-color-six">
                {transaction?.paymentMade ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col ${
              transaction?.type !== "investment-purchase"
                ? "space-y-8"
                : "space-y-3"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{transaction?.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {new Date(transaction?.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
