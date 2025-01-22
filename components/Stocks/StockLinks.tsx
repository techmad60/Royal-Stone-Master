"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationLinks() {
    const pathname = usePathname();

    const isActive = (path = "") => pathname === path;

    return (
        <div className="flex items-center gap-2">
            <Link
                href="/main/stocks"
                className={`text-base  rounded-[10px] p-4 h-[40px] flex items-center justify-center shadow-sm ${
                    isActive('/main/stocks') ? 'bg-color-two text-color-one font-medium' : 'text-color-one'
                }`}
            >
                Stocks List
            </Link>
            <Link
                href="/main/stocks/trading-history"
                className={`text-base rounded-[10px] p-4 h-[40px] flex items-center justify-center shadow-sm ${
                    isActive('/main/stocks/trading-history') ? 'bg-color-two text-color-one font-medium' : 'text-colour-five'
                }`}
            >
                Trading History
            </Link>
        </div>
    );
}
