"use client";
import SavingsPreview from "@/components/Savings/SavingsPreview";
import SavingsProcessed from "@/components/Savings/SavingsProcessed";
import SavingsTarget from "@/components/Savings/SavingsTarget";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/Checkedbox";
import CircleToggle from "@/components/ui/CircleToggle";
import Navigator from "@/components/ui/Navigator";
import EmptyBox from "@/components/ui/UncheckedBox";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSolidBank } from "react-icons/bi";
import { BsFillWalletFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoWallet } from "react-icons/io5";

const createSavings = [
  { label: "Fixed Savings", href: "/main/savings" },
  { label: "Create Savings Target", href: "/main/savings/create-savings" },
];
export default function CreateSavingsPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savingsPreviewOpen, setIsSavingsPreviewOpen] = useState(false);
  const [savingsTargetOpen, setIsSavingsTargetOpen] = useState(false);
  const [savingsProcessedOpen, setIsSavingsProcessedOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const openSavingsPreview = () => {
    setIsSavingsPreviewOpen(true);
  };

  const handleSavingsTargetOpen = () => {
    setIsSavingsPreviewOpen(false);
    setIsSavingsTargetOpen(true);
  };

  const handleSavingsProcessedOpen = () => {
    setIsSavingsTargetOpen(false);
    setIsSavingsProcessedOpen(true);
  };

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <Navigator currentStep={1} steps={createSavings} />

      <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">
        Create Savings Target
      </p>
      <hr />
      <form className="flex flex-col mt-2 lg:flex-row lg:gap-12">
        <div className="space-y-4 lg:space-y-4 lg:mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Plan</label>
            <div className="relative border-b border-slate-200 text-sm text-color-zero lg:w-[528px]">
              <input
                type="text"
                maxLength={30}
                required
                className="rounded-sm placeholder:text-sm py-2"
                placeholder="Buy a new laptop"
              />
            </div>
          </div>
          {/* Amount of Units */}
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Target Amount</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 text-sm text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
              placeholder="$200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Duration</label>
            <div className="relative border-b border-slate-200 lg:w-[528px]">
              <select
                className="rounded-sm text-sm placeholder:text-sm py-2 w-full appearance-none bg-transparent"
                required
              >
                <option value="">Select Duration</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              <div className="absolute top-3 right-3 pointer-events-none">
                <IoIosArrowDown />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-4 lg:mt-4">
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Amount</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 text-sm text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
              placeholder="$20"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm text-color-zero">
            <label className="text-color-form text-sm">Starting Pay Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={new Date()}
              placeholderText="Click to Set Date"
              className="rounded-sm border-b border-slate-200 cursor-pointer placeholder:text-sm py-2 lg:w-[528px]"
            />
          </div>
          <div className="flex flex-col gap-1 text-sm text-color-zero">
            <label className="text-color-form text-sm">Payout Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={new Date()}
              placeholderText="Click to Set Payout Date"
              className="rounded-sm border-b border-slate-200 cursor-pointer placeholder:text-sm py-2 lg:w-[528px]"
            />
          </div>
        </div>
      </form>
      {/* Payment Method */}
      <div className="flex flex-col gap-1 border-b mt-4 lg:w-[528px] lg:mt-8">
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
