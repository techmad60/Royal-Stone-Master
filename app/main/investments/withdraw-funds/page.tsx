import WithdrawFundsPage from "@/components/Investments/Withdraw-Funds/WithdrawFunds";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function InvestmentPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <WithdrawFundsPage />
    </Suspense>
  );
}