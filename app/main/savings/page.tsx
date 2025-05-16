"use client";
import HistoryDesktop from "@/components/Savings/History/HistoryDesktop";
import HistoryMobile from "@/components/Savings/History/HistoryMobile";
import SavingsTargetDesktop from "@/components/Savings/Savings-Targets/Desktop";
import SavingsTargetMobile from "@/components/Savings/Savings-Targets/Mobile";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import NoHistory from "@/components/ui/NoHistory";
import PaginationComponent from "@/components/ui/PaginationComponent";
import { useSavingsTargetStore } from "@/store/savingsTargetStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
import { apiFetch } from "@/utils/apiHelper";

export default function Savings() {
  const [ledgerBalance, setLedgerBalance] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const {
    savingsTarget,
    currentPage,
    setCurrentPage,
    totalPages,
    error,
    fetchSavingsTarget,
  } = useSavingsTargetStore();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        router.push("/auth/login/with-mail");
      }
      try {
        const response = await apiFetch(
          "/savings/dashboard",
          {
            method: "GET",
            headers: {
              // Authorization: `Bearer ${token}`,
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
        if (error instanceof Error) {
          console.error("Error fetching portfolio:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        // setIsLoading(false);
      }
    };

    fetchPortfolio();
    fetchSavingsTarget();
  }, [router, fetchSavingsTarget]);

  // if (isLoading) {
  //   return (
  //     <div>
  //       <Loading/>
  //     </div>
  //   );
  // }

  if (error) {
    return <p className="text-red-500 text-sm">{error}</p>;
  }

  return (
    <div className="flex flex-col pb-4 mt-6 lg:mr-8">
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
        <section className="flex bg-light-grey shadow-sm rounded-common p-4 my-4 justify-center mx-auto gap-2 lg:gap-12 lg:w-[382px] lg:h-[103px] xl:my-0">
          <Link href="/main/savings/withdraw-funds" className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col">
            <Icon icon={<IoIosSend />} />
            <p className="text-xs whitespace-nowrap">Withdraw</p>
          </Link>
          <Link href="/main/savings/create-savings" className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col">
            <Icon icon={<TbTargetArrow />} />
            <p className="text-xs whitespace-nowrap">Create Savings</p>
          </Link>
          <Link href="/main/savings/fund-wallet" className="flex items-center justify-center text-color-one hover:text-green-400 duration-150 gap-1 lg:flex-col">
            <Icon icon={<GoPlus />} />
            <p className="text-xs whitespace-nowrap">Fund Wallet</p>
          </Link>
        </section>
      </div>
      <h1 className="text-base font-semibold mt-4 text-color-zero">Savings Target</h1>
      {savingsTarget.length === 0 ? (
        <div className="lg:mr-8">
          <NoHistory icon={<TbTargetArrow />} text="No Savings Target History Yet." />
        </div>
      ) : (
        <>
          <SavingsTargetMobile savingsTarget={savingsTarget} />
          <SavingsTargetDesktop savingsTarget={savingsTarget} />
          <div className="mt-4">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
      <hr />
      {/* <div className="flex justify-between my-4 lg:mr-8">
        <p className="text-base font-semibold text-color-zero">Recent Transactions</p>
        <Link href="/main/savings/savings-history" className="text-sm text-color-one">
          View All
        </Link>
      </div> */}
      <HistoryDesktop />
      <HistoryMobile />
    </div>
  );
}