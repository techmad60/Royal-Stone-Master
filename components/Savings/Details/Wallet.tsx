import Icon from "@/components/ui/Icon";
import { MakeSavingsWalletResponse } from "@/types/Type";
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { TbTargetArrow } from "react-icons/tb";

interface WalletDetailsProps {
  onClose: () => void;
  purchaseResponse: MakeSavingsWalletResponse | null;
  name: string;
}

export default function WalletDetails({
  onClose,
  purchaseResponse,
  name,
}: WalletDetailsProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[365px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[348px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
         
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Savings History Details
          </p>
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            <XCircleIcon className="text-color-form"/>
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <Icon
            icon={<TbTargetArrow className="text-color-one text-2xl" />}
            containerSize="w-[41px] h-[41px]"
          />
          <div className="flex flex-col gap-1">
            <p className="text-color-zero font-medium text-sm lg:text-base">
              {name}
            </p>
            <p className="text-color-form text-sm">
              Savings Payment -{" "}
              <span
                className={`${
                  purchaseResponse?.status?.toLowerCase() === "pending"
                    ? "text-yellow-500"
                    : purchaseResponse?.status?.toLowerCase() === "successful"
                    ? "text-color-one"
                    : "text-red-500"
                }`}
              >
                {purchaseResponse?.status?.toUpperCase()}
              </span>
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 mt-4 p-[15px] text-sm w-[345px] h-[155px] lg:p-5 lg:w-[572px] lg:h-[155px]">
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${purchaseResponse?.amount}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {purchaseResponse?.createdAt
                  ? new Date(purchaseResponse.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      }
                    )
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">
                #{purchaseResponse?.id}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {purchaseResponse?.createdAt
                  ? new Date(purchaseResponse.createdAt)
                      .toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })
                      .replace(" am", " AM")
                      .replace(" pm", " PM")
                  : ""}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
