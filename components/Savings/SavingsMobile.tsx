
const transactions = [
  {
    date: "Today",
    items: [
      {
        description: "Savings Wallet Funding",
        status: "Successful",
        amount: "$20",
        time: "11:04 AM",
        isCredit: true,
      },
      {
        description: "Investment Fund Withdrawal",
        status: "Successful",
        amount: "-$7",
        time: "9:12 AM",
        isCredit: false,
      },
    ],
  },
  {
    date: "Yesterday, 12/9/2024",
    items: [
      {
        description: "Savings Wallet Funding",
        status: "Successful",
        amount: "$20",
        time: "11:04 AM",
        isCredit: true,
      },
      {
        description: "Investment Fund Withdrawal",
        status: "Successful",
        amount: "-$7",
        time: "9:12 AM",
        isCredit: false,
      },
    ],
  },
];
interface SavingsMobileProps {
  onProceed?: () => void;
}
export default function SavingsMobile({onProceed}:SavingsMobileProps) {
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
              <div className="">
                <div>
                  <p className="text-sm text-color-zero tracking-tight">
                    {item.description}
                  </p>
                  <p className="text-xs text-color-one">{item.status}</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className={`text-sm ${item.isCredit ? 'text-color-six' : 'text-red-500'}`}>
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
