import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import NavigatorTwo from "../../ui/NavigatorTwo";
import OtpInput from "../../ui/OtpInput";
import SettingsParent from "../SettingsParent";
import SecuritySettings from "./SecuritySetting";

interface VerifyOtpProps {
  onNavigateToChangePassword?: () => void;
}

export default function VerifyOtpSetting({
  onNavigateToChangePassword = () => {},
}: VerifyOtpProps) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState("verifyOtp")
  const isMobile = useMediaQuery("(max-width: 1024px)"); 

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);


  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    } else if (!value && index > 0) {
      // If deleting, move focus to previous input
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData("Text").slice(0, 6); // Limit to 6 characters
    const updatedOtp = [...otp];
    for (let i = 0; i < pastedValue.length; i++) {
      updatedOtp[i] = pastedValue[i];
    }
    setOtp(updatedOtp);
  };
  const token = localStorage.getItem("accessToken");
  const handleResendEmail = async () => {
    setResendLoading(true);
    setResendStatus(null);
    try {
      // const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Access token missing. Please log in again.");

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/request-password-update",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to resend OTP.");
      }

      setResendStatus("OTP sent successfully.");
    } catch (error: unknown) {
      // Use `unknown` to type the error
      if (error instanceof Error) {
        setResendStatus(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setResendLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/verify-password-update-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ otp: fullOtp }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed.");
      }

      // OTP is verified successfully
      onNavigateToChangePassword(); // Navigate to the next step
    } catch (error: unknown) {
      // Use `unknown` to type the error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : currentPage === "security" ? (
        <SecuritySettings onVerifyClick={()=> setCurrentPage ("verifyOtp")}/>
      ) : (
        <div className="flex flex-col">
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings")},
              { label: "Security", onClick: () => setCurrentPage("security") },
              { label: "Verify Otp", onClick: () => console.log("Verify Otp") },
            ]}
          />
          <div className="justify-between my-6 hidden lg:flex lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold ">
              Security
            </h1>
          </div>
          {/* Desktop Navigator */}
          <NavigatorTwo
            style="hidden lg:flex"
            links={[
              { label: "Security", onClick: () => setCurrentPage("security") },
              { label: "Verify Otp", onClick: () => console.log("Verify Otp") },
            ]}
          />
          <section className="flex flex-col max-w-[417px]">
            <h1 className="text-colour-five text-base mt-8 lg:text-[18px]">
              Verify Email
            </h1>
            <p className="text-sm text-color-form mt-2">
              Kindly input the OTP sent to{" "}
              <span className="font-semibold">{email || "your email"}</span> to
              verify your account and complete your password change.
            </p>
            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
              <OtpInput
                otp={otp}
                onChange={handleChange}
                onPaste={handlePaste}
              />
              {error && (
                <p className="text-red-500 text-xs mt-4 text-start">{error}</p>
              )}

              <p className="text-slate-400 text-xs mt-8">
                Didn&apos;t get any email?{" "}
                <button
                  onClick={handleResendEmail}
                  className="text-color-one duration-300 hover:text-green-700"
                  disabled={resendLoading}
                >
                  {resendLoading ? "Resending..." : "Resend"}
                </button>
              </p>
              {resendStatus && (
                <p
                  className={`text-xs mt-2 text-start ${
                    resendStatus.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {resendStatus}
                </p>
              )}

              <Button
                type="submit"
                ButtonText={loading ? "Verifying..." : "Verify"}
                className="py-3 mt-8 w-full lg:w-[417px]"
                disabled={loading}
              />
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
