import CustomAlert from "@/components/ui/CustomAlert";
import Loading from "@/components/ui/Loading";
import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import SettingsParent from "../SettingsParent";
import Kyc from "./KycSettings";
import ValidID from "./ValidId";

export default function NextofKinSettings() {
  const [nextOfKin, setNextOfKin] = useState<{
    fullname: string;
    email: string;
    phone: string;
    address: string;
  }>({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [initialNextOfKin, setInitialNextOfKin] = useState(nextOfKin);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("nextOfKin");
  const [loading, setLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For alert message
  const [isModified, setIsModified] = useState(false); // Track if the form has been modified
  const router = useRouter();

  const token = localStorage.getItem("accessToken");

  //Reusable function to  fetch Next of Kin details
  const fetchNextOfKin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your token logic
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
      const fetchedNextOfKin = {
        fullname: responseData?.data?.nextOfKin?.fullname || "",
        email: responseData?.data?.nextOfKin?.email || "",
        phone: responseData?.data?.nextOfKin?.phone || "",
        address: responseData?.data?.nextOfKin?.address || "",
      };
      setNextOfKin(fetchedNextOfKin);
      setInitialNextOfKin(fetchedNextOfKin);
      console.log(responseData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  //Fetch Next Of KIn details on Mount...
  useEffect(() => {
    fetchNextOfKin();
  }, []);

  //Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNextOfKin((prev) => {
      const updatedNextOfKin = { ...prev, [name]: value };
      // Check if the updated profile is different from the initial one
      setIsModified(
        JSON.stringify(updatedNextOfKin) !== JSON.stringify(initialNextOfKin)
      );
      return updatedNextOfKin;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!token) {
        router.push("/auth/login");
        return;
      }

      // Create a copy of the original nextOfKin object and update only the modified fields
      const updatedNextOfKin = { ...nextOfKin };

      // Check for modifications, if a field is modified, keep the updated value
      if (nextOfKin.fullname === initialNextOfKin.fullname) {
        updatedNextOfKin.fullname = initialNextOfKin.fullname;
      }
      if (nextOfKin.email === initialNextOfKin.email) {
        updatedNextOfKin.email = initialNextOfKin.email;
      }
      if (nextOfKin.phone === initialNextOfKin.phone) {
        updatedNextOfKin.phone = initialNextOfKin.phone;
      }
      if (nextOfKin.address === initialNextOfKin.address) {
        updatedNextOfKin.address = initialNextOfKin.address;
      }

      if (Object.keys(updatedNextOfKin).length === 0) {
        alert("No changes made.");
        setLoading(false);
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
          body: JSON.stringify({
            nextOfKin: updatedNextOfKin, // Update only nextOfKin fields
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }

      // Fetch updated details after successful update
      await fetchNextOfKin();

      setTimeout(() => {
        setAlertMessage("Next Of Kin updated successfully! 🤙");
        setTimeout(() => {
          setAlertMessage(null);
          setCurrentPage("kycSetting");
        }, 2000);
      }, 0);
      // Reset isModified to false after successful update
      setIsModified(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div>
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : currentPage === "kycSetting" ? (
        <Kyc
          onNavigatetoValidID={() => setCurrentPage("validId")}
          onNavigatetoNextofKin={() => setCurrentPage("nextOfKin")}
        />
      ) : currentPage === "validId" ? (
        <ValidID />
      ) : (
        <div>
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Next Of Kin",
                onClick: () => setCurrentPage("nextOfKin"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Update your Next Of Kin Info
            </h1>
          </div>

          {/* Desktop Navigator */}
          <NavigatorTwo
            style="hidden lg:flex"
            links={[
              {
                label: "Kyc",
                onClick: () => setCurrentPage("kycSetting"),
              },
              {
                label: "Next of Kin",
                onClick: () => setCurrentPage("nextOfKin"),
              },
            ]}
          />
          <form
            className={`flex flex-col mt-6 space-y-8 lg:w-[300px] xl:w-[486px]`}
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Full Name</label>
              <input
                type="text"
                name="fullname"
                value={nextOfKin.fullname}
                required
                onChange={handleChange}
                className="rounded-sm border-b border-slate-200 placeholder:text-sm "
                placeholder="Cooper Winterwint"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Email</label>
              <input
                type="email"
                name="email"
                required
                value={nextOfKin.email}
                onChange={handleChange}
                className="rounded-sm border-b border-slate-200 placeholder:text-sm "
                placeholder="coopy@gmail.com"
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                value={nextOfKin.phone}
                onChange={handleChange}
                className="rounded-sm border-b border-slate-200 placeholder:text-sm "
                placeholder="+1 (183) 749-5876"
              />
            </div>

            {/* Address */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Address</label>
              <input
                type="text"
                name="address"
                required
                value={nextOfKin.address}
                onChange={handleChange}
                className="rounded-sm border-b border-slate-200 placeholder:text-sm "
                placeholder="31 Detroit road"
              />
            </div>

            <Button
              ButtonText={loading ? "Updating..." : "Finish"}
              className={`py-3 lg:w-[300px] xl:w-[486px]  ${
                isModified
                  ? "bg-color-one hover:bg-green-700"
                  : "bg-inactive cursor-not-allowed hover:bg-inactive"
              }`}
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
