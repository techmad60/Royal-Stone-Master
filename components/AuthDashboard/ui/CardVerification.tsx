import { MdArrowForwardIos } from "react-icons/md";
import ToggleSwitch from "../../ui/ToogleSwitch";
import Icon from "../../ui/Icon";
import { ReactNode } from "react";

interface CardFiveProps {
  iconImg?: ReactNode;
  label: string;
  status: string;
  statusClass?: string; // New prop for dynamic styling
  showArrow: string;
  showSwitch?: string;
  style?: string;
  onClick?: () => void;
}

export default function CardVerification({
  iconImg,
  label,
  status,
  statusClass,
  showArrow,
  showSwitch,
  style,
  onClick,
}: CardFiveProps) {
  return (
    <section
      className={`flex justify-between items-center bg-light-grey duration-300 cursor-pointer rounded-common p-4 xl:w-[765px] ${style}`}
      onClick={onClick}
    >
      <div className="flex gap-4">
        <div className="flex justify-center items-center">
          <Icon icon={iconImg} containerSize="w-[39.6px] h-[39.6px]"/>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium text-color-zero lg:text-base">
            {label}
          </p>
          {/* Apply the dynamic class to the status text */}
          <p className={`text-sm text-color-form ${statusClass}`}>{status}</p>
        </div>
      </div>
      <div className="flex items-center">
        <MdArrowForwardIos className={`text-color-zero flex-shrink-0 ${showArrow}`} />
        <ToggleSwitch showSwitch={`${showSwitch}`} />
      </div>
    </section>
  );
}
