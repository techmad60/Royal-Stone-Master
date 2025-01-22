"use client";
import { useState, useEffect} from "react";
import Navigator from "@/components/ui/Navigator";
import Button from "@/components/ui/Button";
import OtpInput from "../../ui/OtpInput";
import { useRouter, useSearchParams } from "next/navigation";

const signupSteps = [
  { label: "Create Account", href: "/auth/signup" },
  { label: "With Email", href: "/auth/signup/with-mail" },
  { label: "Verify Email", href: "/auth/signup/with-mail/verify-mail" },
];

export default function VerifyMail() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();


  useEffect(() => {
    const emailParam = searchParams?.get("email");
    if (!emailParam) {
      setError("Email is required to verify your account.");
    } else {
      setEmail(emailParam);
    }
  }, [searchParams]);


  // Retrieve access token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      console.log("Access token retrieved:", token); // Optional: for debugging
    } else {
      console.warn("No access token found in localStorage.");
    }
  }, []);

  const handleResendEmail = async () => {
    if (!email) {
      setError("Email is missing. Cannot resend verification email.");
      return;
    }

    setResendLoading(true);
    setResendStatus(null);

    try {
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/auth/request-verification?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to resend verification email."
        );
      }

      setResendStatus("Verification email sent successfully.");
    } catch (err: unknown) {
      setResendStatus(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setResendLoading(false);
    }
  };

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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!email) {
      setError("Email is missing. Cannot verify OTP.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/auth/verify-account",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            email,
            verificationCode: fullOtp,
          }),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        const errorMessage = result.message || "OTP verification failed.";
        throw new Error(errorMessage);
      }

      console.log("OTP verified successfully:", result);
      router.push("/auth/signup/with-mail/verify-mail/complete-setup");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navigator currentStep={2} steps={signupSteps} />
      <section className="flex flex-col max-w-[417px]">
        <h1 className="text-colour-five text-base mt-8 lg:text-[18px]">
          Verify Email
        </h1>
        <p className="text-sm text-color-form mt-2">
          Kindly input the OTP sent to <strong>{email}</strong> to verify your
          account and complete the signup process.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <OtpInput otp={otp} onChange={handleChange} onPaste={handlePaste} />
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
  );
}
