"use client"
import BankComponent from "@/components/ui/BankComponent";
import Image from "next/image";
import { IoIosArrowUp } from "react-icons/io";
// import CreateBank from "@/components/Portolio/CreateNewBank";
// import TransactionProcessed from "@/components/Portolio/WithdrawTransactionProcessed";
// import TransactionDetails from "@/components/Portolio/WithdrawTransactionDetails";
// import WithdrawPreview from "@/components/Portolio/WithdrawPreview";
import WithdrawFunds from "@/components/Portolio/WithdrawFundsNavigator";
import CircleToggle from "@/components/ui/CircleToggle";


export default function WithdrawFundsPage() {
    // const [createNewBankOpen, setIsCreateNewBankOpen] = useState(false)
    // const [withdrawPreviewOpen, setIsWithdrawPreviewOpen] = useState(false)
    // const [transactionProcessedOpen, setIsTransactionProcessedOpen] = useState (false)
    // const [transactionDetailsOpen, setIsTransactionDetailsOpen] = useState (false)
    
    // const createNewBank = () => {
    //     setIsCreateNewBankOpen(true);
    // }
    // const handleOpenPreviewModal = () => {
    //     setIsWithdrawPreviewOpen(true);
    // };
    // // Function to open TransactionProcessed and close BuyModal
    // const handleProceedClick = () => {
    //     setIsWithdrawPreviewOpen(false);
    //     setIsTransactionProcessedOpen(true);
    // };
    // // Function to open TransactionDetails and close TransactionProcessed
    // const handleViewDetailsClick = () => {
    //     setIsTransactionProcessedOpen(false);
    //     setIsTransactionDetailsOpen(true);
    // };

    return (
        <div>
            <WithdrawFunds currentStep={1}/>

            <p className="text-color-zero text-base font-semibold py-4 lg:text-lg">Withdraw Funds</p>
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
                    <label className="text-color-form text-sm">What amount do you want to investment?</label>
                    <input
                        type="number"
                        required
                        className="rounded-sm border-b border-slate-200 placeholder:text-color-zero placeholder:text-sm py-2 lg:w-[528px]"
                        placeholder="$200"
                    />
                </div>

                {/* Payment Method */}
                <div className="flex flex-col gap-1 border-b lg:w-[528px]">
                    <div className="flex justify-between items-center">
                        <label className="text-color-form text-sm">Select a preferred funding method</label>
                        {/* <p className="text-color-one border-b leading-none border-color-one text-xs w-fit hidden cursor-pointer lg:flex" onClick={createNewBank}>Use a new bank account</p> */}
                    </div>
                   
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 py-4 lg:flex">
                        <BankComponent bankImage={<Image src="/images/banks/opay.svg" height={15} width={15} alt="Opay Logo"/>} bankName="Opay" accNumber={9019111278} accName="Osindeinde Kolawole" style="h-[105px]" flexStyling="flex gap-2 space-y-0" icon={<CircleToggle/>}/>
                        <BankComponent bankImage={<Image src="/images/banks/gt-bank.svg" height={15} width={15} alt="GT bank Logo"/>} bankName="GTBank" accNumber={2219111278} accName="Osindeinde Kolawole" style="h-[105px] bg-color-two" flexStyling="flex gap-2 space-y-0" icon={<CircleToggle/>}/>
                        <BankComponent bankImage={<Image src="/images/banks/opay.svg" height={15} width={15} alt="Opay Logo"/>} bankName="Opay" accNumber={7100192289} accName="Osindeinde Kolawole" style="h-[105px]" flexStyling="flex gap-2 space-y-0" icon={<CircleToggle/>}/>
                    </div>
                </div>
                {/* <p className="text-color-one border-b leading-none border-color-one text-xs w-fit cursor-pointer lg:hidden" onClick={createNewBank}>Use a new bank account</p>
                <div onClick={handleOpenPreviewModal}>
                    <Button ButtonText="Withdraw Funds" className="py-3 mt-12 w-full lg:w-[528px]"/>
                </div> */}
                
            </form>
           {/* {createNewBankOpen && (
                <CreateBank onClose={() => setIsCreateNewBankOpen(false)}/>
           )}
           {withdrawPreviewOpen && (
                <WithdrawPreview onClose={() => setIsWithdrawPreviewOpen(false)} onProceed={handleProceedClick}/>
           )}
           {transactionProcessedOpen && (
                <TransactionProcessed onClose={() => setIsTransactionProcessedOpen(false)} onConfirm={handleViewDetailsClick}/>
           )}
           {transactionDetailsOpen && (
                <TransactionDetails onClose={() => setIsTransactionDetailsOpen(false)}/>
           )} */}
           
        </div>
    )
}