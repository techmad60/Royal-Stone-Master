"use client";
import HistoryDesktop from "@/components/Savings/History/HistoryDesktop";
import HistoryMobile from "@/components/Savings/History/HistoryMobile";
import ProgressCard from "@/components/Savings/ProgressBar";
import ProgressBarDesktop from "@/components/Savings/ProgressBarDesktop";
import Button from "@/components/ui/Button";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";

export default function Savings() {
  const [ledgerBalance, setLedgerBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/auth/login");
      }
      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/savings/dashboard",
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
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [router]);
  const [showNotifications, setShowNotifications] = useState(true);
  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="flex flex-col pb-4 lg:mr-8">
      <div className="lg:mr-8 lg:gap-4 xl:flex items-end lg:mb-6 ">
        <div className="flex gap-4 mt-4">
          {/* Available Cash */}
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

          {/* Ledger Balance */}
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

        {/* Actions */}
        <section
          className={`flex bg-light-grey shadow-sm rounded-common p-4 my-4 justify-center mx-auto gap-2 lg:gap-12 lg:w-[382px] lg:h-[103px] xl:my-0`}
        >
          <Link
            href="/main/savings/withdraw-funds"
            className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col"
          >
            <Icon icon={<IoIosSend />} />
            <p className="text-xs whitespace-nowrap">Withdraw</p>
          </Link>

          <Link
            href="/main/savings/create-savings"
            className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col"
          >
            <Icon icon={<TbTargetArrow />} />
            <p className="text-xs whitespace-nowrap">Create Savings</p>
          </Link>

          <Link
            href="/main/savings/fund-wallet"
            className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col"
          >
            <Icon icon={<GoPlus />} />
            <p className="text-xs whitespace-nowrap">Fund Wallet</p>
          </Link>
        </section>
      </div>

      <hr className="" />
      {showNotifications ? (
        <div className="lg:mr-8">
          <NoHistory icon={<TbTargetArrow />} text="No Savings History" />
          <div onClick={() => setShowNotifications(false)}>
            <Button ButtonText="With History" className="mx-auto" />
          </div>
        </div>
      ) : (
        <div>
          <div>
            <h1 className="text-base font-semibold mt-4 text-color-zero">
              Savings Target
            </h1>
            <div className="lg:hidden">
              <ProgressCard
                title="Annual Rent Savings"
                status="ONGOING"
                currentAmount={120}
                goalAmount={370}
              />
              <ProgressCard
                title="New Laptop Savings"
                status="ONGOING"
                currentAmount={400}
                goalAmount={1000}
              />
              <ProgressCard
                title="Tuition Fees Savings"
                status="COMPLETED"
                currentAmount={1000}
                goalAmount={1000}
              />
            </div>

            <div className="hidden lg:grid my-5">
              <div className="bg-light-grey shadow-sm hidden lg:grid grid-cols-9 p-3 mr-8 rounded-[15px]">
                <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
                  Plan Name
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">
                  Amount Saved
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
                  Progress
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">
                  Target Amount
                </p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Due Dates</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
              </div>
              <ProgressBarDesktop
                title="Annual Rent Savings"
                status="ONGOING"
                currentAmount={120}
                goalAmount={370}
              />
              <hr className="my-3" />
              <ProgressBarDesktop
                title="New Laptop Savings"
                status="ONGOING"
                currentAmount={400}
                goalAmount={1000}
              />
              <hr className="my-3" />
              <ProgressBarDesktop
                title="Annual Rent Savings"
                status="COMPLETED"
                currentAmount={1000}
                goalAmount={1000}
              />
            </div>

            <div className="flex justify-between my-4 lg:mr-8">
              <p className="text-base font-semibold text-color-zero">
                Recent Transactions
              </p>
              <Link
                href="/main/savings/savings-history"
                className="text-sm text-color-one"
              >
                View All
              </Link>
            </div>
            <HistoryDesktop />
            <HistoryMobile />
          </div>

          <div onClick={() => setShowNotifications(true)}>
            <Button ButtonText="Without History" className="mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
