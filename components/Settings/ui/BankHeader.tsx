interface BankHeaderProps {
    header: string;
    number: string;
    name: string;
}

export default function BankHeader({header, number, name}:BankHeaderProps) {
  return (
    <div className="grid grid-cols-6 bg-light-grey p-3 rounded-[15px] shadow-sm">
      <p className="text-sm text-[rgba(15,28,57,0.5)] col-span-2">{header}</p>
      <p className="text-sm text-[rgba(15,28,57,0.5)] col-span-2">
        {number}
      </p>
      <p className="text-sm text-[rgba(15,28,57,0.5)] col-span-2">
        {name}
      </p>
    </div>
  );
}
