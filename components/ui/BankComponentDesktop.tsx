import { ReactNode } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Icon from "./Icon";

interface BankComponentProps {
  id?: string; // Optional id (assuming it's used for bank or crypto ID)
  bankImage?: ReactNode; // Optional image/icon for the bank
  bankName: string; // Name of the bank
  accNum?: number | string; // Account number (optional)
  accName?: string; // Account holder name (optional)
  showIcon?: boolean; // Flag to control icon visibility
  showBin?: boolean;
  onClick?: () => void; // On click handler for the section
  onNavigateToDelete?: (id: string, type: string) => void; // Handler for deleting with id and type
  type?: string; // Type can be "bank" or "crypto"
}

export default function BankComponentDesktop({
  id,
  bankImage,
  bankName,
  accNum,
  accName,
  onClick,
  onNavigateToDelete,
  showIcon = true,
  showBin = true,
  type,
}: BankComponentProps) {
  // Handling the delete navigation (passing the id and type to the store)
  const handleDeleteNavigation = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent's onClick
    if (onNavigateToDelete && id && type) {
      onNavigateToDelete(id, type); // Pass the bank or wallet ID and type to the delete function
    }
  };

  return (
    <>
      <section
        className="grid grid-cols-6 px-3 py-5 cursor-pointer hover:bg-slate-100 duration-200"
        onClick={onClick}
      >
        <div className="flex gap-2 col-span-2">
          {showIcon && <Icon icon={bankImage} />}
          <p className="text-sm text-color-zero">{bankName}</p>
        </div>
        <p className="text-sm col-span-2">{accNum}</p>
        <div className="flex justify-between col-span-2">
          <p className="text-sm text-color-zero">{accName}</p>
          {showBin && (
            <RiDeleteBin5Fill
              className="text-red-500 cursor-pointer hover:text-red-600 duration-150"
              onClick={handleDeleteNavigation} // Trigger delete navigation here
            />
          )}
        </div>
      </section>
      <hr />
    </>
  );
}
