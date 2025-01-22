import InvestmentDetails from "@/components/Investments/Details/InvestmentDetails";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <InvestmentDetails/>
    </Suspense>
  );
}
