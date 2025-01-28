import Icon from "@/components/ui/Icon";
// import Loading from "@/components/ui/Loading";
import TableHeader from "@/components/ui/TableHeader";
import { Savings } from "@/types/Type";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import TransactionHistoryModal from "./TransactionHistoryModal";

export default function HistoryDesktop() {
  // const [loading, setLoading] = useState(false);
  const [savings, setSavings] = useState<Savings[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSavings, setSelectedSavings] = useState<Savings | null>(null);

  useEffect(() => {
    const fetchSavings = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        // setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api-royal-stone.softwebdigital.com/api/savings/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!data.status) {
          throw new Error(data.message || "Failed to fetch savings.");
        }

        setSavings(data.data.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "An unknown error occurred. Please try again later."
        );
      } finally {
        // setLoading(false);
      }
    };

    fetchSavings();
  }, []);

  const fetchSavingsDetails = (id: string) => {
    const savingsDetails = savings.find((s) => s.id === id);

    if (!savingsDetails) {
      setError("Savings not found.");
      return;
    }

    setSelectedSavings(savingsDetails);
    setShowModal(true);
  };

  const latestSavings = savings
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 2);

  // if (loading) {
  //   return (
  //     <div>
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="hidden lg:grid">
      <TableHeader />
      {error && <p className="text-red-500">{error}</p>}
      {latestSavings.map((savings) => (
        <section
          key={savings.id}
          className="grid grid-cols-7 px-3 mr-8 border-b py-4 my-4"
        >
          <div className="flex items-center gap-3 col-span-2">
            <Icon
              icon={
                savings.type === "savings-wallet-funding" ? (
                  <GoPlus className="text-color-one" />
                ) : savings.type === "savings-withdrawal" ? (
                  <IoIosSend className="text-color-one" />
                ) : (
                  <TbTargetArrow className="text-color-one" />
                )
              }
            />
            <p className="text-sm text-color-zero">
              {savings.type
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
          <p className="text-sm text-color-zero">${savings.amount}</p>
          <p className="text-sm text-color-zero col-span-2">
            {new Date(savings.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
            {new Date(savings.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p
            className={`text-sm ${
              savings.status === "pending"
                ? "text-yellow-500"
                : savings.status === "successful"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {savings.status.charAt(0).toUpperCase() + savings.status.slice(1)}
          </p>
          <button
            onClick={() => fetchSavingsDetails(savings.id)}
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
          >
            <p className="text-xs text-color-form hover:text-green-700">View</p>
            <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
          </button>
        </section>
      ))}

      {showModal && selectedSavings && (
        <TransactionHistoryModal
          savings={selectedSavings}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
