import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface TransactionDetailsProps {
  onClose: () => void;
}

export default function TransactionDetails({ onClose}: TransactionDetailsProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
            <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[626px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[490px]">
                <div className="flex justify-center items-center mt-4 lg:hidden">
                    <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
                </div>
                <div className="flex items-center border-b w-full pb-2 p-4">
                    <Link onClick={onClose} href="/main/stocks/stock-details" className="text-color-form text-sm">
                        Cancel
                    </Link>
                    <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">Transaction Details</p>
                </div>

                <div className="flex items-center gap-4 my-1 p-4">
                    <Image src="/images/stocks/spotify.svg" alt="Spotify Logo" width={47} height={47} />
                    <div>
                        <p className="text-color-zero font-medium text-sm lg:text-base">Spotify Technology SA</p>
                        <p className="text-color-six text-sm">SPOT - <span className="text-color-one">SUCCESS</span></p>
                    </div>
                </div>

                <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[313px] lg:p-5 lg:w-[572px] lg:h-[299px]">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col">
                            <p className="text-color-form">Stock Price as at date</p>
                            <p className="text-color-six">$290.19</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Trade Type</p>
                            <p className="text-color-one">Buy</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Amount Purchased</p>
                            <p className="text-color-six">$200</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Transaction ID</p>
                            <p className="text-color-six">#891919919ID</p>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col">
                            <p className="text-color-form">Transaction Time</p>
                            <p className="text-color-six">11:04 AM</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Email Address</p>
                            <p className="text-color-six">SamJoneson@gmail.com</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Amount of units</p>
                            <p className="text-color-six">0.4157</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="text-color-form">Transaction Date</p>
                            <p className="text-color-six">21/9/2024</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
  );
}
