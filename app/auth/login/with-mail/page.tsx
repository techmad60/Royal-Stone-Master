"use client";
import Button from "@/components/ui/Button";
import Navigator from "@/components/ui/Navigator";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const loginSteps = [
  { label: "Sign in with", href: "/auth/login" },
  { label: "With Email", href: "/auth/login/with-mail" },
  { label: "Forgot Password", href: "/auth/login/with-mail/forgot-password" },
];

export default function WithMail() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetching setFullName from your Zustand store
  const setFullName = useUserStore((state) => state.setFullName);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      console.log("Sign In Response", result);
      setLoading(false);

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      // Save tokens in localStorage
      const { accessToken, refreshToken, account } = result.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("fullname", account.fullname); // Save user's full name
      localStorage.setItem("userId", account.id); // Store the userId
      console.log("Tokens stored successfully:", {
        accessToken,
        refreshToken,
        account,
      });

      // Save referralCode to Zustand store
      useUserStore.getState().setReferralCode(account.referralCode);
      
      setFullName(account.fullname);
      // Navigate to dashboard or next step
      router.push("/main/dashboard");
    } catch (err) {
      setLoading(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex flex-col lg:w-[420px] xl:w-[535px]">
      <Navigator currentStep={1} steps={loginSteps} />
      <form onSubmit={handleSubmit} className="flex flex-col mt-8 space-y-8">
        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five"
            placeholder="cooperwind@gmail.com"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Password</label>
          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="rounded-sm border-b border-slate-200 w-full text-colour-five"
              placeholder="eXample@123"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 flex hover:text-color-one "
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <Link
          href="/auth/login/with-mail/forgot-password"
          className="text-end text-sm text-color-one hover:text-green-700"
        >
          Forgot Password?
        </Link>
        {/* Error Message */}
        {error && <p className="text-red-500 text-xs">{error}</p>}
        {/* Sign in Button */}
        <Button
          type="submit"
          ButtonText={loading ? "Signing in..." : "Sign in"}
          className="py-3 mt-4 w-full lg:w-[417px] xl:w-[535px]"
          disabled={loading}
        />
      </form>
      <p className="text-slate-400 text-sm text-center mt-8 lg:w-[417px] xl:w-[535px]">
        Don&apos;t have an account?{" "}
        <span className="font-semibold text-color-one duration-300 hover:text-green-700">
          <Link href="/auth/signup">Sign up</Link>
        </span>
      </p>
    </div>
  );
}
