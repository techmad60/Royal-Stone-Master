import { useEffect, useRef } from "react";

interface OtpInputProps {
  otp: string[];
  onChange: (value: string, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

export default function OtpInput({ otp, onChange, onPaste }: OtpInputProps) {
  const firstOtpInputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus first input field
  useEffect(() => {
    firstOtpInputRef.current?.focus();
  }, []);

  return (
    <section className="flex items-center gap-2 w-full bg-light-grey rounded-[10px] h-[70px] space-x-4 justify-between px-6 mt-8 border border-slate-100">
      {otp.map((value, index) => (
        <div
          key={index}
          className="w-[28.3px] h-[28.3px] transform rotate-45 overflow-hidden flex items-center justify-center border-2 border-slate-200 rounded-[9px]"
        >
          <input
            type="number"
            id={`otp-${index}`}
            value={value}
            ref={index === 0 ? firstOtpInputRef : null}
            onChange={(e) => onChange(e.target.value, index)}
            onPaste={onPaste}
            className="w-full h-full transform -rotate-45 text-center outline-none border-none bg-transparent text-color-zero"
            maxLength={1}
          />
        </div>
      ))}
    </section>
  );
}
