import Image from "next/image";
import { useEffect } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import Icon from "../../ui/Icon";

interface Investments {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
  images?: string[]; // Only 'investment-purchase' type will have images
  maturityDate?: string;
  productID?: {
    ROI?: {
      value: number;
      duration: number;
    };
    name: string;
    costPerUnit: number;
    images: string[];
    id: string;
  };
  ROI?: {
    value: number;
    duration: number;
  };
  costPerUnit?: number;
  slotPurchased?: number;
  updatedAt?: string;
  name?: string;
}

interface InvestmentHistoryProps {
  investment: Investments;
  closeModal: () => void;
}

export default function InvestmentHistoryModal({
  closeModal,
  investment,
}: InvestmentHistoryProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, [investment]);

  const calculateROI = (amount: number, roiValue: number | undefined) => {
    return roiValue ? (amount * roiValue) / 100 : 0;
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div
        className={`flex flex-col bg-white rounded-t-[15px] w-full lg:rounded-[20px] ${
          investment.type !== "investment-purchase" ? "h-[410px] lg:h-[450px]" : "h-[530px] lg:h-[560px]"
        } lg:max-w-[621px] `}
      >
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={closeModal}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Transaction Details
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <Icon
            icon={
              investment.type === "investment-purchase" ? (
                <BsFileBarGraphFill className="text-color-one text-2xl" />
              ) : investment.type === "investment-wallet-funding" ? (
                <GoPlus className="text-color-one text-2xl" />
              ) : (
                <IoIosSend className="text-color-one text-2xl" />
              )
            }
            containerSize="w-[41px] h-[41px]"
          />

          <div className="flex flex-col gap-1">
               {/* Conditional for investment-purchase and others*/}
            {investment.type === "investment-purchase" ? (
              <>
                <p className="text-color-zero font-medium text-sm lg:text-base">
                  {investment.productID?.name || "N/A"}
                </p>
                <p className="text-color-six text-sm">
                  {investment.productID?.ROI?.value || "N/A"}% ROI -{" "}
                  <span
                    className={`text-xs ${
                      investment.status?.toLowerCase() === "successful"
                        ? "text-green-500"
                        : investment.status?.toLowerCase() === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {investment.status?.toUpperCase() || "N/A"}
                  </span>
                </p>
              </>
            ) : (
              <>
                <p className="text-color-zero font-medium text-sm lg:text-base">
                  {investment.type.toUpperCase()}
                </p>
                <p
                  className={`text-xs ${
                    investment.status?.toLowerCase() === "successful"
                      ? "text-green-500"
                      : investment.status?.toLowerCase() === "pending"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  {investment.status?.toUpperCase() || "N/A"}
                </p>
              </>
            )}
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 mt-4 p-[15px] text-sm w-[345px] h-[218px] lg:p-5 lg:w-[572px] lg:h-[228px]">
          <div className={`flex flex-col ${investment.type !== "investment-purchase" ? "space-y-8" : "space-y-3"}`}>
            <div className="flex flex-col">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${investment.amount}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Date</p>
              <p className="text-color-six">
                {new Date(investment.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* Show only for investment-purchase */}
            {investment.type === "investment-purchase" && (
              <>
                <div className="flex flex-col">
                  <p className="text-color-form">No. of units</p>
                  <p className="text-color-six">
                    {investment.slotPurchased || "N/A"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-color-form">Duration</p>
                  <p className="text-color-six">
                    {investment.productID?.ROI?.duration
                      ? investment.productID.ROI.duration >= 365
                        ? `${Math.floor(
                            investment.productID.ROI.duration / 365
                          )} year${
                            Math.floor(
                              investment.productID.ROI.duration / 365
                            ) > 1
                              ? "s"
                              : ""
                          }${
                            investment.productID.ROI.duration % 365 > 0
                              ? ` and ${
                                  investment.productID.ROI.duration % 365
                                } day${
                                  investment.productID.ROI.duration % 365 > 1
                                    ? "s"
                                    : ""
                                }`
                              : ""
                          }`
                        : `${investment.productID.ROI.duration} day${
                            investment.productID.ROI.duration > 1 ? "s" : ""
                          }`
                      : "N/A"}
                  </p>
                </div>
              </>
            )}
          </div>
          <div className={`flex flex-col ${investment.type !== "investment-purchase" ? "space-y-8" : "space-y-3"}`}>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction ID</p>
              <p className="text-color-six break-words">#{investment.id}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-color-form">Transaction Time</p>
              <p className="text-color-six">
                {new Date(investment.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Show only for investment-purchase */}
            {investment.type === "investment-purchase" && (
              <div className="flex flex-col">
                <p className="text-color-form">Cost Per Unit</p>
                <p className="text-color-six">
                  ${investment.productID?.costPerUnit || "N/A"}
                </p>
              </div>
            )}
          </div>
        </section>
        {/* Only display the image if it's an 'investment-purchase' type */}
        {investment.type === "investment-purchase" &&
          investment.productID?.images && (
            <section className="flex gap-2 bg-light-grey shadow-sm p-3 rounded-common m-4 lg:gap-4">
              <div className="flex-shrink-0 rounded-[12px] w-[77px] h-[77px] overflow-hidden">
                <Image
                  src={
                    investment?.productID?.images[0] || "/placeholder-image.jpg"
                  }
                  height={77}
                  width={77}
                  alt={investment?.productID?.name || "Investment Image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center lg:gap-20">
                  <div className="flex flex-col gap-1">
                    <p
                      className={`text-[0.65rem] ${
                        investment.status?.toLowerCase() === "successful"
                          ? "text-green-500"
                          : investment.status?.toLowerCase() === "pending"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {investment.status?.toUpperCase() || "N/A"}
                    </p>
                    <p className="text-sm text-colour-five">
                      {investment.productID?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-color-zero font-medium">
                      ${investment.amount}
                    </p>
                    <p className="text-[0.625rem] text-color-one tracking-tight whitespace-nowrap">
                      ROI:{" "}
                      {investment.productID?.ROI
                        ? `${investment.productID.ROI.value}%`
                        : "No ROI"}
                      {investment.productID?.ROI
                        ? `($${calculateROI(
                            investment.amount,
                            investment.productID.ROI.value
                          )})`
                        : ""}
                    </p>
                  </div>
                </div>
                <hr className="my-1" />
                <p className="text-[0.625rem] text-[rgba(151,156,169,1)]">
                  MATURITY DATE:{" "}
                  {investment.maturityDate
                    ? new Date(investment.maturityDate).toLocaleDateString()
                    : "No Maturity Date"}
                </p>
              </div>
            </section>
          )}
      </div>
    </div>
  );
}
