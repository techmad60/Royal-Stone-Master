"use client";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useEffect } from "react";
import { RiStockFill } from "react-icons/ri";

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  stockName: string | undefined;
  ticker: string | undefined;
  tradeDetails: {
    amountToTrade: string;
    unitsToTrade: string;
    email: string;
    phoneNumber: string;
  };
  isLoading: boolean;
  error: string | null;
}

export default function PreviewModal({
  onClose,
  onProceed,
  stockName,
  ticker,
  tradeDetails,
  isLoading,
  error,
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
            Preview
          </p>
        </div>

        <p className="text-color-form text-sm m-6 border-b pb-4">
          Confirm these details of your transaction
        </p>
        <div className="flex items-center gap-4 my-1 pb-4 mx-6 lg:border-b">
          <div className="flex-shrink-0">
            <Icon
              icon={<RiStockFill className="text-color-one" />}
              containerSize="w-[39px] h-[39px]"
            />
          </div>
          <div>
            <p className="text-color-zero font-semibold text-sm lg:text-base lg:font-medium">
              {stockName
                ? stockName.length > 30
                  ? `${stockName.substring(0, 30)}...`
                  : stockName
                : ""}
            </p>

            <p className="text-color-six text-sm">{ticker}</p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[147px] lg:p-5 lg:w-[572px] lg:h-[167px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p className="text-color-form">Trade Type</p>
              <p className="text-color-six">Stock Buy</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${tradeDetails.amountToTrade}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <p className="text-color-form">Email Address</p>
              <p className="text-color-six break-words">{tradeDetails.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Amount of units</p>
              <p className="text-color-six">{tradeDetails.unitsToTrade}</p>
            </div>
          </div>
        </section>

        <hr className="mt-2 hidden lg:block" />
        {error && ( // Display error message conditionally
          <div className="text-red-600 p-3 rounded">
            <p>{error}</p>
          </div>
        )}
        <div onClick={onProceed} className="mt-8 mx-6">
          <Button
            ButtonText={isLoading ? "Proceeding..." : "Proceed"}
            className={`w-full ${isLoading ? "bg-inactive" : "bg-color-one"}`}
            onClick={!isLoading ? onProceed : undefined} // Prevent clicking when loading
            disabled={isLoading} // Disable the button when loading
          />
        </div>
      </div>
    </div>
  );
}
