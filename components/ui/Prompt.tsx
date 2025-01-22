import Image from "next/image";
export default function Prompt({prompt = ""}) {
  return (
    <section className="bg-color-two hidden px-8 lg:flex flex-col space-y-8">
      <div className="w-full border-b border-b-slate-200 py-4">
        <Image
          className="hidden lg:flex"
          src={"/images/logo.svg"}
          alt="Royal-Stone Logo"
          width={117.43}
          height={22}
        />
      </div>

      <p className="font-extrabold text-[29px] text-color-one xl:w-[561px]">
        {prompt}
      </p>
      <Image
        src={"/images/hero-img.svg"}
        alt="Hero Image"
        className=""
        width={516}
        height={771.98}
      />
    </section>
  );
}
