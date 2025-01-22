import Image from "next/image";
import { useEffect } from "react";
import Button from "../../ui/Button";

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  noOfUnits: string; // User input for the number of units
  amount: string; // User input for the amount
  product: {
    name: string;
    ROI: { value: number };
    costPerUnit: number;
    images: string[];
  };
}

export default function InvestPreview({
  onClose,
  onProceed,
  noOfUnits,
  amount,
  product,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[484px]">
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
            Preview
          </p>
        </div>

        <p className="text-color-form text-sm m-6 border-b pb-4">
          Confirm these details of your transaction
        </p>
        <div className="flex gap-2 py-3 mx-6">
          <div className="w-[39px] h-[39px] overflow-hidden rounded-[8px]">
            <Image
              src={product.images[0] || "/placeholder-image.png"}
              width={39}
              height={39}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-col">
            <p className="text-sm text-color-zero">{product.name}</p>
            <p className="text-color-six text-sm">{product.ROI.value}% ROI</p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[147px] lg:p-5 lg:w-[572px] lg:h-[167px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">No. of units</p>
              <p className="text-color-six">{noOfUnits}</p>
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${amount}</p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Cost Per Unit</p>
              <p className="text-color-six">${product.costPerUnit}/unit</p>
            </div>
          </div>
        </section>
        <div onClick={onProceed} className="mt-8 mx-6">
          <Button ButtonText="Proceed" className="bg-color-one w-full" />
        </div>
      </div>
    </div>
  );
}
