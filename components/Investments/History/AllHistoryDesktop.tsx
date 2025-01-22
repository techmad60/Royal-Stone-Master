import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import { useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import InvestmentHistoryModal from "./InvestmentHistoryModal";
interface Investments {
  id: string;
  type: string;
  amount: number;
  createdAt: string;
  status: string;
}

export default function AllHistoryDesktop({
  investments,
}: {
  investments: Investments[];
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investments | null>(null); // Selected investment

  const fetchInvestmentDetails = async (id: string, type: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setError(null);

      // Fetch investments of the given type
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/investment?type=${type}`,
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
        throw new Error("Failed to fetch investment details.");
      }

      // Find the specific investment by ID
      const investmentDetails = data.data.data.find(
        (investment: Investments) => investment.id === id
      );

      if (!investmentDetails) {
        throw new Error("Investment not found.");
      }

      // Set the selected investment data and open modal
      setSelectedInvestment(investmentDetails);
      setShowModal(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(
          err.message || "Failed to fetch data. Please try again later."
        );
      } else {
        setError("An unknown error occurred. Please try again later.");
      }
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
    <div className="hidden mt-7 lg:grid">
      <div className="hidden lg:grid grid-cols-7 items-center bg-light-grey rounded-common py-4 px-3 shadow-sm mr-8">
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
          Transaction Name
        </p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
          Transaction Date & Time
        </p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
        <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {investments.map((investment) => (
        <section
          key={investment.id}
          className="grid grid-cols-7 px-3 mr-8 border-b py-4 my-4"
        >
          <div className="flex items-center gap-3 col-span-2">
            <Icon
              icon={
                investment.type === "investment-wallet-funding" ? (
                  <GoPlus className="text-color-one" />
                ) : (
                  <BsFileBarGraphFill className="text-color-one" />
                )
              }
            />
            <p className="text-sm text-color-zero">
              {investment.type
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
          <p className="text-sm text-color-zero">${investment.amount}</p>
          <p className="text-sm text-color-zero col-span-2">
            {new Date(investment.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
            {new Date(investment.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p
            className={`text-sm ${
              investment.status === "pending"
                ? "text-yellow-500"
                : investment.status === "successful"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {investment.status.charAt(0).toUpperCase() +
              investment.status.slice(1)}
          </p>
          <button
            onClick={() =>
              fetchInvestmentDetails(investment.id, investment.type)
            }
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
            disabled={loading}
          >
            <p className="text-xs text-color-form hover:text-green-700">View</p>
            <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
          </button>
        </section>
      ))}

      {/* Modal for displaying investment details */}
      {showModal && selectedInvestment && (
        <InvestmentHistoryModal
          investment={selectedInvestment} // Passing selected investment as prop
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}
