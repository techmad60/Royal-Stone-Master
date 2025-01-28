"use client";
import InvestPreview from "@/components/Investments/Preview/InvestmentPreview";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import Processed from "@/components/ui/Processed";
import { makePurchase, PurchaseViaBank } from "@/Services/apiService";
import usePaymentMethodStore from "@/store/paymentMethodStore";
import useProductStore from "@/store/productStore";
import {
  FundBankDetails,
  FundCryptoWalletDetails,
  MakeInvestmentBankResponse,
} from "@/types/Type";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import Loading from "../../ui/Loading";
import BankTransfer from "../Payment-Method/BankTransfer";
import CryptoTransfer from "../Payment-Method/CryptoTransfer";
import ReceiptModal from "../Receipt/PaymentReceipt";
import PurchaseViaBankDetails from "../TransactionDetails/PurchaseViaBank";

export default function InvestmentDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [currentModal, setCurrentModal] = useState<
    | "investPreview"
    | "bankTransfer"
    | "walletTransfer"
    | "cryptoTransfer"
    | "receipt"
    | "transactionDetails"
    | "processed"
    | null
  >(null);
  const [noOfUnits, setNoOfUnits] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { products, fetchProducts, error } = useProductStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const { selectedType, setSelectedType } = usePaymentMethodStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [bankDetails, setBankDetails] = useState<FundBankDetails | null>(null);
  const [walletDetails, setWalletDetails] =
    useState<FundCryptoWalletDetails | null>(null);
  const router = useRouter();
  const [investmentId, setInvestmentId] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<
    MakeInvestmentBankResponse["data"] | null
  >(null);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
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
          setBankDetails(result.data[0]); // Update bank details
        } else if (type === "crypto") {
          setWalletDetails(result.data[0]); // Update wallet details
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
  }, [products, fetchProducts, router]);

  const product = products.find((product) => product.id === id);

  if (error)
    return <p className="text-red-500">Failed to load product details.</p>;
  if (!product)
    return (
      <div>
        <Loading />
      </div>
    );

  const investmentSteps = [
    { label: "Investments", href: "/main/investments" },
    { label: "Make Investment", href: "/main/investments/make-investment" },
    {
      label: "Investment Product",
      href: `/main/investments/make-investment/investment-product?id=${encodeURIComponent(
        product.id
      )}`, // Pass id here
    },
    {
      label: "Investment Details",
      href: "/main/investments/make-investment/investment-product/investment-details",
    },
  ];

  const validateInputs = () => {
    const units = Number(noOfUnits);
    const totalAmount = Number(amount);

    if (!units || !totalAmount) {
      return { isValid: false, error: "Please fill in all required fields." };
    }

    if (isNaN(units) || isNaN(totalAmount)) {
      return {
        isValid: false,
        error: "Invalid input. Please enter numeric values.",
      };
    }

    if (units > product.availableUnits) {
      return {
        isValid: false,
        error: `You cannot invest in more than ${product.availableUnits} units.`,
      };
    }
    if (!selectedType) {
      return {
        isValid: false,
        error: "Please select a payment method to proceed.",
      };
    }

    return { isValid: true, error: "" };
  };

  const handleMakeInvestmentClick = () => {
    const { isValid, error } = validateInputs();
    if (!isValid) {
      setFormError(error);
      return;
    }
    // Handle payment type
    if (selectedType === "bank") {
      setCurrentModal("bankTransfer");
    } else if (selectedType === "crypto") {
      setFormError(
        "This Payment Method isn't available yet. Please choose another method."
      );
      setCurrentModal(null); // Ensure no modal opens
      return;
    } else {
      setFormError(""); // Clear any lingering errors
      setCurrentModal("investPreview");
      return;
    }

    // If everything is valid and no errors, open investPreview
    setFormError(""); // Clear any lingering errors
    setCurrentModal("investPreview");
  };

  // Update the amount whenever the number of units is changed
  const handleNoOfUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const units = e.target.value;
    setNoOfUnits(units);

    // Calculate the amount based on units and costPerUnit
    if (units && !isNaN(Number(units))) {
      const calculatedAmount = Number(units) * product.costPerUnit;
      setAmount(calculatedAmount.toString());
    } else {
      setAmount("");
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);

    // Calculate units based on the input amount and costPerUnit
    if (inputAmount && !isNaN(Number(inputAmount))) {
      const calculatedUnits = Number(inputAmount) / product.costPerUnit;
      setNoOfUnits(calculatedUnits.toString());
    } else {
      setNoOfUnits("");
    }
  };

  // Purchase Via Wallet
  const handleMakePurchase = async () => {
    setApiError(null); // Clear previous error messages
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      const purchaseResponse = await makePurchase(
        product.id,
        Number(noOfUnits),
        token
      );
      // Handle the response (success or error)
      if (purchaseResponse.success && purchaseResponse.data) {
        const transactionParams = new URLSearchParams(
          purchaseResponse.data
        ).toString();

        // Redirect with transactionData in the URL
        router.push(`/main/investments?success=true&${transactionParams}`);
      } else {
        const errorMessage =
          purchaseResponse.message || "An error occurred during the deposit.";
        setApiError(errorMessage); // Set error message

        // Timeout to clear error message after 3 seconds
        setTimeout(() => {
          setApiError(null);
        }, 2000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message || "Something went wrong.");
      } else {
        setFormError("Something went wrong.");
      }
    }
  };

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
      const depositResult = await PurchaseViaBank(
        selectedType === "bank" ? bankDetails?.id || "" : null, // Pass beneficiary only for bank deposit
        product.id,
        Number(noOfUnits), // Amount to deposit
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

        const { id } = depositResult.data?.investment;
        setInvestmentId(id);
        if (selectedType === "bank") {
          setCurrentModal("receipt"); // Show receipt modal
        } else {
          setCurrentModal(null);
        }
      } else {
        const errorMessage =
          depositResult.message || "An error occurred during the deposit.";
        setApiError(errorMessage); // Set error message

        // Timeout to clear error message after 3 seconds
        setTimeout(() => {
          setApiError(null);
        }, 9000);
      }
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

  const handlePaymentSelection = (method: "bank" | "crypto" | "wallet") => {
    setSelectedType(method);
    setFormError("");
  };
  return (
    <div>
      <Navigator currentStep={3} steps={investmentSteps} />

      <p className="text-color-zero mt-2 text-base font-semibold py-2 lg:text-lg">
        Make Investment
      </p>
      <div className="flex gap-2 border-b py-3 lg:hidden">
        <div className="w-[39px] h-[39px] rounded-[8px] overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder-image.png"}
            width={39}
            height={39}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-col">
          <p className="text-sm text-color-zero">{product.name}</p>
          <p className="text-color-six text-sm">{product.ROI.value}% ROI</p>
        </div>
      </div>
      <hr className="lg:mr-8" />
      <form
        className="flex flex-col space-y-4 mt-2"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleMakeInvestmentClick(); // Call your preview function
        }}
      >
        {/* Amount of Units */}
        <div className="flex flex-col gap-1">
          <label className="text-color-form text-sm">No of Units</label>
          <input
            value={noOfUnits}
            onChange={(e) => {
              const value = e.target.value;

              // Ensure the input value is an integer or empty
              if (/^\d*$/.test(value)) {
                handleNoOfUnitsChange(e);
              }
            }}
            max={product.availableUnits}
            type="number"
            required
            className="rounded-sm border-b border-slate-200 placeholder:text-sm py-2 lg:w-[528px]"
            placeholder={`${product.availableUnits}`}
            step="1" // Restricts input to integers in browsers that support this attribute
          />
        </div>
        {/* Trade Amount */}
        <div className="flex flex-col gap-1">
          <label className="text-color-form text-sm">Amount</label>
          <div className="relative border-b border-slate-200 lg:w-[528px]">
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              required
              className="rounded-sm placeholder:text-sm py-2"
              placeholder={`$${product.costPerUnit}`}
            />
            <div className="absolute top-3 right-3">
              <p className="text-color-six text-sm">
                ${product.costPerUnit}/unit
              </p>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex flex-col gap-1 border-b lg:w-[528px]">
          <label className="text-color-form text-sm">
            Select your preferred payment method
          </label>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:flex">
            <BankComponent
              style={
                selectedType === "wallet"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<IoWallet className="text-color-one" />}
              bankName="Pay via Wallet"
              textStyle={
                selectedType === "wallet"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "wallet"}
                  onClick={() => handlePaymentSelection("wallet")}
                />
              }
              onClick={() => handlePaymentSelection("wallet")}
            />
            <BankComponent
              style={
                selectedType === "bank"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<BiSolidBank className="text-color-one" />}
              bankName="Pay Via Bank Transfer"
              textStyle={
                selectedType === "bank"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "bank"}
                  onClick={() => handlePaymentSelection("bank")}
                />
              }
              onClick={() => handlePaymentSelection("bank")}
            />

            <BankComponent
              style={
                selectedType === "crypto"
                  ? "bg-color-two hover:bg-color-two"
                  : "h-[110px]"
              }
              bankImage={<FaBitcoin className="text-color-one" />}
              bankName="Pay via Crypto Wallet"
              textStyle={
                selectedType === "crypto"
                  ? "text-green-700"
                  : "text-sm font-medium whitespace-wrap"
              }
              icon={
                <CircleToggle
                  isClicked={selectedType === "crypto"}
                  onClick={() => handlePaymentSelection("crypto")}
                />
              }
              onClick={() => handlePaymentSelection("crypto")}
            />
          </div>
        </div>
        {/* Error message */}
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
        {/* Submit Button */}
        <Button
          ButtonText="Proceed"
          type="submit"
          className="bg-color-one text-white py-2 px-4 rounded lg:w-[522px]"
        />
      </form>

      {/* Conditionally render modals based on currentModal */}
      {currentModal === "investPreview" && (
        <InvestPreview
          onClose={() => setCurrentModal(null)}
          onProceed={() => {
            if (selectedType === "bank") {
              setCurrentModal("bankTransfer");
            } else if (selectedType === "crypto") {
              setCurrentModal("cryptoTransfer");
            } else {
              handleMakePurchase();
            }
          }}
          noOfUnits={noOfUnits}
          amount={amount}
          product={product}
        />
      )}
      {currentModal === "bankTransfer" && bankDetails && (
        <BankTransfer
          onClose={() => {
            setCurrentModal(null); // Reset the current modal
          }}
          bankDetails={bankDetails}
          error={apiError}
          isLoading={isLoading}
          successMessage={successMessage}
          onProceed={handlePurchaseViaBank} // Move to the Receipt modal
          productId={product.id}
          noOfUnits={noOfUnits}
          amount={amount}
        />
      )}

      {currentModal === "cryptoTransfer" && (
        <CryptoTransfer
          error={apiError}
          isLoading = {isLoading}
          onClose={() => setCurrentModal(null)}
          walletDetails={walletDetails}
          onProceed={handlePurchaseViaBank}
          amount={amount}
        />
      )}
      {currentModal === "receipt" && (
        <ReceiptModal
          investmentId={investmentId} // Pass the ID here
          onProceed={() => setCurrentModal("processed")}
          onBack={() => {
            if (selectedType === "bank") {
              setCurrentModal("bankTransfer");
            } else if (selectedType === "crypto") {
              setCurrentModal("cryptoTransfer");
            } else {
              setCurrentModal(null);
            }
          }}
        />
      )}
      {currentModal === "processed" && (
        <Processed
          onClose={() => setCurrentModal(null)}
          onConfirm={() => setCurrentModal("transactionDetails")}
          message="Your investment has been created successfully!"
        />
      )}
      {currentModal === "transactionDetails" && (
        <PurchaseViaBankDetails
          transactionData={transactionData}
          onClose={() => setCurrentModal(null)}
        />
      )}
    </div>
  );
}
