import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";

interface SendOtpProps {
  onClose: () => void;
  onVerify: () => void;
}

export default function SendOtp({ onClose, onVerify }: SendOtpProps) {
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

  const handleVerify = async () => {
    setLoading(true);
    setFeedbackMessage(null); // Reset feedback message

    try {
      // Retrieve token from local storage
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token is missing. Please log in again.");
      }

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/request-password-update",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the access token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || "Failed to send OTP. Please try again.");
      }

      if (response.status === 401) {
        router.push("/auth/login");
      }

      // Handle success
      const data = await response.json();
      console.log("OTP Request Successful:", data);
      setFeedbackMessage("OTP sent successfully. Please check your email.");
      setIsSuccess(true);

      // Wait 2 seconds before closing the modal
      setTimeout(() => {
        onVerify(); // Navigate to "Change Password"
        onClose(); // Close modal
      }, 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFeedbackMessage(error.message);
      } else {
        setFeedbackMessage("An unexpected error occurred.");
      }
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

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
            Change Password
          </p>
        </div>

        <div className="flex items-center gap-4 my-1 p-4">
          <p className="text-color-form text-sm">
            To reset your password kindly verify with an OTP that will be sent
            to your email.
          </p>
        </div>

        <div className="mt-8 m-4">
          <Button
            ButtonText={loading ? "Sending OTP..." : "Verify"}
            className="py-3 w-full lg:w-full"
            onClick={handleVerify}
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
