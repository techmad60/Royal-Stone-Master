import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import Image from "next/image";

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={20} // Space between slides
      slidesPerView={1} // 1 product per view on mobile
      breakpoints={{
        640: {
          slidesPerView: 2, // 2 products per view on small screens
        },
        1024: {
          slidesPerView: 3, // 3 products per view on large screens
        },
      }}
      loop={true} // Enables looping of the slides
      pagination={{ clickable: true }} // Adds pagination
      navigation={true} // Adds navigation arrows
    >
      {/* Product 1 */}
      <SwiperSlide>
        <section className="flex flex-col justify-start items-start flex-shrink-0">
          <Image
            src={"/images/small-potato.png"}
            alt="Potato Image"
            className="lg:w-[291px]"
            width={252}
            height={172}
          />

          <div className="flex flex-col justify-start items-start mt-2">
            <div className="flex flex-col justify-start items-start">
              <p className="font-medium text-base text-color-zero leading-4 my-2 text-start">
                Sweet Potatoes
              </p>
              <p className="text-sm text-color-unit">
                500 Units.{" "}
                <span className="text-green-700 text-sm">Available</span>
              </p>
            </div>
          </div>
        </section>
      </SwiperSlide>

      {/* Product 2 */}
      <SwiperSlide>
        <section className="flex flex-col justify-start items-start flex-shrink-0">
          <Image
            src={"/images/small-potato.png"}
            alt="Potato Image"
            className="lg:w-[291px]"
            width={252}
            height={172}
          />

          <div className="flex flex-col justify-start items-start mt-2">
            <div className="flex flex-col justify-start items-start">
              <p className="font-medium text-base text-color-zero leading-4 my-2 text-start">
                Sweet Potatoes
              </p>
              <p className="text-sm text-color-unit">
                500 Units.{" "}
                <span className="text-green-700 text-sm">Available</span>
              </p>
            </div>
          </div>
        </section>
      </SwiperSlide>

      {/* Product 3 */}
      <SwiperSlide>
        <section className="flex flex-col justify-start items-start flex-shrink-0">
          <Image
            src={"/images/small-potato.png"}
            alt="Potato Image"
            className="lg:w-[291px]"
            width={252}
            height={172}
          />

          <div className="flex flex-col justify-start items-start mt-2">
            <div className="flex flex-col justify-start items-start">
              <p className="font-medium text-base text-color-zero leading-4 my-2 text-start">
                Sweet Potatoes
              </p>
              <p className="text-sm text-color-unit">
                500 Units.{" "}
                <span className="text-green-700 text-sm">Available</span>
              </p>
            </div>
          </div>
        </section>
      </SwiperSlide>

      {/* Product 4 */}
      <SwiperSlide>
        <section className="flex flex-col justify-start items-start flex-shrink-0">
          <Image
            src={"/images/small-potato.png"}
            alt="Potato Image"
            className="lg:w-[291px]"
            width={252}
            height={172}
          />

          <div className="flex flex-col justify-start items-start mt-2">
            <div className="flex flex-col justify-start items-start">
              <p className="font-medium text-base text-color-zero leading-4 my-2 text-start">
                Sweet Potatoes
              </p>
              <p className="text-sm text-color-unit">
                500 Units.{" "}
                <span className="text-green-700 text-sm">Available</span>
              </p>
            </div>
          </div>
        </section>
       
      </SwiperSlide>
    </Swiper>
  );
}
