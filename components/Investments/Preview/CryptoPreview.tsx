import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
// import { BankDetails, CryptoWallet } from "@/types/Type";
import { FundCryptoWalletDetails } from "@/types/Type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBitcoin } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../ui/Button";

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  walletDetails: FundCryptoWalletDetails | null;
  error: string | null;
  // isLoading: boolean;
  amount: string;
  successMessage: string | null;
  paymentID: string | null;
}

export default function CryptoPreview({
  onClose = () => {},
  onProceed = () => {},
  successMessage,
  error,
  // isLoading,
  amount,
  walletDetails,
  paymentID,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProceed = async () => {
    setIsProcessing(true);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login/with-mail"); // Redirect if no token found
        return;
      }

      // Prepare the payload with the paymentID and token
      const response = await fetch("https://api-royal-stone.softwebdigital.com/api/fund/crypto", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentID }), // Sending paymentID in the body
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "An error occurred while processing the request.");
      }

      toast.success("Payment successful!"); // Display success message
      onProceed(); // Trigger any additional success behavior
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
    <ToastContainer />
      <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
        <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[484px]">
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
              Preview
            </p>
          </div>

          <p className="text-color-form text-sm m-6 border-b pb-4">
            Confirm these details of your transaction
          </p>
          <div className="flex gap-2 py-3 mx-6">
            <Icon
              icon={<FaBitcoin className="text-color-one text-2xl" />}
              containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
            />

            <div className="flex-col">
              <p className="font-medium text-color-zero">
                Fund Wallet Via Crypto
              </p>
              <p className="text-color-six text-sm">
                <p className="text-color-six text-sm">Crypto</p>
              </p>
            </div>
          </div>

          <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[147px] lg:p-5 lg:w-[572px] lg:h-[167px]">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Wallet Name</p>
              <p className="text-color-six">
                {walletDetails?.name ? walletDetails?.name : "BTC"}
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <p className="text-color-form">Wallet Address</p>
                <p className="text-color-six break-words">
                  {walletDetails?.address ? walletDetails?.address : "N/A"}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <p className="text-color-form">Amount</p>
                <p className="text-color-six">${amount}</p>
              </div>
            </div>
          </section>

          {error && ( // Display error message conditionally
            <div className="text-red-600 p-3 rounded">
              <p>{error}</p>
            </div>
          )}
          {successMessage && ( // Display success message conditionally
            <div className="text-green-600 p-3 rounded ml-4">
              <p>{successMessage}</p>
            </div>
          )}
          {isProcessing && (
            <div>
              <Loading />
            </div>
          )}
          <div className="mx-6 mt-3">
            <Button
              ButtonText={isProcessing ? "Proceeding..." : "Proceed"}
              className={`w-full ${isProcessing ? "bg-inactive" : "bg-color-one"}`}
              onClick={!isProcessing ? handleProceed : undefined} // Prevent clicking when loading
              disabled={isProcessing} // Disable the button when loading
            />
          </div>
        </div>
      </div>
    </div>
  );
}
