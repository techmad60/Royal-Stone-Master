import { CiSearch } from "react-icons/ci";

export default function SearchUI () {
    return (
        <div className="flex items-center gap-2 rounded-[9px] w-[218px] h-[35px] bg-[#E2E2E240] p-4">
            <CiSearch className="text-[#6B738599]"/>
            <input type="text" placeholder="Search for stocks" className="text-xs rounded-[9px]  placeholder:text-[#6B738599] bg-transparent"/>
        </div>
    )
}