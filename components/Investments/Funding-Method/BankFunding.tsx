import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Timer from "@/components/ui/Timer";
import useInvestmentStore from "@/store/investmentStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StatRow from "../../ui/StatRow";

interface BankDetails {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  bankAddress: string;
  routingNumber: string;
}

interface MyComponentProps {
  onClose: () => void;
  onProceed: () => void;
  amount: string;
  walletType: string;
}

export default function BankFunding({
  onClose,
  onProceed,
  amount,
  walletType,
}: MyComponentProps) {
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
//   const [investmentId, setInvestmentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const fetchBankDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/fund?type=bank-deposit",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch bank details");
        }

        const result = await response.json();
        setBankDetails(result.data[0]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // Accessing the error message safely
        } else {
          console.error("An unknown error occurred:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchBankDetails();
  }, [router]);

  const handleSubmission = async () => {
    if (!bankDetails) {
      setError("Bank details are not available.");
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
            beneficiary: bankDetails.id, // Assuming this maps to `beneficiary`
            amount: amount,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to complete the transaction."
        );
      }
      const result = await response.json();
      console.log("Successful Response:", result);
      const { id } = result.data.wallets;
    // Pass id to store
    useInvestmentStore.getState().setInvestmentId(id);

    // Retrieve investmentId after setting it
    const investmentId = useInvestmentStore.getState().investmentId;
    console.log("Investment ID:", investmentId);
      //Proceed to receipt
      onProceed();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Accessing the error message safely
      } else {
        console.error("An unknown error occurred:", err);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#D9D9D9A6] z-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!bankDetails) {
    return <p>No bank found</p>;
  }

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="bg-white flex flex-col rounded-[20px] h-[640px] w-full lg:max-w-[621px] lg:h-[640px]">
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
            Fund Via Bank Transfer
          </p>
        </div>
        <p className="text-color-form text-sm mx-4 py-4">
          You are required to make a bank transfer of ${amount} to the details
          provided within an hour to proceed with your wallet funding
        </p>
        <section className="flex flex-col justify-center items-center rounded-[10px] h-[91px] space-y-4 bg-light-grey mx-4 text-sm lg:p-5 lg:w-[572px]">
          <p className="text-color-form">Timer</p>
          <Timer initialTime={3600} onTimeUp={onClose} />
        </section>
        <section className="flex flex-col mt-4 bg-light-grey mx-6 rounded-[10px] px-4 shadow-sm space-y-3">
          <StatRow
            label="Amount"
            value={`$${amount}`}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Bank Name"
            value={bankDetails.bankName}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Account Number"
            value={bankDetails.accountNumber}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
            showCopyIcon
          />
          <StatRow
            label="Account Name"
            value={bankDetails.accountName}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Bank Address"
            value={bankDetails.bankAddress}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
          />
          <StatRow
            label="Routing Number"
            value={bankDetails.routingNumber}
            valueClass="text-color-six text-sm"
            paddingStyle="py-1"
            isLast={true}
          />
        </section>
        {error && (
          <p className="text-red-500 text-sm text-center mx-4 mt-2">{error}</p>
        )}
        <hr className="hidden mt-3 lg:flex" />
        <div className="mt-4 mx-6 lg:mt-6">
          <Button
            ButtonText={
              isSubmitting ? "Processing..." : "I have made the transfer"
            }
            className={`${
              isSubmitting ? "bg-inactive hover:bg-inactive" : "bg-color-one"
            }  w-full text-center`}
            onClick={handleSubmission}
            disabled={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
