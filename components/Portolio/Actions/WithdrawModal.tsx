"use client";
import Icon from "@/components/ui/Icon";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import CircleToggle from "../../ui/CircleToggle";

interface MyComponentProps {
  onClose: () => void;
}

export default function WithdrawModal({ onClose }: MyComponentProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSelectWallet = (wallet: string, path: string) => {
    setSelectedWallet(wallet);

    // Delay redirection for 1 second
    setTimeout(() => {
      router.push(path);
    }, 500);
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[305px] lg:max-w-[500px] lg:h-[284px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Withdraw Funds From
          </p>
        </div>
        <div className="flex flex-col p-4 space-y-4">
        <button
            className={`flex items-center gap-2 p-4 rounded-[10px] text-sm duration-150 cursor-pointer hover:bg-color-two hover:text-color-one ${
              selectedWallet === "investment" ? "bg-color-two text-color-one" : ""
            }`}
            onClick={() => handleSelectWallet("investment", "/main/investments/withdraw-funds")}
          >
            <CircleToggle isClicked={selectedWallet === "investment"} />
            <p>Investment</p>
            <Icon icon={<BsFileBarGraphFill className="text-color-one" />} />
          </button>

          <button
            className={`flex items-center gap-2 p-4 rounded-[10px] text-sm duration-150 cursor-pointer hover:bg-color-two hover:text-color-one ${
              selectedWallet === "savings" ? "bg-color-two text-color-one" : ""
            }`}
            onClick={() => handleSelectWallet("savings", "/main/savings/withdraw-funds")}
          >
            <CircleToggle isClicked={selectedWallet === "savings"} />
            <p>Savings</p>
            <Icon icon={<TbTargetArrow className="text-color-one" />} />
          </button>
        </div>
      </div>
    </div>
  );
}
