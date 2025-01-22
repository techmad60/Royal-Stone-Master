"use client";
import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { BsPersonCheck } from "react-icons/bs";
import { IoPeople } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
import Icon from "../../ui/Icon";
import SettingsParent from "../SettingsParent";

interface KycProps {
  onNavigatetoValidID: () => void;
  onNavigatetoNextofKin: () => void;
}
export default function Kyc({
  onNavigatetoValidID,
  onNavigatetoNextofKin,
}: KycProps) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("kycSetting");
  return (
    <div>
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Kyc",
                onClick: () => console.log("Bank Info"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">KYC</h1>
          </div>

          {/* ValidID */}
          <div className="flex flex-col space-y-4">
            <section
              className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common cursor-pointer hover:bg-slate-100 duration-150Ï lg:mt-4 lg:w-[361px] xl:w-[520px]"
              onClick={onNavigatetoValidID}
            >
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={<BsPersonCheck className="text-color-one text-lg" />}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">
                    Valid Identification
                  </p>
                  <p className="text-xs text-color-one">Provided</p>
                </div>
              </div>
              <MdKeyboardArrowRight className="text-2xl" />
            </section>

            {/* Passport */}
            <section
              className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common cursor-pointer hover:bg-slate-100 duration-150Ï lg:w-[361px] xl:w-[520px]"
              onClick={onNavigatetoNextofKin}
            >
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={<IoPeople className="text-color-one text-lg" />}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">
                    Next of Kin
                  </p>
                  <p className="text-xs text-color-one">Provided</p>
                </div>
              </div>
              <MdKeyboardArrowRight className="text-2xl" />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
