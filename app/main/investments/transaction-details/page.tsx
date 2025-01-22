import TransactionDetails from "@/components/Investments/Details/TransactionDetails";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function TransactionDetailsPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <TransactionDetails />
    </Suspense>
  );
}
