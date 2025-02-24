import DeleteButton from "@/components/ui/DeleteButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

interface LogOutProps {
  onClose: () => void;
}

export default function LogOut({ onClose }: LogOutProps) {
  const [loading, setLoading] = useState(false); // Loading state
  const router = useRouter();

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleLogOut = () => {
    setLoading(true);
    // Close the modal first
    onClose();

    setTimeout(() => {
      // Show success toast after modal closes
      toast.success("Logging out...");

      setTimeout(() => {
        // Get user data
        const userId = localStorage.getItem("userId");
        const userName = localStorage.getItem("userName");

        // Define KYC-related keys to preserve
        const kycKeys = [
          "isBankDetailsProvided",
          "isCryptoDetailsProvided",
          "isValidIdProvided",
          "isNextOfKinProvided",
          "isProfilePictureProvided",
        ];

        // Preserve the KYC statuses and username for the current user
        const preservedData: Record<string, string | null> = { userName };
        if (userId) {
          kycKeys.forEach((key) => {
            preservedData[key] = localStorage.getItem(`${key}-${userId}`);
          });
        }

        // Remove all keys except preserved ones
        Object.keys(localStorage).forEach((key) => {
          if (
            key !== "userName" &&
            !kycKeys.some((kycKey) => key.startsWith(`${kycKey}-${userId}`))
          ) {
            localStorage.removeItem(key);
          }
        });

        // Restore the preserved data
        if (userId) {
          kycKeys.forEach((key) => {
            const statusValue = preservedData[key];
            if (statusValue !== null) {
              localStorage.setItem(`${key}-${userId}`, statusValue);
            }
          });
        }
        if (userName) {
          localStorage.setItem("userName", userName);
        }

        // Redirect after logout
        router.push("/auth/login/with-mail");
        setLoading(false);
      }, 1000); // Delay before logging out for better UX
    }, 500); // Delay before showing toast after modal closes
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[260px] lg:rounded-[20px] lg:max-w-[433px] lg:h-[250px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Log Out
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 my-1 p-4">
          <p className="text-color-form text-sm text-center">
            Are you sure you want to log out 🤔 ? <br />
          </p>
        </div>

        <div className="mt-8 m-4 flex gap-3">
          <Button
            ButtonText={"Cancel"}
            className="py-3 w-full lg:w-full"
            onClick={onClose}
          />
          <DeleteButton
            ButtonText={loading ? "Logging Out..." : "Log Out"}
            className="py-3 w-full lg:w-full"
            onClick={handleLogOut}
            disabled={loading} // Disable button during loading
          />
        </div>
      </div>
    </div>
  );
}
