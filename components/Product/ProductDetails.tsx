"use client";
import Button from "@/components/ui/Button";
import Navigator from "@/components/ui/Navigator";
import StatRow from "@/components/ui/StatRow";
import TextToggle from "@/components/ui/TextToggle";
import useProductStore from "@/store/productStore"; // Import your Zustand store
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import Loading from "../ui/Loading";

export default function ProductDetails({
  type,
}: {
  type: "investment" | "product";
}) {
  const searchParams = useSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
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

  useEffect(() => {
    if (selectedImageIndex !== null) {
      document.body.classList.add("overflow-hidden");
    } else if (selectedImageIndex === null) {
      document.body.classList.remove("overflow-hidden");
    }
  }, [selectedImageIndex]);

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

  // Prepare images, ensuring a max of 5 and repeating if needed
  const images = product?.images ? product?.images.slice(0, 5) : [];
  while (images.length < 5) images.push(images[0]); // Repeat first image if fewer than 5

  const showPrevImage = () => {
    setSelectedImageIndex((prev) =>
      prev! > 0 ? prev! - 1 : images.length - 1
    );
  };

  const showNextImage = () => {
    setSelectedImageIndex((prev) =>
      prev! < images.length - 1 ? prev! + 1 : 0
    );
  };
  // Show 5 images in the loop
  // const images = product?.images ? product.images.slice(0, 5) : [];

  // const showPrevImage = () => {
  //   setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : images.length - 1));
  // };

  // const showNextImage = () => {
  //   setSelectedImageIndex((prev) => (prev! < images.length - 1 ? prev! + 1 : 0));
  // };

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
    <div className="mt-[8.3rem] lg:mt-24">
      <Navigator
        currentStep={type === "investment" ? 2 : 1}
        steps={steps[type]}
      />

      {/* Small Screen */}
      <section className="flex overflow-scroll hide-scrollbar gap-2 my-4 sm:hidden">
        {product.images && product.images.length > 0 ? (
          (() => {
            const images = product.images.slice(0, 5); // Take up to 5 images
            const length = images.length;

            // Determine how many times to repeat the first image
            const repeatedImages =
              length < 5
                ? [...images, ...Array(5 - length).fill(images[0])]
                : images;

            return repeatedImages.map((image, index) => (
              <div
                key={index}
                className="w-[110px] h-[111px] flex-shrink-0 rounded-[12px] overflow-hidden"
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image || "/placeholder-image.png"}
                  alt={`${product.name}-image-${index}`}
                  width={110}
                  height={111}
                  className="w-full h-full object-cover"
                />
              </div>
            ));
          })()
        ) : (
          <div className="text-center text-gray-500">No images available</div>
        )}
      </section>

      {/* Large Screen */}
      <section className="hidden overflow-scroll hide-scrollbar my-4 sm:grid grid-cols-4 gap-x-2">
        {/* Large Image */}
        <div
          className="col-span-2 rounded-[24px] overflow-hidden xl:w-[549px] xl:h-[337px]"
          onClick={() => setSelectedImageIndex(0)}
        >
          <Image
            src={
              product.images.length > 0
                ? product.images[0]
                : "/placeholder-image.png"
            }
            alt={`${product.name}`}
            width={549}
            height={337}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Grid for smaller images */}
        <div className="grid grid-cols-2 col-span-2 gap-y-2 lg:gap-x-16 xl:gap-x-[5rem]">
          {(() => {
            const images =
              product.images.length > 0
                ? product.images
                : ["/placeholder-image.png"];

            // Ensure at least 5 images, repeating the first one if necessary
            const extendedImages = [...images];
            while (extendedImages.length < 5) {
              extendedImages.push(images[0]); // Repeat the first image
            }

            return extendedImages.slice(1, 5).map(
              (
                image,
                index // Skip the first image (used in large view)
              ) => (
                <div
                  key={index}
                  className="rounded-[14px] overflow-hidden lg:w-[210px] xl:w-[315px] xl:h-[166px]"
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  <Image
                    src={image}
                    alt="product-details"
                    width={315}
                    height={166}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            );
          })()}
        </div>
      </section>

      <div className="flex flex-col lg:grid grid-cols-2 lg:gap-12 lg:pr-8 lg:mt-8">
        <section>
          <h1 className="text-lg font-bold text-color-zero lg:text-[22px]">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 py-2 border-b">
            <MdLocationOn className="text-color-form" />
            <p className="text-color-form text-sm">
              {product.location || "Sokoto, Nigeria"}
            </p>
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
      {/* Fullscreen Image Slider */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="relative w-[90%] sm:w-[60%] lg:w-[40%] flex items-center justify-center">
              {/* Left Button */}
              <button
                className="absolute left-4 text-white bg-black bg-opacity-50 p-3 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevImage();
                }}
              >
                <FaChevronLeft size={20} />
              </button>

              {/* Image Display */}
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-[600px] h-[400px] flex items-center justify-center"
              >
                <Image
                  src={images[selectedImageIndex]}
                  alt="Selected Image"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-lg aspect-square"
                />
              </motion.div>

              {/* Right Button */}
              <button
                className="absolute right-4 text-white bg-black bg-opacity-50 p-3 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  showNextImage();
                }}
              >
                <FaChevronRight size={20} />
              </button>

              {/* Close Button */}
              <button
                className="absolute top-1 right-1 text-white bg-black bg-opacity-50 p-2 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImageIndex(null);
                }}
              >
                <FaTimes size={20} />
              </button>
              {/* Image Navigation Dots */}
              <div className="absolute bottom-4 flex justify-center w-full gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      selectedImageIndex === index
                        ? "bg-white scale-110"
                        : "bg-gray-500"
                    } transition-all`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(index);
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
