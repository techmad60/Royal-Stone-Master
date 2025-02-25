import { SavingsTarget } from "@/types/Type";
import { useRouter } from "next/navigation";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "../../ui/Icon";

interface SavingsTargetMobileProps {
  savingsTarget: SavingsTarget[];
}

export default function SavingsTargetMobile({
  savingsTarget,
}: SavingsTargetMobileProps) {
  const router = useRouter();
  const handleNavigation = (savingsTargetID: string) => {
    const basePath = "/main/savings/savings-details";
    router.push(`${basePath}?id=${encodeURIComponent(savingsTargetID)}`);
  };
  return (
    <div className="lg:hidden">
      {savingsTarget.map((target) => {
        // Calculate percentage
        const percentage = Math.round(
          (target.amountSaved / target.target) * 100
        ).toFixed(1);
        const statusTextColor =
          target.status.toLowerCase() === "completed"
            ? "text-color-six"
            : "text-color-one";

        return (
          <section
            key={target.id}
            className="relative bg-light-grey shadow-sm rounded-common mt-6 p-4 flex items-center gap-4 h-[86px]"
            onClick={() => handleNavigation(target.id)}
          >
            {/* Icon */}
            <div className="absolute -top-[10px]">
              <Icon icon={<TbTargetArrow className="text-color-one" />} />
            </div>

            {/* Content */}
            <div className="flex-1 pl-[2.2rem]">
              {/* Title and Status */}
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-[rgba(15,28,57,0.7)]">
                  {target.name}
                </h3>
                <span className={`text-[10px] ${statusTextColor}`}>
                  {target.status.toLocaleUpperCase()}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="bg-white shadow-sm h-[15px] rounded-[20px] relative my-2">
                <div className="bg-color-two h-[5px] rounded-[30px] my-auto absolute inset-0 mx-1">
                  <div
                    className="bg-color-one h-[5px] rounded-[30px]"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Amount and Percentage */}
              <div className="flex justify-between text-sm">
                <span className="text-xs text-color-one">
                  ${target.amountSaved.toLocaleString()}/
                  {target.target.toLocaleString()}
                </span>
                <span className="text-xs text-color-zero">{percentage}%</span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
