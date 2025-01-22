interface IconProps {
    icon: React.ReactNode;
    iconSize? : string;
    containerSize? : string;
}
export default function Icon({icon, iconSize, containerSize}:IconProps) {
    return (
        <div className={`flex justify-center items-center w-[24px] h-[24px] rounded-[10.61px] shadow-sm shadow-[#00000033] transform rotate-45 bg-white ${containerSize}`}>
            <span className={`transform -rotate-45 w-6 h-6 flex items-center justify-center ${iconSize}`}>
                {icon}
            </span>
    </div>
    )
}