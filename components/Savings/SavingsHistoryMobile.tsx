import { IoIosSend } from "react-icons/io";
import Icon from "../ui/Icon";
import { GoPlus } from "react-icons/go";

const transactions = [
  {
    date: "Today",
    items: [
      {
        description: "Savings Wallet Funding",
        status: "Completed",
        amount: "$20",
        time: "11:04 AM",
        icon: <GoPlus className="text-2xl text-color-one" />,
        isCredit: true,
      },
      {
        description: "Investment Fund Withdrawal",
        status: "Completed",
        amount: "-$7",
        time: "9:12 AM",
        icon: <IoIosSend className="text-2xl text-color-one" />,
        isCredit: false,
      },
    ],
  },
  {
    date: "Yesterday, 12/9/2024",
    items: [
      {
        description: "Savings Wallet Funding",
        status: "Completed",
        amount: "$20",
        time: "11:04 AM",
        icon: <GoPlus className="text-2xl text-color-one" />,
        isCredit: true,
      },
      {
        description: "Investment Fund Withdrawal",
        status: "Completed",
        amount: "-$7",
        time: "9:12 AM",
        icon: <IoIosSend className="text-2xl text-color-one" />,
        isCredit: false,
      },
    ],
  },
];
interface SavingsHistoryMobileProps {
  onProceed?: () => void;
}
export default function SavingsHistoryMobile({onProceed}:SavingsHistoryMobileProps) {
  return (
    <div className="lg:hidden">
      {transactions.map((transaction, index) => (
        <section key={index} onClick={onProceed}>
          <div>
            <p className="text-sm text-color-form pb-2">{transaction.date}</p>
            <hr />
          </div>
          {transaction.items.map((item, idx) => (
            <section
              key={idx}
              className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
            >
              <div className="flex gap-4">
                <Icon
                  icon={item.icon}
                  containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
                />
                <div>
                  <p className="text-sm text-color-zero font-medium tracking-tight">
                    {item.description}
                  </p>
                  <p className="text-xs text-color-one">{item.status}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className={`font-semibold text-sm ${item.isCredit ? 'text-color-six' : 'text-red-500'}`}>
                  {item.amount}
                </p>
                <p className="text-xs text-[rgba(107,115,133,0.7)]">
                  {item.time}
                </p>
              </div>
            </section>
          ))}
        </section>
      ))}
    </div>
  );
}
