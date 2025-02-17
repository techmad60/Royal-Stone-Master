import { Stock } from "@/types/Type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RiStockLine } from "react-icons/ri";
import Icon from "../../ui/Icon";
import SearchUI from "./SearchUI";

interface StockListMobileProps {
  stocks: Stock[];
}

export default function StockListMobile({ stocks }: StockListMobileProps) {
  const router = useRouter();
  const handleNavigation = (stockId: string) => {
    const basePath = "/main/stocks/stock-details";
    router.push(`${basePath}?id=${encodeURIComponent(stockId)}`);
  };
  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-4 mt-4">
        <SearchUI />
        <Link
          href="/main/stocks/trading-history"
          className="text-xs whitespace-nowrap text-color-one hover:text-green-700 border-b border-color-one hover:border-green-700"
        >
          View Stocks History
        </Link>
      </div>

      {stocks.map((stock) => (
        <div
          key={stock.id}
          onClick={() => handleNavigation(stock.id)}
          className="flex items-center justify-between bg-light-grey shadow-sm p-3 rounded-common mt-4 cursor-pointer hover:bg-slate-100 duration-300"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon
              icon={<RiStockLine className="text-color-one text-xl" />}
              containerSize="w-[39px] h-[39px]"
            />
            <div>
              {stock.name.length > 10
                ? stock.name.slice(0, 10) + "..."
                : stock.name}
              <p className="text-xs text-[#6B738599]">{stock.ticker}</p>
            </div>
          </div>
          <div>
            <p
              className={`col-span-2 text-sm ${
                stock.price.change < 0 ? "text-red-500" : "text-color-one"
              }`}
            >
              {Number(stock.price.change).toFixed(3)}
            </p>

            <p className="text-color-six font-medium">
              ${Number(stock.price?.close).toFixed(2) || "N/A"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
