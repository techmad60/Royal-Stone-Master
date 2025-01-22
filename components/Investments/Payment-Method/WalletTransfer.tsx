import Button from "@/components/ui/Button";
import { useEffect } from "react";

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  amount: string;
}

export default function WalletTransfer({
  onClose,
  onProceed,
  amount,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center  z-50">
      <div className="bg-white flex flex-col rounded-[20px] h-[599px] w-full lg:max-w-[621px] lg:h-[585px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Make Investment
          </p>
        </div>
        <p className="text-color-form text-sm mx-4 py-4">
          You will be debited ${amount} using the card details you&apos;ll provide below.
        </p>
        <form className="flex flex-col mt-4 space-y-6 px-4">
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">
            Card Number (16 digits)
            </label>
            <input
              type="name"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2"
              placeholder="8938798739895587"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Cardholder Name</label>
            <input
              type="text"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2"
              placeholder="Cooper Winterwind"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">
            Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">CVV (3-4 digits, security code)</label>
            <input
              type="number"
              required
              className="rounded-sm border-b border-slate-200 placeholder:text-color-zero py-2"
              placeholder="140"
            />
          </div>
          <div onClick={onProceed} className="mt-12 mx-6 lg:mt-8">
            <Button
              ButtonText="Proceed"
              className="bg-color-one w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
