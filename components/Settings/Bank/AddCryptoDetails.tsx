import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useBankCryptoStore from "@/store/bankCryptoStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import CustomAlert from "../../ui/CustomAlert";
import SettingsParent from "../SettingsParent";
import AddBankDetails from "./AddBankDetails";
import BankSetting from "./BankSettings";
import DeleteBank from "./DeleteBank";

type CryptoDetails = {
  network: string;
  walletAddress: string;
};
export default function AddCryptoDetails() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [currentPage, setCurrentPage] = useState("addCryptoDetails");
  const [networks, setNetworks] = useState<{ id: string; name: string }[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteBankOpen, setIsDeleteBankOpen] = useState(false);
  const [wallet, setWallet] = useState({
    network: "",
    walletAddress: "",
  });
  const router = useRouter();

  const [initialCryptoDetails, setInitialCryptoDetails] =
    useState<CryptoDetails | null>(null);
  // Fetch crypto wallet details from Zustand store
  const { cryptoWallets, selectedCryptoId, setSelectedCryptoId } =
    useBankCryptoStore();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!selectedCryptoId) {
      setWallet({
        network: "",
        walletAddress: "",
      });
      setInitialCryptoDetails(null);
    } else {
      const selectedWallet = cryptoWallets.find(
        (wallet) => wallet.id === selectedCryptoId
      );
  
      if (selectedWallet) {
        setWallet({
          network: selectedWallet.networkID.name || "",
          walletAddress: selectedWallet.address || "",
        });
      }
    }
  }, [selectedCryptoId, cryptoWallets]);
  
  
  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        if (!token) {
          router.push("/auth/login");
        }
        setIsLoading(true);
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/crypto-network",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          setNetworks(responseData.data || []);
          console.log(responseData.data); // Extract `data` from the response
        } else {
          const errorData = await response.json();
          console.error("Failed to fetch networks:", errorData.message);
        }
      } catch (error) {
        console.error("Error fetching networks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNetworks();
  }, [token, router]);

  // Ensure clearing works when switching pages
  const handleNavigateToAddCryptoDetails = () => {
    setCurrentPage("bankInfo");
    setWallet({
      network: "",
      walletAddress: "",
    });
    setInitialCryptoDetails(null);
    setSelectedCryptoId(null); // Clear selected bank ID to reset state
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // Log initialCryptoDetails for debugging or audit trail
    console.log("Initial Crypto Details:", initialCryptoDetails);
    const { name, value } = e.target;
    setWallet((prev) => ({ ...prev, [name]: value }));
  };

  const addCryptoDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("You must be logged in to add crypto details.");

    const payload = {
      networkID: wallet.network,
      address: wallet.walletAddress,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/bank/crypto-wallet",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload), // Match the backend payload structure
        }
      );

      const result = await response.json();
      if (response.ok) {
        // Handle success
        setAlertMessage("Crypto details added successfully! 🎉");
        setTimeout(() => {
          setAlertMessage(null);
          setCurrentPage("bankInfo");
        }, 2000);
      } else {
        throw new Error(result.message || "Failed to add crypto details.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error Stack Trace:", error.stack);
        alert(`An error occurred: ${error.message}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  // const handleOpenDeleteBank = () => {
  //   setIsDeleteBankOpen(true); // Open the DeleteBank component
  //   setCurrentPage("bankInfo"); // Navigate to the bankInfo page
  // };
  
  const handleCloseDeleteBank = () => {
    setIsDeleteBankOpen(false); // Close the DeleteBank component
    setCurrentPage("bankInfo"); // Optionally navigate back to settings or another page
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCryptoId) {
      // If there's no selectedCryptoId, call addCryptoDetails (POST)
      addCryptoDetails();
      console.log(isLoading);
    }
  };

  return (
    <div className="flex flex-col bg-white lg:mr-8">
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : currentPage === "bankInfo" ? (
        <BankSetting
          onNavigateToAddCryptoDetails={() =>
            setCurrentPage("addCryptoDetails")
          }
          onNavigateToAddBankDetails={() => setCurrentPage("addBankDetails")}
        />
      ) : currentPage === "addBankDetails" ? (
        <AddBankDetails />
      ) : (
        <div>
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Bank/Crypto Info",
                onClick: handleNavigateToAddCryptoDetails,
              },
              {
                label: "Crypto Details",
                onClick: () => console.log("Add Crypto Details"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Add Crypto Information
            </h1>
            <p className="text-color-form text-sm mt-2 lg:hidden">
              Provide your wallet details
            </p>
          </div>
          {/* Desktop Navigator */}
          <NavigatorTwo
            style="hidden lg:flex"
            links={[
              {
                label: "Bank/Crypto Info",
                onClick: handleNavigateToAddCryptoDetails,
              },
              {
                label: "Crypto Details",
                onClick: () => console.log("Crypto Details"),
              },
            ]}
          />
          <p className="text-color-form text-sm my-4 hidden lg:flex">
            Provide your wallet details
          </p>
          <form
            className="flex flex-col space-y-8 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px]"
            onSubmit={handleFormSubmit}
          >

            {/* Network*/}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Network</label>
              {!selectedCryptoId ? (

                <select
                  name="network"
                  value={wallet.network}
                  onChange={handleChange}
                  required
                  className="rounded-sm border-b border-slate-200 text-color-zero"
                >
                  <option value="" disabled>
                    {isLoading ? "Loading networks..." : "Select a Network"}
                  </option>
                  {networks.map((network) => (
                    <option key={network.id} value={network.id}>
                      {network.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="network"
                  value={wallet.network}
                  onChange={handleChange}
                  required
                  className="rounded-sm border-b border-slate-200 text-color-zero"
                  placeholder="TRC-20"
                />
              )}
            </div>

            {/* Wallet Address */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Wallet Address</label>
              <input
                type="text"
                name="walletAddress"
                value={wallet.walletAddress}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="Babhauixxyanal1225616711sdjcjssa"
              />
            </div>

            <Button
              ButtonText={"Save"}
              className={`py-3 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px] bg-color-one hover:bg-green-700`}
              type="submit"
            />
          </form>
          {/* {bankAddedOpen && (
            <BankAdded
              onClose={() => setIsBankAddedOpen(false)}
              textMessage="Crypto Information Added"
            />
          )} */}
        </div>
      )}
      {currentPage === "bankInfo" && (
      <>
        {/* Bank Info Page content can go here */}
        {deleteBankOpen && (
          <DeleteBank onClose={handleCloseDeleteBank} />
        )}
      </>
    )}
      {/* Custom Alert */}
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          style="bg-color-one text-white text-sm p-4 rounded shadow-lg text-center h-16 w-68"
        />
      )}
    </div>
  );
}
