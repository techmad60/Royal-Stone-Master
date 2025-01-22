import Image from "next/image"
import { ReactNode } from "react";
interface CardComponentProps {
    title?: string;
    text?: ReactNode;
    icon?: string;
}
export default function CardComponent ({icon = "", title, text}:CardComponentProps) {
    return (
        <section className="flex flex-col justify-start items-start border border-slate-100 w-[320px] bg-color-three p-4 rounded-common xs:w-[345px] h-[380px] sm:w-[370px] xl:h-[250px] xl:w-[650px]">
        <Image src={icon} alt={`${title} Icon`} width={35.36} height={35.36} />
        <div className="flex flex-col justify-start items-start">
            <h3 className="font-semibold text-[18px] text-color-zero mt-2">{title}</h3>
            <p className="text-sm leading-base text-colour-five">{text}</p>
        </div>
    </section>
    )
}