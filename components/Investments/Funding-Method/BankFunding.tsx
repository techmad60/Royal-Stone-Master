import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Timer from "@/components/ui/Timer";
import { FundBankDetails } from "@/types/Type";
import { useEffect } from "react";
import StatRow from "../../ui/StatRow";


interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  bankDetails: FundBankDetails | null;
  error: string | null;
  isLoading: boolean;
  amount: string;
  successMessage: string | null;
}

export default function BankFunding({
  onClose,
  onProceed,
  error,
  bankDetails,
  isLoading,
  amount,
  successMessage,
}: MyComponentProps) {
  

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!bankDetails) {
    return <p>No bank found</p>;
  }

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="bg-white flex flex-col rounded-[20px] h-[640px] w-full lg:max-w-[621px] lg:h-[640px]">
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
            Fund Via Bank Transfer
          </p>
        </div>
        <p className="text-color-form text-sm mx-4 py-4">
          You are required to make a bank transfer of ${amount} to the details
          provided within an hour to proceed with your wallet funding
        </p>
        <section className="flex flex-col justify-center items-center rounded-[10px] h-[91px] space-y-4 bg-light-grey mx-4 text-sm lg:p-5 lg:w-[572px]">
          <p className="text-color-form">Timer</p>
          <Timer initialTime={3600} onTimeUp={onClose} />
        </section>
        <section className="flex flex-col mt-4 bg-light-grey mx-6 rounded-[10px] px-4 shadow-sm space-y-3">
          <StatRow
            label="Amount"
            value={`$${amount}`}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Bank Name"
            value={bankDetails.bankName}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Account Number"
            value={bankDetails.accountNumber}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
            showCopyIcon
          />
          <StatRow
            label="Account Name"
            value={bankDetails.accountName}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Bank Address"
            value={bankDetails.bankAddress}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Routing Number"
            value={bankDetails.routingNumber}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
            isLast={true}
          />
        </section>
        {error && ( // Display error message conditionally
          <p className="text-red-600 p-3 rounded ml-4 text-sm">{error}</p>
        )}
        {successMessage && ( // Display success message conditionally
          <p className="text-green-600 p-3 rounded ml-4 text-sm">
            {successMessage}
          </p>
        )}
         {isLoading && (
          <div>
            <Loading />
          </div>
        )}
        <hr className="hidden mt-3 lg:flex" />
        <div className="mt-4 mx-6 lg:mt-6">
          <Button
            ButtonText={
              isLoading ? "Processing..." : "I have made the transfer"
            }
            className={`${
              isLoading ? "bg-inactive hover:bg-inactive" : "bg-color-one"
            }  w-full text-center`}
            onClick={onProceed}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
