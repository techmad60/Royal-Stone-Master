"use client";
import ProductDesktop from "@/components/Product/ProductDesktop";
import ProductMobile from "@/components/Product/ProductMobile";
import Loading from "@/components/ui/Loading";
import Navigator from "@/components/ui/Navigator";
import PaginationComponent from "@/components/ui/PaginationComponent";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";

const createInvestment = [
  { label: "Investments", href: "/main/investments" },
  { label: "Make Investment", href: "/main/investments/make-investment" },
];

export default function MakeInvestment() {
  const { products, fetchProducts, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useProductStore();
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page); // Update the page in the product store
    };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:h-screen">
      <Navigator currentStep={1} steps={createInvestment} />
      <div className="space-y-2 mt-4">
        <h1 className="text-base font-semibold text-color-zero">
          Make Investment
        </h1>
        <p className="text-color-form text-sm">Select an Investment Product</p>
      </div>
      {error ? (
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      ) : (
        <>
          <ProductMobile products={products} navigateTo="investment" />
          <ProductDesktop
            products={products}
            showViewButton={false}
            navigateTo="investment"
          />
          {/* Render PaginationComponent only if products are available */}
          {products.length > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
