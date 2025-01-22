import { useEffect, useState } from "react";
import Icon from "./Icon";

interface TimerProps {
    initialTime: number; // Time in seconds
    onTimeUp?: () => void; // Callback when time reaches 0
  }
export default function Timer ({initialTime, onTimeUp}:TimerProps) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              if (onTimeUp) onTimeUp();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer);
      }, [onTimeUp]);

      // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(remainingSeconds).padStart(2, "0"),
    };
  };

  const { minutes, seconds } = formatTime(timeLeft);

    return (
        <div className="flex justify-center items-center space-x-4">
        <Icon
          icon={
            <p className="text-sm font-medium text-color-six">
              {minutes[0]}
            </p>
          }
        />
        <Icon
          icon={
            <p className="text-sm font-medium text-color-six">
              {minutes[1]}
            </p>
          }
        />
        <Icon
          icon={<p className="text-sm font-medium text-color-six">:</p>}
        />
        <Icon
          icon={
            <p className="text-sm font-medium text-color-six">
              {seconds[0]}
            </p>
          }
        />
        <Icon
          icon={
            <p className="text-sm font-medium text-color-six">
              {seconds[1]}
            </p>
          }
        />
      </div>
    )
}