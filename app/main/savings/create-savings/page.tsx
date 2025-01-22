"use client";
import { useState } from "react";
import CircleToggle from "@/components/ui/CircleToggle";
import { IoIosArrowDown } from "react-icons/io";
import Button from "@/components/ui/Button";
import BankComponent from "@/components/ui/BankComponent";
import Navigator from "@/components/ui/Navigator";
import SavingsPreview from "@/components/Savings/SavingsPreview";
import SavingsTarget from "@/components/Savings/SavingsTarget";
import SavingsProcessed from "@/components/Savings/SavingsProcessed";
import { BsFillWalletFill } from "react-icons/bs";
import { BiSolidBank } from "react-icons/bi";
import { IoWallet } from "react-icons/io5";
import EmptyBox from "@/components/ui/UncheckedBox";
import CheckBox from "@/components/ui/Checkedbox";

// For Profile Settings
const createSavings = [
  { label: "Fixed Savings", href: "/main/savings" },
  { label: "Create Savings Target", href: "/main/savings/create-savings" },
];
export default function CreateSavingsPage() {
  const [savingsPreviewOpen, setIsSavingsPreviewOpen] = useState(false);
  const [savingsTargetOpen, setIsSavingsTargetOpen] = useState(false);
  const [savingsProcessedOpen, setIsSavingsProcessedOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openSavingsPreview = () => {
    setIsSavingsPreviewOpen(true);
  };

  const handleSavingsTargetOpen = () => {
    setIsSavingsPreviewOpen(false)
    setIsSavingsTargetOpen(true)
  }

  const handleSavingsProcessedOpen = () => {
    setIsSavingsTargetOpen(false)
    setIsSavingsProcessedOpen(true)
  }

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  // Function to open TransactionDetails and close TransactionProcessed
//   const handleViewDetailsClick = () => {
//     setIsTransactionProcessedOpen(false);
//     setIsTransactionDetailsOpen(true);
//   };
  return (
    <div>
      <Navigator currentStep={1} steps={createSavings} />

      <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">
        Create Savings Target
      </p>
      <form className="flex flex-col mt-2 lg:flex-row lg:gap-12">
        <div className="space-y-4 lg:space-y-0">
          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Plan</label>
            <div className="relative border-b border-slate-200 lg:w-[528px]">
              <input
                type="text"
                required
                className="rounded-sm  placeholder:text-color-zero placeholder:text-sm py-2"
                placeholder="Annual Rent Savings"
              />
              <div className="absolute top-3 right-3 ">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
          {/* Amount of Units */}
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Target Amount</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
              placeholder="$200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Duration</label>
            <div className="relative border-b border-slate-200 lg:w-[528px]">
              <input
                type="text"
                required
                className="rounded-sm  placeholder:text-color-zero placeholder:text-sm py-2"
                placeholder="Weekly"
              />
              <div className="absolute top-3 right-3 ">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-0">
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Amount</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
              placeholder="$20"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Starting Pay Date</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
              placeholder="21/9/2024"
            />
          </div>
        </div>
      </form>
       {/* Payment Method */}
       <div className="flex flex-col gap-1 border-b mt-4 lg:w-[528px]">
          <label className="text-color-form text-sm">
            Select your preferred payment method
          </label>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:flex">
            <BankComponent
              style="h-[110px]"
              bankImage={<BiSolidBank className="text-color-one" />}
              bankName="Pay Via
                        Bank Transfer"
              textStyle="text-sm font-medium whitespace-wrap"
              icon={<CircleToggle />}
            />
            <BankComponent
              style="h-[110px]"
              bankImage={<IoWallet className="text-color-one" />}
              bankName="Pay via Wallet"
              textStyle="text-sm font-medium whitespace-wrap"
              icon={<CircleToggle />}
            />
            <BankComponent
              style="h-[110px]"
              bankImage={<BsFillWalletFill className="text-color-one" />}
              bankName="Pay via Card"
              textStyle="text-sm font-medium whitespace-wrap"
              icon={<CircleToggle />}
            />
          </div>
        </div>

        <div className="flex items-start gap-2 py-4">
          {/* Toggle between EmptyBox and CheckBox based on state */}
          <div onClick={toggleCheckbox} className="cursor-pointer">
            {isChecked ? <CheckBox /> : <EmptyBox />}
          </div>
          <p className="text-sm text-color-form ">
            I confirm that the details provided are accurate
          </p>
        </div>
        <div onClick={openSavingsPreview}>
          <Button
            ButtonText="Proceed"
            className="py-3 mt-4 w-full lg:w-[528px]"
          />
        </div>
        {savingsPreviewOpen && (
        <SavingsPreview
          onClose={() => setIsSavingsPreviewOpen(false)}
          onProceed={handleSavingsTargetOpen}
        />
      )}
      {savingsTargetOpen && (
        <SavingsTarget
          onClose={() => setIsSavingsTargetOpen(false)}
          onProceed={handleSavingsProcessedOpen}
        />
      )}
      {savingsProcessedOpen && (
        <SavingsProcessed
          onClose={() => setIsSavingsProcessedOpen(false)}
          onConfirm={() => setIsSavingsProcessedOpen(false)}
        />
      )}
    </div>
  );
}
