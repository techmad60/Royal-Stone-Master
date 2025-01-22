"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navigator from "@/components/ui/Navigator";
import Button from "@/components/ui/Button";

const loginSteps = [
  { label: "Sign in with", href: "/auth/login" },
  { label: "With Email", href: "/auth/login/with-mail" },
  { label: "Forgot Password", href: "/auth/login/with-mail/forgot-password" },
];

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setLoading(false);
      setError("Please enter a valid email address.");
      return;
    }
  
    try {
      // Send GET request with email as a query parameter
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/auth/forgot-password?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
  
      // Navigate to the verification page with the email as a query parameter
      router.push(
        `/auth/login/with-mail/forgot-password/verify-email?email=${encodeURIComponent(
          email
        )}`
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col lg:w-[417px] xl:w-[33.5rem]">
      <Navigator currentStep={2} steps={loginSteps} />
      <form className="flex flex-col mt-8" onSubmit={handleSubmit}>
        <label className="text-sm text-color-form mt-2">
          Kindly provide your email address
        </label>

        {/* Email Input */}
        <div className="flex flex-col mt-2">
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-sm border-b border-slate-200"
            placeholder="cooperwind@gmail.com"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          ButtonText={loading ? "Processing..." : "Proceed"}
          disabled={loading}
          className="py-3 mt-24 lg:mt-16 lg:w-[417px] xl:w-[535px]"
        />
      </form>
    </div>
  );
}
