"use client";
import AddBankInformation from "@/components/AuthDashboard/Bank/AddBank";
import AddCryptoInformation from "@/components/AuthDashboard/Bank/AddCrypto";
import BankInfo from "@/components/AuthDashboard/Bank/BankInfo";
import KycInformation from "@/components/AuthDashboard/Kyc/KycInformation";
import NextOfKinInformation from "@/components/AuthDashboard/Kyc/NextOfKin";
import ProfilePictureInformation from "@/components/AuthDashboard/Kyc/ProfilePicture";
import ValidIdInformation from "@/components/AuthDashboard/Kyc/ValidID";
import CardVerification from "@/components/AuthDashboard/ui/CardVerification";
import CardComponentFive from "@/components/ui/CardComponentFive";
import Loading from "@/components/ui/Loading";
import { useKycStore } from "@/store/kycStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { BsFileBarGraphFill, BsPersonCheck } from "react-icons/bs";
import { LuScanFace } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";

export default function Dashboard() {
  const fullName = useUserStore((state) => state.fullName);
  useLoadFullName();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Zustand store hooks
  const {
    isBankDetailsProvided,
    setIsBankDetailsProvided,
    isCryptoDetailsProvided,
    setIsCryptoDetailsProvided,
    isValidIdProvided,
    setIsValidIdProvided,
    isNextOfKinProvided,
    setIsNextOfKinProvided,
    isProfilePictureProvided,
    setIsProfilePictureProvided,
    isBankModalOpen,
    setIsBankModalOpen,
    isAddBankInfoModalOpen,
    setIsAddBankInfoModalOpen,
    isAddCryptoInfoModalOpen,
    setIsAddCryptoInfoModalOpen,
    isKycModalOpen,
    setIsKycModalOpen,
    isValidIdModalOpen,
    setIsValidIdModalOpen,
    isNextOfKinModalOpen,
    setIsNextOfKinModalOpen,
    isProfilePictureModalOpen,
    setIsProfilePictureModalOpen,
    isBankProvided,
    isKycProvided,
  } = useKycStore();

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    const fullName = localStorage.getItem("fullName");

    if (savedUserId) {
      setUserId(savedUserId);

      // Load status from localStorage
      const statusMap = [
        { key: `isBankDetailsProvided-${savedUserId}`, setter: setIsBankDetailsProvided },
        { key: `isCryptoDetailsProvided-${savedUserId}`, setter: setIsCryptoDetailsProvided },
        { key: `isValidIdProvided-${savedUserId}`, setter: setIsValidIdProvided },
        { key: `isNextOfKinProvided-${savedUserId}`, setter: setIsNextOfKinProvided },
        { key: `isProfilePictureProvided-${savedUserId}`, setter: setIsProfilePictureProvided },
      ];

      statusMap.forEach(({ key, setter }) => {
        const status = localStorage.getItem(key);
        setter(status === "Provided" || status === "true");
      });
    } else {
      // Clear previous states if no userId is found
      setIsBankDetailsProvided(false);
      setIsCryptoDetailsProvided(false);
      setIsValidIdProvided(false);
      setIsNextOfKinProvided(false);
      setIsProfilePictureProvided(false);
    }

    if (fullName) {
      console.log("Full name found:", fullName);
    } else {
      console.log("Full name not found in localStorage.");
    }
  }, [
    setIsBankDetailsProvided,
    setIsCryptoDetailsProvided,
    setIsNextOfKinProvided,
    setIsProfilePictureProvided,
    setIsValidIdProvided,
  ]);

  useEffect(() => {
    if (!userId) return;

    // Persist relevant details in localStorage
    const userStorageKeys = {
      [`isBankDetailsProvided-${userId}`]: isBankDetailsProvided,
      [`isCryptoDetailsProvided-${userId}`]: isCryptoDetailsProvided,
      [`isValidIdProvided-${userId}`]: isValidIdProvided,
      [`isNextOfKinProvided-${userId}`]: isNextOfKinProvided,
      [`isProfilePictureProvided-${userId}`]: isProfilePictureProvided,
    };

    Object.entries(userStorageKeys).forEach(([key, value]) => {
      localStorage.setItem(key, String(value));
    });

    if (isBankProvided && isKycProvided) {
      router.push("/main/dashboard");
    } else {
      setLoading(false);
    }
  }, [isBankProvided, isKycProvided, isBankDetailsProvided, isCryptoDetailsProvided, isValidIdProvided, isNextOfKinProvided, isProfilePictureProvided, userId, router]);

  useEffect(() => {
    if (isKycProvided && isKycModalOpen) {
      setTimeout(() => setIsKycModalOpen(false), 2000);
    }
    if (isBankDetailsProvided && isCryptoDetailsProvided && isBankModalOpen) {
      setTimeout(() => setIsBankModalOpen(false), 2000);
    }
  }, [isKycProvided, isKycModalOpen, setIsKycModalOpen, isBankDetailsProvided, isCryptoDetailsProvided, isBankModalOpen, setIsBankModalOpen]);

  // Bank/Crypto Functions
  const handleOpenBankInfo = () => setIsBankModalOpen(true);
  const handleOpenAddBankInfo = () => setIsAddBankInfoModalOpen(true);
  const handleOpenAddCryptoInfo = () => setIsAddCryptoInfoModalOpen(true);

  const handleBankDetailProvided = () => {
    setIsBankDetailsProvided(true);
    localStorage.setItem(`isBankDetailsProvided-${userId}`, "Provided");
  };
  
  const handleCryptoDetailProvided = () => {
    setIsCryptoDetailsProvided(true);
    localStorage.setItem(`isCryptoDetailsProvided-${userId}`, "Provided");
  };

  // Kyc Functions
  const handleOpenKycInfo = () => setIsKycModalOpen(true);
  const handleOpenValidIdInfo = () => setIsValidIdModalOpen(true);
  const handleOpenNextOfKinInfo = () => setIsNextOfKinModalOpen(true);
  const handleOpenProfilePictureInfo = () => setIsProfilePictureModalOpen(true);

  const handleKyc = () => {
    setIsValidIdProvided(true);
    localStorage.setItem(`isValidIdProvided-${userId}`, "Provided");
  };
  const handleNextOfKinProvided = () => {
    setIsNextOfKinProvided(true);
    localStorage.setItem(`isNextOfKinProvided-${userId}`, "Provided");
  };
  const handleProfilePictureProvided = () => {
    setIsProfilePictureProvided(true);
    localStorage.setItem(`isProfilePictureProvided-${userId}`, "Provided");
  };

  const capitalizeFirstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="flex flex-col lg:pr-8">
      <p className="text-lg text-color-form py-4 lg:text-start">
        Welcome, {fullName ? capitalizeFirstLetter(fullName) : "Guest"}! 👋🏻
      </p>
      <div className="flex gap-4 pb-3 my-4 sm:justify-center lg:justify-start">
        <CardComponentFive
          icon={<TbTargetArrow className="text-sm lg:text-base" />}
          label="Total Savings Target"
          number={`0`}
          width="sm:w-[300px] lg:w-[378px]"
        />
        <CardComponentFive
          icon={<BsFileBarGraphFill className="text-sm lg:text-base" />}
          label="Total Investments Made"
          number={`0`}
          width="sm:w-[300px] lg:w-[378px]"
        />
      </div>

      <div className="border-t flex-col space-y-4 py-6">
        {/* Bank Information Card */}
        <CardVerification
          iconImg={<BiSolidBank className="text-xl text-color-one" />}
          label="Bank/Crypto Information"
          status={isBankProvided ? "Provided" : "Not Set"}
          statusClass={isBankProvided ? "text-color-one" : "text-color-form"}
          showArrow={isBankProvided ? "hidden" : "flex"}
          showSwitch="hidden"
          onClick={isBankProvided ? undefined : handleOpenBankInfo}
          style={isBankProvided ? "hover:bg-light-grey" : "hover:bg-slate-100"}
        />

        {/* KYC Card */}
        <CardVerification
          iconImg={<BsPersonCheck className="text-xl text-color-one" />}
          label="KYC"
          status={isKycProvided ? "Provided" : "Not Set"}
          statusClass={isKycProvided ? "text-color-one" : "text-color-form"}
          showArrow={isKycProvided ? "hidden" : "flex"}
          showSwitch="hidden"
          onClick={isKycProvided ? undefined : handleOpenKycInfo}
          style={isKycProvided ? "hover:bg-light-grey" : "hover:bg-slate-100"}
        />

        {/* Biometrics Card */}
        <CardVerification
          iconImg={<LuScanFace className="text-xl text-color-one" />}
          label="Enable Biometrics"
          status="Not Set"
          showArrow="hidden"
          showSwitch="flex"
        />
      </div>

      {/* Bank */}
      {isBankModalOpen && (
        <BankInfo
          onClickAddBankDetails={handleOpenAddBankInfo}
          onClickAddCryptoDetails={handleOpenAddCryptoInfo}
          onClose={() => setIsBankModalOpen(false)}
          // onSave={handleBankInfoSaved}
        />
      )}

      {isAddBankInfoModalOpen && (
        <AddBankInformation
          onClose={() => setIsAddBankInfoModalOpen(false)}
          onBankDetailStatus={handleBankDetailProvided}
        />
      )}
      {isAddCryptoInfoModalOpen && (
        <AddCryptoInformation
          onClose={() => setIsAddCryptoInfoModalOpen(false)}
          onCryptoDetailStatus={handleCryptoDetailProvided}
        />
      )}

      {/* Kyc */}
      {isKycModalOpen && (
        <KycInformation
          onClickNextOfKin={handleOpenNextOfKinInfo}
          onClickValidId={handleOpenValidIdInfo}
          onClickProfilePicture={handleOpenProfilePictureInfo}
          onClose={() => setIsKycModalOpen(false)}
        />
      )}
      {isValidIdModalOpen && (
        <ValidIdInformation
          onClose={() => setIsValidIdModalOpen(false)}
          onValidIdStatus={handleKyc}
        />
      )}
      {isNextOfKinModalOpen && (
        <NextOfKinInformation
          onClose={() => setIsNextOfKinModalOpen(false)}
          onNextOfKinStatus={handleNextOfKinProvided}
        />
      )}
      {isProfilePictureModalOpen && (
        <ProfilePictureInformation
          onClose={() => setIsProfilePictureModalOpen(false)}
          onProfilePictureStatus={handleProfilePictureProvided}
        />
      )}
    </div>
  );
}
