import Icon from "@/components/ui/Icon";
import { DepositResponse } from "@/types/Type";
import { useEffect } from "react";
import { GoPlus } from "react-icons/go";

interface MyComponentProps {
  onClose?: () => void;
  transactionData?: DepositResponse["data"] | null;
}

export default function FundingDetails({
  onClose = () => {},
  transactionData,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[484px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Transaction Details
          </p>
        </div>

        <div className="flex gap-2 py-3 mx-6 my-4">
          <Icon
            icon={<GoPlus className="text-color-one text-2xl" />}
            containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
          />

          <div className="flex-col">
            <p className="font-medium text-color-zero">
              {transactionData?.wallets?.type.toLocaleUpperCase()}
            </p>
            <p className="text-color-six text-sm flex items-center gap-2">
              {" "}
              VIA {transactionData?.beneficiary?.type.toLocaleUpperCase()}
              <span
                className={`text-xs text-color-one ${
                  transactionData?.wallets?.status === "pending"
                    ? "text-yellow-500"
                    : transactionData?.wallets?.status === "successful"
                    ? "text-color-one"
                    : "text-red-700"
                }`}
              >
                - {transactionData?.wallets?.status.toUpperCase() || 0}
              </span>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[300px] lg:p-5 lg:w-[572px] lg:h-[300px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${transactionData?.wallets?.amount}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-color-form break-words">Transaction Type</p>
              <p className="text-color-six">
                {transactionData?.wallets?.type.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {transactionData?.wallets?.createdAt
                  ? new Date(transactionData.wallets?.createdAt)
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .toUpperCase() // Make AM/PM uppercase
                  : "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{transactionData?.wallets?.id}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Beneficiary ID</p>
              <p className="text-color-six break-words">
                #{transactionData?.beneficiary?.id}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {transactionData?.wallets?.createdAt
                  ? new Date(transactionData.wallets?.createdAt).toLocaleDateString(
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
