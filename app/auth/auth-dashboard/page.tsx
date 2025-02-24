"use client";
import AddBankInformation from "@/components/AuthDashboard/Bank/AddBank";
import AddCryptoInformation from "@/components/AuthDashboard/Bank/AddCrypto";
import BankInfo from "@/components/AuthDashboard/Bank/BankInfo";
import KycInformation from "@/components/AuthDashboard/Kyc/KycInformation";
import NextOfKinInformation from "@/components/AuthDashboard/Kyc/NextOfKin";
import ValidIdInformation from "@/components/AuthDashboard/Kyc/ValidID";
import CardVerification from "@/components/AuthDashboard/ui/CardVerification";
import CardComponentFive from "@/components/ui/CardComponentFive";
import { useKycStore } from "@/store/kycStore";
import useUserStore, { useLoadFullName } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiSolidBank } from "react-icons/bi";
import { BsFileBarGraphFill, BsPersonCheck } from "react-icons/bs";
import { TbTargetArrow } from "react-icons/tb";

export default function Dashboard() {
  const fullName = useUserStore((state) => state.fullName);
  useLoadFullName();
  const router = useRouter(); // Initialize useRouter
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

    isBankProvided,
    isKycProvided,
  } = useKycStore();

  const [userId, setUserId] = useState(""); // New state for userId
  const [currentModal, setCurrentModal] = useState<
    | "kycModal"
    | "validIdModal"
    | "nextOfKinModal"
    | "profilePictureModal"
    | "bankModal"
    | "addBankInfo"
    | "addCryptoInfo"
    | null
  >(null);

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
    if (isKycProvided && currentModal === "kycModal") {
      setTimeout(() => {
        setCurrentModal(null);
      }, 2000);
    }
    if (
      isBankDetailsProvided &&
      isCryptoDetailsProvided &&
      currentModal === "bankModal"
    ) {
      setTimeout(() => {
        setCurrentModal(null);
      }, 2000);
    }
  }, [
    isKycProvided,
    currentModal,
    isBankDetailsProvided,
    isCryptoDetailsProvided,
  ]);

  // Navigate to /main/dashboard if BankInfo and KYC are provided
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId && isKycProvided) {
      router.push("/main/dashboard");
    }
  }, [isKycProvided, router]);

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
 
  const capitalizeFirstLetter = (name: string): string => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

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
          onClick={
            isBankProvided ? undefined : () => setCurrentModal("bankModal")
          }
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
          onClick={
            isKycProvided ? undefined : () => setCurrentModal("kycModal")
          }
          style={isKycProvided ? "hover:bg-light-grey" : "hover:bg-slate-100"}
        />

        <p className="text-color-zero mt-8 px-4 text-sm">
          NB: Provide the Kyc information to be redirected to the main page.
        </p>
      </div>

      {/* Bank */}
      {currentModal === "bankModal" && (
        <BankInfo
          onClickAddBankDetails={() => setCurrentModal("addBankInfo")}
          onClickAddCryptoDetails={() => setCurrentModal("addCryptoInfo")}
          onClose={() => setCurrentModal(null)}
        />
      )}

      {currentModal === "addBankInfo" && (
        <AddBankInformation
          onClose={() => setCurrentModal("bankModal")}
          onBankDetailStatus={handleBankDetailProvided}
        />
      )}
      {currentModal === "addCryptoInfo" && (
        <AddCryptoInformation
          onClose={() => setCurrentModal("bankModal")}
          onCryptoDetailStatus={handleCryptoDetailProvided}
        />
      )}

      {/* Kyc */}
      {currentModal === "kycModal" && (
        <KycInformation
          onClickNextOfKin={() => setCurrentModal("nextOfKinModal")}
          onClickValidId={() => setCurrentModal("validIdModal")}
          onClickProfilePicture={() => setCurrentModal("profilePictureModal")}
          onClose={() => setCurrentModal(null)}
        />
      )}
      {currentModal === "validIdModal" && (
        <ValidIdInformation
          onClose={() => setCurrentModal("kycModal")}
          onValidIdStatus={handleKyc}
        />
      )}
      {currentModal === "nextOfKinModal" && (
        <NextOfKinInformation
          onClose={() => setCurrentModal("kycModal")}
          onNextOfKinStatus={handleNextOfKinProvided}
        />
      )}
    </div>
  );
}
