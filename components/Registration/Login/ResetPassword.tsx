"use client";
import { useState, useEffect } from "react";
import Navigator from "@/components/ui/Navigator";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { useSearchParams, useRouter } from "next/navigation";

const loginSteps = [
  { label: "Sign in with", href: "/auth/login" },
  { label: "With Email", href: "/auth/login/with-mail" },
  { label: "Forgot Password", href: "/auth/login/with-mail/forgot-password" },
];

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState<string | null>(null);
  const [otp, setOtp] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Fetch and validate query parameters on component mount
  useEffect(() => {
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");

    if (!emailParam || !otpParam) {
      setError("Invalid or missing email/OTP.");
    } else {
      setEmail(emailParam);
      setOtp(otpParam);
    }
  }, [searchParams]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      setError(
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!email || !otp) {
      setError("Invalid or missing email/OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://api-royal-stone.softwebdigital.com/api/auth/reset-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to reset password.");
      }

      console.log("Password reset successful:", result);
      router.push("/auth/login/with-mail"); // Redirect to login page
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navigator currentStep={2} steps={loginSteps} />
      <h1 className="text-colour-five text-base mt-8 lg:text-[18px]">Reset Password</h1>
      <p className="text-sm text-color-form mt-2">Provide your new password</p>
      <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-8 lg:w-[417px] xl:w-[535px]">
        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-sm border-b border-slate-200 w-full text-colour-five"
              placeholder="eXample@123"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 flex hover:text-color-one"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Confirm Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="rounded-sm border-b border-slate-200 w-full text-colour-five"
              placeholder="eXample@123"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 flex hover:text-color-one"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

        <Button
          ButtonText={loading ? "Saving..." : "Save New Password"}
          className="py-3 mt-24 lg:w-[417px] lg:mt-16 xl:w-[535px]"
          disabled={loading}
        />
      </form>
    </div>
  );
}
