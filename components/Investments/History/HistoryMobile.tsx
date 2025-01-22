// import Icon from "@/components/ui/Icon";
// import Loading from "@/components/ui/Loading";
// import { useEffect, useState } from "react";
// import { BsFileBarGraphFill } from "react-icons/bs";
// import { GoPlus } from "react-icons/go";
// import InvestmentHistoryModal from "./InvestmentHistoryModal";

// interface Investments {
//   id: string;
//   type: string;
//   amount: number;
//   createdAt: string;
//   status: string;
// }
// interface GroupedInvestments {
//   date: string;
//   items: Investments[];
// }

// interface HistoryMobileProps {
//   investments: Investments[];
// }

// export default function HistoryMobile({ investments }: HistoryMobileProps) {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showModal, setShowModal] = useState(false); // Modal visibility state
//   const [latestTransactions, setLatestTransactions] = useState<any>([]);
//   const [latestDateLabel, setLatestDateLabel] = useState<string>("");
//   const [selectedInvestment, setSelectedInvestment] =
//     useState<Investments | null>(null); // Selected investment

//   useEffect(() => {
//     // Group investments by date
//     const groupByDate = (investments: Investments[]) => {
//       const grouped: { [key: string]: Investments[] } = {};
//       investments.forEach((investment) => {
//         const dateKey = new Date(investment.createdAt).toLocaleDateString(); // Local date string
//         if (!grouped[dateKey]) {
//           grouped[dateKey] = [];
//         }
//         grouped[dateKey].push(investment);
//       });

//       return Object.entries(grouped)
//         .map(([date, items]) => ({ date, items }))
//         .sort(
//           (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
//         );
//     };

//     // Group and find the latest transactions
//     const groupedInvestments = groupByDate(
//       investments.sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       )
//     );

//     if (groupedInvestments.length > 0) {
//       const today = new Date().toLocaleDateString();
//       const yesterday = new Date(Date.now() - 86400000).toLocaleDateString();

//       const latestGroup = groupedInvestments[0]; // Most recent group
//       const latestDate = latestGroup.date;

//       // Set the label based on the date
//       if (latestDate === today) {
//         setLatestDateLabel("Today");
//       } else if (latestDate === yesterday) {
//         setLatestDateLabel("Yesterday");
//       } else {
//         setLatestDateLabel(
//           new Date(latestDate).toLocaleDateString("en-US", {
//             weekday: "long",
//             month: "long",
//             day: "numeric",
//           })
//         );
//       }

//       setLatestTransactions(latestGroup.items); // Set transactions for the latest date
//     }
//   }, [investments]);

//   const fetchInvestmentDetails = async (id: string, type: string) => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       setLoading(true);
//       setError(null);

//       // Fetch investments of the given type
//       const response = await fetch(
//         `https://api-royal-stone.softwebdigital.com/api/investment?type=${type}`,
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();

//       if (!data.status) {
//         throw new Error("Failed to fetch investment details.");
//       }

//       // Find the specific investment by ID
//       const investmentDetails = data.data.data.find(
//         (investment: Investments) => investment.id === id
//       );

//       if (!investmentDetails) {
//         throw new Error("Investment not found.");
//       }

//       // Set the selected investment data and open modal
//       setSelectedInvestment(investmentDetails);
//       setShowModal(true);
//       // Use router.push to navigate to the details page with full investment data
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(
//           err.message || "Failed to fetch data. Please try again later."
//         );
//       } else {
//         setError("An unknown error occurred. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="lg:hidden">
//       {error && <p className="text-red-500">{error}</p>}
//       {latestTransactions.length > 0 ? (
//         <section>
//           <div>
//             <p className="text-sm text-color-form pb-2">{latestDateLabel}</p>
//             <hr />
//           </div>
//           {latestTransactions.map((investment: Investments) => (
//             <section
//               key={investment.id}
//               className="flex justify-between bg-light-grey shadow-sm rounded-common p-4 my-4"
//               onClick={() =>
//                 fetchInvestmentDetails(investment.id, investment.type)
//               }
//             >
//               <div className="flex gap-4">
//                 <Icon
//                   icon={
//                     investment.type === "investment-wallet-funding" ? (
//                       <GoPlus className="text-color-one" />
//                     ) : (
//                       <BsFileBarGraphFill className="text-color-one" />
//                     )
//                   }
//                   containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)]"
//                 />
//                 <div>
//                   <p className="text-sm text-color-zero font-medium tracking-tight">
//                     {investment.type
//                       .replace(/-/g, " ")
//                       .replace(/\b\w/g, (char: string) => char.toUpperCase())}
//                   </p>
//                   <p
//                     className={`text-xs ${
//                       investment.status === "pending"
//                         ? "text-yellow-500"
//                         : investment.status === "successful"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {investment.status.charAt(0).toUpperCase() +
//                       investment.status.slice(1)}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <p className="font-semibold text-sm text-color-six">
//                   ${investment.amount}
//                 </p>
//                 <p className="text-xs text-[rgba(107,115,133,0.7)]">
//                   {new Date(investment.createdAt).toLocaleString("en-US", {
//                     hour: "numeric",
//                     minute: "2-digit",
//                     hour12: true,
//                   })}
//                 </p>
//               </div>
//             </section>
//           ))}
//         </section>
//       ) : (
//         <p className="text-sm text-center text-gray-500 mt-4">
//           No transactions available.
//         </p>
//       )}
//       {/* Modal for displaying investment details */}
//       {showModal && selectedInvestment && (
//         <InvestmentHistoryModal
//           investment={selectedInvestment} // Passing selected investment as prop
//           closeModal={() => setShowModal(false)} // Close modal function
//         />
//       )}
//     </div>
//   );
// }
