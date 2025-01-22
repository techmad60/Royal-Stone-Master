"use client";
import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Icon from "../ui/Icon";
import { TbTargetArrow } from "react-icons/tb";

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
}

export default function SavingsPreview({
  onClose,
  onProceed,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[562px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Preview
          </p>
        </div>

        <p className="text-color-form text-sm m-6 border-b pb-4">
          Confirm these details of your transaction
        </p>
        <div className="flex items-center gap-4 my-1 pb-4 mx-6">
          <Icon
            icon={<TbTargetArrow className="text-color-one text-2xl" />}
            containerSize="w-[41px] h-[41px]"
          />
          <div>
            <p className="text-color-zero font-semibold text-sm lg:text-base lg:font-medium">
              Savings Target
            </p>
            <p className="text-color-six text-sm">Via Bank Transfer</p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[215px] lg:p-5 lg:w-[572px] lg:h-[248px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Savings Plan</p>
              <p className="text-color-six">Annual Rent Savings</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Current Payment</p>
              <p className="text-color-six">$20</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Starting Pay Date</p>
              <p className="text-color-six">21/9/2024</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Target Amount</p>
              <p className="text-color-six">$200</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Savings Duration</p>
              <p className="text-color-six">Weekly</p>
            </div>
          </div>
        </section>
        <div onClick={onProceed} className="mt-8 mx-6">
          <Button ButtonText="Proceed" className="bg-color-one w-full" />
        </div>
      </div>
    </div>
  );
}
