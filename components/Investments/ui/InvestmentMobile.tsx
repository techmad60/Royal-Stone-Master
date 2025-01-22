import Image from "next/image";
import { useRouter } from "next/navigation";

interface Investment {
  id: string;
  accountID: string;
  amount: number;
  type: string;
  status: string;
  productID?: {
    name: string;
    id: string;
    ROI?: {
      value: number;
      duration: number;
    };
    images: string[];
  };
  slotPurchased?: number;
  maturityDate?: string;
  createdAt: string;
  updatedAt: string;
}

export default function InvestmentMobile({
  investments,
}: {
  investments: Investment[];
}) {
  const router = useRouter();

  const handleNavigation = (investmentId: string) => {
    const basePath = "/main/investments/transaction-details";
    router.push(`${basePath}?id=${encodeURIComponent(investmentId)}`);
  };

  return (
    <div>
      {investments.map((investment) => (
        <section
          key={investment.id}
          className="flex items-center gap-2 bg-light-grey rounded-common p-2 shadow-sm mt-4 lg:hidden cursor-pointer"
          onClick={() => handleNavigation(investment.id)}
        >
          {/* INVESTMENT IMAGE */}
          <div className="w-[100px] h-[77px] rounded-[12px] overflow-hidden">
            <Image
              src={
                investment.productID?.images?.[0] ||
                "/images/default.png" // Default image if no images are provided
              }
              alt={investment.productID?.name || "Investment"}
              width={100}
              height={77}
              className="w-full h-full object-cover"
            />
          </div>

          {/* INVESTMENT DETAILS */}
          <div className="flex flex-col space-y-2 w-full">
            {/* INVESTMENT STATUS */}
            <p
              className={`text-[10px] ${
                investment.status === "pending"
                  ? "text-yellow-500"
                  : investment.status === "successful"
                  ? "text-green-500"
                  : "text-red-700"
              }`}
            >
              {investment.status.toUpperCase()}
            </p>

            <div className="flex justify-between border-b py-[0.025rem]">
              {/* INVESTMENT PRODUCT NAME */}
              <p className="text-sm text-[rgba(15,28,57,0.7)] tracking-tight">
                {investment.productID?.name || "Investment Product"}
              </p>
              <div className="flex flex-col">
                {/* INVESTMENT AMOUNT */}
                <p className="text-xs font-medium text-colour-five tracking-tight">
                  {investment.amount
                    ? `$${investment.amount.toLocaleString()}`
                    : "N/A"}
                </p>
                {/* ROI */}
                {investment.productID?.ROI && (
                  <p className="text-[10px] font-medium text-color-one tracking-tight">
                    ROI: {investment.productID.ROI.value}% 
                  </p>
                )}
              </div>
            </div>

            {/* MATURITY DATE */}
            <p className="text-[10px] text-[rgba(151,156,169,1)] tracking-tight">
              MATURITY DATE:{" "}
              {investment.maturityDate
                ? new Date(investment.maturityDate)
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, "/")
                : "N/A"}
            </p>
          </div>
        </section>
      ))}
    </div>
  );
}
