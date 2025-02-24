import { useKycStore } from "@/store/kycStore"; // Import Zustand store
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { BsPersonCheck } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import CardVerification from "../ui/CardVerification";

interface KycInformationProps {
  onClose: () => void;
  onClickValidId: () => void;
  onClickNextOfKin: () => void;
  onClickProfilePicture: () => void;
}

export default function KycInformation({
  onClose,
  onClickValidId,
  onClickNextOfKin,
}: KycInformationProps) {
  const { isValidIdProvided, isNextOfKinProvided } = useKycStore(); // Access KYC status from Zustand store

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[400px] sm:h-[500px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[330px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4 sm:p-8 lg:p-4">
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Kyc Information
          </p>
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            <XCircleIcon className="text-color-form" />
          </p>
        </div>
        <div className="border-t flex-col space-y-3 p-4 sm:p-8 lg:p-4">
          {/* Valid ID Card */}
          <CardVerification
            iconImg={<BsPersonCheck className="text-xl text-color-one" />}
            label="Valid Identification"
            status={isValidIdProvided ? "Provided" : "Not Set"}
            showArrow={isValidIdProvided ? "hidden" : "flex"}
            statusClass={
              isValidIdProvided ? "text-color-one" : "text-color-form"
            }
            showSwitch="hidden"
            style="xl:w-auto"
            onClick={isValidIdProvided ? undefined : onClickValidId} // Triggers modal when clicked
          />
          <CardVerification
            iconImg={<IoPeople className="text-xl text-color-one" />}
            label="Next of Kin"
            status={isNextOfKinProvided ? "Provided" : "Not Set"}
            showArrow={isNextOfKinProvided ? "hidden" : "flex"}
            statusClass={
              isNextOfKinProvided ? "text-color-one" : "text-color-form"
            }
            showSwitch="hidden"
            style="xl:w-auto"
            onClick={isNextOfKinProvided ? undefined : onClickNextOfKin} // Triggers modal when clicked
          />
        </div>
        <p className="text-color-zero mt-8 px-4 text-sm">
          NB: Provide the Kyc information to be redirected to the main page.
        </p>
      </div>
    </div>
  );
}
