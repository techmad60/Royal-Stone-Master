"use client";
import { Stock } from "@/types/Type";
import { useRouter } from "next/navigation";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { RiStockLine } from "react-icons/ri";
import Icon from "../../ui/Icon";
import StockLinks from "../StockLinks";
import SearchUI from "./SearchUI";

interface StockDesktopListProps {
  stocks: Stock[];
}

export default function StockDesktopList({ stocks }: StockDesktopListProps) {
  const router = useRouter();
  const handleNavigation = (stockId: string) => {
    const basePath = "/main/stocks/stock-details";
    router.push(`${basePath}?id=${encodeURIComponent(stockId)}`);
  };
  return (
    <div className="hidden lg:flex flex-col">
      <div className="flex items-center justify-between py-4 border-b w-full">
        <div className="flex items-center gap-2">
          <StockLinks />
        </div>
        <div>
          <SearchUI />
        </div>
      </div>

      <div className="grid lg:grid-cols-7 xl:grid-cols-8 rounded-[15px] h-[42px] items-center pl-4 bg-light-grey shadow-sm my-4">
        <p className="text-sm text-slate-400 col-span-2 xl:col-span-3">
          Stock Name
        </p>
        <p className="text-sm text-slate-400 col-span-1">NYSE</p>
        <p className="text-sm text-slate-400 col-span-1">Stock Price</p>
        <p className="text-sm text-slate-400 col-span-2">
          Price Change Percentage
        </p>
        <p className="text-sm text-slate-400 col-span-1">Actions</p>
      </div>

      {stocks.map((stock, index) => (
        <section
          key={index}
          className="grid lg:grid-cols-7 xl:grid-cols-8 items-center pl-4 border-b py-4"
        >
          <div className="flex items-center gap-2 flex-shrink-0 col-span-2 xl:col-span-3">
            <Icon
              icon={<RiStockLine className="text-color-one text-xl" />}
              containerSize="w-[39px] h-[39px] flex-shrink-0"
            />
            <p className="text-sm text-color-zero">
              {stock.name.length > 30
                ? stock.name.slice(0, 30) + "..."
                : stock.name}
            </p>
          </div>
          <p className="text-sm text-color-zero">{stock.ticker}</p>
          <p className="col-span-1 text-color-six text-sm">$
            {Number(stock.price.close).toFixed(2)}
          </p>
          <p
            className={`col-span-2 text-sm ${
              stock.price.change < 0 ? "text-red-500" : "text-color-one"
            }`}
          >
            {Number(stock.price.change).toFixed(3)}
          </p>

          {/* <p className="col-span-1 text-sm text-color-six">
            {stock.price || "N/A"}
          </p>
          <p className="col-span-2 text-sm text-color-one">
            {stock.change || "N/A"}
          </p> */}

          <div>
            <button
              className="text-xs font-medium hover:text-green-700 duration-300 flex items-center text-color-form border hover:border-green-700 rounded-[20px] py-2 px-4"
              onClick={() => handleNavigation(stock.id)}
            >
              View
              <MdOutlineArrowForwardIos className="text-colour-five" />
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
