import { StockPurchase } from "@/types/Type";
import { useEffect } from "react";
import { RiStockFill } from "react-icons/ri";
import Icon from "../../ui/Icon";

interface TransactionHistoryProps {
  stocks: StockPurchase;
  closeModal: () => void;
}

export default function TransactionHistoryModal({
  closeModal,
  stocks,
}: TransactionHistoryProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);


  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div
        className={`flex flex-col bg-white rounded-t-[15px] w-full lg:rounded-[20px] h-[430px] lg:h-[450px] lg:max-w-[621px]`}
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
          <div className="flex-shrink-0">
            <Icon
              icon={<RiStockFill className="text-color-one" />}
              containerSize="w-[39px] h-[39px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-color-zero font-medium text-sm lg:text-base">
              {stocks?.stockID?.name.toUpperCase()}
            </p>
            <p className="text-color-six font-medium flex items-center gap-2 text-sm lg:text-base">
              {stocks?.stockID?.ticker} -
              <span
                className={`text-xs ${
                  stocks.status?.toLowerCase() === "successful"
                    ? "text-green-500"
                    : stocks.status?.toLowerCase() === "pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {stocks.status?.toUpperCase() || "N/A"}
              </span>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 mt-4 p-[15px] text-sm w-[345px] h-[218px] lg:p-5 lg:w-[572px] lg:h-[228px]">
          <div
            className={`flex flex-col space-y-8`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${stocks?.amount}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {new Date(stocks?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div
            className={`flex flex-col space-y-8`}
          >
            <div className="flex flex-col">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{stocks?.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {new Date(stocks?.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
