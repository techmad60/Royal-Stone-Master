interface NavLinkProps {
    icon: React.ReactNode; // Update icon to ReactNode instead of IconType
    label: string;
    number: string;
    classname?: string;
    width?: string;
    textSize?: string;
}

export default function CardComponentFive({icon, label, number, classname, width, textSize}: NavLinkProps) {
    return (
        <section className={`flex flex-col bg-color-two text-color-one space-y-1 rounded-common p-3 shadow-sm justify-center w-[170px] h-[110px] sm:p-4 sm:space-y-3 lg:h-[139px] ${width}`}>
            <div className="flex justify-center items-center w-[24px] h-[24px] rounded-[10.61px] shadow-sm transform rotate-45 bg-white">
                <span className="transform -rotate-45 w-6 h-6 flex items-center justify-center">
                    {icon}
                </span>
            </div>
            <p className={`text-xs lg:text-base ${textSize}`}>{label}</p>
            <p className={`text-[32px] font-extrabold ${classname}`}>{number}</p>
       </section>
    )
}