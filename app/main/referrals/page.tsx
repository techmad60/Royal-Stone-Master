"use client";
import AddBankInformation from "@/components/Investments/WithdrawFunds/AddNewWithdrawalAccount/AddBank";
import AddCryptoInformation from "@/components/Investments/WithdrawFunds/AddNewWithdrawalAccount/AddCrypto";
import ReferredDesktopList from "@/components/Referral/ReferralDesktop";
import ReferralList from "@/components/Referral/Referrals";
import BankComponent from "@/components/ui/BankComponent";
import Button from "@/components/ui/Button";
import CardComponentFive from "@/components/ui/CardComponentFive";
import CircleToggle from "@/components/ui/CircleToggle";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import { withdrawFunds } from "@/Services/apiService";
import useBankCryptoStore from "@/store/bankCryptoStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import { BankDetails, CryptoWallet } from "@/types/Type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BiSolidBank } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa6";
import { RiBankLine } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";

export default function Referrals() {
  useLoadFullName();
  const router = useRouter();
  const referralCode = useUserStore((state) => state.referralCode);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEarning, setTotalEarning] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [showWithdrawalOptions, setShowWithdrawalOptions] = useState(false);
  const [currentModal, setCurrentModal] = useState<
    "addBank" | "addCrypto" | null
  >(null);

  // Zustand Hooks
  const {
    bankDetails,
    cryptoWallets,
    setBankDetails,
    setCryptoWallets,
    selectedBankId,
    selectedCryptoId,
    setSelectedBankId,
    setSelectedCryptoId,
    selectedType,
    setSelectedType,
  } = useBankCryptoStore();

  const [selectedAccountDetails, setSelectedAccountDetails] = useState<{
    selectedAccount: BankDetails | CryptoWallet | null;
  }>({ selectedAccount: null });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth/login");
        return;
      }
      setLoading(true);

      try {
        const fetchWithToken = async (url: string) => {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "Fetch failed");
          return result;
        };

        const [referralData, referralDashboardData, bankData, cryptoData] =
          await Promise.all([
            fetchWithToken(
              "https://api-royal-stone.softwebdigital.com/api/referral"
            ),
            fetchWithToken(
              "https://api-royal-stone.softwebdigital.com/api/referral/dashboard"
            ),
            fetchWithToken(
              "https://api-royal-stone.softwebdigital.com/api/bank"
            ),
            fetchWithToken(
              "https://api-royal-stone.softwebdigital.com/api/bank/crypto-wallet"
            ),
          ]);

        setReferrals(referralData.data);
        setTotalEarning(referralDashboardData.data.totalEarning || 0);
        setCurrentBalance(referralDashboardData.data.currentBalance || 0);
        setBankDetails(bankData.status ? bankData.data : []);
        setCryptoWallets(cryptoData.status ? cryptoData.data : []);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, setBankDetails, setCryptoWallets]);

  const handleWithdrawalSelection = (
    method: "bank" | "crypto",
    id?: string
  ) => {
    setSelectedType(method);
    if (method === "bank") {
      setSelectedBankId(id ?? null);
    } else {
      setSelectedCryptoId(id ?? null);
    }
    // setError("");
  };

  const validateInputs = (
    selectedAccount: BankDetails | CryptoWallet | null
  ) => {
    if (!selectedAccount) {
      return {
        isValid: false,
        error: `Please select a ${
          selectedType === "bank" ? "bank account" : "crypto wallet"
        }.`,
      };
    }
    if (!totalEarning || isNaN(Number(totalEarning))) {
      return { isValid: false, error: "Please enter a valid amount." };
    }
    if (!selectedType) {
      return { isValid: false, error: "Please select a withdrawal method." };
    }
   
    return { isValid: true, error: "" };
  };

  const handleWithdrawFundsClick = () => {
    const selectedAccount =
      selectedType === "bank"
        ? bankDetails.find((bank) => bank.id === selectedBankId) ?? null
        : cryptoWallets.find((wallet) => wallet.id === selectedCryptoId) ??
          null;

    const { isValid, error } = validateInputs(selectedAccount);
    if (!isValid) {
      toast.error(error);
      return;
    }
    setSelectedAccountDetails({ selectedAccount });

    // Call handleWithdrawal only if everything is valid
  handleWithdrawal();
  };

  const handleWithdrawal = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      return;
    }

    const beneficiaryID = selectedAccountDetails?.selectedAccount?.id || "";
    setLoading(true);

    try {
      const result = await withdrawFunds(
        totalEarning,
        beneficiaryID,
        token,
        "referral"
      );
      if (result.success) {
        toast.success(result.message || "Withdrawal Successful!");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = () => {
    if (referralCode) {
      navigator.clipboard
        .writeText(referralCode)
        .then(() => toast.success("Referral code copied to clipboard!"))
        .catch(() => toast.error("Failed to copy referral code."));
    } else {
      toast.warning("No referral code available to copy.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <ToastContainer />
      <div className="lg:flex lg:w-full items-end lg:my-6 lg:gap-12 lg:pr-8">
        <div className="lg:space-y-4 lg:border-r lg:pr-16">
          <div className="flex flex-col justify-center items-center my-6 gap-4 lg:justify-start lg:items-start lg:my-0">
            <Icon
              icon={<BsPeopleFill className="text-color-one text-3xl" />}
              containerSize="w-[49.5px] h-[49.5px] rounded-[18.5px]"
              iconSize="w-[30px] h-[30px]"
            />
            <p className="text-color-zero text-sm text-center font-semibold lg:text-start">
              Earn $5 on each transaction performed by a friend referred by you
            </p>
          </div>

          <section className="bg-light-grey rounded-common shadow-sm p-6 space-y-4 my-6 lg:bg-transparent lg:shadow-none lg:my-0 lg:p-0">
            <div className="flex justify-between items-center lg:bg-light-grey lg:p-6 lg:shadow-sm lg:rounded-[35px]">
              <div>
                <p className="text-sm text-[#6B7385] hidden lg:flex">
                  Referral code
                </p>
                <p className="font-bold text-[#0F1C39B2] text-sm lg:font-semibold lg:text-base">
                  {referralCode || "Not available"}
                </p>
              </div>
              <Button
                ButtonText="Copy Code"
                onClick={copyReferralCode}
                className="bg-color-one rounded-[13px]  text-xs font-medium w-[143px] h-[30px] flex items-center lg:rounded-[22px] lg:w-[132px] lg:h-[40px]"
              ></Button>
            </div>
            <hr className="bg-[#F2F2F2] lg:hidden" />
            <CardComponentFive
              icon={<AiFillDollarCircle />}
              number={`$${totalEarning.toFixed(2)}`}
              secondLabel="Current Balance"
              secondNumber={`$${currentBalance.toFixed(2)}`}
              label="Your Earnings"
              width="w-full lg:hidden"
              showNumber = {true}
            />
          </section>
        </div>

        <CardComponentFive
          icon={<AiFillDollarCircle />}
          label="Your Earnings"
          number={`$${totalEarning.toFixed(2)}`}
          secondLabel="Current Balance"
          secondNumber={`$${currentBalance.toFixed(2)}`}
          gapStyling="gap-x-60"
          width="hidden lg:flex w-[605px]"
          showNumber = {true}
        />
      </div>

      {!showWithdrawalOptions && (
        <div className="flex flex-end self-end justify-center mb-3 lg:justify-end lg:mr-8 gap-x- ">
          <Button
            ButtonText="Withdraw Earnings"
            onClick={() => setShowWithdrawalOptions(true)}
            className="bg-color-one rounded-[13px] text-xs font-medium w-[143px] h-[30px] flex items-center lg:rounded-[22px] lg:w-[132px] lg:h-[40px]"
          ></Button>
        </div>
      )}

      <hr className="lg:mr-8" />

      {showWithdrawalOptions && (
        <div className="flex flex-col gap-1 border-b mt-4 lg:w-full">
          <label className="text-color-form text-sm">
            Select a preferred withdrawal method
          </label>
          <div className="grid grid-cols-2 gap-4 py-4 lg:flex">
            {(["bank", "crypto"] as const).map((method) => (
              <BankComponent
                key={method}
                style={
                  selectedType === method
                    ? "bg-color-two hover:bg-color-two"
                    : "h-[110px]"
                }
                bankImage={
                  method === "bank" ? (
                    <BiSolidBank className="text-color-one" />
                  ) : (
                    <FaBitcoin className="text-color-one" />
                  )
                }
                bankName={`Withdraw to ${
                  method === "bank" ? "Bank Account" : "Crypto Wallet"
                }`}
                textStyle={
                  selectedType === method
                    ? "text-green-700"
                    : "text-sm font-medium whitespace-wrap"
                }
                icon={
                  <CircleToggle
                    isClicked={selectedType === method}
                    onClick={() => handleWithdrawalSelection(method)}
                  />
                }
                onClick={() => handleWithdrawalSelection(method)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="lg:flex justify-between mt-4 lg:mr-8">
        {(selectedType === "crypto" && cryptoWallets.length !== 0) ||
        (selectedType === "bank" && bankDetails.length !== 0) ? (
          <p className="text-color-form text-sm">
            Select a{" "}
            {selectedType === "bank" ? "Bank Account" : "Crypto Wallet"} to
            withdraw to.
          </p>
        ) : null}
        {selectedType && (
          <p
            className="text-color-one border-color-one border-b w-fit text-sm hover hover:text-green-700 hover:border-green-700 duration-150 cursor-pointer hidden lg:flex"
            onClick={() =>
              setCurrentModal(selectedType === "bank" ? "addBank" : "addCrypto")
            }
          >
            {selectedType === "bank" && bankDetails.length === 0
              ? "Add"
              : selectedType === "crypto" && cryptoWallets.length === 0
              ? "Add"
              : "Use a new"}{" "}
            {selectedType === "bank" ? "bank account" : "crypto wallet"}.
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-6 lg:border-0">
        {selectedType === "bank" && bankDetails.length > 0 && (
          <div className="flex items-center gap-4 overflow-x-scroll hide-scrollbar">
            {bankDetails.map((bank) => (
              <BankComponent
                key={bank.id}
                style={
                  selectedBankId === bank.id
                    ? "bg-color-two hover:bg-color-two h-[120px]"
                    : "h-[120px]"
                }
                bankImage={<RiBankLine className="text-color-one" />}
                bankName={bank.bankName}
                accNumber={bank.accountNumber}
                accName={bank.accountName}
                icon={
                  <CircleToggle
                    isClicked={selectedBankId === bank.id}
                    onClick={() => handleWithdrawalSelection("bank", bank.id)}
                  />
                }
                onClick={() => handleWithdrawalSelection("bank", bank.id)}
              />
            ))}
          </div>
        )}

        {selectedType === "crypto" && cryptoWallets.length > 0 && (
          <div className="flex items-center gap-4 overflow-x-scroll hide-scrollbar">
            {cryptoWallets.map((wallet) => (
              <BankComponent
                key={wallet.id}
                style={
                  selectedCryptoId === wallet.id
                    ? "bg-color-two hover:bg-color-two h-[100px] min-w-[200px]"
                    : "h-[100px] min-w-[200px]"
                }
                bankImage={<FaBitcoin className="text-color-one" />}
                accName={wallet.address}
                bankName={wallet.networkID.name}
                icon={
                  <CircleToggle
                    isClicked={selectedCryptoId === wallet.id}
                    onClick={() =>
                      handleWithdrawalSelection("crypto", wallet.id)
                    }
                  />
                }
                onClick={() => handleWithdrawalSelection("crypto", wallet.id)}
              />
            ))}
          </div>
        )}

        {selectedType && (
          <p
            className="text-color-one border-color-one border-b w-fit text-sm hover hover:text-green-700 hover:border-green-700 duration-150 cursor-pointer flex lg:hidden"
            onClick={() =>
              setCurrentModal(selectedType === "bank" ? "addBank" : "addCrypto")
            }
          >
            {selectedType === "bank" && bankDetails.length === 0
              ? "Add"
              : selectedType === "crypto" && cryptoWallets.length === 0
              ? "Add"
              : "Use a new"}{" "}
            {selectedType === "bank" ? "bank account" : "crypto wallet"}.
          </p>
        )}
      </div>

      {selectedType && (
        <div className="flex justify-center mt-5 lg:mr-8">
          <Button
            ButtonText="Withdraw"
            onClick={handleWithdrawFundsClick}
            className="bg-color-one rounded-[13px]  text-xs font-medium w-[143px] h-[30px] flex items-center lg:rounded-[22px] lg:w-[132px] lg:h-[40px]"
          ></Button>
        </div>
      )}

      {referrals.length > 0 ? (
        <div>
          <p className="text-base font-semibold text-color-zero py-5">
            Referral List ({referrals.length})
          </p>
          <div className="lg:hidden">
            <ReferralList referrals={referrals} />
          </div>
          <div className="hidden lg:grid">
            <ReferredDesktopList referrals={referrals} />
          </div>
        </div>
      ) : (
        <div className="lg:mr-8">
          <NoHistory icon={<BsPeopleFill />} text="You've no referrals" />
        </div>
      )}

      {currentModal === "addBank" && (
        <AddBankInformation onClose={() => setCurrentModal(null)} />
      )}
      {currentModal === "addCrypto" && (
        <AddCryptoInformation onClose={() => setCurrentModal(null)} />
      )}
    </div>
  );
}
