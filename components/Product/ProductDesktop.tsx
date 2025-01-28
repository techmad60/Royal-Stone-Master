import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  availableUnits: number;
  description: string;
  status: string;
  images: string[];
}

export default function ProductDesktop({
  products,
  showViewButton = true,
  navigateTo = "product",
}: {
  products: Product[];
  showViewButton?: boolean;
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

  return (
    <div>
      {/* Table Header */}
      <ToastContainer position="top-right" autoClose={3000}/>
      {products.length !== 0 && (
        <div className="hidden lg:grid grid-cols-6 items-center bg-light-grey rounded-common py-4 px-8 shadow-sm mt-4">
        <p className="text-xs text-slate-400 col-span-3">
          Product Image & Name
        </p>
        <p className="text-xs text-slate-400">Units Available</p>
        <p className="text-xs text-slate-400">Status</p>
        <p className="text-xs text-slate-400">Actions</p>
      </div>
      )}
      
      {/* Table Body */}
      <div>
        {products.map((product) => (
          <section
            key={product.id}
            className="hidden lg:grid grid-cols-6 items-center my-4 mx-8 py-4 border-b"
          >
            {/* Product Image & Name */}
            <div className="flex items-center col-span-3 gap-2">
              <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
                <Image
                  src={product.images[0] || "/placeholder-image.png"}
                  alt={product.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm text-color-zero pr-4 tracking-tight">
                {product.name}
              </p>
            </div>

            {/* Units Available */}
            <div>
              <p className="text-sm text-color-zero">{product.availableUnits}</p>
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded-full ${
                  product.status === "available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.status
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Adds space between camelCase
                  .replace(/^./, (str) => str.toUpperCase())}{" "}
                {/* Capitalizes the first letter */}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleNavigation(product.id, product.status)} // Pass status
                className="text-xs text-color-one rounded-[20px] border border-slate-100 font-semibold hover:bg-green-700 hover:text-white duration-300 w-[93px] h-[34px] flex items-center justify-center"
                aria-label={`Invest in ${product.name}`}
              >
                Invest
              </button>
              {showViewButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(product.id, product.status); // Pass status
                  }}
                  className="text-xs font-medium hover:text-green-700 duration-300 flex items-center text-color-form"
                  aria-label={`View details of ${product.name}`}
                >
                  View <MdArrowForwardIos />
                </button>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
