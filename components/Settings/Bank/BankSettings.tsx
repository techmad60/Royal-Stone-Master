// "use client";
import BankHeader from "@/components/Settings/ui/BankHeader";
import BankComponent from "@/components/ui/BankComponent";
import BankComponentDesktop from "@/components/ui/BankComponentDesktop";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useBankCryptoStore from "@/store/bankCryptoStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { FaBitcoin } from "react-icons/fa";
import { RiBankLine, RiDeleteBin5Fill } from "react-icons/ri";
import SettingsParent from "../SettingsParent";
import DeleteBank from "./DeleteBank";

interface BankSettingProps {
  onNavigateToAddBankDetails?: () => void;
  onNavigateToAddCryptoDetails?: () => void;

}

export default function BankSetting({
  onNavigateToAddBankDetails = () => {},
  onNavigateToAddCryptoDetails = () => {},
}: BankSettingProps) {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("bankSetting");
  const [activeTab, setActiveTab] = useState<"bank" | "crypto">("bank");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteBank, setIsDeleteBank] = useState(false);
  const router = useRouter();

  // Zustand store hooks
  const bankDetails = useBankCryptoStore((state) => state.bankDetails);
  const cryptoWallets = useBankCryptoStore((state) => state.cryptoWallets);
  const setBankDetails = useBankCryptoStore((state) => state.setBankDetails);
  const setCryptoWallets = useBankCryptoStore(
    (state) => state.setCryptoWallets
  );

  const setSelectedBankId = useBankCryptoStore(
    (state) => state.setSelectedBankId
  );
  const setSelectedCryptoId = useBankCryptoStore(
    (state) => state.setSelectedCryptoId
  );
  const setSelectedType = useBankCryptoStore((state) => state.setSelectedType);

  const handleBankSelect = (id: string) => {
    setSelectedType("bank");
    setSelectedBankId(id);
    console.log("Selected Bank ID:", id);
  };

  const handleCryptoSelect = (id: string) => {
    setSelectedType("crypto")
    setSelectedCryptoId(id);
    console.log("Selected Crypto Wallet ID:", id);
  };

  const onNavigateToDeleteBank = (bankId: string) => {
    setIsDeleteBank(true);
    setSelectedBankId(bankId); // Set the selected bank ID
    setSelectedType("bank");  // Set the type to "bank"
  };

  const onNavigateToDeleteCrypto = (cryptoId: string) => {
    setIsDeleteBank(true);
    setSelectedCryptoId(cryptoId); // Set the selected crypto ID
    setSelectedType("crypto");    // Set the type to "crypto"
  };

  const handleCloseDeleteBank = () => {
    setIsDeleteBank(false); // Close the DeleteBank component
  };

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("accessToken");
        if (!token) return router.push("/auth/login");

        const fetchWithToken = async (url: string) => {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          return response.json();
        };

        const [bankData, cryptoData] = await Promise.all([
          fetchWithToken("https://api-royal-stone.softwebdigital.com/api/bank"),
          fetchWithToken(
            "https://api-royal-stone.softwebdigital.com/api/bank/crypto-wallet"
          ),
        ]);

        if (bankData.status) {
          setBankDetails(bankData.data || []);
          console.log("Bank Data:", bankData);
        }

        if (cryptoData.status) {
          setCryptoWallets(cryptoData.data || []);
          console.log("Crypto Data:", cryptoData);
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(
            err.message || "Failed to fetch data. Please try again later."
          );
        } else {
          setError("An unknown error occurred. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [setBankDetails, setCryptoWallets, router]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="lg:mr-8">
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : (
        <div>
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Bank/Crypto Info",
                onClick: () => console.log("Bank Info"),
              },
            ]}
          />
          <div>
            <div>
              <div className="flex justify-between my-6 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
                <h1 className="text-color-zero text-base font-semibold ">
                  Bank/Crypto Information
                </h1>
                <div>
                  <Button
                    ButtonText={
                      activeTab === "bank" ? "Add Bank Account" : "Add Wallet"
                    }
                    className="py-3 rounded-[12px] w-[125px] h-[30px] items-center justify-center text-xs tracking-tight hidden lg:flex"
                    onClick={
                      activeTab === "bank"
                        ? onNavigateToAddBankDetails
                        : onNavigateToAddCryptoDetails
                    }
                  />
                </div>
              </div>
              <div className="flex gap-4 border-b mb-4">
                <p
                  className={`text-xs duration-300 pb-6 cursor-pointer ${
                    activeTab === "bank"
                      ? "text-color-one hover:text-color-one border-b-[3px] border-color-one font-semibold"
                      : "text-color-form hover:text-green-400"
                  }`}
                  onClick={() => setActiveTab("bank")}
                >
                  Bank Account
                </p>
                <p
                  className={`text-xs duration-300 cursor-pointer ${
                    activeTab === "crypto"
                      ? "text-color-one hover:text-color-one border-b-[3px] border-color-one font-semibold"
                      : "text-color-form hover:text-green-400"
                  }`}
                  onClick={() => setActiveTab("crypto")}
                >
                  Crypto Wallet
                </p>
              </div>

              {/* Bank Information */}
              {activeTab === "bank" && (
                <div id="Bank Details">
                  {bankDetails.length === 0 ? (
                    <div className="flex flex-col justify-center items-center space-y-4 py-6 shadow-sm bg-light-grey rounded-common w-full">
                      <div
                        className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}
                      >
                        <span className="text-color-one transform -rotate-45">
                          <BiSolidBank />
                        </span>
                      </div>
                      <p className="text-sm text-color-form">
                        You have not added any bank information.
                      </p>
                      <Button
                        ButtonText="Add Bank Account"
                        className="w-[254px] rounded-[16px] h-[35px] flex tracking-tighter justify-center items-center"
                        onClick={onNavigateToAddBankDetails}
                      />
                    </div>
                  ) : (
                    <div>
                      {/* Bank Mobile */}
                      <div className="grid grid-cols-2 gap-4 pb-4 lg:hidden">
                        {bankDetails.map((bank) => (
                          <div
                            key={bank.id}
                            onClick={() => handleBankSelect(bank.id)}
                          >
                            <BankComponent
                              id={bank.id}
                              bankImage={
                                <RiBankLine className="text-color-one" />
                              }
                              bankName={bank.bankName}
                              accNumber={bank.accountNumber}
                              accName={bank.accountName}
                              style="h-[105px]"
                              flexStyling="flex gap-2 space-y-0"
                              icon={
                                <RiDeleteBin5Fill className="text-red-500 cursor-pointer" />
                              }
                              onNavigateToDelete={onNavigateToDeleteBank}
                              onClick={onNavigateToAddBankDetails}
                              type="bank"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="my-4 lg:hidden">
                        <Button
                          ButtonText="Add Bank Account"
                          className="py-3 rounded-[12px] w-[125px] h-[30px] flex items-center justify-center text-xs tracking-tight"
                          onClick={onNavigateToAddBankDetails}
                        />
                      </div>
                      {/* Bank Desktop */}
                      <div className="hidden lg:grid">
                        <BankHeader
                          header="Bank"
                          number="Account Number"
                          name="Account Name"
                        />
                        {bankDetails.map((bank) => (
                          <div
                            key={bank.id}
                            onClick={() => handleBankSelect(bank.id)}
                          >
                            <BankComponentDesktop
                              id={bank.id}
                              bankImage={
                                <RiBankLine className="text-color-one" />
                              }
                              bankName={bank.bankName}
                              accNum={bank.accountNumber}
                              accName={bank.accountName}
                              onNavigateToDelete={onNavigateToDeleteBank}
                              onClick={onNavigateToAddBankDetails}
                              type="bank"
                              
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Crypto Information */}
              {activeTab === "crypto" && (
                <div id="Crypto-Details">
                  {cryptoWallets.length === 0 ? (
                    <div className="flex flex-col justify-center items-center space-y-4 py-6 shadow-sm bg-light-grey rounded-common w-full">
                      <div
                        className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}
                      >
                        <span className="text-color-one transform -rotate-45">
                          <FaBitcoin />
                        </span>
                      </div>
                      <p className="text-sm text-color-form">
                        You have not added any crypto wallet information.
                      </p>
                      <Button
                        ButtonText="Add Wallet Address"
                        className="w-[254px] rounded-[16px] h-[35px] flex tracking-tighter justify-center items-center"
                        onClick={onNavigateToAddCryptoDetails}
                      />
                    </div>
                  ) : (
                    <div>
                      {/* Crypto Mobile */}
                      <div className="flex flex-col gap-4 pb-4 lg:hidden">
                        {cryptoWallets.map((wallet) => (
                          <div
                            key={wallet.id}
                            onClick={() => handleCryptoSelect(wallet.id)}
                          >
                            <BankComponent
                              id={wallet.id}
                              bankImage={
                                <FaBitcoin className="text-color-one" />
                              }
                              bankName={wallet.address}
                              accName={wallet.networkID.name}
                              style="h-[79px] w-full items-start"
                              flexStyling="flex gap-2 space-y-0"
                              icon={
                                <RiDeleteBin5Fill className="text-red-500 cursor-pointer hover:text-red-600 duration-150" />
                              }
                              onNavigateToDelete={onNavigateToDeleteCrypto}
                              onClick={onNavigateToAddCryptoDetails}
                              type="crypto"
                            />
                          </div>
                        ))}
                      </div>
                      <div
                        className="my-4 lg:hidden"
                        // onClick={onNavigatetoDeleteBank}
                      >
                        <Button
                          ButtonText="Add Wallet"
                          className="py-3 rounded-[12px] w-[125px] h-[30px] flex items-center justify-center text-xs tracking-tight"
                          onClick={onNavigateToAddCryptoDetails}
                        />
                      </div>
                      {/* Crypto Desktop */}
                      <div className="hidden lg:grid">
                        <BankHeader
                          header="Network"
                          number="Wallet Address"
                          name=""
                        />
                        {cryptoWallets.map((wallet) => (
                          <div
                            key={wallet.id}
                            onClick={() => handleCryptoSelect(wallet.id)}
                          >
                            <BankComponentDesktop
                              id={wallet.id}
                              bankImage={
                                <FaBitcoin className="text-color-one" />
                              }
                              bankName={wallet.networkID?.name}
                              accNum={wallet.address}
                              onClick={onNavigateToAddCryptoDetails}
                              onNavigateToDelete={onNavigateToDeleteCrypto}
                              type="crypto"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
       {/* Bank Info Page content can go here */}
       {deleteBank && (
          <DeleteBank onClose={handleCloseDeleteBank} />
        )}
    </div>
  );
}
