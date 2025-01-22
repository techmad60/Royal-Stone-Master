import { useEffect, useState } from "react";
import Icon from "./Icon";

interface DayTimerProps {
  durationInSeconds: number; // Explicitly define the prop type
}

export default function DayTimer({ durationInSeconds }: DayTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(durationInSeconds); // Explicitly type state as number

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0)); // 'prev' implicitly typed as number
    }, 1000);

    return () => clearInterval(timer); // Cleanup on component unmount
  }, [timeLeft]);

  // Convert seconds to days, hours, minutes, seconds
  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex justify-center items-center space-x-4 bg-[rgba(252,252,252,1)] h-16 rounded-[10px] drop-shadow-sm lg:w-[376.94px]">
      <div className="flex space-x-2 items-center">
        <Icon
          icon={<p className="text-sm font-medium text-color-six lg:text-[17px] lg:font-bold">{days}</p>}
          containerSize="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px]"
        />
        <p className="text-color-six text-sm tracking-tight lg:text-[15.3px]">Days</p>
      </div>
      <div className="flex space-x-2 items-center">
        <Icon
          icon={<p className="text-sm font-medium text-color-six lg:text-[17px] lg:font-bold">{hours}</p>}
          containerSize="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px]"
        />
        <p className="text-color-six text-sm tracking-tight lg:text-[15.3px]">Hrs</p>
      </div>
      <div className="flex space-x-2 items-center">
        <Icon
          icon={<p className="text-sm font-medium text-color-six lg:text-[17px] lg:font-bold">{minutes}</p>}
          containerSize="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px]"
        />
        <p className="text-color-six text-sm tracking-tight lg:text-[15.3px]">Mins</p>
      </div>
      <div className="flex space-x-2 items-center">
        <Icon
          icon={<p className="text-sm font-medium text-color-six lg:text-[17px] lg:font-bold">{seconds}</p>}
          containerSize="w-[32px] h-[32px] lg:w-[38px] lg:h-[38px]"
        />
        <p className="text-color-six text-sm tracking-tight lg:text-[15.3px]">Secs</p>
      </div>
    </div>
  );
}
