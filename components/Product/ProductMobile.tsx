import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

interface Product {
  id: string;
  name: string;
  availableUnits: number;
  description: string;
  status: string; // Add status field for checking
  images: string[];
}

export default function ProductMobile({
  products,
  navigateTo = "product",
}: {
  products: Product[];
  navigateTo?: "product" | "investment";
}) {
  const router = useRouter();

  const handleNavigation = (productId: string, status: string) => {
    if (status !== "available") {
      toast.error("This product has been sold out.");
      return;
    }

    const basePath =
      navigateTo === "investment"
        ? "/main/investments/make-investment/investment-product"
        : "/main/product/product-details";
    router.push(`${basePath}?id=${encodeURIComponent(productId)}`);
  };

  const getAvailabilityTextClass = (availableUnits: number) => {
    if (availableUnits < 1) return "text-red-700"; // Red for less than 1 unit
    if (availableUnits === 1) return "text-color-one"; // Default color for 1 unit
    if (availableUnits < 50) return "text-yellow-600"; // Yellow for less than 50 units
    return "text-color-one"; // Default color for 50 or more units
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      {products.map((product) => (
        <section
          key={product.id}
          className="flex items-center gap-2 bg-light-grey rounded-common p-2 shadow-sm mt-4 lg:hidden cursor-pointer"
          onClick={() => handleNavigation(product.id, product.status)}
        >
          <div className="w-[100px] h-[77px] rounded-[12px] overflow-hidden">
            <Image
              src={product.images?.[0] || "/placeholder-image.png"}
              alt={product.name}
              width={77}
              height={77}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col space-y-1 w-full">
            <p
              className={`text-[10px] ${getAvailabilityTextClass(
                product.availableUnits
              )}`}
            >
              {product.availableUnits < 1
                ? "Sold Out"
                : product.availableUnits === 1
                ? "1 Unit Available"
                : `${product.availableUnits} Units Available`}
            </p>
            <p className="text-sm text-colour-five tracking-tight">
              {product.description?.length > 50
                ? `${product.description.substring(0, 50)}...`
                : product.description || "No description available"}
            </p>
            <div className="flex items-center justify-between">
              <button
                className="flex items-center justify-center text-xs text-color-one font-semibold bg-white border border-slate-100 w-[67px] h-[30px] rounded-common"
                aria-label={`Invest in ${product.name}`}
              >
                Invest
              </button>
              <MdArrowForwardIos className="text-sm text-color-form font-semibold" />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
