"use client";
import TradeModal from "@/components/Stocks/TradeModal";
import Button from "@/components/ui/Button";
import StatRow from "@/components/ui/StatRow";
import TextToggle from "@/components/ui/TextToggle";
import { purchaseStocks } from "@/Services/apiService";
import { useStockStore } from "@/store/stockStore";
import { PurchaseStockResponse } from "@/types/Type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { RiStockFill } from "react-icons/ri";
import Icon from "../../ui/Icon";
import Loading from "../../ui/Loading";
import Navigator from "../../ui/Navigator";
import Processed from "../../ui/Processed";
import PreviewModal from "../Preview/PreviewModal";
import TransactionDetails from "./TransactionDetails";

export default function StockDetails() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const { stocks, fetchStocks, loading, error } = useStockStore();
  const [apiError, setApiError] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<
    PurchaseStockResponse["data"] | null
  >(null);
  const [currentModal, setCurrentModal] = useState<
    | "preview"
    | "tradeModal"
    | "transactionProcessed"
    | "transactionDetails"
    | null
  >(null);
  // State to store trade details
  const [tradeDetails, setTradeDetails] = useState({
    amountToTrade: "",
    unitsToTrade: "",
    email: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (stocks.length === 0) {
      fetchStocks();
    }
  }, [stocks, fetchStocks, id]); // Depend on id so it updates when URL changes

  const stock = stocks.find((stock) => stock.id === id); // No more type error

  const stockNavigator = [
    { label: "Stocks List", href: "/main/stocks" },
    {
      label: stock?.name || "Unknown Product", // Dynamically display the stock name
      href: `/main/stocks/stock-details?id=${encodeURIComponent(
        stock?.id || ""
      )}`,
    },
  ];

  // Purchase Stocks
  const handleMakePurchase = async () => {
    setIsLoading(true);
    setApiError(null); // Clear previous error messages
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login/with-mail");
        return;
      }
      const purchaseResponse = await purchaseStocks(
        stock?.id || "",
        Number(tradeDetails.amountToTrade),
        token
      );
      // Handle the response (success or error)
      if (purchaseResponse.success && purchaseResponse.data) {
        setTransactionData(purchaseResponse.data);
        setCurrentModal("transactionProcessed");
        // Reset trade details after successful transaction
      setTradeDetails({
        amountToTrade: "",
        unitsToTrade: "",
        email: "",
        phoneNumber: "",
      });

        console.log(purchaseResponse);
      } else {
        const errorMessage =
          purchaseResponse.message || "An error occurred during the deposit.";
        setApiError(errorMessage); // Set error message

        // Timeout to clear error message after 3 seconds
        setTimeout(() => {
          setApiError(null);
        }, 2000);
      }
    } catch (err) {
      if (err instanceof Error) {
        setApiError(err.message || "Something went wrong.");
      } else {
        setApiError("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  
    // Reset trade details when the trade process is fully completed
    setTradeDetails({
      amountToTrade: "",
      unitsToTrade: "",
      email: "",
      phoneNumber: "",
    });
  };
  

  if (error)
    return <p className="text-red-500">Failed to load product details.</p>;
  if (apiError) return <p>Api Error;</p>;
  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      <Navigator currentStep={1} steps={stockNavigator} />
      <div className="flex flex-col gap-4 h-screen lg:grid grid-cols-2 lg:pr-8 lg:mt-12 lg:gap-12 xl:gap-24">
        <section>
          <div className="flex items-center gap-2 mt-12 lg:mt-0">
            <div className="flex-shrink-0">
              <Icon
                icon={<RiStockFill className="text-color-one" />}
                containerSize="w-[39px] h-[39px]"
              />
            </div>

            <div>
              <p className="text-base text-colour-five font-semibold">
                {stock?.name}
              </p>
              <p className="text-xs text-[#6B738599]">{stock?.ticker}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b py-4 lg:mx-8">
            <p
              className={`font-medium lg:text-[20px] lg:font-bold ${
                stock?.price?.change && stock.price.change < 0
                  ? "text-red-500"
                  : "text-color-one"
              }`}
            >
              {stock?.price?.change !== undefined
                ? Number(stock.price.change).toFixed(3)
                : "--"}
            </p>
            <p className="font-medium text-color-six lg:text-[20px] lg:font-bold">
              $
              {stock?.price?.close !== undefined
                ? Number(stock.price.close).toFixed(2)
                : "--"}
            </p>
          </div>
          <div className="lg:mx-8">
            <TextToggle description={stock?.description}/>
          </div>
        </section>
        <div className="h-screen flex flex-col">
          <section className="flex flex-col bg-light-grey rounded-[10px] px-4 shadow-sm">
            <StatRow
              label="Price per unit"
              value={`$${stock?.price?.close !== undefined
                ? Number(stock.price.close).toFixed(3)
                : "N/A"}`}
              valueClass="text-color-six text-sm"
            />
            <StatRow
              label="Minimum Units"
              value= "1"
              valueClass="text-color-six text-sm"
              isLast={true}
            />
          </section>
          <div className="w-full self-end justify-self-end mt-auto lg:mt-4">
            <Button
              ButtonText="Buy Stock"
              className="w-full"
              onClick={() => setCurrentModal("tradeModal")}
            />
          </div>
        </div>
      </div>

      {/* Conditionally render the TradeModal */}
      {currentModal === "tradeModal" && (
        <TradeModal
          stockName={stock?.name}
          amountPerUnit={stock?.price?.close}
          ticker={stock?.ticker}
          onClose={handleCloseModal}
          openPreview={() => setCurrentModal("preview")}
          tradeDetails={tradeDetails}
          setTradeDetails={setTradeDetails}
        />
      )}

      {/* Conditionally render the BuyModal */}
      {currentModal === "preview" && (
        <PreviewModal
          onClose={handleCloseModal}
          onProceed={handleMakePurchase}
          stockName={stock?.name}
          ticker={stock?.ticker}
          tradeDetails={tradeDetails}
          isLoading={isLoading}
          error={apiError}
        />
      )}

      {/* Conditionally render the TransactionProcessed modal */}
      {currentModal === "transactionProcessed" && (
        <Processed
          onClose={handleCloseModal}
          onConfirm={() => setCurrentModal("transactionDetails")}
          message="Your stock transaction is being processed. A member of our team will reach out to you via email"
        />
      )}

      {/* Conditionally render the TransactionDetails modal */}
      {currentModal === "transactionDetails" && (
        <TransactionDetails
          stockName={stock?.name}
          primaryExchange={stock?.primary_exchange}
          onClose={handleCloseModal}
          transactionData={transactionData}
          // tradeDetails={tradeDetails}
        />
      )}
    </div>
  );
}
