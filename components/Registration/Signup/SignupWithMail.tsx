"use client";
import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/Checkedbox";
import Navigator from "@/components/ui/Navigator";
import EmptyBox from "@/components/ui/UncheckedBox";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const signupSteps = [
  { label: "Create Account", href: "/auth/signup" },
  { label: "With Email", href: "/auth/signup/with-mail" },
];

export default function SignupWithMail() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    referralCode: "",
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Track if button is disabled
  const router = useRouter();

  // Fetching setFullName from your Zustand store
  const setFullName = useUserStore((state) => state.setFullName);

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Toggle the checkbox state
  const toggleCheckbox = () => setIsChecked(!isChecked);

  // Handle form field updates
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const { name, email, password, phone } = formData;
    const allRequiredFieldsFilled =
      name && email && password && phone && isChecked; // Include isChecked to ensure checkbox is ticked

    setIsButtonDisabled(!allRequiredFieldsFilled); // Disable button if any required field is empty
  }, [formData, isChecked]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    setPasswordError(null);
    setEmailError(null);

    // Check for empty fields manually
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError("All fields are required.");
      return;
    }

    // Password validation regex
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long and include an uppercase letter, a number, and a special character."
      );
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!isChecked) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Step 1: Register the user
      const registrationResponse = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            fullname: formData.name,
            phone: formData.phone,
            referral: formData.referralCode || undefined, // optional field
          }),
        }
      );

      const registrationResult = await registrationResponse.json();
      console.log("RegistrationInfo:", registrationResult)

      if (!registrationResponse.ok) {
        throw new Error(registrationResult.message || "Registration failed");
      }
      // Save tokens in localStorage
      const { accessToken, refreshToken, account } = registrationResult.data;
      localStorage.setItem("userId", account.id);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("email", formData.email);
      
      //Save fullname to store
      setFullName(formData.name);

      // Save referralCode to Zustand store
    const { referralCode } = account;
    useUserStore.getState().setReferralCode(referralCode);
      
      console.log("Tokens stored successfully:", { accessToken, refreshToken });

      // Step 2: Trigger email verification
      const verificationResponse = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/auth/request-verification?email=${encodeURIComponent(
          formData.email
        )}`,
        {
          method: "GET",
        }
      );

      const verificationResult = await verificationResponse.json();

      if (!verificationResponse.ok) {
        throw new Error(
          verificationResult.message || "Failed to send verification email"
        );
      }

      console.log("Verification email sent:", verificationResult);

      // Navigate to the verification page with the email as a query parameter
      router.push(
        `/auth/signup/with-mail/verify-mail?email=${encodeURIComponent(
          formData.email
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
  // Check if all required fields are filled
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.phone &&
    isChecked;

  return (
    <div className="flex flex-col">
      <Navigator currentStep={1} steps={signupSteps} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-8 space-y-8 lg:w-[417px] xl:w-[33.5rem]"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five"
            placeholder="Cooper Winterwind"
          />
        </div>
        
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
          {emailError && (
            <p className="text-red-500 text-xs mt-1 text-start">{emailError}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Phone Number</label>
          <PhoneInput
            country={"us"} // Default country (you can change it)
            value={formData.phone}
            onChange={(phone) => setFormData((prev) => ({ ...prev, phone }))}
            inputStyle={{
              width: "100%",
              color: "#0F1C39", // Adjust the text color if needed
              fontSize: "14px", // Set a consistent font size
              border: "none"
            }}
            containerStyle={{
              borderBottom: "1px solid #e2e8f0"
            }}
            buttonStyle={{
              border: "none",
              backgroundColor: "transparent", // Removes button background
              // padding: "5px",
            }}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
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
              className="absolute right-3 flex hover:text-color-one"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            
          </div>
          {passwordError && (
              <p className="text-red-500 text-xs mt-1 text-start">
                {passwordError}
              </p>
            )}
        </div>

       

        {/* Referral Code */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">
            Referral Code (Optional)
          </label>
          <input
            type="text"
            name="referralCode"
            value={formData.referralCode}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five"
            placeholder="091156"
          />
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2">
          <div onClick={toggleCheckbox} className="cursor-pointer">
            {isChecked ? <CheckBox /> : <EmptyBox />}
          </div>
          <Link href="/landing-page/terms-of-service" className="text-sm text-color-form">
            Accept{" "}
            <span className="cursor-pointer pb-[0.02rem] border-b hover:text-color-one">
              terms & conditions.
            </span>
          </Link>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

        {/* Submit Button */}
        <Button
          type="submit"
          ButtonText={loading ? "Creating Account..." : "Create Account"}
          className={`py-3 w-full mt-2 lg:w-[417px] xl:w-[536px] ${isButtonDisabled ? "bg-inactive cursor-not-allowed hover:bg-inactive" : "bg-color-one hover:bg-green-700"}`}
          disabled={!isFormValid || loading || isButtonDisabled}
        />
      </form>
      <p className="text-slate-400 text-center mt-8 lg:w-[417px] xl:w-[536px]">
        Already have an account?{" "}
        <span className="font-semibold text-color-one duration-300 hover:text-green-700">
          <Link href="/auth/login">Sign in</Link>
        </span>
      </p>
    </div>
  );
}
