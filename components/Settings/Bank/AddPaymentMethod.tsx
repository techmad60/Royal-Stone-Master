"use client";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import Navigator from "../../ui/Navigator";
import NavigatorTwo from "../../ui/NavigatorTwo";
import SettingsParent from "../SettingsParent";
import AccountSettings from "../ui/AccountSettings";

interface AddPaymentProps {
  onNavigateToAddBankDetails?: () => void;
  onNavigateToAddCryptoDetails?: () => void;
}

export default function AddPayment({
  onNavigateToAddBankDetails = () => {},
  onNavigateToAddCryptoDetails = () => {},
}: AddPaymentProps) {
 
  const BankStepsDesktop = [
    { label: "Add Bank/Crypto Info", href: "/main/settings" },
  ];
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("addPayment");


  return (
    <div className="flex flex-col bg-white lg:mr-8">
      {/* Conditionally render either SettingsParent or Add Payment */}
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              { label: "Add Bank/Crypto Info", onClick: () => console.log("Bank Info") },
            ]}
          />
          <div className="flex justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold ">
              Bank/Crypto Information
            </h1>
          </div>
          {/* Desktop Navigator */}
          <div className="hidden lg:flex">
            <Navigator currentStep={0} steps={BankStepsDesktop} />
          </div>

          <div>
            <p className="text-color-form text-sm tracking-tight lg:my-4">
              Select Type
            </p>
            <div className="flex gap-2 mt-2 cursor-pointer lg:mt-0">
              {/* Bank Account */}
              <AccountSettings
                containerStyle="bg-[#FCFCFC] w-[168px] h-[110px] hover:bg-slate-100 duration-150"
                iconSize="w-[24px] h-[24px] rounded-[9px]"
                settingIcon={<BsFileBarGraphFill className="text-color-one" />}
                setting="Add Bank"
                settingText="Account Details"
                settingsTextStyle="text-sm text-color-zero font-medium tracking-tight"
                navigate={
                  <MdKeyboardArrowRight className="text-[#7A7D8F] text-xl" />
                }
                flexStyle="flex-col"
                onClick={onNavigateToAddBankDetails}
              />
              {/* Crypto Wallet */}
              <AccountSettings
                containerStyle="bg-[#FCFCFC] items-start w-[168px] h-[110px] hover:bg-slate-100 duration-150"
                iconSize="w-[24px] h-[24px] rounded-[9px]"
                settingIcon={<TbTargetArrow className="text-color-one" />}
                setting="Add Crypto"
                settingText="Wallet Address"
                settingsTextStyle="text-sm text-color-zero font-medium tracking-tight"
                navigate={
                  <MdKeyboardArrowRight className="text-[#7A7D8F] text-xl" />
                }
                flexStyle="flex-col"
                onClick={onNavigateToAddCryptoDetails}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
