import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import { BankDetails, CryptoWallet } from "@/types/Type";
import { useEffect } from "react";
import { FaBitcoin } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import Button from "../../ui/Button";

interface MyComponentProps {
  onClose?: () => void;
  onProceed?: () => void;
  successMessage?: string | null;
  error?: string | null;
  loading?: boolean;
  amount?: string; // User input for the amount
  selectedAccount?: BankDetails | CryptoWallet | null; // Allow null or undefined
}

export default function WithdrawPreview({
  onClose = () => {},
  onProceed = () => {},
  successMessage,
  error,
  loading,
  amount,
  selectedAccount,
}: MyComponentProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const isBankAccount = (
    account: BankDetails | CryptoWallet
  ): account is BankDetails => {
    return "accountNumber" in account;
  };

  const isCryptoWallet = (
    account: BankDetails | CryptoWallet
  ): account is CryptoWallet => {
    return "address" in account;
  };

  const renderAccountIcon = () => {
    if (!selectedAccount) return null;
    if (isBankAccount(selectedAccount)) {
      return (
        <Icon
          icon={<RiBankLine className="text-color-one text-2xl" />}
          containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
        />
      );
    } else if (isCryptoWallet(selectedAccount)) {
      return (
        <Icon
          icon={<FaBitcoin className="text-color-one text-2xl" />}
          containerSize="w-[41.36px] h-[41.36px] rounded-[15.51px]"
        />
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-[20px] w-full h-[505px] lg:max-w-[621px] lg:h-[484px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Preview
          </p>
        </div>

        <p className="text-color-form text-sm m-6 border-b pb-4">
          Confirm these details of your transaction
        </p>
        <div className="flex gap-2 py-3 mx-6">
          {renderAccountIcon()}

          <div className="flex-col">
            <p className="font-medium text-color-zero">Funds Withdrawal</p>
            <p className="text-color-six text-sm">
              {selectedAccount
                ? isBankAccount(selectedAccount)
                  ? selectedAccount.bankName
                  : selectedAccount.networkID.name
                : "No account selected"}
            </p>
          </div>
        </div>

        <section className="self-center grid grid-cols-2 bg-light-grey rounded-[10px] shadow-sm mx-6 p-[15px] text-sm w-[345px] h-[147px] lg:p-5 lg:w-[572px] lg:h-[167px]">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">Amount</p>
              <p className="text-color-six">${amount}</p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="text-color-form">
                {selectedAccount
                  ? isBankAccount(selectedAccount)
                    ? "Account Number"
                    : "Address"
                  : "No account selected"}
              </p>
              <p className="text-color-six">
                {selectedAccount
                  ? isBankAccount(selectedAccount)
                    ? selectedAccount.accountNumber
                    : selectedAccount.address
                  : "No account selected"}
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <p className="text-color-form">
                {selectedAccount
                  ? isBankAccount(selectedAccount)
                    ? "Bank Name"
                    : "Wallet Address"
                  : "No account selected"}
              </p>
              <p className="text-color-six">
                {selectedAccount
                  ? isBankAccount(selectedAccount)
                    ? selectedAccount.bankName
                    : selectedAccount.address
                  : "No account selected"}
              </p>
            </div>

            {selectedAccount && isBankAccount(selectedAccount) && (
              <div className="flex flex-col space-y-2">
                <p className="text-color-form">Account Holder Name</p>
                <p className="text-color-six">{selectedAccount.accountName}</p>
              </div>
            )}
          </div>
        </section>
       
        {error && ( // Display error message conditionally
          <div className="text-red-600 p-3 rounded">
            <p>{error}</p>
          </div>
        )}
        {successMessage && ( // Display success message conditionally
          <div className="text-green-600 p-3 rounded ml-4">
            <p>{successMessage}</p>
          </div>
        )}
         {loading && (
          <div>
            <Loading />
          </div>
        )}
        <div className="mx-6 mt-3">
          <Button
            ButtonText={loading ? "Proceeding..." : "Proceed"}
            className={`w-full ${
              loading ? "bg-inactive" : "bg-color-one"
            }`}
            onClick={!loading ? onProceed : undefined} // Prevent clicking when loading
            disabled={loading} // Disable the button when loading
          />
        </div>
      </div>
    </div>
  );
}
