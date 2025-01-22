"use client";
import Loading from "@/components/ui/Loading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useUserStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import Button from "../../ui/Button";
import CustomAlert from "../../ui/CustomAlert";
import NavigatorTwo from "../../ui/NavigatorTwo";
import SettingsParent from "../SettingsParent";

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    username: "",
    country: "",
    state: "",
    address: "",
  });
  const [initialProfile, setInitialProfile] = useState(profile); // Store initial profile data
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For alert message
  const [isModified, setIsModified] = useState(false); // Track if the form has been modified
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("addPayment");

  // Get setFullName from Zustand store
  const setFullName = useUserStore((state) => state.setFullName);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log(token);
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/auth/login");
          }
          throw new Error("Failed to fetch profile data.");
        }

        const responseData = await response.json();
        console.log("Profile data:", responseData);

        // Ensure the structure matches the API documentation
        if (responseData?.status && responseData?.data) {
          const fetchedProfile = {
            fullname: responseData.data.fullname || "",
            email: responseData.data.email || "",
            phoneNumber: responseData.data.phone || "",
            username: responseData.data.username || "",
            country: responseData.data.country || "",
            state: responseData.data.state || "",
            address: responseData.data.address || "",
          };
          setProfile(fetchedProfile);
          setInitialProfile(fetchedProfile); // Store the fetched profile as initial state
        } else {
          console.error("Unexpected data structure:", responseData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [router]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updatedProfile = { ...prev, [name]: value };
      // Check if the updated profile is different from the initial one
      setIsModified(
        JSON.stringify(updatedProfile) !== JSON.stringify(initialProfile)
      );
      return updatedProfile;
    });
  };
  
  //Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("accessToken"); // Retrieve token from local storage
      if (!token) {
        router.push("/auth/login");
        return; // Stop execution if the token is not found
      }

      // Prepare only the modified fields
      const updatedProfile: { [key: string]: string } = {};

      // Check each field and add it to the updatedProfile if modified
      if (profile.fullname !== initialProfile.fullname)
        updatedProfile.fullname = profile.fullname;
      if (profile.email !== initialProfile.email)
        updatedProfile.email = profile.email;
      if (profile.phoneNumber !== initialProfile.phoneNumber)
        updatedProfile.phoneNumber = profile.phoneNumber;
      if (profile.username !== initialProfile.username)
        updatedProfile.username = profile.username;
      if (profile.country !== initialProfile.country)
        updatedProfile.country = profile.country;
      if (profile.state !== initialProfile.state)
        updatedProfile.state = profile.state;
      if (profile.address !== initialProfile.address)
        updatedProfile.address = profile.address;

      // If there are no modifications, do not send the request
      if (Object.keys(updatedProfile).length === 0) {
        alert("No changes made.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProfile),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
      setInitialProfile(profile); // Update initial profile after a successful save
      setFullName(profile.fullname);
      setTimeout(() => {
        setAlertMessage("Profile updated successfully! 🤙");
        setTimeout(() => {
          setAlertMessage(null);
          setCurrentPage("settings"); // Clear the alert message after 1 second
        }, 1000); // Delay before clearing the message
      }, 0);
      setIsModified(false)
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      {/* Conditionally render either SettingsParent or ProfileSettings */}
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Profile Settings",
                onClick: () => console.log("Profile Settings"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Profile Settings
            </h1>
          </div>
          <form
            className="flex flex-col mt-6 space-y-8 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px]"
            onSubmit={handleSubmit}
          >
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={profile.fullname}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="Cooper Winterwind"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="cooperwind@gmail.com"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="+1 555-123-4567"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="Cooper"
              />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1">
              <label className="text-color-form text-sm">Country</label>
              <div className="relative border-b border-slate-200">
                <input
                  type="text"
                  name="country"
                  value={profile.country}
                  onChange={handleChange}
                  required
                  className="rounded-sm text-color-zero py-1"
                  placeholder="Nigeria"
                />
                <div className="absolute top-3 right-3">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            {/* State */}
            <div className="flex flex-col gap-1">
              <label className="text-color-form text-sm">State</label>
              <div className="relative border-b border-slate-200">
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  required
                  className="rounded-sm text-color-zero py-1"
                  placeholder="Lagos"
                />
                <div className="absolute top-3 right-3">
                  <IoIosArrowDown />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="31 Olorunjare Street, Pako-Akoka"
              />
            </div>
            <Button
              ButtonText={isLoading ? "Saving..." : "Save"}
              className={`py-3 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px] 
    ${
      isModified
        ? "bg-color-one hover:bg-green-700"
        : "bg-inactive cursor-not-allowed hover:bg-inactive"
    }
  `}
              disabled={!isModified} // Disable the button if no changes were made
            />
          </form>
        </div>
      )}
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
