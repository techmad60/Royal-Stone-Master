// Table Header Desktop

export default function TableHeader() {
  return (
    <div className="hidden lg:grid grid-cols-7 items-center bg-light-grey rounded-common py-4 px-3 shadow-sm mr-8">
      <p className="text-xs text-color-zero col-span-2">
        Transaction Name
      </p>
      <p className="text-xs text-color-zero">Amount</p>
      <p className="text-xs text-color-zero col-span-2">
        Transaction Date & Time
      </p>
      <p className="text-xs text-color-zero">Status</p>
      <p className="text-xs text-color-zero">Actions</p>
    </div>
  );
}
