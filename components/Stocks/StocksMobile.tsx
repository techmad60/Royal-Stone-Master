import Image from "next/image";
import Link from "next/link";
import SearchUI from "./SearchUI";

const stocks = [
    {
        logo: "/images/stocks/tesco.svg",
        name: "Tesco PLC",
        symbol: "TSCO",
        change: "+2.21%",
        price: "$290.19",
    },
    {
        logo: "/images/stocks/spotify.svg",
        name: "Spotify Technology SA",
        symbol: "SPOT",
        change: "+2.21%",
        price: "$290.19",
    },
    {
        logo: "/images/stocks/air-bnb.svg",
        name: "Airbnb",
        symbol: "ABNB",
        change: "+2.21%",
        price: "$290.19",
    },
    {
        logo: "/images/stocks/shopify.svg",
        name: "Shopify Inc",
        symbol: "SHOP",
        change: "+2.21%",
        price: "$290.19",
    },
];

export default function StockListMobile() {
    return (
        <div>
            <div className="flex items-center gap-4 mt-4 lg:hidden">
                <SearchUI />
                <Link href="/main/stocks/trading-history" className="text-xs whitespace-nowrap text-color-one hover:text-green-700 border-b border-color-one hover:border-green-700">View Stocks History</Link>
           </div>
            <Link href="/main/stocks/stock-details">
                {stocks.map((stock, index) => (
                    <section
                        key={index}
                        className="flex items-center justify-between bg-light-grey shadow-sm p-3 rounded-common mt-4 cursor-pointer hover:bg-slate-100 duration-300 lg:hidden"
                    >
                        <div className="flex items-center gap-2">
                            <Image src={stock.logo} height={47} width={47} alt={`${stock.name} logo`} />
                            <div>
                                <p className="text-sm text-colour-five font-medium">{stock.name}</p>
                                <p className="text-xs text-[#6B738599]">{stock.symbol}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-color-one font-medium">{stock.change}</p>
                            <p className="text-color-six font-medium">{stock.price}</p>
                        </div>
                    </section>
                ))}
            </Link>
            
        </div>
    );
}
