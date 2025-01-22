import Image from "next/image";

export default function CardComponentThree({icon = "", text = "", contact = "", href = ""}) {
    return (
        <section className="flex flex-col justify-start items-start bg-color-three border p-8 rounded-common w-[330px] xs:w-[345px] lg:w-[285px] xl:w-[345px]">
            <Image 
                src={icon}
                alt={`${text} Icon`}
                width={45.36}
                height={45.36}
            />
            <div className="flex flex-col justify-start items-start ">
                <h3 className={`font-semibold text-color-zero mt-4 lg:text-lg whitespace-nowrap `}>Chat with Us on {text} </h3>
                <a href={href} className="font-light hover:text-green-500 duration-300 text-sm text-color-zero leading-4 my-2 lg:text-start">{contact}</a>
            </div>
        </section>
    )
}