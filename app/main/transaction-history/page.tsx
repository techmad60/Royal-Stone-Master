"use client";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { IoIosArrowForward, IoIosSend } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "@/components/ui/Icon";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import FilterModal from "@/components/Transaction History/FilterModal";

export default function TransactionHistory() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };
  return (
    <div className="">
      <div className="flex justify-between py-3">
        <p className="text-color-form text-sm lg:hidden">Today</p>
        <div className="flex flex-row-reverse items-center gap-2">
          <p
            className="text-sm border-b leading-none border-color-one text-color-one cursor-pointer hover:text-green-700 duration-300 hover:border-green-700"
            onClick={handleOpenFilter}
          >
            Filter
          </p>
          <span>
            <IoFilter className="text-color-one" />
          </span>
        </div>
      </div>
      <hr className="lg:hidden" />
      <div className="lg:hidden">
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<GoPlus className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Savings Wallet Funding
              </p>
              <p className="text-xs text-[rgba(255,165,0,1)]">Pending</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $20
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>

        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<IoIosSend className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Investment Fund Withdrawal
              </p>
              <p className="text-xs text-color-one">Successful</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              -$7
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              9:12 AM
            </p>
          </div>
        </section>
        <div className="flex justify-between py-3">
          <p className="text-color-form text-sm">Yesterday, 12/9/2024</p>
        </div>
        <hr />
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<GoPlus className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Savings Wallet Funding
              </p>
              <p className="text-xs text-color-one">Successful</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $20
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<IoIosSend className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Investment Fund Withdrawal
              </p>
              <p className="text-xs text-color-one">Successful</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $20
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<BsFileBarGraphFill className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                Investment Purchase
              </p>
              <p className="text-xs text-color-one">Successful</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $63
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<TbTargetArrow className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                New Laptop Savings
              </p>
              <p className="text-xs text-color-one">
                Savings Payment - Successful
              </p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $20
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
        <section className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
          <div className="flex gap-4">
            <Icon
              icon={<TbTargetArrow className="text-2xl text-color-one" />}
              containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
            />
            <div>
              <p className="text-sm text-color-zero font-medium tracking-tight">
                New Laptop Savings
              </p>
              <p className="text-xs text-red-500">Savings Payment - Failed</p>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">
              $20
            </p>
            <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
              11:04 AM
            </p>
          </div>
        </section>
      </div>

      <div className="hidden lg:grid">
        <div className="hidden lg:grid grid-cols-8 items-center bg-light-grey rounded-common py-4 px-3 shadow-sm mr-8">
          <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
            Transaction Name
          </p>
          <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount</p>
          <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
            Transaction Date & Time
          </p>
          <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">Status</p>
          <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
        </div>

        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<GoPlus className="text-color-one" />} />
            <p className="text-sm text-color-zero">Savings Wallet Funding</p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-[rgba(255,165,0,1)] col-span-2">Pending</p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<IoIosSend className="text-color-one" />} />
            <p className="text-sm text-color-zero">
              Investment Fund Withdrawal
            </p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-color-one col-span-2">Successful</p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<TbTargetArrow className="text-color-one" />} />
            <p className="text-sm text-color-zero">New Laptop Savings</p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-color-one col-span-2">
            Savings Payment - Successful
          </p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<TbTargetArrow className="text-color-one" />} />
            <p className="text-sm text-color-zero">New Laptop Savings</p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-red-500 col-span-2">
            Savings Payment - Successful
          </p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<BsFileBarGraphFill className="text-color-one" />} />
            <p className="text-sm text-color-zero">Investment Purchase</p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-color-one col-span-2">
            Savings Payment - Successful
          </p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <section className="grid grid-cols-8 px-3 mr-8 border-b py-4 my-4">
          <div className="flex items-center gap-3 col-span-2">
            <Icon icon={<TbTargetArrow className="text-color-one" />} />
            <p className="text-sm text-color-zero">New Laptop Savings</p>
          </div>
          <p className="text-sm text-color-zero">$20</p>
          <p className="text-sm text-color-zero col-span-2">
            Sept 9, 2024 | 9:12 AM
          </p>
          <p className="text-sm text-color-one col-span-2">
            Savings Payment - Successful
          </p>
          <Link
            href=""
            className="flex items-center justify-center border rounded-[20px] gap-2 w-[78px] h-[22px]"
          >
            <p className="text-xs text-color-form">View</p>
            <IoIosArrowForward className="text-color-form text-sm" />
          </Link>
        </section>
        <div className="hidden lg:flex items-center justify-center gap-4 mt-auto">
          <p className="text-sm text-slate-400">Page 1 of 7</p>
          <div className="flex items-center gap-2">
            <div className="w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center pl-1">
              <MdArrowBackIos className="text-color-form" />
            </div>
            <div className="w-[22px] h-[22px] rounded-[4px] border shadow-sm flex items-center justify-center">
              <MdArrowForwardIos className="text-color-form" />
            </div>
          </div>
        </div>
      </div>
      {isFilterModalOpen && (
                <FilterModal 
                    onClose={() => setIsFilterModalOpen(false)}
                     // Added required onProceed prop
                />
            )}
    </div>
  );
}
