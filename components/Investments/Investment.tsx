"use client";
import InvestmentProcessed from "@/components/Investments/Processed/InvestmentProcessed";
import InvestmentDesktop from "@/components/Investments/ui/InvestmentDesktop";
import InvestmentMobile from "@/components/Investments/ui/InvestmentMobile";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import useInvestmentStore from "@/store/investmentStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import PaginationComponent from "../ui/PaginationComponent";
import HistoryDesktop from "./History/HistoryDesktop";
// import HistoryMobile from "./History/HistoryMobile";

export default function Investment() {
  const { fetchInvestments, investments, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useInvestmentStore();
  const searchParams = useSearchParams();
  const [showAlert, setShowAlert] = useState(false);
  const [ledgerBalance, setLedgerBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const router = useRouter();
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the page in the product store
  };


  useEffect(() => {
    const success = searchParams.get("success");
    if (success === "true") {
      setShowAlert(true);

      const params = new URLSearchParams(searchParams.toString());
      params.delete("success");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchInvestments("", currentPage);

    const fetchPortfolio = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/auth/login");
      }
      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/investment/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        if (result.status) {
          setLedgerBalance(result.data.ledgerBalance);
          setAvailableBalance(result.data.availableBalance);
        } else {
          console.error("Failed to fetch portfolio:", result.message);
        }
      } catch (error) {
        // Handle the error object properly
        if (error instanceof Error) {
          console.error("Error fetching portfolio:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchPortfolio();
  }, [fetchInvestments, currentPage]);

  const investmentPurchases = investments.filter(
    (investment) => investment.type === "investment-purchase"
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-6">
        <p>Oops! Something went wrong.</p>
        {error && (
  <p>
    {typeof error === "string"
      ? error
      : error.message || "Unable to fetch investments at the moment."}
  </p>
)}
      </div>
    );
  }

  return (
    <div>
      <div className="lg:mr-8 lg:gap-4 xl:flex items-end lg:mb-6 ">
        <div className="flex gap-4 mt-4">
          <CardComponentFive
            icon={
              <Image
                src="/images/empty-wallet.svg"
                height={14}
                width={14}
                alt="Empty Wallet Icon"
              />
            }
            label="Available Cash"
            number={`$${availableBalance.toLocaleString()}`}
            classname="text-base font-semibold lg:font-extrabold lg:text-[32px]"
            width="lg:w-[378px] xl:w-[290px] 2xlg:w-[355px]"
          />
          <CardComponentFive
            icon={
              <Image
                src="/images/ledger.svg"
                height={14}
                width={14}
                alt="Ledger Icon"
              />
            }
            label="Ledger Balance"
            number={`$${ledgerBalance.toLocaleString()}`}
            classname="text-base font-semibold lg:font-extrabold lg:text-[32px]"
            width="lg:w-[378px] xl:w-[290px] 2xlg:w-[355px]"
          />
        </div>
        <section
          className={`flex bg-light-grey shadow-sm rounded-common p-4 my-4 justify-center mx-auto gap-2 lg:gap-12 lg:w-[382px] xl:my-0 lg:h-[103px]`}
        >
          <div className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col ">
            <Icon icon={<IoIosSend />} />
            <Link
              href="/main/investments/withdraw-funds"
              className="text-xs whitespace-nowrap "
            >
              Withdraw
            </Link>
          </div>
          <div className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col ">
            <Icon icon={<BsFileBarGraphFill />} />
            <Link
              href="/main/investments/make-investment"
              className="text-xs whitespace-nowrap "
            >
              Make Investment
            </Link>
          </div>
          <div className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col">
            <Icon icon={<GoPlus />} />
            <Link
              href="/main/investments/fund-wallet"
              className="text-xs whitespace-nowrap "
            >
              Fund Wallet
            </Link>
          </div>
        </section>
      </div>
      <hr />
      {investments.length === 0 ? (
        <div className="lg:mr-8">
          <NoHistory
            icon={<BsFileBarGraphFill />}
            text="No Investment History"
          />
        </div>
      ) : (
        <div>
          <h1 className="text-base font-semibold mt-6 lg:text-xl">
            All Investments
          </h1>
          <>
            <InvestmentMobile investments={investmentPurchases} />
            <InvestmentDesktop investments={investmentPurchases} />
            <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
          </>
          <hr className="lg:hidden mt-4" />
          <hr className="mr-8 hidden lg:flex" />
          
          <div className="flex justify-between my-4 lg:mr-8">
            <p className="text-base font-semibold text-color-zero">
              Recent Transactions
            </p>
            <Link
              href="/main/investments/investment-history"
              className="text-sm text-color-one"
            >
              View All
            </Link>
          </div>
          <HistoryDesktop investments={investments} />
          {/* <HistoryMobile investments={investments} /> */}
        </div>
      )}
      {showAlert && <InvestmentProcessed onClose={() => setShowAlert(false)} />}
    </div>
  );
}
