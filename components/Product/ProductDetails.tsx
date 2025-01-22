"use client";
import Button from "@/components/ui/Button";
import Navigator from "@/components/ui/Navigator";
import StatRow from "@/components/ui/StatRow";
import TextToggle from "@/components/ui/TextToggle";
import useProductStore from "@/store/productStore"; // Import your Zustand store
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { MdLocationOn } from "react-icons/md";
import Loading from "../ui/Loading";

export default function ProductDetails({
  type,
}: {
  type: "investment" | "product";
}) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  // Use Zustand store to manage product details
  const { products, fetchProducts, error } = useProductStore();

  // Fetch products when the component mounts or if products are empty
  useEffect(() => {
    if (products.length === 0) {
      fetchProducts(); // Fetch products if not already fetched
    }
  }, [products, fetchProducts]);

  // Find the product by ID once products are fetched
  const product = products.find((product) => product.id === id);

  // Compute steps using useMemo for optimization
  const steps = React.useMemo(() => {
    if (!product) return { investment: [], product: [] };

    return {
      investment: [
        { label: "Investments", href: "/main/investments" },
        {
          label: "Make Investment",
          href: "/main/investments/make-investment",
        },
        {
          label: "Investment Product",
          href: `/main/investments/make-investment/investment-product?id=${encodeURIComponent(
            product.id
          )}`,
        },
      ],
      product: [
        { label: "Products", href: "/main/product" },
        {
          label: "Product details",
          href: `/main/product/product-details?id=${encodeURIComponent(
            product.id
          )}`,
        },
        { label: "Images", href: "/main/product/product-details/images" },
      ],
    };
  }, [product]); // Recompute steps only when product changes

  if (error)
    return (
      <p className="text-red-500">
        Failed to load product details. Please try again later.
      </p>
    );
  if (!product)
    return (
      <div>
        <Loading />
      </div>
    );

  // Unified navigation logic for the Invest button
  const handleInvestClick = () => {
    router.push(
      `/main/investments/make-investment/investment-product/investment-details?id=${encodeURIComponent(
        product.id
      )}`
    );
  };

  return (
    <div>
      <Navigator
        currentStep={type === "investment" ? 2 : 1}
        steps={steps[type]}
      />

      {/* Small Screen */}
      <section className="flex overflow-scroll hide-scrollbar gap-2 my-4 sm:hidden ">
        {product.images && product.images.length > 0 ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-[110px] h-[111px] flex-shrink-0 rounded-[12px] overflow-hidden"
            >
              <Image
                src={product.images[0] || "/placeholder-image.png"} // Reuse the first image
                alt={`${product.name}-image-${index}`}
                width={110}
                height={111}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No images available</div>
        )}
      </section>

      {/* Large Screen */}
      <section className="hidden overflow-scroll hide-scrollbar my-4 sm:grid grid-cols-4 gap-x-2">
        <div className="col-span-2  rounded-[24px] overflow-hidden xl:w-[549px] xl:h-[337px]">
          <Image
            src={product.images[0] || "/placeholder-image.png"}
            alt={`${product.name}`}
            width={549}
            height={337}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-cols-2 col-span-2  gap-y-2 lg:gap-x-16 xl:gap-x-[5rem]">
          <div className=" rounded-[14px] overflow-hidden lg:w-[210px] xl:w-[315px] xl:h-[166px]">
            <Image
              src={product.images[0] || "/placeholder-image.png"}
              alt="product-details"
              width={315}
              height={166}
              className="w-full h-full object-cover"
            />
          </div>

          <div className=" rounded-[14px] overflow-hidden lg:w-[210px] xl:w-[315px] xl:h-[166px]">
            <Image
              src={product.images[0] || "/placeholder-image.png"}
              alt="product-details"
              width={315}
              height={166}
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" rounded-[14px] overflow-hidden lg:w-[210px] xl:w-[315px] xl:h-[166px]">
            <Image
              src={product.images[0] || "/placeholder-image.png"}
              alt="product-details"
              width={315}
              height={166}
              className="w-full h-full object-cover"
            />
          </div>
          <div className=" rounded-[14px] overflow-hidden lg:w-[210px] xl:w-[315px] xl:h-[166px]">
            <Image
              src={product.images[0] || "/placeholder-image.png"}
              alt="product-details"
              width={315}
              height={166}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:grid grid-cols-2 lg:gap-12 lg:pr-8 lg:mt-8">
        <section>
          <h1 className="text-lg font-bold text-color-zero lg:text-[22px]">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 py-2 border-b">
            <MdLocationOn className="text-color-form" />
            <p className="text-color-form text-sm">Sokoto, Nigeria</p>
          </div>
          <TextToggle description={product.description} />
        </section>

        <div>
          <section className="flex flex-col bg-light-grey rounded-[10px] px-4 shadow-sm">
            <StatRow
              label="Status"
              value={product.status.toUpperCase()}
              valueClass="text-color-one text-sm"
            />
            <StatRow
              label="Total Units"
              value={`${product.totalUnits} Units`}
              valueClass="text-color-six text-sm"
            />
            <StatRow
              label="Available Units"
              value={`${product.availableUnits} Units`}
              valueClass="text-color-six text-sm"
            />
            <StatRow
              label="Cost Per Unit"
              value={`$${product.costPerUnit}/unit`}
              valueClass="text-color-six text-sm"
            />
            <StatRow
              label="ROI"
              value={`${product.ROI.value}%`}
              valueClass="text-color-six text-sm"
              isLast={true}
            />
          </section>
          <Button
            ButtonText="Invest"
            className="w-full mt-8"
            onClick={handleInvestClick}
          />
        </div>
      </div>
    </div>
  );
}
