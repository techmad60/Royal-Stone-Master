"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import CheckBox from "../ui/Checkedbox";
import EmptyBox from "../ui/UncheckedBox";

interface MyComponentProps {
  onClose: () => void; // Explicitly defining onClose as a function with no parameters and no return type
}

// Define types for status keys and transaction type keys
type Status = "All" | "Successful" | "Pending" | "Failed";
type Type = "All" | "Withdrawal" | "Funding" | "Investments" | "Savings" | "Stocks";

export default function FilterModal({ onClose }: MyComponentProps) {
  // Disable background scroll when modal opens and re-enable it when it closes
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isTransactionTypeExpanded, setIsTransactionTypeExpanded] = useState(true);
  const [isTransactionDateExpanded, setIsTransactionDateExpanded] = useState(true);

  const [checkedStatuses, setCheckedStatuses] = useState<Record<Status, boolean>>({
    All: false,
    Successful: false,
    Pending: false,
    Failed: false,
  });

  const [checkedTransactionTypes, setCheckedTransactionTypes] = useState<Record<Type, boolean>>({
    All: false,
    Withdrawal: false,
    Funding: false,
    Investments: false,
    Savings: false,
    Stocks: false,
  });

  const toggleStatusExpand = () => {
    setIsStatusExpanded(!isStatusExpanded);
  };

  const toggleTransactionTypeExpand = () => {
    setIsTransactionTypeExpanded(!isTransactionTypeExpanded);
  };
  const toggleTransactionDateExpand = () => {
    setIsTransactionDateExpanded(!isTransactionDateExpanded);
  };

  const toggleStatusCheckbox = (status: Status) => {
    setCheckedStatuses((prevStatuses) => ({
      ...prevStatuses,
      [status]: !prevStatuses[status],
    }));
  };

  const toggleTransactionTypeCheckbox = (type: Type) => {
    setCheckedTransactionTypes((prevTypes) => ({
      ...prevTypes,
      [type]: !prevTypes[type],
    }));
  };

  return (
    <div className="fixed inset-0 bg-[#D9D9D9A6] flex place-items-end z-50 lg:place-items-center">
      <div className="flex flex-col justify-center bg-white w-full rounded-t-[15px] p-4 lg:w-[610px] lg:h-[529px] lg:mx-auto lg:rounded-common lg:justify-start lg:p-6">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4 lg:p-0">
          <p onClick={onClose} className="text-color-form text-sm">
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">Filter</p>
        </div>
        
        <div className="lg:grid grid-cols-2 gap-8">
            {/* Status Section */}
            <section>
            <div className="flex justify-between py-4 cursor-pointer">
                <p className="text-sm font-medium">Status</p>
                <div onClick={toggleStatusExpand} className="lg:hidden">
                    {isStatusExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                
            </div>
            <hr />
            {isStatusExpanded && (
                <div>
                {(["All", "Successful", "Pending", "Failed"] as Status[]).map((status) => (
                    <div key={status} className="flex justify-between items-center py-2">
                    <p className="text-color-form text-sm">{status}</p>
                    <div onClick={() => toggleStatusCheckbox(status)} className="cursor-pointer">
                        {checkedStatuses[status] ? <CheckBox /> : <EmptyBox />}
                    </div>
                    </div>
                ))}
                </div>
            )}
            </section>

            {/* Transaction Type Section */}
            <section>
            <div className="flex justify-between py-4 cursor-pointer">
                <p className="text-sm font-medium">Transaction Type</p>
                <div onClick={toggleTransactionTypeExpand} className="lg:hidden">
                    {isTransactionTypeExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
                
            </div>
            <hr />
            {isTransactionTypeExpanded && (
                <div>
                {(["All", "Withdrawal", "Funding", "Investments", "Savings", "Stocks"] as Type[]).map((type) => (
                    <div key={type} className="flex justify-between items-center py-2">
                    <p className="text-color-form text-sm">{type}</p>
                    <div onClick={() => toggleTransactionTypeCheckbox(type)} className="cursor-pointer">
                        {checkedTransactionTypes[type] ? <CheckBox /> : <EmptyBox />}
                    </div>
                    </div>
                ))}
                </div>
            )}
            </section>
        </div>
       

        {/* Transaction Date Section */}
        <section>
          <div className="flex justify-between py-4 cursor-pointer lg:py-2" >
            <p className="text-sm font-medium">Transaction Date</p>
            <div onClick={toggleTransactionDateExpand} className="lg:hidden">
                {isTransactionTypeExpanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
           
          </div>
          <hr />
          {isTransactionDateExpanded && (
            <div className="py-4 border-b lg:py-2">
                <p className="text-sm text-color-form py-4 lg:py-2">Date Range</p>
                <div className="flex items-center gap-2">
                    <IoCalendar className="text-color-zero"/>
                    <p className="text-sm font-medium text-color-zero">1/1/2024 - 31/12/2024</p>
                </div>
            </div>
          )}
        </section>

        <div className="mt-8 lg:mt-4">
          {/* Accept button to apply filter */}
          <div onClick={onClose}>
            <Button ButtonText="Accept" className="bg-color-one w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
