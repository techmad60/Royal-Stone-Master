import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Timer from "@/components/ui/Timer";
import useInvestmentStore from "@/store/investmentStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StatRow from "../../ui/StatRow";
// Ensure correct path

interface WalletDetails {
  id: string;
  name: string;
  address: string;
}

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  amount: string;
  walletType: string;
}

export default function CryptoFunding({
  onClose,
  onProceed,
  amount,
  walletType,
}: MyComponentProps) {
  const [walletDetails, setWalletDetails] = useState<WalletDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Fetch wallet details
    const fetchWalletDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/fund?type=crypto",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch wallet details");
        }
        const result = await response.json();
        setWalletDetails(result.data[0]); // Assuming `result.data[0]` contains the wallet details
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          console.error("An unknown error occurred:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletDetails();
  }, [router]);

  const handleSubmission = async () => {
    // Validate wallet details
    if (!walletDetails) {
      setError("Wallet details are not available.");
      return;
    }

    // Validate wallet type
    if (!walletType) {
      setError("Wallet type is required.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/fund/bank-deposit",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletType: walletType,
            beneficiary: walletDetails?.id, // Assuming wallet address is used as beneficiary
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to complete the transaction.");
      }

      const result = await response.json();
      const { id } = result.data.wallets;

      // Set investment ID to Zustand store
      const { setInvestmentId } = useInvestmentStore.getState();
      setInvestmentId(id);

      // Proceed to the next step
      onProceed();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.error("An unknown error occurred:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="bg-white flex flex-col rounded-[20px] h-[599px] w-full lg:max-w-[621px] lg:h-[585px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Make Investment
          </p>
        </div>
        <p className="text-color-form text-sm mx-4 py-4">
          You are required to make a wallet transfer of ${amount} to the details
          provided within an hour to proceed with your investment payment.
        </p>
        <section className="flex flex-col justify-center items-center rounded-[10px] h-[91px] space-y-4 shadow-sm mx-4 text-sm lg:p-5 lg:w-[572px]">
          <p className="text-color-form">Timer</p>
          <Timer initialTime={3600} onTimeUp={onClose} />
        </section>
        <section className="flex flex-col mt-4 bg-light-grey mx-6 rounded-[10px] px-4 shadow-sm">
          <StatRow label="Amount" value={`$${amount}`} valueClass="text-color-six text-sm" />
          <StatRow
            label="Network"
            value={walletDetails?.name || "BTC"}
            valueClass="text-color-six text-sm"
          />
          <StatRow
            label="Wallet Address"
            value={walletDetails?.address || "Loading..."}
            valueClass="text-color-six text-sm"
            showCopyIcon
            isLast={true}
          />
        </section>
        {error && (
          <p className="text-red-500 text-sm text-center mx-4 mt-2">{error}</p>
        )}
        {isLoading && <Loading />}
        <hr className="mt-8" />
        <div className="mt-12 mx-6 lg:mt-8">
          <Button
            ButtonText={isSubmitting ? "Processing..." : "I have made the transfer"}
            className="bg-color-one w-full"
            onClick={handleSubmission}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
