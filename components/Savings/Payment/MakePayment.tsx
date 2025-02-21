"use client";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa6";
import { IoWallet } from "react-icons/io5";


interface MakePaymentProps {
  onClose: () => void;
  onProceed: () => void;
  selectedType: "bank" | "crypto" | "wallet" | null;
  setSelectedType: (method: "bank" | "crypto" | "wallet") => void;
}

export default function MakePayment({ onClose, onProceed, selectedType, setSelectedType }: MakePaymentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[420px]">
        <div className="flex items-center border-b w-full pb-2 p-4">
         
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Payment Method
          </p>
          <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
            <XCircleIcon className="text-color-form"/>
          </p>
        </div>
        <div className="flex flex-col gap-1 border-b p-4">
          <label className="text-color-form text-sm">
            Select your preferred payment method
          </label>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:flex">
            <BankComponent
              style={selectedType === "wallet" ? "bg-color-two" : "h-[110px]"}
              bankImage={<IoWallet className="text-color-one" />}
              bankName="Pay via Wallet"
              icon={<CircleToggle isClicked={selectedType === "wallet"} onClick={() => setSelectedType("wallet")} />}
              onClick={() => setSelectedType("wallet")}
            />
            <BankComponent
              style={selectedType === "bank" ? "bg-color-two" : "h-[110px]"}
              bankImage={<BiSolidBank className="text-color-one" />}
              bankName="Pay Via Bank Transfer"
              icon={<CircleToggle isClicked={selectedType === "bank"} onClick={() => setSelectedType("bank")} />}
              onClick={() => setSelectedType("bank")}
            />
            <BankComponent
              style={selectedType === "crypto" ? "bg-color-two" : "h-[110px]"}
              bankImage={<FaBitcoin className="text-color-one" />}
              bankName="Pay via Crypto Wallet"
              icon={<CircleToggle isClicked={selectedType === "crypto"} onClick={() => setSelectedType("crypto")} />}
              onClick={() => setSelectedType("crypto")}
            />
          </div>
        </div>
     
        {/* Proceed Button (Disabled if no method selected) */}
        <div className="mt-8 mx-6">
          <Button
            ButtonText="Proceed"
            className={`w-full ${selectedType ? "bg-color-one" : "bg-inactive cursor-not-allowed"}`}
            onClick={selectedType ? onProceed : undefined}
            disabled={!selectedType}
          />
        </div>
      </div>
    </div>
  );
}

