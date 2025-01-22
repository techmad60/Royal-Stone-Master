import Image from "next/image"
export default function CardComponentRwo ({icon = "", text = ""}) {
    return (
        <section className="flex flex-col justify-center items-center bg-color-three p-4 border rounded-[29.34px] text-center w-[324px] xs:w-[345px] h-[94px] sm:w-[300px] lg:w-[257px]">
            <Image 
                src={icon}
                alt={`${text} Icon`}
                width={35.36}
                height={35.36}
                className="icon"
            />
            
            <p className="font-medium text-base text-color-zero leading-4 my-4 text-center">{text}</p>
        </section>

    )
}