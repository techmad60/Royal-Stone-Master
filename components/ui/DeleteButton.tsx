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
export default function DeleteButton({ ButtonText, className, ResponsiveText, disabled, type, onClick, form}: Buttonprops) {
    return (
      <button
      type={type}
      onClick={onClick}
      form={form}

        className={`flex font-medium bg-red-600 justify-center py-3 text-sm duration-300 text-center hover:bg-red-500 shadow-md px-3 rounded-md text-white ${className}`}
        disabled={disabled}
      >
        {ButtonText}
        {ResponsiveText}
        
      </button>
    );
  }
  