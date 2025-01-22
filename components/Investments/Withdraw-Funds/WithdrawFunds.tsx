"use client";
import BankFunding from "@/components/Investments/Funding-Method/BankFunding";
import CryptoFunding from "@/components/Investments/Funding-Method/CryptoFunding";
import FundingProcessed from "@/components/Investments/Processed/FundingProcessed";
import ReceiptModal from "@/components/Investments/Receipt/FundingReceipt";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import useBankCryptoStore from "@/store/bankCryptoStore";
import useInvestmentStore from "@/store/investmentStore";
import usePaymentMethodStore from "@/store/paymentMethodStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";

const fundSteps = [
  { label: "Investments", href: "/main/investments" },
  { label: "Withdraw Funds", href: "/main/investments/withdraw-funds" },
];

export default function WithdrawFundsPage() {
  const searchParams = useSearchParams();
  const { selectedType, setSelectedType } = usePaymentMethodStore();
  const [showAlert, setShowAlert] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  const router = useRouter();
//   const bankDetails = useBankCryptoStore((state) => state.bankDetails);
//   const cryptoWallets = useBankCryptoStore((state) => state.cryptoWallets);
  const setBankDetails = useBankCryptoStore((state) => state.setBankDetails);
  const setCryptoWallets = useBankCryptoStore(
    (state) => state.setCryptoWallets
  );

  useEffect(() => {
    const success = searchParams.get("success");
    console.log("Search Param 'success':", success);
    if (success === "true") {
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

   // Fetch data
   useEffect(() => {
    async function fetchData() {
    //   setLoading(true);
    //   setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return router.push("/auth/login");

        const fetchWithToken = async (url: string) => {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          return response.json();
        };

        const [bankData, cryptoData] = await Promise.all([
          fetchWithToken("https://api-royal-stone.softwebdigital.com/api/bank"),
          fetchWithToken(
            "https://api-royal-stone.softwebdigital.com/api/bank/crypto-wallet"
          ),
        ]);

        if (bankData.status) {
          setBankDetails(bankData.data || []);
          console.log("Bank Data:", bankData);
        }

        if (cryptoData.status) {
          setCryptoWallets(cryptoData.data || []);
          console.log("Crypto Data:", cryptoData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
        //   setError(
        //     err.message || "Failed to fetch data. Please try again later."
        //   );
        } else {
        //   setError("An unknown error occurred. Please try again later.");
        }
      } finally {
        // setLoading(false);
      }
    }

    fetchData();
  }, [setBankDetails, setCryptoWallets, router]);

  const [currentModal, setCurrentModal] = useState<
    | "transactionDetails"
    | "bankWithdrawal"
    | "cryptoWithdrawal"
    | "receipt"
    | null
  >(null);

  const [formError, setFormError] = useState("");
  const [amount, setAmount] = useState("");
  const investmentId = useInvestmentStore((state) => state.investmentId);
  const walletType = "investment"
  const handleWithdrawFundsClick = (event: React.FormEvent) => {
    event.preventDefault();
    const { isValid, error } = validateInputs();
    if (!isValid) {
      setFormError(error);
      return;
    }
    if (selectedType === "bank") {
      setCurrentModal("bankWithdrawal");
    } else if (selectedType === "crypto") {
      setCurrentModal("cryptoWithdrawal");
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
        error: "Please select a withdrawal method to proceed.",
      };
    }
    setFormError("");
    return { isValid: true, error: "" };
  };

  const handleWithdrawalSelection = (method: "bank" | "crypto") => {
    setSelectedType(method);
    setFormError("");
    setCurrentModal(null); // Reset modal when funding method changes
  };

  return (
    <div>
      <Navigator currentStep={1} steps={fundSteps} />

      <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">
        Withdraw Funds
      </p>
      <form
        className="flex flex-col space-y-4 mt-2"
        onSubmit={handleWithdrawFundsClick}
      >
        {/* Amount of Units */}
        <div className="flex flex-col gap-1 ">
          <label className="text-color-form text-sm">
            What amount do you want to withdraw?
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
            Select a preferred withdrawal method
          </label>
          <div className="grid grid-cols-2 gap-4 py-4 lg:flex">
            <BankComponent
              style={
                selectedType === "bank"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<BiSolidBank className="text-color-one" />}
              bankName="Withdraw to Bank Account"
              textStyle={
                selectedType === "bank"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "bank"}
                  onClick={() => handleWithdrawalSelection("bank")}
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
              bankName="Withdraw to Crypto Wallet"
              textStyle={
                selectedType === "crypto"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "crypto"}
                  onClick={() => handleWithdrawalSelection("crypto")}
                />
              }
            />
          </div>
        </div>
        {/* Error message */}
        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <Button
          type="submit"
          ButtonText="Withdraw Funds"
          className="py-3 mt-12 w-full lg:w-[528px]"
        />
      </form>

      {currentModal === "bankWithdrawal" && (
        <BankFunding
          onClose={() => setCurrentModal(null)} // Close modal after success
          onProceed={() => setCurrentModal("receipt")}
          amount={amount}
          walletType={walletType}
        />
      )}
      {currentModal === "cryptoWithdrawal" && (
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
