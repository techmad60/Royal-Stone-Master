"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CircleToggle from "../../ui/CircleToggle";

interface MyComponentProps {
  onClose: () => void;
}

export default function WithdrawModal({ onClose }: MyComponentProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleSelectWallet = (wallet: string) => {
    setSelectedWallet(wallet);
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
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
          <Link
            className={`flex items-center gap-2 p-4 rounded-[10px] text-sm duration-150 cursor-pointer hover:bg-color-two hover:text-color-one  ${
              selectedWallet === "investment"
            }`}
            onClick={() => handleSelectWallet("investment")}
            href="/main/investments/withdraw-funds"
          >
            <CircleToggle isClicked={selectedWallet === "investment"} />
            <p>Investment Wallet</p>
          </Link>

          <Link
            className={`flex items-center gap-2 p-4 rounded-[10px] text-sm duration-150 cursor-pointer hover:bg-color-two hover:text-color-one ${
              selectedWallet === "savings"
            }`}
            onClick={() => handleSelectWallet("savings")}
            href="/main/savings/withdraw-funds"
          >
            <CircleToggle isClicked={selectedWallet === "savings"} />
            <p>Savings Wallet</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
