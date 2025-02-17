"use client";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/Checkedbox";
import Loading from "@/components/ui/Loading";
import Navigator from "@/components/ui/Navigator";
import Processed from "@/components/ui/Processed";
import EmptyBox from "@/components/ui/UncheckedBox";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoIosArrowDown } from "react-icons/io";

const createSavings = [
  { label: "Fixed Savings", href: "/main/savings" },
  { label: "Create Savings Target", href: "/main/savings/create-savings" },
];

interface InterestRate {
  minimumOfDays: number;
  maximumOfDays: number;
  interest: number;
  id: string;
}
export default function CreateSavingsPage() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  // const [savingsPreviewOpen, setIsSavingsPreviewOpen] = useState(false);
  // const [savingsTargetOpen, setIsSavingsTargetOpen] = useState(false);
  const [savingsProcessedOpen, setIsSavingsProcessedOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [interestRates, setInterestRates] = useState<InterestRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    savingsPlan: "",
    targetAmount: "",
    savingsFrequency: "",
    amount: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    // If it's a select element, don't modify the value (keep it as is)
    const formattedValue = name === 'savingsFrequency' ? value : value.charAt(0).toUpperCase() + value.slice(1);
  
    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission

    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setFormError("Authentication error: Please log in again.");
      return;
    }

    // Prepare payload
    const payload = {
      name: formData.savingsPlan,
      target: Number(formData.targetAmount),
      recurringAmount: Number(formData.amount),
      startDate: startDate?.toISOString().split("T")[0], // Format as YYYY-MM-DD
      maturityDate: endDate?.toISOString().split("T")[0], // Format as YYYY-MM-DD
      frequency: formData.savingsFrequency,
    };

    try {
      setLoading(true);
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/savings/targets",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to create savings target."
        );
      }

      // If successful, open the SavingsProcessed modal
      setIsSavingsProcessedOpen(true);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);

    // Ensure start date is not later than the end date
    if (date && endDate && date > endDate) {
      setEndDate(null); // Reset end date if it's before the start date
      setDateError("Start date cannot be later than the payout date.");
    } else {
      setDateError(null);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date && startDate && date < startDate) {
      setDateError("Payout date cannot be earlier than the start date.");
    } else {
      setDateError(null);
      setEndDate(date);
    }
  };

  useEffect(() => {
    const fetchInterestRates = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token is missing.");

        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/savings-interest",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch savings interest rates.");
        }

        const result = await response.json();
        if (result.status) {
          setInterestRates(result.data);
        } else {
          throw new Error(result.message || "Unknown error");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchInterestRates();
  }, []);

  // const openSavingsPreview = () => {
  //   if (validateForm()) {
  //     setIsSavingsPreviewOpen(true);
  //   }
  // };

  // const handleSavingsTargetOpen = () => {
  //   setIsSavingsPreviewOpen(false);
  //   setIsSavingsTargetOpen(true);
  // };

  // const handleSavingsProcessedOpen = () => {
  //   setIsSavingsTargetOpen(false);
  //   setIsSavingsProcessedOpen(true);
  // };

  // Toggle the checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Navigator currentStep={1} steps={createSavings} />

      <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">
        Create Savings Target
      </p>
      <hr />
      {error && <p className="text-sm text-red-500">{error}</p>}
      {!loading && (
        <p className="mt-4 text-color-zero text-sm">
          Interests Rate on duration of Savings
        </p>
      )}
      {/* Interest Rate Sections */}
      <div className="flex gap-4 overflow-scroll hide-scrollbar mb-4">
        {!loading &&
          !error &&
          interestRates.map((rate) => (
            <section
              key={rate.id}
              className="flex flex-col flex-shrink-0 bg-light-grey rounded-[10px] border-2 border-slate-100 p-4 mt-2 gap-4 w-[200px]"
            >
              <p className="text-color-form text-sm">
                {rate.minimumOfDays}-{rate.maximumOfDays} days
              </p>
              <p className="text-color-six text-sm">
                {rate.interest}% Interest Rate
              </p>
            </section>
          ))}
      </div>
      <form
        id="savings-form"
        className="flex flex-col mt-2 lg:flex-row lg:gap-12"
        onSubmit={handleSubmit}
      >
        <div className="space-y-4 lg:space-y-4 lg:mt-4">
          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Plan</label>
            <div className="relative border-b border-slate-200 text-sm text-color-zero lg:w-[350px] xl:w-[528px]">
              <input
                name="savingsPlan"
                type="text"
                maxLength={30}
                required
                className="rounded-sm placeholder:text-sm py-2"
                placeholder="Buy a new laptop"
                value={formData.savingsPlan}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Amount of Units */}
          <div className="flex flex-col gap-1 ">
            <label className="text-color-form text-sm">Target Amount</label>
            <input
              name="targetAmount"
              type="number"
              required
              className="rounded-sm border-b border-slate-200 text-sm text-color-zero placeholder:text-sm py-2 lg:w-[350px] xl:w-[528px]"
              placeholder="$200"
              value={formData.targetAmount}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-color-form text-sm">Savings Frequency</label>
            <div className="relative border-b border-slate-200 lg:w-[350px] xl:w-[528px]">
              <select
                className="rounded-sm text-sm placeholder:text-sm py-2 w-full appearance-none bg-transparent"
                required
                name="savingsFrequency"
                value={formData.savingsFrequency}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Frequency
                </option>
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
            <label className="text-color-form text-sm py-2 lg:py-0">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              required
              className="rounded-sm border-b border-slate-200 text-sm text-color-zero placeholder:text-sm py-2 lg:w-[350px] xl:w-[528px]"
              placeholder="$20"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-1 text-sm text-color-zero">
            <label className="text-color-form text-sm">Starting Pay Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              placeholderText="Click to Set Date"
              className="rounded-sm border-b border-slate-200 cursor-pointer placeholder:text-sm py-2 w-full lg:w-[350px] xl:w-[528px]"
              required
            />
          </div>
          <div className="flex flex-col gap-1 text-sm text-color-zero">
            <label className="text-color-form text-sm">Payout Date</label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate || new Date()}
              placeholderText="Click to Set Payout Date"
              className="rounded-sm border-b border-slate-200 cursor-pointer placeholder:text-sm py-2 w-full lg:w-[350px] xl:w-[528px]"
              required
            />
          </div>
          {dateError && <p className="text-red-500 text-sm">{dateError}</p>}
        </div>
        {formError && <p className="text-red-500 text-sm">{formError}</p>}
      </form>

      <div className="flex items-start gap-2 py-4">
        {/* Toggle between EmptyBox and CheckBox based on state */}
        <div onClick={toggleCheckbox} className="cursor-pointer">
          {isChecked ? <CheckBox /> : <EmptyBox />}
        </div>
        <p className="text-sm text-color-form ">
          I confirm that the details provided are accurate
        </p>
      </div>
      <div>
        <Button
          ButtonText="Proceed"
          type="submit"
          className={`py-3 mt-4 w-full lg:w-[350px] xl:w-[528px] cursor-pointer ${
            isChecked
              ? "bg-color-one"
              : "bg-inactive hover:bg-inactive cursor-not-allowed"
          }`}
          form="savings-form"
          disabled={!isChecked}
        />
      </div>
      {/* {savingsPreviewOpen && (
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
      )} */}
      {savingsProcessedOpen && (
        <Processed
          onClose={() => setIsSavingsProcessedOpen(false)}
          message={`Your ${formData.savingsPlan} Target has been funded successfully.`}
          showButton={false}
        />
      )}
    </div>
  );
}
