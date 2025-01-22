import { useKycStore } from "@/store/kycStore";
import { useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import CardVerification from "../ui/CardVerification";

interface BankInformationProps {
    onClose: () => void;
    onClickAddBankDetails: () => void;
    onClickAddCryptoDetails: () => void;
  }
export default function BankInfo({onClose, onClickAddBankDetails, onClickAddCryptoDetails}:BankInformationProps) {
    const { isBankDetailsProvided, isCryptoDetailsProvided} = useKycStore(); // Access KYC status from Zustand store

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[350px] sm:h-[500px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[400px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4 sm:p-8 lg:p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Bank/Crypto Information
          </p>
        </div>
        <div className="border-t flex-col space-y-3 p-4 sm:p-8 lg:p-4">
          {/* Add Bank Details */}
          <CardVerification
            iconImg={<RiBankLine className="text-xl text-color-one" />}
            label="Bank Information"
            status={isBankDetailsProvided ? "Provided" : "Not Set"}
            showArrow={isBankDetailsProvided ? "hidden" : "flex"}
            statusClass={
              isBankDetailsProvided ? "text-color-one" : "text-color-form"
            }
            showSwitch="hidden"
            style="xl:w-auto"
            onClick={isBankDetailsProvided ? undefined : onClickAddBankDetails} // Triggers modal when clicked
          />
          {/* Add Crypto Details */}
          <CardVerification
            iconImg={<FaBitcoin className="text-xl text-color-one" />}
            label="Crypto Information"
            status={isCryptoDetailsProvided ? "Provided" : "Not Set"}
            showArrow={isCryptoDetailsProvided ? "hidden" : "flex"}
            statusClass={
              isCryptoDetailsProvided ? "text-color-one" : "text-color-form"
            }
            showSwitch="hidden"
            style="xl:w-auto"
            onClick={isCryptoDetailsProvided ? undefined : onClickAddCryptoDetails} // Triggers modal when clicked
          />
        </div>
        <p className="text-colour-five mt-8 px-4 text-sm">NB: You can choose to provide just one or both of them.</p>
      </div>
    </div>
  );
}
