"use client";
import AddBankInformation from "@/components/AuthDashboard/Bank/AddBank";
import KycInformation from "@/components/AuthDashboard/Kyc/KycInformation";
import NextOfKinInformation from "@/components/AuthDashboard/Kyc/NextOfKin";
import ProfilePictureInformation from "@/components/AuthDashboard/Kyc/ProfilePicture";
import ValidIdInformation from "@/components/AuthDashboard/Kyc/ValidID";
import CardVerification from "@/components/AuthDashboard/ui/CardVerification";
import CardComponentFive from "@/components/ui/CardComponentFive";
import { useKycStore } from "@/store/kycStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { BsFileBarGraphFill, BsPersonCheck } from "react-icons/bs";
import { LuScanFace } from "react-icons/lu";
import { TbTargetArrow } from "react-icons/tb";
import Loading from "../ui/Loading";
import AddCryptoInformation from "./Bank/AddCrypto";
import BankInfo from "./Bank/BankInfo";

export default function Dashboard() {
  const fullName = useUserStore((state) => state.fullName);
  useLoadFullName();
  const router = useRouter(); // Initialize useRouter
  const [loading, setLoading] = useState(false);
  // Zustand store hooks
  const {
    //Bank/Crypto Info Provided
    isBankDetailsProvided,
    setIsBankDetailsProvided,
    isCryptoDetailsProvided,
    setIsCryptoDetailsProvided,

    //Kyc Info Provided
    isValidIdProvided,
    setIsValidIdProvided,
    isNextOfKinProvided,
    setIsNextOfKinProvided,
    isProfilePictureProvided,
    setIsProfilePictureProvided,

    //Bank/Crypto Modal Open
    isBankModalOpen,
    setIsBankModalOpen,
    isAddBankInfoModalOpen,
    setIsAddBankInfoModalOpen,
    isAddCryptoInfoModalOpen,
    setIsAddCryptoInfoModalOpen,

    //Kyc Modal Open
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

  const [userId, setUserId] = useState(""); // New state for userId

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");

    if (savedUserId) {
      setUserId(savedUserId);

      const statuses = [
        {
          key: `isBankDetailsProvided-${savedUserId}`,
          setter: setIsBankDetailsProvided,
        },
        {
          key: `isCryptoDetailsProvided-${savedUserId}`,
          setter: setIsCryptoDetailsProvided,
        },
        {
          key: `isValidIdProvided-${savedUserId}`,
          setter: setIsValidIdProvided,
        },
        {
          key: `isNextOfKinProvided-${savedUserId}`,
          setter: setIsNextOfKinProvided,
        },
        {
          key: `isProfilePictureProvided-${savedUserId}`,
          setter: setIsProfilePictureProvided,
        },
      ];

      statuses.forEach(({ key, setter }) => {
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
    const fullName = localStorage.getItem("fullName");

    if (fullName !== null) {
      // The 'fullName' exists in localStorage
      console.log("Full name found:", fullName);
    } else {
      // The 'fullName' does not exist in localStorage
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
    if (userId) {
      // Store `isBankDetailsProvided` as a boolean value in string format ("true" or "false")
      localStorage.setItem(
        `isBankDetailsProvided-${userId}`,
        String(isBankDetailsProvided)
      );
      // Store `isCryptoDetailsProvided` as a boolean value in string format ("true" or "false")
      localStorage.setItem(
        `isCryptoDetailsProvided-${userId}`,
        String(isCryptoDetailsProvided)
      );
      // Store `isValidIdProvided` as a boolean value in string format ("true" or "false")
      localStorage.setItem(
        `isValidIdProvided-${userId}`,
        String(isValidIdProvided)
      );
      // Store `isNextOfKinProvided` as a boolean value in string format ("true" or "false")
      localStorage.setItem(
        `isNextOfKinProvided-${userId}`,
        String(isNextOfKinProvided)
      );
      // Store `isProfilePictureProvided` as a boolean value in string format ("true" or "false")
      localStorage.setItem(
        `isProfilePictureProvided-${userId}`,
        String(isProfilePictureProvided)
      );
    }
  }, [
    isBankDetailsProvided,
    isCryptoDetailsProvided,
    isValidIdProvided,
    isNextOfKinProvided,
    isProfilePictureProvided,
    userId,
  ]);

  useEffect(() => {
    if (isKycProvided && isKycModalOpen) {
      setTimeout(() => {
        setIsKycModalOpen(false);
      }, 2000);
    }
    if (isBankDetailsProvided && isCryptoDetailsProvided && isBankModalOpen) {
      setTimeout(() => {
        setIsBankModalOpen(false);
      }, 2000);
    }
  }, [
    isKycProvided,
    isKycModalOpen,
    setIsKycModalOpen,
    isBankDetailsProvided,
    isCryptoDetailsProvided,
    isBankModalOpen,
    setIsBankModalOpen,
  ]);

  // Navigate to /main/dashboard if BankInfo and KYC are provided
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId && isBankProvided && isKycProvided) {
      // Show the loading UI for 2 seconds
      setLoading(true);
      setTimeout(() => {
        router.push("/main/dashboard"); // Redirect after 2 seconds
      }, 2000); // 2 seconds delay
    } else {
      setLoading(false); // Hide loading UI immediately if conditions are not met
    }
  }, [isBankProvided, isKycProvided, router]);

  //Bank Functions
  const handleOpenBankInfo = () => setIsBankModalOpen(true);
  const handleOpenAddBankInfo = () => setIsAddBankInfoModalOpen(true);
  const handleOpenAddCryptoInfo = () => setIsAddCryptoInfoModalOpen(true);

  const handleBankDetailProvided = () => {
    setIsBankDetailsProvided(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`isBankDetailsProvided-${userId}`, "Provided");
    }
  };
  const handleCryptoDetailProvided = () => {
    setIsCryptoDetailsProvided(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`isCryptoDetailsProvided-${userId}`, "Provided");
    }
  };

  //Kyc Functions
  const handleOpenKycInfo = () => setIsKycModalOpen(true);
  const handleOpenValidIdInfo = () => setIsValidIdModalOpen(true);
  const handleOpenNextOfKinInfo = () => setIsNextOfKinModalOpen(true);
  const handleOpenProfilePictureInfo = () => setIsProfilePictureModalOpen(true);

  const handleKyc = () => {
    setIsValidIdProvided(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`isValidIdProvided-${userId}`, "Provided");
    }
  };
  const handleNextOfKinProvided = () => {
    setIsNextOfKinProvided(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`isNextOfKinProvided-${userId}`, "Provided");
    }
  };
  const handleProfilePictureProvided = () => {
    setIsProfilePictureProvided(true);
    const userId = localStorage.getItem("userId");
    if (userId) {
      localStorage.setItem(`isProfilePictureProvided-${userId}`, "Provided");
    }
  };

  const capitalizeFirstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div><Loading/></div>
    )
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
