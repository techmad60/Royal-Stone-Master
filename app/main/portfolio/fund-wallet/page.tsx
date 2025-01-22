"use client"
import { IoIosArrowUp } from "react-icons/io";
// import FundWallet from "@/components/Portolio/FundWalletNavigator";
import BankComponent from "@/components/ui/BankComponent";
import Image from "next/image";
// import TransactionProcessed from "@/components/Portolio/FundTransactionProcessed";
// import TransactionDetails from "@/components/Portolio/FundTransactionDetails";


export default function FundWalletPage() {
    // const [transactionProcessedOpen, setIsTransactionProcessedOpen] = useState (false)
    // const [transactionDetailsOpen, setIsTransactionDetailsOpen] = useState (false)

    // const openTransactionProcessed = () => {
    //     setIsTransactionProcessedOpen(true)
    // }

    // Function to open TransactionDetails and close TransactionProcessed
    // const handleViewDetailsClick = () => {
    //     setIsTransactionProcessedOpen(false);
    //     setIsTransactionDetailsOpen(true);
    // };
    return (
        <div>
            {/* <FundWallet currentStep={1}/> */}

            <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">Fund Wallet</p>
            <form className="flex flex-col space-y-4 mt-2">
                {/* Trade Amount */}
                <div className="flex flex-col gap-1">
                    <label className="text-color-form text-sm">Select Wallet</label>
                    <div className="relative border-b border-slate-200 lg:w-[528px]">
                        <input
                            type="text"
                            required
                            className="rounded-sm  placeholder:text-color-zero placeholder:text-sm py-2"
                            placeholder="Investment"
                        />
                        <div className="absolute top-3 right-3 ">
                            <IoIosArrowUp />
                        </div>
                    </div>
                   
                </div>

                {/* Amount of Units */}
                <div className="flex flex-col gap-1 ">
                    <label className="text-color-form text-sm">What amount do you want to fund?</label>
                    <input
                        type="number"
                        required
                        className="rounded-sm border-b border-slate-200 placeholder:text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
                        placeholder="$200"
                    />
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-1 border-b lg:w-[528px]">
                    <label className="text-color-form text-sm">Select a preferred funding method</label>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:flex">
                        <BankComponent bankImage={<Image src="/images/banks/pay-pal.svg" height={15} width={15} alt="Pay-Pal Logo"/>} bankName="PayPal"/>
                        <BankComponent bankImage={<Image src="/images/banks/zelle.svg" height={15} width={15} alt="Zelle Logo"/>} bankName="Zelle" style="bg-color-two"/>
                        <BankComponent bankImage={<Image src="/images/banks/square-cash.svg" height={15} width={15} alt="Pay-Pal Logo"/>} bankName="Cash App"/>
                    </div>
                </div>
                {/* <div onClick={openTransactionProcessed}>
                    <Button ButtonText="Fund Wallet" className="py-3 mt-12 w-full lg:w-[528px]"/>
                </div> */}
                
            </form>
           {/* {transactionProcessedOpen && (
                <TransactionProcessed onClose={() => setIsTransactionProcessedOpen(false)} onConfirm={handleViewDetailsClick}/>
           )}
           {transactionDetailsOpen && (
                <TransactionDetails onClose={() => setIsTransactionDetailsOpen(false)}/>
           )} */}
           
        </div>
    )
}