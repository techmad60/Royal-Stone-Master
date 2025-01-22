import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useState } from "react";
import { IoIosLock } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import Icon from "../../ui/Icon";
import NavigatorTwo from "../../ui/NavigatorTwo";
import SettingsParent from "../SettingsParent";
import SendOtp from "./SendOtp";

interface SecuritySettingsProps {
  onVerifyClick: () => void;
}

export default function SecuritySettings({
  onVerifyClick = () => {},
}: SecuritySettingsProps) {
  const [checkOtpModal, setIsCheckOtpModal] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 1024px)"); // Adjust the query as needed
  const [currentPage, setCurrentPage] = useState("securitySettings");

  const handle2FAToggle = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in again.");

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/update-security-settings",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ twoFactorAuthentication: !is2FAEnabled }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(
          responseData.message || "Failed to update 2FA settings."
        );
      }
      setIs2FAEnabled((prev) => !prev);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlecheckOtp = () => {
    setIsCheckOtpModal(true);
  };

  return (
    <div>
      {/* Conditionally render either SettingsParent or SecuritySettings */}
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Security",
                onClick: () => console.log("Security Settings"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Security
            </h1>
          </div>
          <div className="flex flex-col space-y-4 mt-6">
            <section
              className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common cursor-pointer lg:w-[350px] lg:h-[67px] xl:w-[520px]"
              onClick={handlecheckOtp}
            >
              <div className="flex gap-2 lg:gap-3">
                <Icon
                  icon={
                    <IoIosLock className="text-color-one text-2xl lg:text-lg" />
                  }
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium cursor-pointer">
                    Change Password
                  </p>
                  <p className="text-xs text-color-form">
                    Change your Password.
                  </p>
                </div>
              </div>
              <div>
                <MdKeyboardArrowRight className="text-xl" />
              </div>
            </section>

            <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common cursor-pointer lg:w-[350px] lg:h-[67px] xl:w-[520px]">
              <div className="flex gap-2 lg:gap-3">
                <Icon
                  icon={
                    <p className="flex justify-self-center self-center leading-none text-color-one text-sm">
                      ****
                    </p>
                  }
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium">2FA</p>
                  <p className="text-xs text-color-form">
                    Two factor Authentication
                  </p>
                </div>
              </div>

              <div>
                <button
                  onClick={handle2FAToggle}
                  className={`w-[32.4px] h-[20px] flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                    is2FAEnabled ? "bg-color-one" : "bg-gray-300"
                  }`}
                  disabled={loading}
                >
                  <span
                    className={`bg-white w-[14.4px] h-[14.4px] rounded-full shadow-md transform transition-transform duration-300 ${
                      is2FAEnabled ? "translate-x-3" : "translate-x-0"
                    }`}
                  />
                  {loading && (
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white">
                      ...
                    </span>
                  )}
                </button>
                {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
              </div>
            </section>
          </div>
        </div>
      )}

      {checkOtpModal && (
        <SendOtp
          onClose={() => setIsCheckOtpModal(false)}
          onVerify={onVerifyClick}
        />
      )}
    </div>
  );
}
