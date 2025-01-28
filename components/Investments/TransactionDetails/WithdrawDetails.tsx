import Icon from "@/components/ui/Icon";
import { WithdrawalResponse } from "@/types/Type";
import { useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";

interface MyComponentProps {
  onClose?: () => void;
  transactionData?: WithdrawalResponse["data"] | null;
}

export default function WithdrawalDetails({
  onClose = () => {},
  transactionData,
}:
MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const renderAccountIcon = () => {
    if (!transactionData) return null;

    // Check beneficiaryType from transactionData
    const { beneficiaryType } = transactionData;

    // Render the appropriate icon based on beneficiaryType
    if (beneficiaryType === "bank") {
      return (
        <Icon
          icon={<RiBankLine className="text-color-one text-2xl" />}
          containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
        />
      );
    } else if (beneficiaryType === "crypto") {
      return (
        <Icon
          icon={<FaBitcoin className="text-color-one text-2xl" />}
          containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
        />
      );
    }

    return null; // Return null if no beneficiaryType matches
  };

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
          {renderAccountIcon()}

          <div className="flex-col">
            <p className="font-medium text-color-zero">
              {transactionData?.type.toLocaleUpperCase()}
            </p>
            <p className="text-color-six text-sm flex items-center gap-2">
              {" "}
              TO {transactionData?.beneficiaryType.toLocaleUpperCase()}
              <span
                className={`text-xs text-color-one ${
                  transactionData?.status === "pending"
                    ? "text-yellow-500"
                    : transactionData?.status === "successful"
                    ? "text-color-one"
                    : "text-red-700"
                }`}
              >
                - {transactionData?.status.toUpperCase() || 0}
              </span>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[250px] lg:p-5 lg:w-[572px] lg:h-[300px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${transactionData?.amount}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Transaction Type</p>
              <p className="text-color-six">
                {transactionData?.type.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
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
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{transactionData?.id}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Beneficiary ID</p>
              <p className="text-color-six break-words">
                #{transactionData?.beneficiaryID}
              </p>
            </div>

            <div className="flex flex-col space-y-2">
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
