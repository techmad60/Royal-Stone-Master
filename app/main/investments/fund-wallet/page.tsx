import FundWalletPage from "@/components/Investments/FundWallet/FundWallet";
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
      <FundWalletPage />
    </Suspense>
  );
}