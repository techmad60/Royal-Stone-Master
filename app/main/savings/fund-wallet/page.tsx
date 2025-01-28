"use client";
import BankFunding from "@/components/Investments/Funding-Method/BankFunding";
import CryptoFunding from "@/components/Investments/Funding-Method/CryptoFunding";
import ReceiptModal from "@/components/Investments/Receipt/FundingReceipt";
import FundingDetails from "@/components/Investments/TransactionDetails/FundingDetails";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import Processed from "@/components/ui/Processed";
import { DepositFund } from "@/Services/apiService";
import useBankCryptoStore from "@/store/bankCryptoStore";
import {
    DepositResponse,
    FundBankDetails,
    FundCryptoWalletDetails,
} from "@/types/Type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";


const fundSteps = [
  { label: "Savings", href: "/main/savings" },
  { label: "Fund Wallet", href: "/main/savings/fund-wallet" },
];

export default function FundWalletPage() {
  const { selectedType, setSelectedType } = useBankCryptoStore();
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetails, setBankDetails] = useState<FundBankDetails | null>(null);
  const [walletDetails, setWalletDetails] =
    useState<FundCryptoWalletDetails | null>(null);
  const [transactionID, setTransactionID] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<
    DepositResponse["data"] | null
  >(null);
  const router = useRouter();
  const walletType = "savings"

  useEffect(() => {
    const fetchDetails = async (type: "bank-deposit" | "crypto") => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(
          `https://api-royal-stone.softwebdigital.com/api/fund?type=${type}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || `Failed to fetch ${type} details`
          );
        }

        const result = await response.json();

        if (type === "bank-deposit") {
          setBankDetails(result.data[0]); // Update bank details
        } else if (type === "crypto") {
          setWalletDetails(result.data[0]); // Update wallet details
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error("An unknown error occurred:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch both bank and wallet details in parallel
    const fetchAllDetails = async () => {
      await Promise.all([fetchDetails("bank-deposit"), fetchDetails("crypto")]);
    };

    fetchAllDetails();
  }, [router]);

  const [currentModal, setCurrentModal] = useState<
    | "transactionDetails"
    | "bankFunding"
    | "cryptoFunding"
    | "receipt"
    | "processed"
    | null
  >(null);

  const [formError, setFormError] = useState("");
  const [amount, setAmount] = useState("");

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
      // Show error for crypto payment method
      setFormError(
        "This payment method is not ready yet. Please select another option."
      );
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

    if (!selectedType) {
      return {
        isValid: false,
        error: "Please select a payment method to proceed.",
      };
    }
    setFormError("");
    return { isValid: true, error: "" };
  };

  const handleDepositFund = async () => {
    setIsLoading(true);
    setError(null); // Clear previous error messages
    setSuccessMessage(null); // Clear previous success messages
  
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }
  
      // Call DepositFund based on the selected funding type (bank or crypto)
      const depositResult = await DepositFund(
        amount, // Amount to deposit
        walletType,
        selectedType === "bank" ? bankDetails?.id || "" : null, // Pass beneficiary only for bank deposit
        token
      );
  
      // Handle the response (success or error)
      if (depositResult.success && depositResult.data) {
        setTransactionData(depositResult.data);
        const successMessage = depositResult.message || "Deposit Successful!";
        setSuccessMessage(successMessage); // Set success message
  
        // Timeout to clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
  
        const { id } = depositResult.data.wallets;
        setTransactionID(id);
        if (selectedType === "bank") {
          setCurrentModal("receipt"); // Show receipt modal
        } else {
          setCurrentModal(null);
        }
      } else {
        const errorMessage = depositResult.message || "An error occurred during the deposit.";
        setError(errorMessage); // Set error message
  
        // Timeout to clear error message after 3 seconds
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Set error message if an error occurs
      } else {
        setError("An unknown error occurred.");
      }
  
      // Timeout to clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setIsLoading(false); // Stop loading spinner or indicator
    }
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
        <div className="flex flex-col gap-1">
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

        {formError && ( // Display error message conditionally
          <p className="text-red-600">{formError}</p>
        )}

        <Button
          type="submit"
          ButtonText="Fund Wallet"
          className="py-3 mt-12 w-full lg:w-[528px]"
        />
      </form>

      {currentModal === "bankFunding" && bankDetails && (
        <BankFunding
          bankDetails={bankDetails}
          error={error}
          isLoading={isLoading}
          amount={amount}
          successMessage={successMessage}
          onProceed={handleDepositFund}
          onClose={() => setCurrentModal(null)}
        />
      )}

      {currentModal === "cryptoFunding" && walletDetails && (
        <CryptoFunding
          walletDetails={walletDetails}
          error={error}
          successMessage={successMessage}
          isLoading={isLoading}
          onProceed={handleDepositFund}
          onClose={() => setCurrentModal(null)}
          amount={amount}
        />
      )}

      {currentModal === "receipt" && (
        <ReceiptModal
          transactionID={transactionID}
          onBack={() => setCurrentModal("bankFunding")}
          onProceed={() => setCurrentModal("processed")}
        />
      )}

      {currentModal === "processed" && (
        <Processed
          message={`Your wallet has successfully been funded with $${amount}`}
          onClose={() => setCurrentModal(null)}
          onConfirm={() => setCurrentModal("transactionDetails")}
        />
      )}
       {currentModal === "transactionDetails" && (
        <FundingDetails transactionData={transactionData} onClose={() => setCurrentModal(null)}/>
      )}
    </div>
  );
}
