"use client";

import BankFunding from "@/components/ui/FundBank";
import CryptoFunding from "@/components/ui/FundCrypto";

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
  DepositBankResponse,
  DepositCryptoResponse,
  DepositTransactionResponse,
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
  const [transactionData, setTransactionData] =
    useState<DepositTransactionResponse | null>(null);
  const router = useRouter();
  const walletType = "savings";

  useEffect(() => {
    const fetchDetails = async (type: "bank-deposit" | "crypto") => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth/login/with-mail");
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
          setBankDetails(result.data); // Update bank details
        } else if (type === "crypto") {
          setWalletDetails(result.data); // Update wallet details
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

    if (!selectedType) {
      return {
        isValid: false,
        error: "Please select a payment method to proceed.",
      };
    }
    setFormError("");
    return { isValid: true, error: "" };
  };

  // Type guard to check if the response is from a Bank
  function isBankResponse(
    response: DepositTransactionResponse
  ): response is DepositBankResponse["data"] {
    return (response as DepositBankResponse["data"]).wallets !== undefined;
  }
  function isCryptoResponse(
    response: DepositTransactionResponse
  ): response is DepositCryptoResponse["data"] {
    return (response as DepositCryptoResponse["data"]).url !== undefined;
  }

  const handleDepositFund = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login/with-mail");
        return;
      }

      const depositResult = await DepositFund(
        amount,
        walletType,
        selectedType === "bank" ? bankDetails?.id || null : null,
        token
      );

      if (depositResult) {
        const response = depositResult.data;

        // Check if the response is a Bank Response
        if (isBankResponse(response)) {
          // It's a Bank Response
          setTransactionData(response); // Set Bank-specific data
          const successMessage = depositResult.message || "Deposit Successful!";
          setSuccessMessage(successMessage); // Set success message

          // Timeout to clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);

          // Determine transaction ID dynamically
          const transactionID = response.wallets?.id;
          setTransactionID(transactionID);

          // Show receipt modal for Bank
          setCurrentModal("receipt");
        } else if (isCryptoResponse(response)) {
          setCurrentModal(null);
          // Redirect to the URL in Crypto Response
          const url = response.url;
          if (url) {
            window.location.href = url; // Redirect to Crypto payment URL
          }
        } else {
          // Handle any other cases if necessary
        }
      } else {
        setError("An error occurred during the deposit.");
        setTimeout(() => setError(null), 2000);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
      setTimeout(() => setError(null), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFundingSelection = (method: "bank" | "crypto") => {
    setSelectedType(method);
    setFormError("");
    setCurrentModal(null); // Reset modal when funding method changes
  };

  return (
    <div className="mt-[8.2rem] sm:mt-[0rem] lg:mt-[6rem]">
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
          transactionType="wallet funding"
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
          transactionType="wallet funding"
          heading="Fund Wallet"
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
          message={`Your transaction is awaiting approval from the Admin.`}
          onClose={() => setCurrentModal(null)}
          onConfirm={() => setCurrentModal("transactionDetails")}
        />
      )}
      {currentModal === "transactionDetails" &&
        isBankResponse(transactionData) && (
          <FundingDetails
            transactionData={transactionData}
            onClose={() => setCurrentModal(null)}
          />
        )}
    </div>
  );
}
