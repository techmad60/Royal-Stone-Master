"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navigator from "@/components/ui/Navigator";
import Button from "@/components/ui/Button";
import OtpInput from "../../ui/OtpInput";

const loginSteps = [
  { label: "Sign in", href: "/auth/login" },
  { label: "With email", href: "/auth/login/with-mail" },
  { label: "Forgot Password", href: "/auth/login/with-mail/forgot-password" },
];

export default function VerifyMail() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

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

  const handleResendOtp = async () => {
    if (!email) {
      setError("Email is missing. Cannot resend OTP.");
      return;
    }

    setResendLoading(true);
    setResendStatus(null);

    try {
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/auth/forgot-password?email=${encodeURIComponent(
          email
        )}`
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to resend OTP.");
      }

      setResendStatus("OTP sent successfully to your email.");
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
      setError("Email is missing. Cannot proceed.");
      return;
    }

    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/auth/verify-forgot-password-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp: fullOtp }),
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to verify OTP.");
      }

      // Redirect to reset password page
      router.push(
        `/auth/login/with-mail/forgot-password/verify-email/reset-password?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(fullOtp)}`
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <div className="flex flex-col">
      <Navigator currentStep={2} steps={loginSteps} />
      <section className="flex flex-col max-w-[417px]">
        <h1 className="text-colour-five text-base mt-8 lg:text-[18px]">
          Verify Email
        </h1>
        <p className="text-sm text-color-form mt-2">
          Kindly input the OTP sent to <strong>{email}</strong> to verify your
          account and complete your password change.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <OtpInput otp={otp} onChange={handleChange} onPaste={handlePaste} />

          {error && <p className="text-red-500 text-xs mt-4">{error}</p>}

          <p className="text-slate-400 text-xs mt-8">
            Didn&apos;t get the email?{" "}
            <button
              onClick={handleResendOtp}
              className="text-color-one duration-300 hover:text-green-700"
              disabled={resendLoading}
            >
              {resendLoading ? "Resending..." : "Resend"}
            </button>
          </p>
          {resendStatus && (
            <p
              className={`text-xs mt-2 ${
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
            ButtonText="Verify"
            className="py-3 mt-12 w-full lg:w-[417px]"
          />
        </form>
      </section>
    </div>
  );
}
