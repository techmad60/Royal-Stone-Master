"use client";
import Button from "@/components/ui/Button";
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";

interface BuyStockFormProps {
  onClose: () => void;
  onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  formData: FormData; 
  onBankDetailStatus?: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Define interface for form data
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  amount: string;
  type: string;
}


export default function BuyStockForm({ onClose, onFormSubmit, loading, formData, handleChange }: BuyStockFormProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
 
  return (
    <div className="fixed inset-0 flex items-end bg-[#D9D9D9A6] justify-end lg:items-center lg:justify-center z-[100]">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[550px] lg:h-[600px] lg:rounded-[20px] lg:max-w-[621px]">
        <div className="flex items-center border-b w-full p-4">
         
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Add Details
          </p>
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            <XCircleIcon className="text-color-form"/>
          </p>
        </div>
        <div className="flex flex-col bg-white">
          <p className="text-color-zero text-sm px-4 py-2">
            Fill the form to purchase stocks.
          </p>
          <form onSubmit={onFormSubmit} className="flex flex-col space-y-3 p-4">
        {/* Name */}
        <div className="flex flex-col">
          <label className="text-color-form text-sm">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five p-2"
            placeholder="Cooper Winterwind"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-color-form text-sm">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five p-2"
            placeholder="cooperwinterwind@gmail.com"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-color-form text-sm">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five p-2"
            placeholder="+1 765 690 92098"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-color-form text-sm">Stock Amount</label>
          <input
            type="number"
            name="amount"
            required
            value={formData.amount}
            onChange={handleChange}
            className="rounded-sm border-b border-slate-200 text-colour-five p-2"
            placeholder="$400"
          />
        </div>
        {/* Password */}
        <div className="flex flex-col">
          <label className="text-color-form text-sm">Stock Type</label>
          <div className="relative flex items-center">
            <input
              name="type"
              type="text"
              required
              value={formData.type}
              onChange={handleChange}
              className="rounded-sm border-b border-slate-200 w-full text-colour-five p-2"
              placeholder="Tesla"
            />
          </div>
        </div>
        {/* Error Message */}
        <Button
          type="submit"
          ButtonText={loading ? "Submiting..." : "Submit"}
          className="py-3 mt-4 w-full"
          disabled={loading}
        />
      </form>
        </div>
      </div>
    </div>
  );
}
