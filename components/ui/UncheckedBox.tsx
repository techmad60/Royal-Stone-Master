export default function EmptyBox () {
    return (
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="hidden" />
            <div className="w-4 h-4 border-2 border-slate-200 rounded-sm"></div>
        </label>
    )

}