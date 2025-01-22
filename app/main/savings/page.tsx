"use client"
import Button from "@/components/ui/Button";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Icon from "@/components/ui/Icon";
import NoHistory from "@/components/ui/NoHistory";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { TbTargetArrow } from "react-icons/tb";
// import HistoryDesktop from "@/components/Portolio/HistoryDesktop";
import ProgressCard from "@/components/Savings/ProgressBar";
import ProgressBarDesktop from "@/components/Savings/ProgressBarDesktop";
import { BsFileBarGraphFill } from "react-icons/bs";


export default function Savings() {
  const [showNotifications, setShowNotifications] = useState(true);
  return (
    <div className="flex flex-col pb-4 lg:mr-8">
      <div className="xl:flex items-end xl:my-4">
        <div className="flex gap-4 mt-4 xl:mt-0">
          <CardComponentFive icon={<Image src="/images/empty-wallet.svg" height={14} width={14} alt="Empty Wallet Icon"/>} label="Total Savings Target" number={`$0.00`} classname="text-base font-semibold lg:font-extrabold lg:text-[32px]" width="lg:w-[378px] xl:w-[355px]"/>
          <CardComponentFive icon={<Image src="/images/ledger.svg" height={14} width={14} alt="Ledger Icon"/>} label="Total Investments Made" number={`$0.00`} classname="text-base font-semibold lg:font-extrabold lg:text-[32px]" width="lg:w-[378px] xl:w-[355px]"/>
        </div>

        <section className={`flex bg-light-grey shadow-sm rounded-common p-4 my-4 justify-between lg:w-[382px] lg:mx-auto xl:my-0 xl:w-fit xl:gap-4 xl:h-[103px] xl:justify-center xl:items-center`}>
          <Link href="/main/savings/withdraw-funds" className="flex items-center text-color-one gap-2 xl:flex-col">
            <Icon icon={<IoIosSend/>}/> 
            <p className="text-xs whitespace-nowrap">Withdraw</p>
          </Link>

          <Link href="/main/savings/create-savings" className="flex items-center  text-color-one gap-2 xl:flex-col">
            <Icon icon={<TbTargetArrow/>}/>
            <p  className="text-xs whitespace-nowrap">Create Savings</p>
          </Link>

          <Link href="/main/savings/fund-wallet" className="flex items-center text-color-one gap-2 xl:flex-col">
            <Icon icon={<GoPlus/>}/>
            <p className="text-xs whitespace-nowrap">Fund Wallet</p>
          </Link>
        </section>
      </div>
      

      <hr className=""/>
      {showNotifications ?  (
         <div className="lg:mr-8">
         <NoHistory
           icon={<TbTargetArrow />}
           text="No Investment History"
         />
         <div onClick={() => setShowNotifications(false)}>
           <Button ButtonText="With History" className="mx-auto" />
         </div>
       </div>
        
      ) : (
        <div>
          <div>
            <h1 className="text-base font-semibold mt-4 text-color-zero">Savings Target</h1>
            <div className="lg:hidden">
              <ProgressCard title="Annual Rent Savings" status="ONGOING" currentAmount={120} goalAmount={370}/>
              <ProgressCard title="New Laptop Savings" status="ONGOING" currentAmount={400} goalAmount={1000}/>
              <ProgressCard title="Tuition Fees Savings" status="COMPLETED" currentAmount={1000} goalAmount={1000}/>
            </div>
            
            <div className="hidden lg:grid my-5">
              <div className="bg-light-grey shadow-sm hidden lg:grid grid-cols-9 p-3 mr-8 rounded-[15px]">
                <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">Plan Name</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount Saved</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">Progress</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Target Amount</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Due Dates</p>
                <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
              </div>
              <ProgressBarDesktop title="Annual Rent Savings" status="ONGOING" currentAmount={120} goalAmount={370} />
              <hr className="my-3"/>
              <ProgressBarDesktop title="New Laptop Savings" status="ONGOING" currentAmount={400} goalAmount={1000} />
              <hr className="my-3"/>
              <ProgressBarDesktop title="Annual Rent Savings" status="COMPLETED" currentAmount={1000} goalAmount={1000} />
            </div>
            
            <div className="flex justify-between my-4 lg:mr-8">
              <p className="text-base font-semibold text-color-zero">
                Recent Transactions
              </p>
              <Link href="/main/savings/savings-history" className="text-sm text-color-one">View All</Link>
            </div>
            <div className="hidden lg:grid">
                {/* <HistoryDesktop/> */}
            </div>
          
            <div className="lg:hidden">
                <section>
                    <p className="text-color-form text-sm">Today</p>
                    <hr className="my-3"/>
                    <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common mt-2 lg:w-[361px] xl:w-[520px]">
                        <div className="flex gap-4 lg:gap-3">
                            <Icon icon={<GoPlus className="text-color-one text-lg" />} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium">Wallet Funding</p>
                                <p className="text-xs text-color-one">Completed</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-color-six">$20</p>
                            <p className="text-slate-400 text-xs">11:04 AM</p>
                        </div>
                    </section>
                </section>
                <section className="my-5">
                    <p className="text-color-form text-sm">September 11th, 2024</p>
                    <hr className="my-3"/>
                    <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
                        <div className="flex gap-4 lg:gap-3">
                            <Icon icon={<BsFileBarGraphFill className="text-color-one text-lg" />} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"/>
                            <div>
                                <p className="text-sm text-color-zero font-medium">Investment Purchase</p>
                                <p className="text-xs text-color-one">Successful</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-color-six">$20</p>
                            <p className="text-slate-400 text-xs">11:04 AM</p>
                        </div>
                    </section>
                </section>
            </div>
          </div>

          <div onClick={() => setShowNotifications(true)}>
            <Button ButtonText="Without History" className="mx-auto" />
          </div>
        </div>
      )}
    </div>
  );
}
