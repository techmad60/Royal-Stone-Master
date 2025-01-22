// Main Component
import Image from "next/image";
import AppStoreButton from "../ui/AppStoreButton";
import GooglePlayButton from "../ui/GooglePlayButton";
import DownloadApp from "../ui/DownloadApp";
import CardComponent from "../ui/CardComponent";
import CardComponentTwo from "../ui/CardComponentTwo";
// import Carousel from "../ui/Carousel";
import { GrSend } from "react-icons/gr";

export default function Main() {
  return (
    <main className="z-10 w-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-24 xs:px-4 lg:text-start lg:flex-row lg:px-36 lg:pt-[4rem] lg:gap-4 xl:gap-0 xl:m-auto xl:px-96">
        {/* Text and Button Section */}
        <div className="flex flex-col justify-start items-start text-start space-y-6 lg:px-0">
          <h1
            className={`text-color-zero leading-[34.72px] font-extrabold text-xl w-[340px] xs:text-[28px] xs:w-[347px] lg:px-0 lg:text-[39px] lg:w-[500px] lg:leading-[48.36px] xl:w-[520px]`}
          >
            Secure Your Financial Future with Our Investment Solutions
          </h1>
          <p className="text-sm w-[340px] xs:w-[345px] font-normal text-colour-five lg:px-0 lg:w-[425px] lg:leading-[28px] lg:text-base xl:w-[644px]">
            Protect your wealth and secure your future with our comprehensive
            investment strategies.
          </p>
          <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
            <p className="flex items-center text-sm font-medium gap-[5px] text-colour-five lg:text-base lg:font-semibold ">
              {" "}
              <span className="text-color-one">
                <GrSend />
              </span>{" "}
              Long-term growth
            </p>
            <p className="flex items-center text-sm font-medium gap-[5px] text-colour-five lg:text-base lg:font-semibold ">
              {" "}
              <span className="text-color-one">
                <GrSend />
              </span>{" "}
              Risk management
            </p>
            <p className="flex items-center text-sm font-medium gap-[5px] text-colour-five lg:text-base lg:font-semibold ">
              {" "}
              <span className="text-color-one">
                <GrSend />
              </span>{" "}
              Tax-efficient solutions
            </p>
            <p className="flex items-center text-sm font-medium gap-[5px] text-colour-five lg:text-base lg:font-semibold ">
              {" "}
              <span className="text-color-one">
                <GrSend />
              </span>{" "}
              Retirement planning
            </p>
          </div>
          <p className="text-colour-five text-sm whitespace-nowrap lg:text-base">
            Start securing your future today!
          </p>
          <div className="flex gap-4 pt-6">
            <AppStoreButton
              textColor="text-white"
              backgroundColor="bg-[rgba(36,34,47,1)]"
              width="166.69px"
              height="62.02px"
              lgWidth="162px"
              lgHeight="64px"
            />
            <GooglePlayButton
              textColor="text-white"
              backgroundColor="bg-[rgba(36,34,47,1)]"
              width="166.69px"
              height="62.02px"
              lgWidth="162px"
              lgHeight="64px"
            />
          </div>
        </div>

        {/*Hero Image */}
        <Image
          src="/images/hero-img.svg"
          alt="Hero Image"
          width={340}
          height={437.36}
          className="xs:w-[345px] lg:w-[400px] xl:w-[579px] xl:h-[734px] mt-8"
        />
      </section>

      {/* Our Services Section */}
      <section className="flex flex-col justify-start items-start bg-white pl-4 py-12 xs:px-4 sm:justify-center sm:items-center lg:flex-row lg:gap-8 xl:pb-0 overflow-x-hidden">
        <div className="flex flex-col justify-center">
          <div className="flex flex-col justify-start items-start">
            <h2
              className={`text-color-zero text-[22px] font-extrabold whitespace-nowrap lg:text-lg-base`}
            >
              Our Services
            </h2>
            <p className="text-sm text-colour-five leading-base w-[340px] xs:w-[345px] my-2 text-start sm:w-[400px] lg:text-base xl:w-[500px]">
              Comprehensive Financial Solutions- Grow, protect, and optimize
              your wealth with our integrated financial services. Invest, and
              Save, with confidence, leveraging: Expert investment strategies,
              Tax-efficient savings solutions, and Real-time stock market
              insights. Achieve financial freedom with our comprehensive
              platform.
            </p>
          </div>
          <Image
            src={"/images/dashboard.svg"}
            alt="App Dashboard"
            className="mt-20 xs:w-[345px] sm:w-[350px] lg:w-[472px]"
            width={330}
            height={430}
          />
        </div>

        <div className="flex flex-col space-y-6 justify-center items-center mt-12 lg:mt-0 lg:border-l lg:pl-12 xl:pl-12">
          {/* Make an Investment */}
          <CardComponent
            title="Make an Investment"
            text="Take control of your financial future. Make informed investment decisions with our expert guidance.
            Diversify your portfolio, minimize risk, and maximize returns. Whether you're a seasoned investor or just
            starting out, our tailored solutions empower you to achieve your goals. Invest in your dreams, secure your
            legacy, and unlock a brighter financial future. Start your investment journey today!"
            icon="/images/make-investment.svg"
          />

          {/* Create a Savings Target */}
          <CardComponent
            title="Create a Savings Target"
            text="Set your financial goals and crush them! Create a savings target that sparks motivation and drives results.
            Whether it's a dream vacation, down payment, or emergency fund, our tools help you stay focused and
            on track. Set realistic targets, automate your savings, and watch your progress grow. Start your journey
            to financial freedom today!"
            icon="/images/make-savings.svg"
          />

          {/* Invest In Stocks */}
          <CardComponent
            title="Invest In Stocks"
            text="Unlock your financial potential. Invest in stocks and tap into
                  the world's top-performing companies. Diversify your
                  portfolio, minimize risk, and maximize returns. Start building your stock portfolio today and secure your financial future. Stay ahead of the game with smart investments and watch your wealth grow steadily over time."
            icon="/images/buy-stocks.svg"
          />
        </div>
      </section>
      {/*How to get started Section*/}
      <section className="flex flex-col justify-start items-start bg-color-two py-16 lg:justify-center lg:items-start lg:flex-row lg:gap-4 lg:pb-0 xl:gap-72">
        <div className="flex flex-col justify-start items-start px-4">
          <h2
            className={`text-color-zero text-[22px] font-extrabold whitespace-nowrap lg:text-lg-base`}
          >
            How To Get Started
          </h2>
          {/* Download Mobile App */}
          <div className="flex flex-col space-y-4 mt-8 sm:space-y-12 lg:space-y-8">
            <section className="flex justify-start items-start rounded-lg gap-4">
              <div className="relative flex flex-col items-center flex-shrink-0">
                <Image
                  src={"/images/download-ma.svg"}
                  alt="Download Mobile App Icon"
                  width={35.36}
                  height={35.36}
                  className="icon"
                />
                <div className="absolute mt-9 bg-gray-200 h-[350px] w-[1px]"></div>
              </div>
              <div className="flex flex-col justify-start items-start">
                <h3
                  className={`font-semibold text-base text-color-zero lg:text-lg`}
                >
                  Download the Mobile App
                </h3>
                <p className="font-light text-sm text-colour-five leading-base my-2 text-start lg:w-[370px]">
                  Take control of your finances anywhere, anytime. Download our
                  mobile app on Playstore or Appstore for seamless investment
                  and convenience.
                </p>
              </div>
            </section>

            {/* Create an Account */}
            <section className="flex justify-start items-start rounded-lg gap-4">
              <div className="relative flex flex-col flex-shrink-0">
                <Image
                  src={"/images/create-account.svg"}
                  alt="Create Account Icon"
                  width={35.36}
                  height={35.36}
                  className=""
                />
              </div>

              <div className="flex flex-col justify-start items-start">
                <h3 className={`font-semibold text-color-zero lg:text-lg`}>
                  Create an Account
                </h3>
                <p className="font-light text-sm text-colour-five leading-base my-2 text-start lg:w-[370px]">
                  Create your account in a few easy steps! Enjoy: Quick
                  registration, Instant access, User-friendly interface, and
                  Secure transactions. Get started now and experience the
                  difference.
                </p>
              </div>
            </section>

            {/* Make your first transaction */}
            <section className="flex justify-start items-start rounded-lg gap-4">
              <div className="relative flex flex-col flex-shrink-0">
                <Image
                  src={"/images/first-transaction.svg"}
                  alt="First Transaction Icon"
                  width={35.36}
                  height={35.36}
                />
              </div>

              <div className="flex flex-col justify-start items-start">
                <h3
                  className={`font-semibold text-color-zero text-start mt-3 lg:text-lg`}
                >
                  Make your First Transaction
                </h3>
                <p className="font-light text-sm text-colour-five leading-base my-2 text-start lg:w-[370px]">
                  Start transacting with confidence. Make your first transaction
                  and experience seamless processing, Topnotch security, Instant
                  confirmations and 24/7 support.
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Fund Wallet Mobile Image */}
        <Image
          src={"/images/fund-wallet-full.svg"}
          alt="Fund-Wallet"
          className="xs:w-[345px] self-center mt-8 lg:hidden"
          width={330}
          height={185.28}
        />
        {/* Fund Wallet Destop Image */}
        <Image
          src={"/images/fund-wallet.svg"}
          alt="Fund-Wallet"
          className="hidden lg:flex"
          width={472}
          height={668}
        />
      </section>

      {/*Why Royal Stone Is The Best*/}
      <section className="flex flex-col  justify-start items-start py-16 pl-4 xs:pl-0 bg-white sm:justify-center sm:items-center">
        <section className="flex flex-col justify-start items-start xs:px-4 sm:px-0 lg:flex-row lg:gap-8 xl:gap-40">
          <div className="flex flex-col justify-start items-start">
            <h2
              className={`text-color-zero font-extrabold text-[22px] w-[335px] xs:w-[345px] lg:text-lg-base`}
            >
              Why Royal Stone Is The Best Choice
            </h2>
            <p className="text-sm text-colour-five leading-base my-4 w-[340px] xs:w-[345px] xl:w-[487px]">
              Elevate your expectations with the best-in-class solution by
              unlocking unmatched benefits with Royal Stone
            </p>
          </div>

          <div className="flex flex-col space-y-4 justify-center items-center my-4 sm:grid sm:grid-cols-2 sm:gap-4 lg:my-0 lg:space-y-0 lg:gap-4">
            {/* Fast Transactions */}
            <CardComponentTwo
              icon="/images/fast-transaction.svg"
              text="Fast Transaction"
            />

            {/* Easy Configuration */}
            <CardComponentTwo
              icon="/images/easy-config.svg"
              text="Easy Configuration"
            />

            {/* Secure Plarform */}
            <CardComponentTwo
              icon="/images/secure-platform.svg"
              text="Secure Platform"
            />

            {/* Easy to Use */}
            <CardComponentTwo icon="/images/easy-use.svg" text="Easy To Use" />
          </div>
        </section>
      </section>

      {/*Our Latest Products Section*/}
      {/* <Carousel/> */}
      <section className="flex flex-col justify-center items-center bg-color-two py-16">
        <div className="flex flex-col justify-center items-center">
          <h2
            className={`text-color-zero w-[340px] xs:w-[345px] font-extrabold text-[22px] sm:w-fit lg:text-lg-base`}
          >
            Our Latest Investment Products
          </h2>
        </div>

        <div className="flex gap-4 px-4 mt-12 lg:px-16 overflow-x-scroll hide-scrollbar">
          {/* Product 1 */}
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

          {/* Product 2 */}
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

          {/* Product 3 */}
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

          {/* Product 4 */}
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
        </div>
      </section>
      <DownloadApp />
    </main>
  );
}
