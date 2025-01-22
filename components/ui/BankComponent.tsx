import { ReactNode } from "react";
import Icon from "./Icon";

interface BankProps {
  id?: string;
  bankName?: string;
  bankImage?: ReactNode; // Optional bank image
  style?: string; // Custom styles
  accNumber?: string | number; // Optional account number
  accName?: string; // Optional account name
  icon?: ReactNode; // Optional action icon
  flexStyling?: string; // Styling for the flex container
  textStyle?: string; // Styling for text
  onClick?: () => void; // Click handler
  onNavigateToDelete?: (id: string, type: string) => void; // Pass the ID and type for deletion
  showIcon?: boolean; // Flag to control Icon visibility
  type?: string; // Type can be "bank" or "crypto"
}

export default function BankComponent({
  id,
  bankName,
  bankImage,
  accNumber,
  accName,
  flexStyling,
  style = "",
  icon,
  textStyle = "",
  onClick,
  onNavigateToDelete,
  showIcon = true, // Default to true
  type, // New type field
}: BankProps) {
  // Handling the delete navigation (passing the id and type to the store)
  const handleDeleteNavigation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    if (onNavigateToDelete && id && type) {
      onNavigateToDelete(id, type); // Pass the bank or wallet ID and type to the delete function
    }
  };

  return (
    <section
      className={`rounded-[20px] shadow-sm flex items-start justify-between w-[168px] h-[105px] p-3 cursor-pointer duration-200 
        ${style.includes("bg-") ? style : `bg-light-grey hover:bg-slate-100 ${style}`}`}
      onClick={onClick}
    >
      <div>
        <div className={flexStyling}>
          {showIcon && ( // Conditionally render the Icon component
            <Icon icon={bankImage} containerSize="w-[24px] h-[24px]" />
          )}
          <p
            className={`text-color-zero text-sm font-medium ${
              textStyle.includes("text-")
                ? textStyle
                : `text-color-zero ${textStyle}`
            }`}
          >
            {bankName}
          </p>
        </div>
        <div className="space-y-2 mt-3">
          <p className="text-xs text-color-form">{accNumber}</p>
          <p className="text-xs text-color-form">{accName}</p>
        </div>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent's onClick
          handleDeleteNavigation(e); // Call the handler directly
        }}
      >
        {icon}
      </div>
    </section>
  );
}
