"use client";
import WithdrawPreview from "@/components/Investments/Preview/WithdrawPreview";
import WithdrawalDetails from "@/components/Investments/TransactionDetails/WithdrawDetails";
import AddBankInformation from "@/components/Investments/WithdrawFunds/AddNewWithdrawalAccount/AddBank";
import AddCryptoInformation from "@/components/Investments/WithdrawFunds/AddNewWithdrawalAccount/AddCrypto";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import Processed from "@/components/ui/Processed";
import { withdrawFunds } from "@/Services/apiService";
import useBankCryptoStore from "@/store/bankCryptoStore";
import { BankDetails, CryptoWallet, WithdrawalResponse } from "@/types/Type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";

const fundSteps = [
  { label: "Savings", href: "/main/savings" },
  { label: "Withdraw Funds", href: "/main/savings/withdraw-funds" },
];

export default function WithdrawFundsPage() {
  const [formError, setFormError] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<
    WithdrawalResponse["data"] | null
  >(null);
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const availableCash = parseFloat(searchParams.get("availableBalance") || "0");
//   const parsedAmount = Number(amount);
  const [selectedAccountDetails, setSelectedAccountDetails] = useState<{
    selectedAccount: BankDetails | CryptoWallet | null;
  }>({
    selectedAccount: null, // Initial value should be null
  });
  // Zustand Hooks
  const bankDetails = useBankCryptoStore((state) => state.bankDetails);
  const cryptoWallets = useBankCryptoStore((state) => state.cryptoWallets);
  const setBankDetails = useBankCryptoStore((state) => state.setBankDetails);
  const setCryptoWallets = useBankCryptoStore(
    (state) => state.setCryptoWallets
  );
  const selectedBankId = useBankCryptoStore((state) => state.selectedBankId);
  const selectedCryptoId = useBankCryptoStore(
    (state) => state.selectedCryptoId
  );
  const setSelectedBankId = useBankCryptoStore(
    (state) => state.setSelectedBankId
  );
  const setSelectedCryptoId = useBankCryptoStore(
    (state) => state.setSelectedCryptoId
  );
  const selectedType = useBankCryptoStore((state) => state.selectedType);
  const setSelectedType = useBankCryptoStore((state) => state.setSelectedType);

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setError(null);

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
          setError(
            err.message || "Failed to fetch data. Please try again later."
          );
        } else {
          setError("An unknown error occurred. Please try again later.");
        }
      }
    }
    fetchData();
  }, [setBankDetails, setCryptoWallets, router]);

  const [currentModal, setCurrentModal] = useState<
    | "withdrawPreview"
    | "processed"
    | "transactionDetails"
    | "addBank"
    | "addCrypto"
    | null
  >(null);
  const handleWithdrawalSelection = (
    method: "bank" | "crypto",
    id?: string
  ) => {
    setSelectedType(method);
    if (method === "bank") {
      setSelectedBankId(id ?? null);
    } else {
      setSelectedCryptoId(id ?? null);
    }
    setFormError("");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const validateInputs = (
    selectedAccount: BankDetails | CryptoWallet | null
  ) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return {
        isValid: false,
        error: "Please enter a valid amount.",
      };
    }
    // console.log(availableCash);
    // if (parsedAmount > availableCash || availableCash === 0) {
    //   return {
    //     isValid: false,
    //     error: "Insufficient Balance",
    //   };
    // }
    if (!selectedType) {
      return {
        isValid: false,
        error: "Please select a withdrawal method to proceed.",
      };
    }

    if (!selectedAccount) {
      return {
        isValid: false,
        error: `Please Select a ${
          selectedType === "bank"
            ? "Bank Account"
            : selectedType === "crypto"
            ? "Crypto Wallet"
            : "method"
        } to withdraw from.`,
      };
    }
    setFormError("");
    return { isValid: true, error: "" };
  };
  const handleWithdrawFundsClick = (event: React.FormEvent) => {
    event.preventDefault();

    // Reset form error, selected account, and any other states
    setFormError("");
    setSelectedAccountDetails({ selectedAccount: null });

    const selectedAccount =
      selectedType === "bank"
        ? bankDetails.find((bank) => bank.id === selectedBankId) ?? null // If no bank is found, set to null
        : cryptoWallets.find((wallet) => wallet.id === selectedCryptoId) ??
          null; // If no wallet is found, set to null

    const { isValid, error } = validateInputs(selectedAccount);
    if (!isValid) {
      setFormError(error);
      return;
    }

    setCurrentModal("withdrawPreview");
    // Set selected account to the state
    setSelectedAccountDetails({
      selectedAccount: selectedAccount,
    });
  };
  const handleWithdrawal = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("You must be logged in to proceed.");
      return;
    }

    const beneficiaryID = selectedAccountDetails?.selectedAccount?.id || "";
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await withdrawFunds(amount, beneficiaryID, token, "savings");

      if (result.success && result.data) {
        setTransactionData(result.data); // Store response data
        setSuccessMessage(result.message || "Withdrawal Successful!");
        console.log("Request Response", result.data);
        setTimeout(() => {
          setSuccessMessage(null);
          setCurrentModal("processed"); // Proceed to the next step
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      setError(errorMessage);
      setTimeout(() => {
        setError(null);
        setCurrentModal(null); // Close the modal
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const renderWithdrawalOptions = () => {
    if (selectedType === "bank") {
      return bankDetails.length > 0 ? (
        <div className="flex items-center gap-4 overflow-x-scroll hide-scrollbar">
          {bankDetails.map((bank) => (
            <div key={bank.id}>
              <BankComponent
                style={
                  selectedBankId === bank.id
                    ? "bg-color-two hover:bg-color-two"
                    : "h-[105px]"
                }
                id={bank.id}
                bankImage={<RiBankLine className="text-color-one" />}
                bankName={bank.bankName}
                accNumber={bank.accountNumber}
                accName={bank.accountName}
                // style="h-[105px]"
                flexStyling="flex gap-2 space-y-0"
                icon={
                  <CircleToggle
                    isClicked={selectedBankId === bank.id}
                    onClick={() => handleWithdrawalSelection("bank", bank.id)}
                  />
                }
                onClick={() => handleWithdrawalSelection("bank", bank.id)}
                // onClick={onNavigateToAddBankDetails}
                type="bank"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-color-form">
          You have not added any bank information.
        </p>
      );
    }

    if (selectedType === "crypto") {
      return cryptoWallets.length > 0 ? (
        <div className="flex items-center gap-4 overflow-x-scroll hide-scrollbar">
          {cryptoWallets.map((wallet) => (
            <div key={wallet.id}>
              <BankComponent
                id={wallet.id}
                style={`h-[79px] min-w-[200px] w-full ${
                  selectedCryptoId === wallet.id
                    ? "bg-color-two hover:bg-color-two"
                    : ""
                }
                  
                `}
                bankImage={<FaBitcoin className="text-color-one" />}
                accName={wallet.address}
                bankName={wallet.networkID.name}
                // style="h-[79px] w-full items-start"
                flexStyling="flex gap-2 space-y-0"
                icon={
                  <CircleToggle
                    isClicked={selectedCryptoId === wallet.id}
                    onClick={() =>
                      handleWithdrawalSelection("crypto", wallet.id)
                    }
                  />
                }
                onClick={() => handleWithdrawalSelection("crypto", wallet.id)}
                // onClick={onNavigateToAddCryptoDetails}
                type="crypto"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-color-form">
          No crypto wallets available. Add one to proceed.
        </p>
      );
    }

    return null;
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
              onClick={() => handleWithdrawalSelection("bank")}
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
              onClick={() => handleWithdrawalSelection("crypto")}
            />
          </div>
        </div>

        <div className="lg:flex lg:gap-32">
          {(selectedType === "crypto" && cryptoWallets.length !== 0) ||
          (selectedType === "bank" && bankDetails.length !== 0) ? (
            <p className="text-color-form text-sm">
              Select a{" "}
              {selectedType === "bank"
                ? "Bank Account"
                : selectedType === "crypto"
                ? "Crypto Wallet"
                : "method"}{" "}
              to withdraw from.
            </p>
          ) : null}
          {/* Show only for Desktop */}
          {selectedType && (
            <p
              className="text-color-one border-color-one border-b w-fit text-sm hover hover:text-green-700 hover:border-green-700 duration-150 cursor-pointer hidden lg:flex"
              onClick={() => {
                if (selectedType === "bank" ) {
                  // Open the Add Bank modal
                  setCurrentModal("addBank");
                } else if (
                  selectedType === "crypto" 
                ) {
                  // Open the Add Crypto modal
                  setCurrentModal("addCrypto");
                }
              }}
            >
              {selectedType === "bank" && bankDetails.length === 0
                ? "Add"
                : selectedType === "crypto" && cryptoWallets.length === 0
                ? "Add"
                :"Use a new"}{" "}
              {selectedType === "bank"
                ? "bank account"
                : selectedType === "crypto"
                ? "crypto wallet"
                : ""}
              .
            </p>
          )}
        </div>

        {/* Conditionally Render Withdrawal Options */}
        <div className="mt-6 flex flex-col gap-6">
          {renderWithdrawalOptions()}
          {/* Show only on mobile */}
          <hr className="lg:hidden"/>
          {selectedType && (
            <p
              className="text-color-one border-color-one border-b w-fit text-sm hover hover:text-green-700 hover:border-green-700 duration-150 cursor-pointer flex lg:hidden"
              onClick={() => {
                if (selectedType === "bank" ) {
                  // Open the Add Bank modal
                  setCurrentModal("addBank");
                } else if (
                  selectedType === "crypto" 
                ) {
                  // Open the Add Crypto modal
                  setCurrentModal("addCrypto");
                }
              }}
            >
              {selectedType === "bank" && bankDetails.length === 0
                ? "Add"
                : selectedType === "crypto" && cryptoWallets.length === 0
                ? "Add"
                :"Use a new"}{" "}
              {selectedType === "bank"
                ? "bank account"
                : selectedType === "crypto"
                ? "crypto wallet"
                : ""}
              .
            </p>
          )}

        </div>

        {/* Error message */}
        {formError && <p className="text-red-500 text-sm">{formError}</p>}

        <Button
          type="submit"
          ButtonText="Withdraw Funds"
          className="py-3 mt-12 w-full lg:w-[528px]"
        />
      </form>
      {currentModal === "withdrawPreview" && (
        <WithdrawPreview
          onClose={() => setCurrentModal(null)}
          loading={loading}
          successMessage={successMessage}
          error={error}
          onProceed={handleWithdrawal}
          selectedAccount={selectedAccountDetails.selectedAccount}
          amount={amount}
        />
      )}
      {currentModal === "processed" && (
        <Processed
          message={`Your withdrawal of $${amount} has successfully being processed!`}
          onClose={() => setCurrentModal(null)}
          onConfirm={() => setCurrentModal("transactionDetails")}
        />
      )}
      {currentModal === "transactionDetails" && (
        <WithdrawalDetails
          transactionData={transactionData}
          onClose={() => setCurrentModal(null)}
        />
      )}
      {currentModal === "addBank" && (
        <AddBankInformation onClose={() => setCurrentModal(null)} />
      )}

      {currentModal === "addCrypto" && (
        <AddCryptoInformation onClose={() => setCurrentModal(null)} />
      )}
    </div>
  );
}
