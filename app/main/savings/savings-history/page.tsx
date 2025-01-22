"use client"
import { useState } from "react";
import Navigator from "@/components/ui/Navigator";
import SavingsHistoryMobile from "@/components/Savings/SavingsHistoryMobile";
import SavingsHistoryDesktop from "@/components/Savings/SavingsHistoryDesktop";
import SavingsDetails from "@/components/Savings/SavingsDetails";

const savingsHistory = [
    { label: "Fixed Savings", href: "/main/savings" },
    { label: "Savings History", href: "/main/savings/savings-history" },
  ];
export default function SavingsHistory () {
    const [savingDetailsOpen, setIsSavingDetailsOpen] = useState(false);

    const handleSavingDetailsOpen = () => {
        setIsSavingDetailsOpen(true)
    }
    return (
        <div>
            <Navigator currentStep={1} steps={savingsHistory}/>
            <div className="mt-4">
                <SavingsHistoryMobile onProceed={handleSavingDetailsOpen}/>
            </div>
            
            <div className="hidden lg:grid mt-4">
                <SavingsHistoryDesktop onProceed={handleSavingDetailsOpen}/>
            </div>

            {savingDetailsOpen && (
                <SavingsDetails onClose={() => setIsSavingDetailsOpen(false)}/>
            )}
            
        </div>
    )
}