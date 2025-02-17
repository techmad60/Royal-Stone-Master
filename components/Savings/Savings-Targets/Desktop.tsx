import { SavingsTarget } from "@/types/Type";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";

interface SavingsTargetDesktopProps {
  savingsTarget: SavingsTarget[];
}

export default function SavingsTargetDesktop({
  savingsTarget,
}: SavingsTargetDesktopProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const router = useRouter();

  const handleNavigation = (savingsTargetID: string) => {
    const basePath = "/main/savings/savings-details";
    router.push(`${basePath}?id=${encodeURIComponent(savingsTargetID)}`);
  };

  return (
    <div className="hidden lg:grid my-5">
      <div className="bg-light-grey shadow-sm hidden lg:grid grid-cols-8 p-3 mr-8 rounded-[15px]">
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">Plan Name</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount Saved</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-1">Progress</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Target Amount</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Due Dates</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
      </div>
      {savingsTarget.map((target, index) => {
        // Calculate percentage for each target
        const percentage = Math.round(
          (target.amountSaved / target.target) * 100
        );
        const statusTextColor =
          target.status.toLowerCase() === "completed"
            ? "text-color-six"
            : "text-color-one";

        return (
          <div
            key={target.id}
            className={`lg:grid grid-cols-8 p-3 mr-8 ${index !== savingsTarget.length - 1 ? "border-b my-3" : ""}`}
          >
            <p className="text-sm text-color-zero col-span-2">{target.name}</p>
            <p className="text-sm text-color-zero col-span-1">${target.amountSaved}</p>

            {/* Progress Bar Section */}
            <div className="flex items-center gap-1 col-span-1">
              {/* Progress Bar */}
              <div className="flex-1 bg-white shadow-sm h-[14px] rounded-[20px] relative">
                <div className="bg-color-two h-[5px] rounded-[30px] absolute inset-y-0 left-1 right-1 top-1 -bottom-1">
                  <div
                    className="bg-color-one h-[5px] rounded-[30px]"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Percentage */}
              <p className="text-xs text-color-zero whitespace-nowrap mr-3">
                ({percentage}%)
              </p>
            </div>

            <p className="text-sm text-color-zero col-span-1">${target.target}</p>
            <p className={`text-sm ${statusTextColor} col-span-1`}>
              {target.status.toLocaleUpperCase()}
            </p>
            <p className="text-sm text-color-zero col-span-1">
              {formatDate(target.createdAt)}
            </p>
            <button
              className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation(target.id);
              }}
            >
              <p className="text-xs text-color-form hover:text-green-700">View</p>
              <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
