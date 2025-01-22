import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Icon from "../../ui/Icon";
import SettingsParent from "../SettingsParent";

export default function Support() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("supportSetting");
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
                label: "Support",
                onClick: () => console.log("Support"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">Support</h1>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={<FaWhatsappSquare className="text-color-one text-lg" />}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">
                    Chat with us on whatsapp
                  </p>
                  <p className="text-xs text-color-form">09010201223</p>
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={
                    <BsFillTelephoneFill className="text-color-one text-lg" />
                  }
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">
                    Call an Agent
                  </p>
                  <p className="text-xs text-color-form">09010201223</p>
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={<IoIosMail className="text-color-one text-lg" />}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">
                    Send a Mail
                  </p>
                  <p className="text-xs text-color-form">
                    Support@royalstone.com
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
