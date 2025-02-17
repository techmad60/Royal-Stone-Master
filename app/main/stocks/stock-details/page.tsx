import StockDetails from "@/components/Stocks/Details/StockDetails";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function StockDetailsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <StockDetails />
    </Suspense>
  );
}
