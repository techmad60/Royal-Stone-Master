"use client";
import { FaCircleCheck } from "react-icons/fa6";

export default function CircleToggle({ isClicked, onClick }: { isClicked?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center w-[18px] h-[18px] rounded-full cursor-pointer
                  ${
                    isClicked ? "border-color-one" : "border-slate-500"
                  } border`}
    >
      {isClicked && <FaCircleCheck size={12} className="text-color-one" />}
    </div>
  );
}
