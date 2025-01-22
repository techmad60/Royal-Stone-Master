import Investment from "@/components/Investments/Investment";
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
      <Investment />
    </Suspense>
  );
}
