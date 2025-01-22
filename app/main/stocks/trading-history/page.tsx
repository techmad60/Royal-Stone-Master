import StockLinks from "@/components/Stocks/StockLinks";
import { RiStockLine } from "react-icons/ri";


export default function TradingHistory() {
  return  (
    <div className="flex flex-col lg:pr-8">
      <div className="flex flex-col lg:border-b py-4">
        <StockLinks />
      </div>
     
      <div className="flex flex-col justify-center items-center space-y-4 my-8 py-6 shadow-sm bg-light-grey rounded-common w-full pr-8">
        <div
          className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white"
          }`}
        >
          <span className="text-color-one transform -rotate-45"><RiStockLine/> {/* Counter-rotate icon */}</span>
        </div>
        <p className="text-sm text-color-form">No Stocks have been traded yet</p>
      </div>
    </div>
   
  )
}