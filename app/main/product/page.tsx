"use client";
import ProductDesktop from "@/components/Product/ProductDesktop";
import ProductMobile from "@/components/Product/ProductMobile";
import useProductStore from "@/store/productStore"; // Import your Zustand store
import { useEffect } from "react";
// import PaginationComponent from "@/components/ui/PaginationComponent";

export default function Products() {
  // Use Zustand store to manage products, loading, and errors
  const { products, fetchProducts, isLoading, error, currentPage } = useProductStore();

  useEffect(() => {
    fetchProducts(currentPage); // Fetch data for the current page
  }, [currentPage, fetchProducts]);
  

  return (
    <div className="flex flex-col pb-4 lg:pr-8 h-screen">
      <p className="text-sm text-color-form py-4">All Available Products</p>
      {isLoading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      ) : (
        <>
          <ProductMobile products={products} navigateTo="product"/>
          <ProductDesktop products={products} navigateTo="product"/>
        </>
      )}
      {/* <PaginationComponent /> */}
    </div>
  );
}
