import { ReactNode } from "react";

interface Buttonprops {
  className?: string;
  ButtonText?: string;
  ResponsiveText?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  form?: string;
}
export default function Button({ ButtonText, className, ResponsiveText, disabled, type, onClick, form}: Buttonprops) {
    return (
      <button
      type={type}
      onClick={onClick}
      form={form}

        className={`flex font-medium bg-color-one justify-center py-3 text-sm duration-300 text-center hover:bg-green-700 shadow-md px-3 rounded-md text-white ${className}`}
        disabled={disabled}
      >
        {ButtonText}
        {ResponsiveText}
        
      </button>
    );
  }
  