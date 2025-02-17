import { useEffect, useState } from "react";
import { RiStockFill } from "react-icons/ri";
import Button from "../ui/Button";
import Icon from "../ui/Icon";

interface TradeModalProps {
  onClose: () => void;
  openPreview: () => void;
  stockName: string | undefined;
  ticker: string | undefined;
  amountPerUnit: number | undefined;
  tradeDetails: {
    amountToTrade: string;
    unitsToTrade: string;
    email: string;
    phoneNumber: string;
  };
  setTradeDetails: React.Dispatch<
    React.SetStateAction<{
      amountToTrade: string;
      unitsToTrade: string;
      email: string;
      phoneNumber: string;
    }>
  >;
  // initialTradeDetails: {
  //   amountToTrade: string;
  //   unitsToTrade: string;
  //   email: string;
  //   phoneNumber: string;
  // };
}


export default function TradeModal({
  onClose,
  openPreview,
  stockName,
  ticker,
  amountPerUnit,
  tradeDetails,
  setTradeDetails,
  // initialTradeDetails
}: TradeModalProps) {
  const [amountError, setAmountError] = useState(" ");
  const [unitsError, setUnitsError] = useState("");

 // Handle form input change
 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  setTradeDetails((prevDetails) => {
    if (name === "amountToTrade") {
      const numericValue = parseFloat(value);

      if (value === "") {
        setAmountError("");
        return { ...prevDetails, [name]: "" };
      }

      if (!isNaN(numericValue) && amountPerUnit !== undefined) {
        if (numericValue < amountPerUnit) {
          setAmountError(`Amount must be at least $${amountPerUnit.toFixed(2)}`);
        } else {
          setAmountError("");
        }
      }
    }

    if (name === "unitsToTrade") {
      const numericValue = parseInt(value, 10);

      if (value === "") {
        setUnitsError("");
        return { ...prevDetails, [name]: "" };
      }

      if (!isNaN(numericValue)) {
        if (numericValue < 1) {
          setUnitsError("Units must be at least 1");
        } else {
          setUnitsError("");
        }
      }
    }

    return { ...prevDetails, [name]: value };
  });
};

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountError || unitsError) return;

    // You can send the trade details to an API or do any other logic here
    console.log("Trade details:", tradeDetails);
    // setTradeDetails(initialTradeDetails);

    // Close the modal after submission
    openPreview();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="bg-white p-4 rounded-[20px] w-full max-w-[621px] h-[621px] ">
        {/* Trade form contents */}
        <div className="flex items-center border-b w-full pb-2">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Trade Stock
          </p>
        </div>
        <div className="flex items-center gap-4 my-4 border-b pb-4">
          <div className="flex-shrink-0">
            <Icon
              icon={<RiStockFill className="text-color-one" />}
              containerSize="w-[39px] h-[39px]"
            />
          </div>
          <div>
            <p className="text-color-zero font-semibold text-sm">{stockName}</p>
            <p className="text-color-form text-sm">{ticker}</p>
          </div>
        </div>
        <form className="flex flex-col mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">
              What amount do you want to trade?
            </label>
            <input
              type="text"
              name="amountToTrade"
              required
              className="rounded-sm border-b border-slate-200 py-2"
              placeholder={`$${amountPerUnit?.toFixed(2) || "0.00"}`}
              value={tradeDetails.amountToTrade}
              onChange={handleInputChange}
            />
            {amountError && (
              <p className="text-red-500 text-sm">{amountError}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Amount of Units</label>
            <input
              type="number"
              name="unitsToTrade"
              required
              className="rounded-sm border-b border-slate-200 py-2"
              placeholder="1"
              value={tradeDetails.unitsToTrade}
              onChange={handleInputChange}
            />
            {unitsError && <p className="text-red-500 text-sm">{unitsError}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">
              What&apos;s your email address?
            </label>
            <input
              type="email"
              name="email"
              required
              className="rounded-sm border-b border-slate-200 py-2"
              placeholder="cooperwinterwind@gmail.com"
              value={tradeDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              required
              className="rounded-sm border-b border-slate-200 py-2"
              placeholder="+1 (555) 492-1830"
              value={tradeDetails.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <Button ButtonText="Buy" type="submit" />
        </form>
      </div>
    </div>
  );
}
