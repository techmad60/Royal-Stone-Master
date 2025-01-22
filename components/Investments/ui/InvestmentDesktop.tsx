import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

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

export default function InvestmentDesktop({
  investments,
  showViewButton = true,
}: {
  investments: Investment[];
  showViewButton?: boolean;
}) {
  const router = useRouter();

  const handleNavigation = (investmentId: string) => {
    const basePath = "/main/investments/transaction-details";
    router.push(`${basePath}?id=${encodeURIComponent(investmentId)}`);
  };

  return (
    <div>
      {/* Table Header */}
      <div className="hidden lg:grid grid-cols-8 items-center bg-light-grey rounded-common py-4 px-8 shadow-sm mt-4">
        <p className="text-xs text-slate-400 col-span-3">
          Product Image & Name
        </p>
        <p className="text-xs text-slate-400">Amount</p>
        <p className="text-xs text-slate-400">ROI</p>
        <p className="text-xs text-slate-400">Status</p>
        <p className="text-xs text-slate-400">Maturity Date</p>
        <p className="text-xs text-slate-400">Actions</p>
      </div>

      {/* Table Body */}
      <div>
        {investments.map((investment, index) => (
          <section
            key={investment.id}
            className={`hidden lg:grid grid-cols-8 items-center my-4 mx-8 py-4 ${
              index !== investments.length - 1 ? "border-b" : ""
            }`}
          >
            {/* Product Image & Name */}
            <div className="flex items-center col-span-3 gap-2">
              <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                <Image
                  src={
                    investment.productID?.images?.[0] || "/images/default.png"
                  }
                  alt={investment.productID?.name || "Investment Product"}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-color-zero pr-4 tracking-tight">
                {investment.productID?.name || "Investment Product"}
              </p>
            </div>

            {/* Amount Purchased */}
            <div>
              <p className="text-xs text-color-zero tracking-tight">
                {investment.amount
                  ? `$${investment.amount.toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            {/* ROI */}
            <div>
              {investment.productID?.ROI ? (
                <p className="text-xs text-color-zero tracking-tight">
                  {investment.productID.ROI.value}% 
                </p>
              ) : (
                <p className="text-xs text-slate-400">N/A</p>
              )}
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  investment.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : investment.status === "successful"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {investment.status
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Split camel case
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </div>

            {/* Maturity Date */}
            <div>
              <p className="text-xs text-color-zero">
                {investment.maturityDate
                  ? new Date(investment.maturityDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "/")
                  : "N/A"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {showViewButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(investment.id);
                  }}
                  className="text-xs font-medium hover:text-green-700 duration-300 flex items-center text-color-form border hover:border-green-700 rounded-[20px] py-2 px-4"
                  aria-label={`View details of ${
                    investment.productID?.name || "Investment Product"
                  }`}
                >
                  View <MdArrowForwardIos className="ml-2" />
                </button>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
