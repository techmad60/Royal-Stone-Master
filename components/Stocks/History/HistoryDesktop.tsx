
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import TableHeader from "@/components/ui/TableHeader";
import { StockPurchase } from "@/types/Type";
import { useCallback, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiStockFill } from "react-icons/ri";
import TransactionHistoryModal from "./TransactionHistory";


interface HistoryDesktopProps {
    stocks: StockPurchase[];
  }

export default function HistoryDesktop({ stocks }: HistoryDesktopProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [selectedStock, setSelectedStock] =
      useState<StockPurchase| null>(null); // Selected investment

  // Fetch stock transactions
  const fetchStocks = useCallback(async (id: string) => {
    const token = localStorage.getItem("accessToken");
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/stock/purchase`,
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
        throw new Error("Failed to fetch transactions.");
      }
      //Find the specific stock by ID
      const stockDetails = data.data.data.find(
        (stock: StockPurchase) => stock.id === id
      );
      setSelectedStock(stockDetails);
      setShowModal(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  }, []);

    if (loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

  return (
    <div className="hidden mt-7 lg:grid">
      <TableHeader />
      {error && <p className="text-red-500">{error}</p>}
      {stocks.map((stock) => (
        <section
          key={stock.id}
          className="grid grid-cols-7 px-3 mr-8 border-b py-4 my-4"
        >
          <div className="flex items-center gap-3 col-span-2">
            <div className="flex-shrink-0">
              <Icon
                icon={<RiStockFill className="text-color-one" />}
                containerSize="w-[39px] h-[39px]"
              />
            </div>
            <p className="text-sm text-color-zero">
              {stock?.stockID?.ticker
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </div>
          <p className="text-sm text-color-zero">${stock.amount}</p>
          <p className="text-sm text-color-zero col-span-2">
            {new Date(stock.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}{" "}
            |{" "}
            {new Date(stock.createdAt).toLocaleString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
          <p
            className={`text-sm ${
              stock.status === "pending"
                ? "text-yellow-500"
                : stock.status === "successful"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {stock.status.charAt(0).toUpperCase() +
              stock.status.slice(1)}
          </p>
          <button
            onClick={() =>
              fetchStocks(stock.id)
            }
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] py-1 hover:border-green-700 hover:text-green-700 duration-150"
            // disabled={loading}
          >
            <p className="text-xs text-color-form hover:text-green-700">View</p>
            <IoIosArrowForward className="text-color-form text-sm hover:text-green-700" />
          </button>
        </section>
      ))}

      {/* Modal for displaying investment details */}
      {showModal && selectedStock && (
        <TransactionHistoryModal
          stocks={selectedStock} // Passing selected stock as prop
          closeModal={() => setShowModal(false)} // Close modal function
        />
      )}
    </div>
  );
}
