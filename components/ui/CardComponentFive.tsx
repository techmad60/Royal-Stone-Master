interface NavLinkProps {
  icon: React.ReactNode; // Update icon to ReactNode instead of IconType
  label: string;
  secondLabel?: string;
  number: string;
  secondNumber?: string;
  classname?: string;
  width?: string;
  textSize?: string;
  gapStyling? : string;
  showNumber?: boolean;
}

export default function CardComponentFive({
  icon,
  label,
  secondLabel,
  number,
  classname,
  width,
  textSize,
  secondNumber,
  gapStyling,
  showNumber = false,
}: NavLinkProps) {
  return (
    <section
      className={`flex flex-col bg-color-two text-color-one space-y-1 rounded-common p-3 shadow-sm justify-center w-[170px] h-[110px] sm:p-4 sm:space-y-3 lg:h-[139px] ${width}`}
    >
      <div className="flex justify-center items-center w-[24px] h-[24px] rounded-[10.61px] shadow-sm transform rotate-45 bg-white">
        <span className="transform -rotate-45 w-6 h-6 flex items-center justify-center">
          {icon}
        </span>
      </div>
      <div className={`flex justify-between lg:justify-start w-full ${gapStyling}`}>
        <div>
          <p className={`text-xs lg:text-base ${textSize}`}>{label}</p>
          <p className={`text-[32px] font-extrabold ${classname}`}>{number}</p>
        </div>

        <div>
          {showNumber && (
            <div className="flex flex-col">
              <p className={`text-xs lg:text-base ${textSize}`}>{secondLabel}</p>
              <p className={`text-[32px] font-extrabold ${classname}`}>
                {secondNumber}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
