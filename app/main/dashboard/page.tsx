"use client";
import HistoryDesktop from "@/components/Portolio/History/HistoryDesktop";
import HistoryMobile from "@/components/Portolio/History/HistoryMobile";
import ProductDesktop from "@/components/Product/ProductDesktop";
import ProductMobile from "@/components/Product/ProductMobile";
import CardComponentFive from "@/components/ui/CardComponentFive";
// import Loading from "@/components/ui/Loading";
import useProductStore from "@/store/productStore";
import useTransactionStore from "@/store/transactionStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { MdArrowForwardIos } from "react-icons/md";
import { TbTargetArrow } from "react-icons/tb";
import { apiFetch } from "@/utils/apiHelper";

export default function Dashboard() {
  const { products, fetchProducts } = useProductStore();
  const fullName = useUserStore((state) => state.fullName);
  useLoadFullName();
  const { transactions, fetchTransactions } = useTransactionStore();
  const [dashboardData, setDashboardData] = useState({
    totalSavingsTarget: 0,
    totalInvestments: 0,
  });
  // const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  // const [recentTransactions, setRecentTransactions] = useState([]);
  const router = useRouter();

  const capitalizeFirstLetter = (name: string): string =>
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true); // Start loading

      // const token = localStorage.getItem("accessToken");
      // if (!token) {
      //   router.replace("/auth/login/with-mail");
      //   return;
      // }

      try {
        // Fetch Profile
        const profileRes = await apiFetch(
          "/account/profile",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const profileData = await profileRes.json();

        if (!profileData.status) {
          setApiError("Failed to fetch profile data.");
          // setLoading(false);
          return;
        }

        const userProfile = profileData.data;
        const isKycComplete =
          userProfile.kycApproval === "filled" ||
          userProfile.kycApproval === "approved";

        const hasNextOfKin =
          userProfile.nextOfKin &&
          Object.keys(userProfile.nextOfKin).length > 0;

        if (!isKycComplete || !hasNextOfKin) {
          router.push("/auth/auth-dashboard");
          return;
        }

        // Fetch Dashboard Data
        const dashboardRes = await apiFetch(
          "/account/dashboard",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const dashboardData = await dashboardRes.json();
        if (dashboardData.status) {
          setDashboardData(dashboardData.data);
        } else {
          setApiError(
            dashboardData.message || "Failed to fetch dashboard data."
          );
        }
        // Fetch Products
        await fetchProducts();
      } catch (error) {
        console.error("Error fetching data:", error);
        setApiError("An error occurred while fetching data.");
      } finally {
        // setLoading(false); // Stop loading after all requests complete
      }
    };
    fetchTransactions();
    fetchData();
  }, [fetchProducts, router, fetchTransactions]);

  return (
    <div className="flex flex-col lg:p-0 lg:pr-8">
      <p className="text-base text-color-form py-4">
        Welcome, {fullName ? capitalizeFirstLetter(fullName) : "Guest"}! 👋🏻
      </p>

      {apiError ? (
        <p className="text-red-500">{apiError}</p>
      ) : (
        <>
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
          {transactions.length === 0 ? (
            <div className="flex flex-col justify-center items-center space-y-4 my-8 py-6 shadow-sm bg-light-grey rounded-common lg:w-[765px]">
              <div className="w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white">
                <span className="text-color-one transform -rotate-45">
                  <FaClock />
                </span>
              </div>
              <p className="text-sm text-color-form">
                No transactions have been performed yet
              </p>
              <Link
                href="/main/investments/make-investment"
                className="py-3 self-center text-sm bg-color-one hover:bg-green-700 duration-150 text-white text-center w-[200px] rounded-[12px]"
              >
                Perform a transaction
              </Link>
            </div>
          ) : (
            <>
              <div className="text-lg font-semibold my-4">
                Recent Transactions
              </div>
              <HistoryMobile transactions={transactions} />
              <HistoryDesktop transactions={transactions} />
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
            <ProductMobile products={products} />
            <ProductDesktop products={products} />
          </div>
        </>
      )}
    </div>
  );
}
