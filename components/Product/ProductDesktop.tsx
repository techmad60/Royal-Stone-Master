import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: string;
  name: string;
  availableUnits: number;
  totalUnits: number;
  location: string;
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

  const handleNavigation = (
    productId: string,
    status: string,
    action: "invest" | "view"
  ) => {
    if (status !== "available") {
      toast.error("This product has been sold out.");
      return;
    }

    let basePath = "";

    if (action === "invest") {
      basePath =
        "/main/investments/make-investment/investment-product/investment-details";
    } else {
      basePath =
        navigateTo === "investment"
          ? "/main/investments/make-investment/investment-product"
          : "/main/product/product-details";
    }

    router.push(`${basePath}?id=${encodeURIComponent(productId)}`);
  };

  return (
    <div>
      {/* Table Header */}
      {/* grid-cols-[50px_3fr_1fr_1fr_1fr_1fr_1fr] */}
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      {products.length !== 0 && (
        <div className="hidden lg:grid grid-cols-[30px_2fr_1fr_1fr_1fr_1fr_1fr] items-center bg-light-grey rounded-common py-4 px-8 shadow-sm mt-4">
          <p className="text-xs text-color-form">S/N</p>
          <p className="text-xs text-color-zero">
            Product Image & Name
          </p>
          <p className="text-xs text-color-zero">Total Units</p>
          <p className="text-xs text-color-zero">Available Units</p>
          <p className="text-xs text-color-zero">Location</p>
          <p className="text-xs text-color-zero">Status</p>
          <p className="text-xs text-color-zero">Actions</p>
        </div>
      )}

      {/* Table Body */}
      <div>
        {products.map((product, index) => (
          <section
            key={product.id}
            className="hidden lg:grid grid-cols-[30px_2fr_1fr_1fr_1fr_1fr_1fr] items-center my-4 mx-8 py-4 border-b"
          >
            {/* Serial Number (S/N) */}
            <p className="text-xs text-color-form">{index + 1}</p>

            {/* Product Image & Name */}
            <div className="flex items-center gap-2">
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

            {/* Total Units */}
            <div>
              <p className="text-sm text-color-zero">{product.totalUnits}</p>
            </div>

            {/* Available units */}
            <div>
              <p className="text-sm text-color-zero">
                {product.availableUnits}
              </p>
            </div>

            {/* Location */}
            <div>
              <p className="text-sm text-color-zero">
                {product.location}
              </p>
            </div>

            {/* Status */}
            <div>
              <span
                className={`text-sm  px-2 py-1 rounded-full ${
                  product.status === "available"
                    ? " text-color-one"
                    : " text-red-500"
                }`}
              >
                {product.status
                  .replace(/([a-z])([A-Z])/g, "$1 $2") // Adds space between camelCase
                  .replace(/^./, (str) => str.toUpperCase())}{" "}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleNavigation(product.id, product.status, "invest")
                }
                className="text-xs text-color-one rounded-[20px] border border-slate-100 font-semibold hover:bg-green-700 hover:text-white duration-300 w-[93px] h-[34px] flex items-center justify-center"
                aria-label={`Invest in ${product.name}`}
              >
                Invest
              </button>
              {showViewButton && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(product.id, product.status, "view"); // Pass status
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
