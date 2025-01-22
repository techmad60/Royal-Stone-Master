//Google Play Button
import Image from "next/image";
export default function GooglePlayButton({textColor = "", backgroundColor = "", width = "", height = "", lgWidth ="", lgHeight = ""}) {
    return (
        <button className={`${backgroundColor} ${textColor} ${width} ${height} ${lgWidth} ${lgHeight} flex items-center justify-center rounded-[9.69px] p-2`}>
            <Image 
                src={"/images/google-play-icon.svg"} 
                alt="Google Play Icon" 
                width={38.76} 
                height={38.76}
            />
            <div className="flex flex-col self-start justify-self-start items-start">
                <p className="text-[12.6px]">Get it on</p>
                <p className="text-[15.51px] font-bold">Google Play</p>
            </div>   
        </button>
    )
}