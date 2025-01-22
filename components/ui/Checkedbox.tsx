import { FaCheck } from "react-icons/fa6";  
    // import { IoIosCheckmark } from "react-icons/io";
export default function CheckBox() {
    return (
        <div className="bg-color-one w-4 h-4 flex justify-center items-center rounded-sm">
            <FaCheck className="p-[0.15rem] text-color-two"/>
        </div>
    )
}