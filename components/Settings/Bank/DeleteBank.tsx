import BankComponentDesktop from "@/components/ui/BankComponentDesktop";
import useBankCryptoStore from "@/store/bankCryptoStore";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa"; // For Crypto Icon
import Button from "../../ui/Button";
import Icon from "../../ui/Icon";
import BankHeader from "../ui/BankHeader";

interface DeleteBankProps {
  onClose?: () => void;
}

export default function DeleteBank({ onClose }: DeleteBankProps) {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null); // State for feedback message

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const {
    selectedBankId,
    selectedCryptoId,
    bankDetails,
    cryptoWallets,
    selectedType, // Get selectedType from store
    deleteBank, // Function to delete bank account
    deleteWallet, // Function to delete crypto wallet
  } = useBankCryptoStore();

  const selectedBank = bankDetails.find((bank) => bank.id === selectedBankId);
  const selectedCrypto = cryptoWallets.find(
    (wallet) => wallet.id === selectedCryptoId
  );

  const getAuthToken = () => {
    return localStorage.getItem("accessToken"); // Get access token from local storage
  };

  const handleDelete = async () => {
    const token = getAuthToken(); // Get the token
    if (!token) {
      setFeedbackMessage("Authentication token missing.");
      return;
    }

    let response;
    if (selectedType === "bank" && selectedBank) {
      // Prepare the payload for bank
      const payload = {
        bankID: selectedBank.id,
      };

      try {
        // Sending API request to delete bank using fetch
        response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/bank",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          setFeedbackMessage("Bank Account deleted successfully.");
          deleteBank(selectedBank.id);
        } else {
          setFeedbackMessage("Failed to delete the Bank Account.");
        }
      } catch (error) {
        setFeedbackMessage("Error occurred while deleting the Bank Account.");
        console.error(error);
      }
    } else if (selectedType === "crypto" && selectedCrypto) {
      // Prepare the payload for crypto wallet
      const payload = {
        walletID: selectedCrypto.id,
      };

      try {
        // Sending API request to delete crypto wallet using fetch
        response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/bank/crypto-wallet",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (response.ok) {
          setFeedbackMessage("Crypto Wallet deleted successfully.");
          deleteWallet(selectedCrypto.id);
        } else {
          setFeedbackMessage("Failed to delete the Crypto Wallet.");
        }
      } catch (error) {
        setFeedbackMessage("Error occurred while deleting the Crypto Wallet.");
        console.error(error);
      }
    }

    // Close the modal after 2 seconds
    setTimeout(() => {
      if (onClose) {
        onClose(); // Explicitly call the function if it exists
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 flex bg-[#D9D9D9A6] items-end z-50 justify-end lg:items-center lg:justify-center">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[335px] md:h-[400px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[348px]">
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
            Delete Account
          </p>
        </div>

        <p className="text-color-form text-sm my-1 p-4">
          Do you want to delete the following details?
        </p>

        {/* Render the feedback message if it exists */}
        {feedbackMessage && (
          <div className="text-green-500 font-semibold text-center p-4">
            {feedbackMessage}
          </div>
        )}

        {/* Render the dynamic content based on the selected account */}
        {selectedType === "bank" && selectedBank ? (
          <>
            <section className="bg-light-grey rounded-common shadow-sm h-[84px] py-2 flex flex-col space-y-4 mx-4 md:hidden">
              <div className="flex pl-4 items-center gap-3">
                <Icon
                  icon={<BiSolidBank className="text-color-one" />}
                  containerSize="w-[16px] h-[16px]"
                />
                <p className="text-sm font-medium text-color-zero">
                  {selectedBank.bankName}
                </p>
              </div>
              <div className="flex items-center gap-4 pl-4">
                <p className="text-color-form text-sm border-r pr-4">
                  {selectedBank.accountNumber}
                </p>
                <p className="text-color-form text-sm">
                  {selectedBank.accountName}
                </p>
              </div>
            </section>

            <section className="hidden md:flex flex-col">
              <div className="p-4">
                <BankHeader
                  header="Bank"
                  number="Account Number"
                  name="Account Name"
                />
                <BankComponentDesktop
                  bankImage={<BiSolidBank className="text-color-one" />}
                  bankName={selectedBank.bankName}
                  accNum={selectedBank.accountNumber}
                  accName={selectedBank.accountName}
                  showBin={false}
                />
              </div>
            </section>
          </>
        ) : selectedType === "crypto" && selectedCrypto ? (
          <>
            <section className="bg-light-grey rounded-common shadow-sm h-[84px] py-2 flex flex-col space-y-4 mx-4 md:hidden">
              <div className="flex pl-4 items-center gap-3">
                <Icon
                  icon={<FaBitcoin className="text-color-one" />}
                  containerSize="w-[16px] h-[16px]"
                />
                <p className="text-sm font-medium text-color-zero">
                  {selectedCrypto.networkID.name}
                </p>
              </div>
              <div className="flex items-center gap-4 pl-4">
                <p className="text-color-form text-sm border-r pr-4">
                  {selectedCrypto.address}
                </p>
              </div>
            </section>

            <section className="hidden md:flex flex-col">
              <div className="p-4">
                <BankHeader header="Network" number="Wallet Address" name="" />
                <BankComponentDesktop
                  bankImage={<FaBitcoin className="text-color-one" />}
                  bankName={selectedCrypto.networkID.name}
                  accNum={selectedCrypto.address}
                  showBin={false}
                />
              </div>
            </section>
          </>
        ) : (
          <p className="text-color-form text-sm p-4">No account selected</p>
        )}

        <div className="mt-12 m-4 lg:mt-8">
          <Button
            ButtonText="Delete"
            className="py-3 w-full md:w-96 mx-auto lg:w-full"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
