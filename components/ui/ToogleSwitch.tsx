"use client"
import { useState } from "react";

export default function ToggleSwitch({showSwitch = ""}) {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div
      className={`w-[32.4px] h-[20px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${showSwitch} ${
        isOn ? "bg-color-one" : "bg-gray-300"
      }`}
      onClick={toggleSwitch}
    >
      <div
        className={`bg-white w-[14.4px] h-[14.4px] rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? "translate-x-3" : "translate-x-0"
        }`}
      />
    </div>
  );
}
