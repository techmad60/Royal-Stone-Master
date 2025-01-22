import Loading from "@/components/ui/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";

interface DeleteAccountProps {
  onClose: () => void;
}

export default function DeleteAccount({
  onClose,
}: DeleteAccountProps) {
  const [loading, setLoading] = useState(false); // Loading state
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // Feedback message
  const [isSuccess, setIsSuccess] = useState(false); // Success state
  const router = useRouter();

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDeleteAccount = async () => {
    setLoading(true);
    setFeedbackMessage(null); // Reset feedback message
    
    // Retrieve the token from local storage
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      alert("User is not authenticated. Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/profile",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        router.push("/auth/login");
        setIsSuccess(true);
      } else {
        const errorData = await response.json();
        console.error("Error deleting account:", errorData);
        alert(
          errorData?.message || "Failed to delete account. Please try again."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert(
        "An error occurred. Please check your internet connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
        <div><Loading/></div>
    )
  }

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[335px] lg:rounded-[20px] lg:max-w-[433px] lg:h-[276px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Delete Account
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 my-1 p-4">
          <p className="text-color-form text-sm text-center">
            Are you sure you want to delete your account? <br/>
            <span> We don&apos;t wanna let you go 😥.</span>
          </p>
        </div>

        <div className="mt-8 m-4">
          <Button
            ButtonText={loading ? "Deleting Account..." : "Delete"}
            className="py-3 w-full lg:w-full"
            onClick={handleDeleteAccount}
            disabled={loading} // Disable button during loading
          />
        </div>

        {/* Display feedback message below the button */}
        {feedbackMessage && (
          <p
            className={`text-start text-sm pl-4 ${
              isSuccess ? "text-green-500" : "text-red-500"
            }`}
          >
            {feedbackMessage}
          </p>
        )}
      </div>
    </div>
  );
}
