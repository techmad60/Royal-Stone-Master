"use client";
import HistoryDesktop from "@/components/Portolio/History/HistoryDesktop";
import HistoryMobile from "@/components/Portolio/History/HistoryMobile";
import ProductDesktop from "@/components/Product/ProductDesktop";
import ProductMobile from "@/components/Product/ProductMobile";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Loading from "@/components/ui/Loading";
import useProductStore from "@/store/productStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";

export default function Dashboard() {
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const fullName = useUserStore((state) => state.fullName);
  useLoadFullName();
  const [dashboardData, setDashboardData] = useState({
    totalSavingsTarget: 0,
    totalInvestments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true); // New loading state for transactions
  const router = useRouter();

  const capitalizeFirstLetter = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true); // Start loading state

      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.replace("/auth/login/with-mail");
        return;
      }

      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!data.status) {
          setApiError("Failed to fetch profile data.");
          setLoading(false);
          return;
        }

        const userProfile = data.data;

        // Validate KYC and Next of Kin
        const isKycComplete = userProfile.kycApproval === "filled";
        const hasNextOfKin =
          userProfile.nextOfKin &&
          Object.keys(userProfile.nextOfKin).length > 0;

        if (!isKycComplete || !hasNextOfKin) {
          router.push("/auth/auth-dashboard");
        }

        // Fetch Dashboard Data if user passes validation
        fetchDashboardData(token);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setApiError("An error occurred while fetching profile data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchDashboardData = async (token: string) => {
      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (data.status) {
          setDashboardData(data.data);
        } else {
          setApiError(data.message || "Failed to fetch dashboard data.");
        }

        // Fetch Transactions
        setTransactionsLoading(true); // Start loading state for transactions
        const transactionsResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/transaction",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
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
        console.error("Error fetching dashboard data:", error);
        setApiError("An error occurred while fetching dashboard data.");
      } finally {
        setTransactionsLoading(false); // End loading state for transactions
      }
    };

    fetchProfile();
    fetchProducts();
  }, [fetchProducts, router]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:p-0 lg:pr-8">
      <p className="text-base text-color-form py-4">
        Welcome, {fullName ? capitalizeFirstLetter(fullName) : "Guest"}! 👋🏻
      </p>

      {/* Cards Section */}
      <div className="flex gap-4 pb-6 border-b">
        <CardComponentFive
          icon={<TbTargetArrow className="text-base" />}
          label="Total Savings Target"
          number={dashboardData.totalSavingsTarget.toString()}
          width="sm:w-[300px] lg:w-[378px]"
        />
        <CardComponentFive
          icon={<BsFileBarGraphFill className="text-base" />}
          label="Total Investments Made"
          number={dashboardData.totalInvestments.toString()}
          width="sm:w-[300px] lg:w-[378px]"
        />
      </div>

      {/* Transactions Section */}
      {transactionsLoading ? ( // Show loading state while fetching transactions
        <div className="flex justify-center items-center my-8">
          <Loading />
        </div>
      ) : recentTransactions.length === 0 ? ( // Show "No Transactions UI" only after data is fetched and empty
        <div className="flex flex-col justify-center items-center space-y-4 my-8 py-6 shadow-sm bg-light-grey rounded-common lg:w-[765px]">
          <div
            className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}
          >
            <span className="text-color-one transform -rotate-45">
              <FaClock /> {/* Counter-rotate icon */}
            </span>
          </div>
          <p className="text-sm text-color-form">
            No transactions have been performed yet
          </p>
          <Link
            href="/main/investments/make-investment"
            className="py-3 self-center text-sm bg-color-one hover:bg-green-700 duration-150 text-white text-center w-[200px] rounded-[12px]"
          >
            {" "}
            Perform a transaction
          </Link>
        </div>
      ) : (
        // Show Recent Transactions UI
        <>
          <p className="text-lg font-semibold my-4">Recent Transactions</p>
          <HistoryMobile transactions={recentTransactions} />
          <HistoryDesktop transactions={recentTransactions} />
        </>
      )}

      {/* Recommended Products Section */}
      <div className="flex flex-col border-t py-6">
        <div className="flex justify-between items-center">
          <p className="text-base font-semibold text-color-zero lg:text-lg">
            Recommended Products
          </p>
          <Link
            href="/main/product"
            className="flex items-center justify-between text-color-one gap-1 hover:text-green-700 duration-300"
          >
            <p className="text-xs lg:text-sm">View all</p>
            <MdArrowForwardIos className="text-xs lg:hidden" />
          </Link>
        </div>
        {isLoading ? (
          <div>
            <Loading />
          </div>
        ) : error || apiError ? (
          <p className="text-red-500">
            Failed to load products. Please try again later.
          </p>
        ) : (
          <>
            <ProductMobile products={products} />
            <ProductDesktop products={products} />
          </>
        )}
      </div>
    </div>
  );
}