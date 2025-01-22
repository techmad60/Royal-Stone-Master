import { GoPlus } from "react-icons/go";
import { IoIosSend } from "react-icons/io";
import { BsFileBarGraphFill } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";
import Icon from "@/components/ui/Icon";

export default function TransactionsMobile() {
    const transactions = [
        {
            title: "Savings Wallet Funding",
            status: "Pending",
            statusColor: "text-[rgba(255,165,0,1)]",
            amount: "$20",
            time: "11:04 AM",
            icon: <GoPlus className="text-2xl text-color-one" />,
        },
        {
            title: "Investment Fund Withdrawal",
            status: "Successful",
            statusColor: "text-color-one",
            amount: "-$7",
            time: "9:12 AM",
            icon: <IoIosSend className="text-2xl text-color-one" />,
        },
        {
            title: "Savings Wallet Funding",
            status: "Successful",
            statusColor: "text-color-one",
            amount: "$20",
            time: "11:04 AM",
            icon: <GoPlus className="text-2xl text-color-one" />,
        },
        {
            title: "Investment Fund Withdrawal",
            status: "Successful",
            statusColor: "text-color-one",
            amount: "$20",
            time: "11:04 AM",
            icon: <IoIosSend className="text-2xl text-color-one" />,
        },
        {
            title: "Investment Purchase",
            status: "Successful",
            statusColor: "text-color-one",
            amount: "$63",
            time: "11:04 AM",
            icon: <BsFileBarGraphFill className="text-2xl text-color-one" />,
        },
        {
            title: "New Laptop Savings",
            status: "Savings Payment - Successful",
            statusColor: "text-color-one",
            amount: "$20",
            time: "11:04 AM",
            icon: <TbTargetArrow className="text-2xl text-color-one" />,
        },
        {
            title: "New Laptop Savings",
            status: "Savings Payment - Failed",
            statusColor: "text-red-500",
            amount: "$20",
            time: "11:04 AM",
            icon: <TbTargetArrow className="text-2xl text-color-one" />,
        },
    ];

    return (
        <div>
            {transactions.map((transaction, index) => (
                <section key={index} className="flex my-6 items-end bg-light-grey p-4 shadow-sm rounded-common justify-between">
                    <div className="flex gap-4">
                        <Icon icon={transaction.icon} containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]" />
                        <div>
                            <p className="text-sm text-color-zero font-medium tracking-tight">{transaction.title}</p>
                            <p className={`text-xs ${transaction.statusColor}`}>{transaction.status}</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-[rgba(107,115,133,1)] text-color-six font-semibold">{transaction.amount}</p>
                        <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">{transaction.time}</p>
                    </div>
                </section>
            ))}
        </div>
    );
}
