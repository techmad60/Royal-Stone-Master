import { TbTargetArrow } from "react-icons/tb";
import Icon from "../ui/Icon";
import Link from "next/link";
interface ProgressCardProps {
    title: string;
    currentAmount: number;
    goalAmount: number;
    status: string;
  }
  
  export default function ProgressCard({
    title,
    currentAmount,
    goalAmount,
    status,
  }: ProgressCardProps) {
    // Calculate percentage
    const percentage = Math.round((currentAmount / goalAmount) * 100);
    const statusTextColor =
    status.toLowerCase() === "completed" ? "text-color-six" : "text-color-one";

    return (
      <Link href ="/main/savings/annual-savings" className="relative bg-light-grey shadow-sm rounded-common  mt-6 p-4 flex items-center gap-4 h-[86px]">
        {/* Icon */}
        <div className="absolute -top-[10px] ">
          <Icon icon={<TbTargetArrow className="text-color-one"/>}/>
        </div>
  
        {/* Content */}
        <div className="flex-1 pl-[2.2rem]">
          {/* Title and Status */}
          <div className="flex justify-between items-center">
            <h3 className="text-sm text-[rgba(15,28,57,0.7)]">{title}</h3>
            <span className={`text-[10px] ${statusTextColor}`}>
            {status}
          </span>
          </div>
  
          {/* Progress Bar */}
          <div className="bg-white shadow-sm h-[15px] rounded-[20px] relative my-2">
            <div className="bg-color-two h-[5px] rounded-[30px] my-auto absolute inset-0 mx-1">
                <div
                className="bg-color-one h-[5px] rounded-[30px]"
                style={{ width: `${percentage}%` }}
                ></div>
            </div>
          </div>
          
  
          {/* Amount and Percentage */}
          <div className="flex justify-between text-sm">
            <span className="text-xs text-color-one">${currentAmount}/${goalAmount}</span>
            <span className="text-xs text-color-zero">{percentage}%</span>
          </div>
        </div>
      </Link>
    );
  }
  