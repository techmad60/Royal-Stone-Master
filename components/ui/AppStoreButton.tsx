//App Store Button
import {FaApple} from "react-icons/fa";

export default function AppStoreButton({textColor = "", backgroundColor = "", width = "", height = "", lgWidth ="", lgHeight = ""}) {
    return (
        <button className={`${backgroundColor} ${textColor} ${width} ${height} ${lgWidth} ${lgHeight} flex items-center justify-center rounded-[9.69px] p-2`}>
            <FaApple className={`w-[38.76px] h-[38.76px]`}/>
            <div className="flex flex-col self-start justify-self-start items-start">
                <p className="text-[12.6px] lg:text-[13px]">Download on the</p>
                <p className="text-[15.51px] lg:text-[16px] font-bold">App Store</p>
            </div>   
    </button>
    )
}