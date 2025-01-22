import ProductDetails from "@/components/Product/ProductDetails";
import Loading from "@/components/ui/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div><Loading/></div>}>
      <ProductDetails type="investment"/>
    </Suspense>
  );
}
