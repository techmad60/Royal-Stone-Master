"use client";
import DayTimer from "@/components/ui/DayTimer";
import Loading from "@/components/ui/Loading";
import Navigator from "@/components/ui/Navigator";
import StatRow from "@/components/ui/StatRow";
import useInvestmentStore from "@/store/investmentStore";
import { getInvestmentStatusColor } from "@/utils/functions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TransactionDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { investments, fetchInvestments, error } = useInvestmentStore();

  useEffect(() => {
    if (investments.length === 0) {
      fetchInvestments("investment-purchase");
    }
  }, [investments, fetchInvestments]);

  const investment = investments.find((investment) => investment.id === id);

  if (error)
    return <p className="text-red-500">Failed to load product details.</p>;
  if (!investment)
    return (
      <div>
        <Loading />
      </div>
    );
  const investmentSteps = [
    { label: "Investments", href: "/main/investments" },
    {
      label: investment.productID?.name || "Unknown Product", // Dynamically display the product name
      href: `/main/investments/transaction-details?id=${encodeURIComponent(
        investment.id
      )}`,
    },
  ];

  const durationInSeconds = (() => {
    if (investment.status?.toLowerCase() !== "ongoing") {
      return 0; // If not "ongoing", don't start the countdown
    }

    if (!investment.maturityDate) {
      return 0; // If no maturity date, don't start countdown
    }

    const remainingTime = Math.floor(
      (new Date(investment.maturityDate).getTime() - Date.now()) / 1000
    );

    return Math.max(remainingTime, 0); // Ensure countdown doesn't go negative
  })();

  return (
    <div className="mt-32 sm:mt-8 lg:mt-24">
      <Navigator currentStep={1} steps={investmentSteps} />
      <div className="lg:flex justify-between mr-8">
        <div>
          <h1 className="font-medium text-colour-five mt-4 text-base">
            {investment.productID?.name || "Unknown Product"}
          </h1>
          <p
            className={`text-[10px] ${getInvestmentStatusColor(
              investment.status
            )}`}
          >
            {investment.status?.toUpperCase() || "N/A"}
          </p>
        </div>
        <div className="lg:flex items-center hidden">
          <DayTimer durationInSeconds={durationInSeconds} />
        </div>
      </div>

      {/* Small Screen */}
      <section className="flex overflow-scroll hide-scrollbar gap-2 my-4 sm:hidden">
        {investment.productID?.images &&
        investment.productID?.images.length > 0 ? (
          (() => {
            const images = investment.productID.images;
            const length = images.length;

            // Ensure we have exactly 5 images
            const repeatedImages =
              length < 5
                ? [...images, ...Array(5 - length).fill(images[0])]
                : images;

            return repeatedImages.map((image, index) => (
              <div
                key={index}
                className="w-[110px] h-[111px] flex-shrink-0 rounded-[12px] overflow-hidden"
              >
                <Image
                  src={image || "/placeholder-image.png"}
                  alt={`Investment Image ${index + 1}`}
                  width={110}
                  height={111}
                  className="w-full h-full object-cover"
                />
              </div>
            ));
          })()
        ) : (
          <div className="text-center text-gray-500">No images available</div>
        )}
      </section>

      {/* Large Screen */}
      <section className="hidden overflow-scroll hide-scrollbar gap-2 my-4 sm:flex">
        {investment.productID?.images &&
        investment.productID?.images.length > 0 ? (
          (() => {
            const images = investment.productID.images;
            const length = images.length;

            // Ensure we have exactly 5 images for large screens
            const repeatedImages =
              length < 5
                ? [...images, ...Array(5 - length).fill(images[0])]
                : images;

            return repeatedImages.map((image, index) => (
              <div
                key={index}
                className="w-[231px] h-[148px] flex-shrink-0 rounded-[12px] overflow-hidden"
              >
                <Image
                  src={image || "/placeholder-image.png"}
                  alt={`Investment Image ${index + 1}`}
                  width={231}
                  height={148}
                  className="w-full h-full object-cover"
                />
              </div>
            ));
          })()
        ) : (
          <div className="text-center text-gray-500">No images available</div>
        )}
      </section>

      <div className="lg:hidden">
        <DayTimer durationInSeconds={durationInSeconds} />
      </div>

      <hr className="my-4 mr-8" />
      <div className="flex flex-col lg:flex-row lg:mr-8 lg:gap-12 xl:gap-4">
        <div className="flex bg-[rgba(252,252,252,1)] p-4 drop-shadow-sm rounded-[10px] flex-shrink-0 gap-16 lg:gap-32 lg:w-[24rem] xl:gap-40 xl:w-[572px] xl:h-[232px] 2xlg:w-[600px]">
          <div className="flex flex-col space-y-4 xl:space-y-7">
            {/* Amount Invested */}
            <div>
              <p className="text-base font-semibold text-color-zero tracking-tight lg:text-lg">
                {investment.amount
                  ? `$${investment.amount}`
                  : "Investment Amount"}
              </p>
              <p className="text-colour-five text-xs tracking-tight">
                Amount Invested
              </p>
            </div>

            {/* Price Per Slot */}
            <div>
              <p className="text-base font-semibold text-color-zero tracking-tight lg:text-lg">
                {investment.productID?.costPerUnit
                  ? `$${investment.productID?.costPerUnit}`
                  : "Investment Amount"}
              </p>
              <p className="text-colour-five text-xs tracking-tight">
                Price Per Slot
              </p>
            </div>

            {/* Total Returns */}
            <div>
              <p className="text-base font-semibold text-color-zero tracking-tight lg:text-lg">
                {investment.amount != null &&
                investment.productID?.ROI?.value != null
                  ? `$${(
                      (Number(investment.amount) *
                        Number(investment.productID.ROI.value)) /
                      100
                    ).toFixed(0)}`
                  : "N/A"}
              </p>

              <p className="text-colour-five text-xs tracking-tight">
                Total Returns
              </p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {/* Slots Purchased */}
            <div>
              <p className="text-base font-semibold text-color-zero tracking-tight lg:text-lg">
                {investment.amount
                  ? `$${investment.amount}`
                  : "Investment Amount"}
              </p>
              <p className="text-colour-five text-xs tracking-tight">
                Slots Purchased
              </p>
            </div>

            {/* ROI */}
            <div>
              <p className="text-base font-semibold text-color-zero tracking-tight lg:text-lg">
                {investment.amount
                  ? `%${investment.amount}`
                  : "Investment Amount"}
              </p>
              <p className="text-colour-five text-xs tracking-tight">
                Expected ROI
              </p>
            </div>
          </div>
        </div>

        <section className="bg-[rgba(252,252,252,1)] px-4 rounded-[10px] mt-4 flex-shrink-0 lg:mt-0 lg:w-80 xl:h-[155px] xl:w-[360px] 2xlg:w-[500px]">
          {/* Date Purchased */}
          <StatRow
            label="Date Purchased"
            value={
              investment.createdAt
                ? new Date(investment.createdAt)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "/")
                : "N/A"
            }
            valueClass="text-color-six text-sm"
          />

          {/* Duration */}
          <StatRow
            label="Duration"
            value={
              investment.status?.toLowerCase() === "ongoing" &&
              investment.productID?.ROI?.duration
                ? `${investment.productID.ROI.duration} days`
                : "N/A"
            }
            valueClass="text-color-six text-sm"
          />

          {/* Maturity Date */}
          <StatRow
            label="Maturity Date"
            value={
              investment.status?.toLowerCase() === "ongoing" &&
              investment.maturityDate
                ? new Date(investment.maturityDate)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "/")
                : "N/A"
            }
            valueClass="text-color-six text-sm"
            isLast={true}
          />
          {investment.status?.toLowerCase() === "pending" && (
            <p className="text-sm text-color-zero mt-8">
              Duration and Maturity date will display, once your purchase is
              approved.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
