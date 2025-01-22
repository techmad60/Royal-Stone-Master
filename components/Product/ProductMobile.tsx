import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowForwardIos } from "react-icons/md";

interface Product {
  id: string;
  name: string;
  availableUnits: number;
  description: string;
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

  const handleNavigation = (productId: string) => {
    const basePath =
      navigateTo === "investment"
        ? "/main/investments/make-investment/investment-product"
        : "/main/product/product-details";
    router.push(`${basePath}?id=${encodeURIComponent(productId)}`);
  };

  return (
    <div>
      {products.map((product) => (
        <section
          key={product.id}
          className="flex items-center gap-2 bg-light-grey rounded-common p-2 shadow-sm mt-4 lg:hidden cursor-pointer"
          onClick={() => handleNavigation(product.id)}
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
            <p className="text-[10px] text-color-one">
              {product.availableUnits} Units Available
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
