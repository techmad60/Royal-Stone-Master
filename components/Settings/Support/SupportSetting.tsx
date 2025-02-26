import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import Icon from "../../ui/Icon";
import SettingsParent from "../SettingsParent";

export default function Support() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("supportSetting");
  const [support, setSupport] = useState({
    email: "",
    phone: "",
    whatsapp: "",
  });

  useEffect(() => {
    const fetchSupportData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          console.error("No access token found");
          return;
        }

        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/support",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setSupport({
            email: data.data.email,
            phone: data.data.phone,
            whatsapp: data.data.whatsapp,
          });
        } else {
          console.error("Error fetching support data:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch support data:", error);
      }
    };

    fetchSupportData();
  }, []);

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
              { label: "Support", onClick: () => console.log("Support") },
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
                    Chat with us on WhatsApp
                  </p>
                  <p className="text-xs text-color-form">{support.whatsapp || "N/A"}</p>
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
              <div className="flex gap-4 lg:gap-3">
                <Icon
                  icon={<BsFillTelephoneFill className="text-color-one text-lg" />}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">Call an Agent</p>
                  <p className="text-xs text-color-form">{support.phone || "N/A"}</p>
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
                  <p className="text-sm text-color-zero font-medium">Send a Mail</p>
                  <p className="text-xs text-color-form">{support.email || "N/A"}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
