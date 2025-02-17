"use client";
// import BankFunding from "@/components/Investments/Funding-Method/BankFunding";
import BankDetails from "@/components/Savings/Details/Bank";
import WalletDetails from "@/components/Savings/Details/Wallet";
import SavingsTargetDesktop from "@/components/Savings/History/Targets/Desktop";
import SavingsTargetMobile from "@/components/Savings/History/Targets/Mobile";
import MakePayment from "@/components/Savings/Payment/MakePayment";
import ReceiptModal from "@/components/Savings/Receipt/Receipt";
// import SavingsDetails from "@/components/Savings/SavingsDetails";
import SavingsPreview from "@/components/Savings/SavingsPreview";
import Button from "@/components/ui/Button";
import BankFunding from "@/components/ui/FundBank";
import CryptoFunding from "@/components/ui/FundCrypto";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import Navigator from "@/components/ui/Navigator";
import Processed from "@/components/ui/Processed";
import StatRow from "@/components/ui/StatRow";
import { PurchaseSavingsViaBank } from "@/Services/apiService";
import { useSavingsTargetStore } from "@/store/savingsTargetStore";
import {
    FundBankDetails,
    FundCryptoWalletDetails,
    MakeSavingsBankResponse,
    MakeSavingsCryptoResponse,
    MakeSavingsTransactionResponse,
    MakeSavingsWalletResponse,
} from "@/types/Type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbTargetArrow } from "react-icons/tb";

export default function SavingsTarget() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { savingsTarget, fetchSavingsTarget, error } = useSavingsTargetStore();
//   const [savingDetailsOpen, setIsSavingDetailOpen] = useState(false);
  const [walletTransactionData, setWalletTransactionData] = useState([]);
  const [transactionData, setTransactionData] =
    useState<MakeSavingsTransactionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactionsError, setTransactionsError] = useState<string | null>(
    null
  );
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "bank" | "crypto" | "wallet" | null
  >(null);
  const [bankDetails, setBankDetails] = useState<FundBankDetails | null>(null);
  const [walletDetails, setWalletDetails] =
    useState<FundCryptoWalletDetails | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [savingsID, setSavingsId] = useState<string | null>(null);
  const [currentModal, setCurrentModal] = useState<
    | "paymentMethod"
    | "savingsPreview"
    | "processed"
    | "transactionDetails"
    | "bankTransactionDetails"
    | "bankTransfer"
    | "cryptoTransfer"
    | "receipt"
    | null
  >(null);
  const router = useRouter();
  const [purchaseResponse, setPurchaseResponse] =
    useState<MakeSavingsWalletResponse | null>(null);

  //Fetch Savings Target
  useEffect(() => {
    if (savingsTarget.length === 0) {
      fetchSavingsTarget();
    }
    //Fetch Funding Details
    const fetchDetails = async (type: "bank-deposit" | "crypto") => {
      setIsLoading(true);
      setApiError(null);

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
          setBankDetails(result.data); // Update bank details
        } else if (type === "crypto") {
          setWalletDetails(result.data); // Update wallet details
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setApiError(err.message);
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
  }, [savingsTarget, fetchSavingsTarget, router]);

  //Fetch Transactions done on the savings target.
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api-royal-stone.softwebdigital.com/api/savings/targets/transaction?savingsTargetID=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        const data = await response.json();
        setWalletTransactionData(data.data);
      } catch (error) {
        if (error instanceof Error) {
          setTransactionsError(error.message);
        } else {
          setTransactionsError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [id]);

  //Get the particular savings target
  const target = savingsTarget.find((target) => target.id === id);

  if (error || transactionsError || apiError) {
    return (
      <p className="text-red-500">
        {error
          ? "Failed to load savings target details."
          : transactionsError
          ? "Failed to load savings target transactions."
          : "Failed to fetch bank details."}{" "}
        {/* apiError message */}
      </p>
    );
  }

  if (!target || isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const targetSteps = [
    { label: "Savings", href: "/main/savings" },
    {
      label: target?.name || "Unknown Target", // Dynamically display the target name
      href: `/main/savings/savings-details?id=${encodeURIComponent(
        target?.id
      )}`,
    },
  ];

  // Assuming you have a function or data for the amount saved and target details
  const amountSaved = target?.amountSaved || 0;
  const targetAmount = target?.target || 0;
  const progress = Math.round((amountSaved / targetAmount) * 100);
  const amountLeft = targetAmount - amountSaved;
  const targetID = target.id;

  // Making Savings Via Wallet
  const handleProceedPayment = async () => {
    if (selectedPaymentMethod === "wallet") {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("Access token is missing.");
        return;
      }

      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/savings/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ savingsTargetID: id }),
          }
        );

        if (!response.ok) {
          throw new Error("Payment via wallet failed.");
        }

        const data = await response.json(); // Parse response JSON
        setPurchaseResponse(data.data);
        console.log(data); // Store response in state
        setCurrentModal("processed"); // Move to next step
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("An unexpected error occurred.");
        }
      }
    } 
  };
  // Type guard to check if the response is from a Bank
  function isBankResponse(
    response: MakeSavingsTransactionResponse
  ): response is MakeSavingsBankResponse["data"] {
    return (
      (response as MakeSavingsBankResponse["data"]).savings !== undefined
    );
  }

  // Type guard to check if the response is from a Crypto
  function isCryptoResponse(
    response: MakeSavingsTransactionResponse
  ): response is MakeSavingsCryptoResponse["data"] {
    return (response as MakeSavingsCryptoResponse["data"]).url !== undefined;
  }
  // Purchase Via Crypto Or Bank
  const handlePurchaseViaBank = async () => {
    setIsLoading(true);
    setApiError(null); // Clear previous error messages
    setSuccessMessage(null); // Clear previous success messages

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      // Call Purchase Via Bank based on the selected funding type (bank or crypto)
      const depositResult = await PurchaseSavingsViaBank(
        selectedPaymentMethod === "bank" ? bankDetails?.id || "" : null, // Pass beneficiary only for bank deposit
        target.id,
        token
      );
      if (depositResult) {
        const response = depositResult.data;

        // Check if the response is a Bank Response
        if (isBankResponse(response)) {
          setTransactionData(response); // Set Bank-specific data
          const successMessage = depositResult.message || "Deposit Successful!";
          setSuccessMessage(successMessage); // Set success message

          // Timeout to clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage(null);
          }, 2000);

          // Determine transaction ID dynamically
          const savingsTargetID = response?.savings?.id;
          setSavingsId(savingsTargetID);

          // Show receipt modal for Bank
          setCurrentModal("receipt");
        } else if (isCryptoResponse(response)) {
          // It's a Crypto Response
          setTransactionData(response); // Set Crypto response data
          // Redirect to the URL in Crypto Response
          const url = response.url;
          if (url) {
            window.location.href = url; // Redirect to Crypto payment URL
          }
        } else {
          // Handle any other cases if necessary
        }
      } else {
        const errorMessage = "An error occurred during the deposit.";
        setApiError(errorMessage); // Set error message

        // Timeout to clear error message after 3 seconds
        setTimeout(() => {
          setApiError(null);
        }, 9000);
      }

     

      // Handle the response (success or error)
      // if (depositResult.success && depositResult.data) {
      //   console.log("Savings Response", depositResult.data);
      //   setTransactionData(depositResult.data);
      //   const successMessage = depositResult.message || "Deposit Successful!";
      //   setSuccessMessage(successMessage); // Set success message

      //   // Timeout to clear success message after 3 seconds
      //   setTimeout(() => {
      //     setSuccessMessage(null);
      //   }, 2000);

      //   const savingsTargetID = depositResult.data?.savings?.id;
      //   setSavingsId(savingsTargetID);

      //   if (selectedPaymentMethod === "bank") {
      //     setCurrentModal("receipt"); // Show receipt modal
      //   } else {
      //     setCurrentModal(null);
      //   }
      // } else {
      //   const errorMessage =
      //     depositResult.message || "An error occurred during the deposit.";
      //   setApiError(errorMessage); // Set error message

      //   // Timeout to clear error message after 3 seconds
      //   setTimeout(() => {
      //     setApiError(null);
      //   }, 9000);
      // }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message); // Set error message if an error occurs
      } else {
        setApiError("An unknown error occurred.");
      }

      // Timeout to clear error message after 3 seconds
      setTimeout(() => {
        setApiError(null);
      }, 9000);
    } finally {
      setIsLoading(false); // Stop loading spinner or indicator
    }
  };

  console.log("Savings ID", savingsID);
  console.log("Savings Target ID :", target.id);
  return (
    <div>
      <div className="lg:flex lg:gap-10 xl:gap-36">
        <div>
          <Navigator currentStep={1} steps={targetSteps} />
          <div className="flex gap-4 items-center mt-8">
            <Icon
              icon={<TbTargetArrow className="text-color-one text-2xl" />}
              containerSize="w-[41.1px] h-[41.1px]"
            />
            <div>
              <p className="text-base text-color-zero font-semibold">
                {target?.name}
              </p>
              <p className="text-color-one text-xs">
                {target?.status.toLocaleUpperCase()}
              </p>
            </div>
          </div>
          <div className="bg-light-grey shadow-sm p-6 rounded-common h-[73px] mt-4 lg:w-[350px] xl:w-[500px]">
            <div className="bg-white shadow-sm h-[15px] rounded-[20px] relative">
              <div className="bg-color-two h-[5px] rounded-[30px] my-auto absolute inset-0 mx-1">
                <div
                  className="bg-color-one h-[5px] rounded-[30px]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-color-one text-sm mt-2">
              ${amountSaved} saved out of ${targetAmount}
            </p>
          </div>
          <hr className="my-4 lg:hidden" />
          <section className="flex gap-12 bg-light-grey shadow-sm rounded-[10px] p-4 lg:gap-16 lg:mt-4 lg:h-[163px]">
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-base font-semibold text-color-zero">
                  ${amountSaved}
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.7)]">Total Saved</p>
              </div>
              <div>
                <p className="text-base font-semibold text-color-zero">
                  {progress}%
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.7)]">
                  Progress Percentage
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-base font-semibold text-color-zero">
                  ${amountLeft}
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.7)]">Amount Left</p>
              </div>
              <div>
                <p className="text-base font-semibold text-color-zero">
                  ${target?.interest?.interest}
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.7)]">Interest</p>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flex flex-col mt-4 bg-light-grey rounded-[10px] px-4 shadow-sm lg:mt-12 lg:w-[350px] xl:w-[471px]">
            <StatRow
              label="Duration Type"
              value={
                target?.frequency?.type.charAt(0).toUpperCase() +
                target?.frequency?.type.slice(1).toLowerCase()
              }
              valueClass="text-color-six text-sm"
            />
            <StatRow
              label="Next Payout Date"
              value={new Date(target?.frequency?.nextDate).toLocaleDateString(
                "en-GB"
              )}
              valueClass="text-color-six text-sm"
              isLast={true}
            />
          </section>
          <Button
            ButtonText="Make Payment"
            className="w-full py-3 mt-5"
            onClick={() => setCurrentModal("paymentMethod")}
          />
        </div>
      </div>

      <hr className="mt-8" />
      <div className="mt-4 space-y-4 ">
        <p className="text-base text-color-zero font-semibold">
          {target.name} History
        </p>
        <SavingsTargetMobile
          targetID={targetID}
          transactions={walletTransactionData}
        />
        <SavingsTargetDesktop
          targetID={targetID}
          transactions={walletTransactionData}
        />
      </div>
      {currentModal === "paymentMethod" && (
        <MakePayment
          onClose={() => setCurrentModal(null)}
          onProceed={() => setCurrentModal("savingsPreview")}
          selectedType={selectedPaymentMethod}
          setSelectedType={setSelectedPaymentMethod} // Pass setter function
        />
      )}
      {currentModal === "savingsPreview" && (
        <SavingsPreview
          onClose={() => setCurrentModal(null)}
          onProceed={() => {
            if (selectedPaymentMethod === "bank") {
              setCurrentModal("bankTransfer");
            } else if (selectedPaymentMethod === "crypto") {
              setCurrentModal("cryptoTransfer");
            } else {
              handleProceedPayment();
            }
          }}
          selectedType={selectedPaymentMethod}
          name={target.name}
          targetAmount={targetAmount}
          duration={target?.duration}
          currentAmount={target?.recurringAmount}
          startDate={target?.startDate}
        />
      )}

      {currentModal === "bankTransfer" && bankDetails && (
        <BankFunding
          bankDetails={bankDetails}
          error={error}
          isLoading={isLoading}
          amount={target?.recurringAmount}
          successMessage={successMessage}
          onProceed={handlePurchaseViaBank}
          onClose={() => setCurrentModal(null)}
          transactionType="savings payment"
        />
      )}

      {currentModal === "cryptoTransfer" && walletDetails && (
        <CryptoFunding
          walletDetails={walletDetails}
          error={error}
          successMessage={successMessage}
          isLoading={isLoading}
          onProceed={handlePurchaseViaBank}
          onClose={() => setCurrentModal(null)}
          amount={target?.recurringAmount}
          heading="Make Savings"
          transactionType="savings payment"
        />
      )}

      {currentModal === "receipt" && (
        <ReceiptModal
          savingsID={savingsID}
          onBack={() => setCurrentModal("bankTransfer")}
          onProceed={() => setCurrentModal("processed")}
          onClose={() => setCurrentModal(null)}
        />
      )}

      {currentModal === "processed" && (
        <Processed
          onClose={() => {
            setCurrentModal(null);
            setTimeout(() => {
              window.location.reload(); // Reload the page
            }, 100); // Small delay to ensure state update before reload
          }}
          onConfirm={() =>
            setCurrentModal(
              selectedPaymentMethod === "bank"
                ? "bankTransactionDetails"
                : "transactionDetails"
            )
          }
          message={`Your ${target?.name} has been funded with $${target.recurringAmount} successfully.`}
        />
      )}

      {/* Wallet */}
      {currentModal === "transactionDetails" &&
        selectedPaymentMethod === "wallet" && (
          <WalletDetails
            onClose={() => {
              setCurrentModal(null);
              setTimeout(() => {
                window.location.reload(); // Reload the page
              }, 10); // Small delay to ensure state update before reload
            }}
            name={target?.name}
            purchaseResponse={purchaseResponse}
          />
        )}
      {/* Bank */}
      {currentModal === "bankTransactionDetails" &&  isBankResponse(transactionData)  &&
        selectedPaymentMethod === "bank" && (
          <BankDetails
            onClose={() => {
              setCurrentModal(null);
              setTimeout(() => {
                window.location.reload(); // Reload the page
              }, 10); // Small delay to ensure state update before reload
            }}
            name={target?.name}
            purchaseResponse={transactionData}
          />
        )}

      {/* {savingDetailsOpen && (
        <SavingsDetails onClose={() => setIsSavingDetailOpen(false)} />
      )} */}
    </div>
  );
}
