"use client";
import { useSearchParams } from "next/navigation";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Retrieve the "id" from search params

  return <div>Product Details Page for ID: {id}</div>;
};

export default ProductDetails;
 {/* <section>
                <p className="text-color-form text-sm">Today</p>
                <hr className="my-3" />
                <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common mt-2 lg:w-[361px] xl:w-[520px]">
                  <div className="flex gap-4 lg:gap-3">
                    <Icon
                      icon={<GoPlus className="text-color-one text-lg" />}
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium">
                        Wallet Funding
                      </p>
                      <p className="text-xs text-color-one">Completed</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-color-six">$20</p>
                    <p className="text-slate-400 text-xs">11:04 AM</p>
                  </div>
                </section>
              </section>
              <section className="my-5">
                <p className="text-color-form text-sm">September 11th, 2024</p>
                <hr className="my-3" />
                <section className="flex justify-between items-center bg-light-grey p-4 shadow-sm rounded-common lg:w-[361px] xl:w-[520px]">
                  <div className="flex gap-4 lg:gap-3">
                    <Icon
                      icon={
                        <BsFileBarGraphFill className="text-color-one text-lg" />
                      }
                      containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px]"
                    />
                    <div>
                      <p className="text-sm text-color-zero font-medium">
                        Investment Purchase
                      </p>
                      <p className="text-xs text-color-one">Successful</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-color-six">$20</p>
                    <p className="text-slate-400 text-xs">11:04 AM</p>
                  </div>
                </section>
              </section> */}