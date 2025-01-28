// Table Header Desktop

export default function TableHeader() {
  return (
    <div className="hidden lg:grid grid-cols-7 items-center bg-light-grey rounded-common py-4 px-3 shadow-sm mr-8">
      <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
        Transaction Name
      </p>
      <p className="text-xs text-[rgba(15,28,57,0.5)]">Amount</p>
      <p className="text-xs text-[rgba(15,28,57,0.5)] col-span-2">
        Transaction Date & Time
      </p>
      <p className="text-xs text-[rgba(15,28,57,0.5)]">Status</p>
      <p className="text-xs text-[rgba(15,28,57,0.5)]">Actions</p>
    </div>
  );
}
