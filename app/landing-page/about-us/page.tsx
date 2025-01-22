//app/about-us/page.tsx
import Footer from "@/components/Sections/Footer";
import Header from "@/components/Sections/Header";
import DownloadApp from "@/components/ui/DownloadApp";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className={` flex flex-col`}>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center pt-24 lg:text-start md:flex-row lg:px-36 lg:pt-[4rem] lg:gap-4 xl:gap-6 m-auto xl:px-96">
          {/* Text and Button Section */}
          <div className="flex flex-col justify-start items-start text-start px-4 space-y-6 lg:px-0">
            <h1
              className={`text-color-zero leading-[34.72px] font-extrabold text-[28px] lg:text-[39px] lg:leading-[48.36px]`}
            >
              Who we are
            </h1>
            <p className="text-sm xs:w-[345px] font-normal text-colour-five lg:px-0 lg:w-[475px] lg:leading-[28px] lg:text-base xl:w-[567px]">
              Welcome to Royal Stone Capital, your trusted partner in achieving
              financial freedom. Our team of seasoned experts has decades of
              experience in investment and savings solutions, providing
              unparalleled guidance and support. At Royal Stone Capital, we
              pride ourselves on delivering diverse investment packages, helping
              you make informed decisions about your investment options. Our
              exceptional customer service team is always available to address
              your concerns and provide prompt resolutions. By joining the Royal
              Stone Capital family, you&apos;ll experience the difference that comes
              with working with a dedicated team of financial professionals. We
              prioritize building long-term relationships, fostering trust, and
              ensuring your financial well-being. Together, let&apos;s achieve
              financial freedom and secure your legacy.{" "}
            </p>
          </div>

          {/*Hero Image */}
          <Image
            src="/images/about-hero-img.svg"
            alt="About Hero Image"
            width={340}
            height={437.36}
            className="xs:w-[345px] lg:w-[400px] xl:w-[592px] xl:h-[554px] mt-8"
          />
        </section>

        {/*Our Story Section */}
        <section className="flex flex-col items-center justify-center text-center bg-white pt-12 lg:text-start md:flex-row-reverse lg:px-36 lg:pt-[4rem] lg:gap-16 xl:gap-44 m-auto xl:px-96">
          {/* Text and Button Section */}
          <div className="flex flex-col justify-start items-start text-start px-4 space-y-6 lg:px-0">
            <h1
              className={`text-color-zero leading-[34.72px] font-extrabold text-[28px]`}
            >
              Our Story
            </h1>
            <p className="text-sm xs:w-[345px] font-normal text-colour-five lg:px-0 lg:w-[490px] lg:leading-[28px] lg:text-base xl:w-[663px]">
              Welcome to Royal Stone Capital, where financial freedom meets
              innovation. Our story began with a vision to democratize access to
              investment and savings opportunities, empowering individuals and
              institutions to secure their financial futures. Founded by a team
              of seasoned financial experts, Royal Stone Capital is built on the
              principles of trust, transparency, and customer-centricity. Our
              journey started with a simple yet bold idea: to bridge the gap
              between financial institutions and individuals, providing tailored
              investment solutions that meet the unique needs of each client.
              Today, we offer a range of investment packages, savings options,
              and stock investment services designed to help you achieve your
              financial goals. Our expert team leverages cutting-edge technology
              and market insights to deliver exceptional results. Tomorrow, we
              envision a future where financial freedom is within reach for
              everyone. A future where our clients can confidently invest, save,
              and grow their wealth, secure in the knowledge that their
              financial well-being is our top priority. Join us on this journey,
              and discover a brighter financial future. Explore our investment
              packages, savings options, and stock investment services, and
              experience the Royal Stone Capital difference. Together, let&apos;s
              shape the future of finance{" "}
            </p>
          </div>

          {/* Responsive Dashboard Image  */}
          <Image
            src={"/images/dashboard.svg"}
            alt="App Dashboard"
            className="sm:w-[350px] lg:w-[472px] mt-16"
            width={345}
            height={430}
          />
        </section>

        {/*Our Mission Section */}
        <section className="flex flex-col items-center justify-center text-center bg-color-two pt-12 lg:text-start md:flex-row  lg:px-36 lg:pt-[4rem] lg:gap-12 xl:gap-32 m-auto xl:px-96">
          {/* Text and Button Section */}
          <div className="flex flex-col justify-start items-start text-start px-4 space-y-6 lg:px-0">
            <h1
              className={`text-color-zero leading-[34.72px] font-extrabold text-[28px]`}
            >
              Our Mission & Vision
            </h1>
            <p className="text-sm xs:w-[345px] font-normal text-colour-five lg:px-0 lg:w-[460px] lg:leading-[28px] lg:text-base xl:w-[663px]">
              Our mission is to empower individuals, families, and institutions
              to reach their financial goals through personalized investment
              strategies and secure savings options. 
            </p>
            <p className="text-sm xs:w-[345px] font-normal text-colour-five lg:px-0 lg:w-[460px] lg:leading-[28px] lg:text-base xl:w-[663px]">Our vision is to be the
              leading investment and savings company, renowned for excellence,
              innovation, and customer satisfaction, creating a financial
              ecosystem where individuals and institutions can thrive, achieve
              financial freedom, and secure their legacies.</p>
          </div>

          {/* Responsive Fund Wallet Image  */}
          <Image
            src={"/images/fund-wallet.svg"}
            alt="Fund wallet Image"
            className="sm:w-[345px] lg:w-[390px] mt-16"
            width={340}
            height={430}
          />
        </section>
        <DownloadApp />
      </main>
      <Footer />
    </div>
  );
}
