import Icon from "@/components/ui/Icon";
import NoHistory from "@/components/ui/NoHistory";
import TableHeader from "@/components/ui/TableHeader";
import { Savings } from "@/types/Type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import TransactionHistoryModal from "./TransactionHistoryModal";
import { apiFetch } from "@/utils/apiHelper";

export default function HistoryDesktop() {
  const [savings, setSavings] = useState<Savings[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSavings, setSelectedSavings] = useState<Savings | null>(null);

  useEffect(() => {
    const fetchSavings = async () => {
      // const token = localStorage.getItem("accessToken");
      try {
        setError(null);

        const response = await apiFetch(
          `/savings/transactions`,
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
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

  return (
    <div className="hidden lg:grid">
      <div className="flex justify-between my-4 lg:mr-8">
        <p className="text-base font-semibold text-color-zero">
          Recent Transactions
        </p>
        {latestSavings.length > 0 && (
          <Link
            href="/main/savings/savings-history"
            className="text-sm text-color-one"
          >
            View All
          </Link>
        )}
      </div>
      {latestSavings.length > 0 && <TableHeader />}
      {error && <p className="text-red-500">{error}</p>}
      {latestSavings.length > 0 ? (
        latestSavings.map((savings) => (
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
              <p className="text-xs text-color-form hover:text-green-700">
                View
              </p>
              <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
            </button>
          </section>
        ))
      ) : (
        <div className="lg:mr-8">
          <NoHistory icon={<TbTargetArrow />} text="No transactions Yet." />
        </div>
      )}

      {showModal && selectedSavings && (
        <TransactionHistoryModal
          savings={selectedSavings}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
