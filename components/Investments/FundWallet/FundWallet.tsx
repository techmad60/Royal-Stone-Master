"use client";
import BankFunding from "@/components/Investments/Funding-Method/BankFunding";
import CryptoFunding from "@/components/Investments/Funding-Method/CryptoFunding";
import FundingProcessed from "@/components/Investments/Processed/FundingProcessed";
import ReceiptModal from "@/components/Investments/Receipt/FundingReceipt";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import useInvestmentStore from "@/store/investmentStore";
import usePaymentMethodStore from "@/store/paymentMethodStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";

const fundSteps = [
  { label: "Investments", href: "/main/investments" },
  { label: "Fund Wallet", href: "/main/investments/fund-wallet" },
];

export default function FundWalletPage() {
  const searchParams = useSearchParams();
  const { selectedType, setSelectedType } = usePaymentMethodStore();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const success = searchParams.get("success");
    console.log("Search Param 'success':", success);
    if (success === "true") {
    //   setCurrentModal("investmentProcessed");
      setShowAlert(true);
      // Remove the "success" parameter from the URL with a delay
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("success");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }, 5000); // Delay of 1000ms (1 second)
    }
  }, [searchParams]);

  const [currentModal, setCurrentModal] = useState<
    | "transactionDetails"
    | "bankFunding"
    | "cryptoFunding"
    | "receipt"
    | null
  >(null);

  const [formError, setFormError] = useState("");
  const [amount, setAmount] = useState("");
  const investmentId = useInvestmentStore((state) => state.investmentId);
  const walletType = "investment"
  const handleFundWalletClick = (event: React.FormEvent) => {
    event.preventDefault();
    const { isValid, error } = validateInputs();
    if (!isValid) {
      setFormError(error);
      return;
    }
    if (selectedType === "bank") {
      setCurrentModal("bankFunding");
    } else if (selectedType === "crypto") {
      setCurrentModal("cryptoFunding");
    } else {
      setCurrentModal(null);
    }
  };

  const validateInputs = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return {
        isValid: false,
        error: "Please enter a valid amount.",
      };
    }

    // if (!walletType.trim()) {
    //   return {
    //     isValid: false,
    //     error: "Please enter a wallet type.",
    //   };
    // }

    if (!selectedType) {
      return {
        isValid: false,
        error: "Please select a payment method to proceed.",
      };
    }
    setFormError("");
    return { isValid: true, error: "" };
  };

  const handleFundingSelection = (method: "bank" | "crypto") => {
    setSelectedType(method);
    setFormError("");
    setCurrentModal(null); // Reset modal when funding method changes
  };

  return (
    <div>
      <Navigator currentStep={1} steps={fundSteps} />

      <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">
        Fund Wallet
      </p>
      <form
        className="flex flex-col space-y-4 mt-2"
        onSubmit={handleFundWalletClick}
      >
        {/* Amount of Units */}
        <div className="flex flex-col gap-1 ">
          <label className="text-color-form text-sm">
            What amount do you want to fund?
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="rounded-sm border-b border-slate-200 placeholder:text-sm py-2 lg:w-[528px]"
            placeholder="$200"
          />
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-1 border-b lg:w-[528px]">
          <label className="text-color-form text-sm">
            Select a preferred funding method
          </label>
          <div className="grid grid-cols-2 gap-4 py-4 lg:flex">
            <BankComponent
              style={
                selectedType === "bank"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<BiSolidBank className="text-color-one" />}
              bankName="Fund Via Bank Transfer"
              textStyle={
                selectedType === "bank"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "bank"}
                  onClick={() => handleFundingSelection("bank")}
                />
              }
            />

            <BankComponent
              style={
                selectedType === "crypto"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<FaBitcoin className="text-color-one" />}
              bankName="Fund via Crypto Wallet"
              textStyle={
                selectedType === "crypto"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "crypto"}
                  onClick={() => handleFundingSelection("crypto")}
                />
              }
            />
          </div>
        </div>
        {/* Error message */}
        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <Button
          type="submit"
          ButtonText="Fund Wallet"
          className="py-3 mt-12 w-full lg:w-[528px]"
        />
      </form>

      {currentModal === "bankFunding" && (
        <BankFunding
          onClose={() => setCurrentModal(null)} // Close modal after success
          onProceed={() => setCurrentModal("receipt")}
          amount={amount}
          walletType={walletType}
        />
      )}
      {currentModal === "cryptoFunding" && (
        <CryptoFunding
          onClose={() => setCurrentModal(null)}
          onProceed={() => setCurrentModal("receipt")}
          amount={amount}
          walletType={walletType}
        />
      )}
      {currentModal === "receipt" && (
        <ReceiptModal
          investmentId={investmentId}
          onBack={() => {
            if (selectedType === "bank") {
              setCurrentModal(null);
            } else if (selectedType === "crypto") {
              setCurrentModal(null);
            } else {
              setCurrentModal(null);
            }
          }}
          onClose={() => setCurrentModal(null)}
        />
      )}
      {showAlert &&(
        <FundingProcessed
          onClose={() => setShowAlert(false)}
          amount={amount}
        />
      )}
    </div>
  );
}
