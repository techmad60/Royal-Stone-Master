"use client";
import Button from "@/components/ui/Button";
import CustomAlert from "@/components/ui/CustomAlert";
import Navigator from "@/components/ui/Navigator";
import { Country, ICountry, IState, State } from "country-state-city";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const signupSteps = [
  { label: "Create Account", href: "/auth/signup" },
  { label: "With Mail", href: "/auth/signup/with-mail" },
  { label: "Verify Email", href: "/auth/signup/with-mail/verify-mail" },
  {
    label: "Complete Setup",
    href: "/auth/signup/with-mail/verify-mail/complete-setup",
  },
];

export default function CompleteSetup() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUsername] = useState(""); // New state for username
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For alert message
  const router = useRouter();

  // Fetch countries on component mount
  useEffect(() => {
    const fetchedCountries = Country.getAllCountries();
    setCountries(fetchedCountries);
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      const fetchedStates = State.getStatesOfCountry(selectedCountry);
      setStates(fetchedStates);
    }
  }, [selectedCountry]);
  // Retrieve access token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("Access token not found. Redirecting to login...");
      router.push("/auth/login"); // Redirect if no token
    } else {
      setAccessToken(token);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (
      !gender ||
      !username ||
      !selectedCountry ||
      !selectedState ||
      !address
    ) {
      alert("Please fill all fields before submitting.");
      setLoading(false);
      return;
    }

    // Prepare the data for the API request
    const requestData = {
      gender, // Ensure it matches "Male" or "Female"
      username, // Ensure the input value matches
      country:
        countries.find((c) => c.isoCode === selectedCountry)?.name ||
        selectedCountry, // Full country name
      state:
        states.find((s) => s.isoCode === selectedState)?.name || selectedState, // Full state name
      address,
    };

    console.log("Request Data:", requestData);

    try {
      if (!accessToken) {
        alert("Access token not found. Please log in again.");
        router.push("/auth/login");
        return;
      }

      // Send PUT request
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(requestData),
        }
      );

      // Log raw response
      const responseText = await response.text();
      console.log("Raw Response:", responseText);

      if (!response.ok) {
        // Log detailed error if the response is not OK
        throw new Error(`Error ${response.status}: ${responseText}`);
      }

      // Parse the response if successful
      const result = JSON.parse(responseText);
      console.log("Profile Updated Successfully:", result);
      setTimeout(() => {
        setAlertMessage("Profile updated successfully! 🤙");
      }, 2000);
      
      
      // Navigate to dashboard after delay
      router.push(`/auth/auth-dashboard`);
    } catch (error) {
      // Handle and log errors
      if (error instanceof Error) {
        console.error("Error Updating Profile:", error.message);
        alert(`Failed to update profile: ${error.message}`);
      } else {
        console.error("Unexpected Error:", error);
        alert("An unexpected error occurred while updating your profile.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <Navigator currentStep={3} steps={signupSteps} />
      <div className="flex items-center justify-between lg:w-[417px] xl:w-[535px]">
        <h1 className="text-colour-five text-base mt-8 lg:text-[18px]">
          Complete Setup
        </h1>
        <Link
          href="/auth/auth-dashboard"
          className="flex items-center justify-center text-sm text-white text-center mt-8 bg-color-one rounded-xl duration-300 hover:bg-green-700 w-[71px] h-[26px]"
        >
          Skip
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-8 space-y-8 lg:w-[420px] xl:w-[535px]"
      >
        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="rounded-sm border-b border-slate-200 text-colour-five w-full"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Username */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-sm border-b border-slate-200 text-colour-five"
            required
            placeholder="Cooper"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Country</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="rounded-sm border-b border-slate-200 text-colour-five w-full"
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country) => (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="rounded-sm border-b border-slate-200 text-colour-five w-full"
            disabled={!states.length}
            required
          >
            <option value="" disabled className="">
              Select State
            </option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div className="flex flex-col gap-2">
          <label className="text-color-form text-sm">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="rounded-sm border-b border-slate-200 text-colour-five"
            placeholder="5 lanes, Minneapolis"
          />
        </div>

        <Button
          type="submit"
          ButtonText={loading ? "Processing" : "Process"}
          className="py-3 mt-20 w-full lg:w-[417px] xl:w-[535px]"
        />
      </form>
      {/* Custom Alert */}
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          style="bg-color-one text-white text-sm p-4 rounded shadow-lg text-center h-16 w-68"
        />
      )}
    </div>
  );
}
