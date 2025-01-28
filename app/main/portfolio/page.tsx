"use client";
import FundModal from "@/components/Portolio/Actions/FundModal";
import WithdrawModal from "@/components/Portolio/Actions/WithdrawModal";
import HistoryDesktop from "@/components/Portolio/History/HistoryDesktop";
import HistoryMobile from "@/components/Portolio/History/HistoryMobile";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState({
    totalSavingsBalance: 0,
    totalInvestmentBalance: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<string | null>(null); // Tracks active modal: 'withdraw', 'fund', or null
  const router = useRouter();

  const openModal = (modalType: string) => {
    setActiveModal(modalType); // Set active modal type
  };

  const closeModal = () => {
    setActiveModal(null); // Close any active modal
  };

  useEffect(() => {
    // Fetch portfolio data and recent transactions
    const fetchPortfolioData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          router.push("/auth/login");
        }

        // Fetch portfolio data
        const portfolioResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/portfolio",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const portfolioResult = await portfolioResponse.json();

        if (portfolioResult.status) {
          setPortfolioData({
            totalSavingsBalance: portfolioResult.data.totalSavingsBalance,
            totalInvestmentBalance: portfolioResult.data.totalInvestmentBalance,
          });
        } else {
          console.error(
            "Failed to fetch portfolio data:",
            portfolioResult.message
          );
        }

        // Fetch recent transactions
        const transactionsResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/transaction",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const transactionsResult = await transactionsResponse.json();

        if (transactionsResult.status) {
          setRecentTransactions(transactionsResult.data.data);
        } else {
          console.error(
            "Failed to fetch recent transactions:",
            transactionsResult.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [router]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="lg:mr-8 lg:gap-4 xl:flex items-end lg:mb-6">
        <div className="flex gap-4 mt-4">
          <CardComponentFive
            icon={<TbTargetArrow className="text-base" />}
            label="Investment Wallet Balance"
            number={`$${portfolioData.totalInvestmentBalance.toFixed(2)}`}
            classname="text-base font-semibold lg:font-extrabold lg:text-[32px]"
            width="lg:w-[378px] xl:w-[355px]"
          />

          <CardComponentFive
            icon={<BsFileBarGraphFill className="text-base" />}
            label="Savings Wallet Balance"
            number={`$${portfolioData.totalSavingsBalance.toFixed(2)}`}
            classname="text-base font-semibold lg:font-extrabold lg:text-[32px]"
            width="lg:w-[378px] xl:w-[355px]"
          />
        </div>
        <section className="flex bg-light-grey shadow-sm rounded-common p-4 my-4 justify-center mx-auto gap-8 lg:gap-16 lg:w-[382px] xl:my-0 lg:h-[103px]">
          <div
            className="flex items-center text-color-one gap-2 cursor-pointer hover:text-green-500 duration-150 lg:border-r lg:pr-16"
            onClick={() => openModal("withdraw")} // Open Withdraw modal
          >
            <Icon icon={<IoIosSend />} />
            <p className="text-xs whitespace-nowrap">Withdraw</p>
          </div>
          <div
            className="flex items-center text-color-one gap-2 cursor-pointer hover:text-green-500 duration-150"
            onClick={() => openModal("fund")} // Open Fund modal
          >
            <Icon icon={<GoPlus />} />
            <p className="text-xs whitespace-nowrap">Fund Wallet</p>
          </div>
        </section>
      </div>

      <hr />
      {recentTransactions.length === 0 ? (
        <div className="lg:mr-8">
          <NoHistory
            icon={<FaClock />}
            text="No transactions have been performed yet"
          />
        </div>
      ) : (
        <div>
          <div className="flex justify-between my-4 lg:mr-8">
            <h1 className="text-base font-semibold lg:text-xl">
              Recent Transactions
            </h1>
            <Link href="/main/transaction-history" className="flex items-center text-color-one text-xs hover:text-green-700 duration-150">
              View all{" "}
              <span>
                <IoIosArrowForward className="lg:hidden" />
              </span>
            </Link>
          </div>
          {/* Recent Transactions */}
          <>
            <HistoryDesktop transactions={recentTransactions} />
            <HistoryMobile transactions={recentTransactions} />
          </>
        </div>
      )}

      {/* Withdraw Modal */}
      {activeModal === "withdraw" && <WithdrawModal onClose={closeModal} />}

      {/* Fund Modal */}
      {activeModal === "fund" && <FundModal onClose={closeModal} />}
    </div>
  );
}
