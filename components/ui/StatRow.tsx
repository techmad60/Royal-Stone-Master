import { useState } from "react";
import { IoCopy } from "react-icons/io5";

interface StatRowProps {
  label: string;
  value: string;
  valueClass: string;
  isLast?: boolean;
  paddingStyle? : string;
  showCopyIcon?: boolean; // Controls visibility of the copy icon
}

export default function StatRow({
  label,
  value = "",
  valueClass,
  isLast,
  paddingStyle = "",
  showCopyIcon = false,
}: StatRowProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(
      () => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Clear feedback after 2 seconds
      },
      (err) => {
        console.error("Failed to copy text: ", err);
      }
    );
  };

  // Truncate the value for display
  const truncatedValue =
    value.length > 20 ? `${value.slice(0, 6)}...${value.slice(-4)}` : value;

  return (
    <div
      className={`flex items-center justify-between ${
        !isLast ? "border-b lg:border-dashed" : ""
      } ${paddingStyle.includes("py-")? paddingStyle : `py-4 ${paddingStyle}`}`}
    >
      <p className="text-color-form text-sm">{label}</p>
      <div className="flex items-center gap-2">
        {/* Display truncated value */}
        <p className={`${valueClass}`}>{truncatedValue}</p>
        {showCopyIcon && (
          <div className="relative">
            <IoCopy
              className="cursor-pointer text-color-six hover:text-blue-950"
              onClick={handleCopy}
              title="Copy to clipboard"
            />
            {copySuccess && (
              <span className="absolute -top-6 right-0 text-xs text-green-600">
                Copied!
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
