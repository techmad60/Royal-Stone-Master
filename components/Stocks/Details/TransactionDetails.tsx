import { PurchaseStockResponse } from "@/types/Type";
import { useEffect } from "react";
import { RiStockFill } from "react-icons/ri";
import Icon from "../../ui/Icon";

interface TransactionDetailsProps {
  onClose: () => void;
  stockName: string | undefined;
  primaryExchange: string | undefined;
  transactionData?: PurchaseStockResponse["data"] | null;
  // tradeDetails: {
  //   amountToTrade: string;
  //   unitsToTrade: string;
  //   email: string;
  //   phoneNumber: string;
  // };

}

export default function TransactionDetails({
  onClose,
  stockName,
  primaryExchange,
  transactionData,
  // tradeDetails
}: TransactionDetailsProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[526px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[490px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Transaction Details
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <div className="flex-shrink-0">
            <Icon
              icon={<RiStockFill className="text-color-one" />}
              containerSize="w-[39px] h-[39px]"
            />
          </div>
          <div>
            <p className="text-color-zero font-medium text-sm lg:text-base">{stockName}</p>
            <p className="text-color-six text-sm">
              {primaryExchange} -  <span
              className={`text-xs text-color-one ${
                transactionData?.status === "pending"
                  ? "text-yellow-500"
                  : transactionData?.status === "successful"
                  ? "text-color-one"
                  : "text-red-700"
              }`}
            >
              {transactionData?.status.toUpperCase() || 0}
            </span>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[313px] lg:p-5 lg:w-[572px] lg:h-[299px]">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <p className="text-color-form">Trade Type</p>
              <p className="text-color-one">Buy</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Amount Purchased</p>
              <p className="text-color-six">${transactionData?.amount}</p>
            </div>
            <div className="flex flex-col pr-8">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{transactionData?.id}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {transactionData?.createdAt
                  ? new Date(transactionData.createdAt)
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toUpperCase() // Make AM/PM uppercase
                  : "N/A"}
              </p>
            </div>
            {/* <div className="flex flex-col">
              <p className="text-color-form">Email Address</p>
              <p className="text-color-six break-words">{tradeDetails.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Amount of units</p>
              <p className="text-color-six">{tradeDetails.unitsToTrade}</p>
            </div> */}
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {transactionData?.createdAt
                  ? new Date(transactionData.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
