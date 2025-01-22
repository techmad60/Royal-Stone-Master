import { useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface MyComponentProps {
    onClose: () => void; // Explicitly defining onClose as a function with no parameters and no return type
    openBuyModal: () => void;  
  }
export default function TradeModal({ onClose, openBuyModal}: MyComponentProps) {
    // Disable background scroll when modal opens and re-enable it when it closes
  useEffect(() => {
    // Add class to disable scroll
    document.body.style.overflow = "hidden";
    
    // Remove class on cleanup (when modal unmounts)
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleBuyModalOpen = () => {
    openBuyModal();
  };    

  return (
    <div className="fixed inset-0 bg-[#D9D9D9A6] flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-[20px] w-full max-w-[621px] h-[621px]">
            {/* Trade form contents */}
            <div className="flex items-center border-b w-full pb-2">
                <Link onClick={onClose} href="/main/stocks/stock-details" className="text-color-form text-sm">Cancel</Link>
                <p className="text-color-zero font-semibold text-lg mx-auto">Trade Stock</p>
            </div>
            <div className="flex items-center gap-4 my-4 border-b pb-4">
                <Image src="/images/stocks/spotify.svg" alt="Spotify Logo" width={47} height={47} />
                <div>
                    <p className="text-color-zero font-semibold text-sm">Spotify Technology SA</p>
                    <p className="text-color-form text-sm">SPOT</p>
                </div>
            </div>
            <form className="flex flex-col mt-4 space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-color-form text-sm">What amount do you want to trade?</label>
                    <input type="name" required className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2" placeholder="$200,000" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-color-form text-sm">Amount of Units</label>
                    <input type="number" required className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2" placeholder="0.4157" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-color-form text-sm">What&apos;s your email address?</label>
                    <input type="email" required className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2" placeholder="SamJoneson@gmail.com" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-color-form text-sm">Phone Number</label>
                    <input type="tel" required className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2" placeholder="+234 8103763064" />
                </div>
            </form>
            <div className="mt-8">
                <p className="text-color-form text-sm">Do you want to buy or sell?</p>
                <div className="flex items-center gap-4 mt-4">
                    <div onClick={handleBuyModalOpen}>
                        <Button ButtonText="Buy" className="bg-color-one w-[168px]"/>
                    </div>
                    <div onClick={handleBuyModalOpen}>
                        <Button ButtonText="Sell" className="bg-color-six w-[168px]"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
