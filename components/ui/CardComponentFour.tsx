import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";

export default function CardComponentFour({ icon = "", textStart = "", textEnd = "", className = "", href = "" }) {
    return (
        <Link href={href}
            className={`flex items-start p-4 justify-start bg-[#FCFCFC] hover:bg-slate-100 duration-300 h-[110px] rounded-common border border-slate-100 sm:justify-between ${className}`}
        >
            <section className="flex flex-col items-start">
                <Image 
                    className="flex-shrink-0"
                    src={icon}
                    alt={`${textEnd} Icon`}
                    width={30}
                    height={30}
                />
                <p className="font-medium text-color-zero text-sm">{textStart} with {textEnd}</p>
            </section>
            <MdArrowForwardIos className="text-slate-500 flex-shrink-0" />
        </Link>
    );
}
