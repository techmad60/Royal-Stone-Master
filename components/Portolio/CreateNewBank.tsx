import Image from "next/image";
import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import FormButton from "../ui/FormButton";
import Icon from "../ui/Icon";

interface CreateBankProps {
  onClose: () => void;
}

export default function CreateBank({ onClose}: CreateBankProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
            <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[440px]  lg:rounded-[20px] lg:max-w-[621px] lg:h-[364px]">
                <div className="flex justify-center items-center mt-4 lg:hidden">
                    <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
                </div>
                <div className="flex items-center border-b w-full pb-2 p-4">
                    <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
                        Cancel
                    </p>
                    <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">Use New Bank Account</p>
                </div>

                <div className="flex items-center gap-4 my-1 p-4">
                    <p className="text-color-form text-sm">Provide your bank account details</p>
                    {/* <Icon icon={<Image src="/images/banks/gt-bank.svg" height={24} width={24} alt="Zelle Logo"/>} containerSize="w-[41px] h-[41px]"/> */}
                </div>

                <form className="flex flex-col space-y-4 p-4">
                    {/* Trade Amount */}
                    <div className="flex flex-col gap-1">
                        <label className="text-color-form text-sm">Bank</label>
                        <div className="flex justify-between py-2 border-b border-slate-200">
                            <div className="flex gap-2">
                                <p className="text-sm font-medium text-color-zero">GTBank</p>
                                <Icon icon={<Image src="/images/banks/gt-bank.svg" height={14} width={14} alt="Zelle Logo"/>} containerSize="w-[16px] h-[16px]"/>
                            </div>
                           
                            <div className=" ">
                                <IoIosArrowDown />
                            </div>
                        </div>
                    
                    </div>
                    {/* Trade Amount */}
                    <div className="flex flex-col gap-1">
                        <label className="text-color-form text-sm">Account Number</label>
                        <div className="relative border-b border-slate-200 ">
                            <div className="flex justify-between py-2">
                                <input
                                    type="text"
                                    required
                                    className="rounded-sm  placeholder:text-color-zero placeholder:text-sm"
                                    placeholder="2010100191"
                                />
                                <div className="">
                                    <p className="text-sm text-color-one border-b border-color-one leading-none">Osindeinde Kolawole</p>
                                </div>
                            </div>
                           
                        </div>
                    
                    </div>
                   
                   
                </form>
                <div className="mt-12 m-4 lg:mt-4">
                        <FormButton ButtonText="Proceed" className="py-3 w-full lg:w-full"/>
                    </div>
            </div>
        </div>
  );
}
