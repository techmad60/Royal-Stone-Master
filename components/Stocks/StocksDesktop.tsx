"use client";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import SearchUI from "./SearchUI";
import StockLinks from "./StockLinks";
const stocks = [
    {
        logo: "/images/stocks/tesco.svg",
        name: "Tesco PLC",
        symbol: "TSCO",
        price: "$290.19",
        change: "+2.21%",
    },
    {
        logo: "/images/stocks/spotify.svg",
        name: "Spotify Technology SA",
        symbol: "SPOT",
        price: "$290.19",
        change: "+2.21%",
    },
    {
        logo: "/images/stocks/air-bnb.svg",
        name: "Airbnb Inc",
        symbol: "ABNB",
        price: "$290.19",
        change: "+2.21%",
    },
    {
        logo: "/images/stocks/shopify.svg",
        name: "Shopify Inc",
        symbol: "SHOP",
        price: "$290.19",
        change: "+2.21%",
    },
    // Add more stocks as needed
];


export default function StockDesktopList() {
    return (
        <>
           <div className="flex items-center justify-between py-4 border-b w-full">
                <div className="flex items-center gap-2">
                    <StockLinks />
                </div>
                <div>
                    <SearchUI />
                </div>
            </div>
            <div className="grid lg:grid-cols-7 xl:grid-cols-8 rounded-[15px] h-[42px] items-center pl-4 bg-light-grey shadow-sm my-4">
                <p className="text-sm text-slate-400 col-span-2 xl:col-span-3">Stock Name</p>
                <p className="text-sm text-slate-400 col-span-1">NYSE</p>
                <p className="text-sm text-slate-400 col-span-1">Stock Price</p>
                <p className="text-sm text-slate-400 col-span-2">Price Change Percentage</p>
                <p className="text-sm text-slate-400 col-span-1">Actions</p>
            </div>
           
            {stocks.map((stock, index) => (
                <section key={index} className="grid lg:grid-cols-7 xl:grid-cols-8 items-center pl-4 border-b py-4">
                    <div className="flex items-center gap-2 col-span-2 xl:col-span-3">
                        <Image src={stock.logo} alt={`${stock.name} logo`} width={35} height={35} />
                        <p className="text-sm text-color-zero">{stock.name}</p>
                    </div>
                    <p className="col-span-1">{stock.symbol}</p>
                    <p className="col-span-1 text-sm text-color-six">{stock.price}</p>
                    <p className="col-span-2 text-sm text-color-one">{stock.change}</p>
                    <Link href="/main/stocks/stock-details">    
                        <button className="col-span-1 text-xs text-colour-five rounded-[20px] h-[22px] w-[70px] flex items-center justify-center shadow-sm gap-2">
                            View
                        <MdOutlineArrowForwardIos className="text-colour-five" />
                        </button>
                    </Link>
                </section>
            ))}
        </>
    );
}
