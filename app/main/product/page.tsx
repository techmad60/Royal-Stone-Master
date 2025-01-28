"use client";
import ProductDesktop from "@/components/Product/ProductDesktop";
import ProductMobile from "@/components/Product/ProductMobile";
import Loading from "@/components/ui/Loading";
import PaginationComponent from "@/components/ui/PaginationComponent";
import useProductStore from "@/store/productStore"; // Import your Zustand store
import { useEffect } from "react";

export default function Products() {
  // Use Zustand store to manage products, loading, and errors
  const {
    products,
    fetchProducts,
    isLoading,
    error,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useProductStore();
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the page in the product store
  };

  useEffect(() => {
    fetchProducts(currentPage); // Fetch data for the current page
  }, [currentPage, fetchProducts]);

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4 lg:pr-8 h-screen">
      <p className="text-sm text-color-form py-4">All Available Products</p>
      {error ? (
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      ) : (
        <>
          <ProductMobile products={products} navigateTo="product" />
          <ProductDesktop products={products} navigateTo="product" />
        </>
      )}
      {/* Render PaginationComponent only if products are available */}
      {products.length > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
