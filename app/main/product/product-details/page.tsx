import React, { Suspense } from "react";
import ProductDetails from "@/components/Product/ProductDetails";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails type="product"/>
    </Suspense>
  );
}
