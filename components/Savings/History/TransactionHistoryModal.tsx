import { Savings } from "@/types/Type";
import { useEffect } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import Icon from "../../ui/Icon";

interface TransactionHistoryProps {
  savings: Savings;
  closeModal: () => void;
}

export default function TransactionHistoryModal({
  closeModal,
  savings,
}: TransactionHistoryProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, [savings]);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div
        className={`flex flex-col bg-white rounded-t-[15px] w-full lg:rounded-[20px] ${
          savings.type !== "savings-purchase"
            ? "h-[410px] lg:h-[450px]"
            : "h-[530px] lg:h-[560px]"
        } lg:max-w-[621px] `}
      >
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={closeModal}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Transaction Details
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <Icon
            icon={
              savings.type === "savings-withdrawal" ? (
                <IoIosSend className="text-color-one text-2xl" />
              ) : savings.type === "savings-wallet-funding" ? (
                <GoPlus className="text-color-one text-2xl" />
              ) : (
                <BsFileBarGraphFill className="text-color-one text-2xl" />
              )
            }
            containerSize="w-[41px] h-[41px]"
          />

          <div className="flex flex-col gap-1">
            <p className="text-color-zero font-medium text-sm lg:text-base">
              {savings.type.toUpperCase()}
            </p>
            <p
              className={`text-xs ${
                savings.status?.toLowerCase() === "successful"
                  ? "text-green-500"
                  : savings.status?.toLowerCase() === "pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {savings.status?.toUpperCase() || "N/A"}
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 mt-4 p-[15px] text-sm w-[345px] h-[218px] lg:p-5 lg:w-[572px] lg:h-[228px]">
          <div
            className={`flex flex-col ${
              savings.type !== "savings-purchase" ? "space-y-8" : "space-y-3"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${savings.amount}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {new Date(savings.createdAt).toLocaleDateString()}
              </p>
            </div>
            
          </div>
          <div
            className={`flex flex-col ${
              savings.type !== "investment-purchase" ? "space-y-8" : "space-y-3"
            }`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{savings.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {new Date(savings.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
