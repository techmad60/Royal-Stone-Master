import SavingsTarget from "@/components/Savings/SavingsDetails";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <SavingsTarget/>
    </Suspense>
  );
}
