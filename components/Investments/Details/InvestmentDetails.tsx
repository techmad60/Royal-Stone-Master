"use client";
import InvestPreview from "@/components/Investments/Preview/InvestmentPreview";
import InvestmentProcessed from "@/components/Investments/Processed/InvestmentProcessed";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import { makeInvestment } from "@/Services/apiService";
import useInvestmentStore from "@/store/investmentStore";
import usePaymentMethodStore from "@/store/paymentMethodStore";
import useProductStore from "@/store/productStore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import Loading from "../../ui/Loading";
import BankTransfer from "../Payment-Method/BankTransfer";
import CryptoTransfer from "../Payment-Method/CryptoTransfer";
import WalletTransfer from "../Payment-Method/WalletTransfer";
import ReceiptModal from "../Receipt/PaymentReceipt";

export default function InvestmentDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [currentModal, setCurrentModal] = useState<
    | "investPreview"
    | "bankTransfer"
    | "walletTransfer"
    | "cryptoTransfer"
    | "receipt"
    | "investmentProcessed"
    | null
  >(null);
  const [noOfUnits, setNoOfUnits] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const { products, fetchProducts, error } = useProductStore();
  const { selectedType, setSelectedType } = usePaymentMethodStore();
  const [transactionID, setTransactionID] = useState<string | null>(null);
  const investmentId = useInvestmentStore((state) => state.investmentId);
  // const [isBankTransferOpen, setIsBankTransferOpen] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [products, fetchProducts]);

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

  const openInvestPreview = () => {
    const { isValid, error } = validateInputs();
    if (!isValid) {
      setFormError(error);
      return;
    }
    setFormError("");
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

  // Make Investment Click
  const handleMakeInvestmentClick = () => {
    const { isValid, error } = validateInputs();
    if (!isValid) {
      setFormError(error);
      return;
    }

    if (selectedType === "bank") {
      setCurrentModal("bankTransfer");
    } else if (selectedType === "crypto") {
      setCurrentModal("cryptoTransfer");
    } else {
      setCurrentModal("walletTransfer");
    }
  };

  const handleMakeInvestment = async () => {
    try {
      const response = await makeInvestment(product.id, Number(noOfUnits));
      setTransactionID(response.data.id); // Save transaction ID from API response
      // setCurrentModal("receipt"); // Open receipt modal
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message || "Something went wrong.");
      } else {
        setFormError("Something went wrong.");
      }
    }
  };

  const handlePaymentSelection = (method: "bank" | "crypto" | "wallet") => {
    setSelectedType(method);
    setFormError("");
  };

  console.log(transactionID)
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
          openInvestPreview(); // Call your preview function
        }}
      >
        {/* Amount of Units */}
        <div className="flex flex-col gap-1 ">
          <label className="text-color-form text-sm">No of Units</label>
          <input
            value={noOfUnits}
            onChange={handleNoOfUnitsChange}
            type="number"
            required
            className="rounded-sm border-b border-slate-200 placeholder:text-sm py-2 lg:w-[528px]"
            placeholder={`${product.availableUnits}`}
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
          onClick={handleMakeInvestmentClick}
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
            } else if (selectedType === "wallet") {
              setCurrentModal("walletTransfer");
            } else if (selectedType === "crypto") {
              setCurrentModal("cryptoTransfer");
            }
          }}
          noOfUnits={noOfUnits}
          amount={amount}
          product={product}
        />
      )}
      {currentModal === "bankTransfer" && (
        <BankTransfer
          onClose={() => {
            setCurrentModal(null); // Reset the current modal
          }}
          onProceed={() => setCurrentModal("receipt")} // Move to the Receipt modal
          productId={product.id}
          noOfUnits={noOfUnits}
          amount={amount}
        />
      )}

      {currentModal === "cryptoTransfer" && (
        <CryptoTransfer
          onClose={() => setCurrentModal(null)}
          onProceed={handleMakeInvestment}
          amount={amount}
        />
      )}
      {currentModal === "walletTransfer" && (
        <WalletTransfer
          onClose={() => setCurrentModal(null)}
          onProceed={handleMakeInvestment}
          amount={amount}
        />
      )}
      {currentModal === "receipt" && (
        <ReceiptModal
          investmentId={investmentId} // Pass the ID here
          onClose={() => {
            if (selectedType === "bank") {
              setCurrentModal("bankTransfer");
            }
            else if (selectedType === "crypto") {
              setCurrentModal("cryptoTransfer")
            }
            else {
              setCurrentModal(null)
            }
          }}
        />
      )}
      {currentModal === "investmentProcessed" && (
        <InvestmentProcessed
          onClose={() => setCurrentModal(null)}
          onConfirm={() => setCurrentModal(null)}
        />
      )}
    </div>
  );
}
