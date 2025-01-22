"use client";
import ReferredDesktopList from "@/components/Referral/ReferralDesktop";
import ReferralList from "@/components/Referral/Referrals";
import Button from "@/components/ui/Button";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Referrals() {
  // Load referral code from localStorage into Zustand store
  useLoadFullName();

  const referralCode = useUserStore((state) => state.referralCode);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchReferrals = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        // Fetch referrals
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/referral",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch referrals");
        }

        setReferrals(result.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchReferralDashboard = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }

      try {
        // Fetch referral dashboard
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/referral/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to fetch referral dashboard"
          );
        }

        setTotalEarning(result.data.totalEarning || 0);
      } catch (err) {
        console.error("Error fetching referral dashboard:", err);
      }
    };

    fetchReferrals();
    fetchReferralDashboard();
  }, [router]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Function to copy referral code to clipboard
  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard
        .writeText(referralCode)
        .then(() => {
          toast.success("Referral code copied to clipboard!", {
            position: "top-right",
            autoClose: 3000,
          });
        })
        .catch(() => {
          toast.error("Failed to copy referral code.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      toast.warning("No referral code available to copy.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast container to display notifications */}
      <div className="lg:flex lg:w-full items-end lg:my-6 lg:gap-12 lg:pr-8">
        <div className="lg:space-y-4 lg:border-r lg:pr-16">
          <div className="flex flex-col justify-center items-center my-6 gap-4 lg:justify-start lg:items-start lg:my-0">
            <Icon
              icon={<BsPeopleFill className="text-color-one text-3xl" />}
              containerSize="w-[49.5px] h-[49.5px] rounded-[18.5px]"
              iconSize="w-[30px] h-[30px]"
            />
            <p className="text-color-zero text-sm text-center font-semibold lg:text-start ">
              Earn $5 on each transaction performed by a friend referred by
              you
            </p>
          </div>

          <section className="bg-light-grey rounded-common shadow-sm p-6 space-y-4 my-6 lg:bg-transparent lg:shadow-none lg:my-0 lg:p-0">
            <div className="flex justify-between items-center lg:bg-light-grey lg:p-6 lg:shadow-sm lg:rounded-[35px] ">
              <div>
                <p className="text-sm text-[#6B7385] hidden lg:flex">
                  Referral code
                </p>
                <p className="font-bold text-[#0F1C39B2] text-sm lg:font-semibold lg:text-base">
                  {referralCode || "Not available"}
                </p>
              </div>

              <Button
                onClick={copyReferralCode} // Attach the copy function
                ResponsiveText={
                  <>
                    <span className="hidden lg:inline">Copy Code</span>
                    <span className="inline lg:hidden">Copy Referral Code</span>
                  </>
                }
                className="rounded-[100px] bg-color-one text-xs font-medium w-[143px] h-[26px] flex items-center lg:w-[132px] lg:h-[40px] lg:rounded-[22px]"
              />
            </div>
            <hr className="bg-[#F2F2F2] lg:hidden" />
            <CardComponentFive
              icon={<AiFillDollarCircle />}
              number={`$${totalEarning.toFixed(2)}`}
              label="Your Earnings"
              width="w-full lg:hidden"
            />
          </section>
        </div>

        <CardComponentFive
          icon={<AiFillDollarCircle />}
          label="Your Earnings"
          number={`$${totalEarning.toFixed(2)}`}
          width="hidden lg:flex w-[605px]"
        />
      </div>
      <hr className="lg:mr-8" />
      {referrals.length > 0 ? (
        <div>
          <p className="text-base font-semibold text-color-zero py-5">
            Referral List ({referrals.length})
          </p>
          <div className="lg:hidden">
            <ReferralList referrals={referrals} />
          </div>
          <div className="hidden lg:grid">
            <ReferredDesktopList referrals={referrals} />
          </div>
        </div>
      ) : (
        <div className="lg:mr-8">
          <NoHistory icon={<BsPeopleFill />} text="You've no referrals" />
        </div>
      )}
    </div>
  );
}
