import Loading from "@/components/ui/Loading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useBankCryptoStore from "@/store/bankCryptoStore";
import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import CustomAlert from "../../ui/CustomAlert";
import NavigatorTwo from "../../ui/NavigatorTwo";
import SettingsParent from "../SettingsParent";
import AddCryptoDetails from "./AddCryptoDetails";
import BankSetting from "./BankSettings";
import DeleteBank from "./DeleteBank";

type BankDetails = {
  bankName: string;
  accountNumber: string;
  bankAddress: string;
  beneficiaryAddress: string;
  swiftCode: string;
  routingNumber: string;
  accountName: string;
  id: string;
};
export default function AddBankDetails() {
  const [currentPage, setCurrentPage] = useState("addBankDetails");
  const [isModified, setIsModified] = useState(false);
  const [deleteBankOpen, setIsDeleteBankOpen] = useState(false);
  const [bank, setBank] = useState({
    bankName: "",
    accountNumber: "",
    bankAddress: "",
    beneficiaryAddress: "",
    swiftCode: "",
    routingNumber: "",
    accountName: "",
    id: "",
  });
  const [initialBankDetails, setInitialBankDetails] =
    useState<BankDetails | null>(null);
  const { bankDetails, selectedBankId, setSelectedBankId } =
    useBankCryptoStore();
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For alert message

  useEffect(() => {
    if (selectedBankId) {
      // If selectedBankId exists, find and set the bank details
      const selectedBank = bankDetails.find(
        (bank) => bank.id === selectedBankId
      );
      if (selectedBank) {
        setBank(selectedBank);
        setInitialBankDetails(selectedBank);
      }
    } else {
      // If no selectedBankId, clear the bank details and reset initialBankDetails
      setBank({
        bankName: "",
        accountNumber: "",
        bankAddress: "",
        beneficiaryAddress: "",
        swiftCode: "",
        routingNumber: "",
        accountName: "",
        id: "",
      });
      setInitialBankDetails(null); // Clear the initial details
    }
    setIsLoading(false); // Reset loading state after the effect
  }, [selectedBankId, bankDetails]);

  useEffect(() => {
    // Check if any field has changed
    const isChanged = Object.keys(bank).some(
      (key) =>
        bank[key as keyof typeof bank] !==
        initialBankDetails?.[key as keyof typeof bank]
    );

    // Only set isModified if it's different from the current state
    setIsModified(isChanged);
  }, [bank, initialBankDetails]); // Ensure dependencies are correctly set.

  // Ensure clearing works when switching pages
  const handleNavigateToAddBankDetails = () => {
    setCurrentPage("bankInfo");
    setBank({
      bankName: "",
      accountNumber: "",
      bankAddress: "",
      beneficiaryAddress: "",
      swiftCode: "",
      routingNumber: "",
      accountName: "",
      id: "",
    });
    setInitialBankDetails(null);
    setSelectedBankId(null); // Clear selected bank ID to reset state
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBank((prev) => ({ ...prev, [name]: value }));
  };
  const addBankDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("You must be logged in to add bank details.");
    const payload = {
      bankName: bank.bankName,
      accountNumber: bank.accountNumber,
      accountName: bank.accountName,
      bankAddress: bank.bankAddress,
      swiftCode: bank.swiftCode,
      routingNumber: bank.routingNumber,
      beneficiaryAddress: bank.beneficiaryAddress,
    };

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/bank",
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
        setAlertMessage("Bank details added successfully! 🎉");
        setTimeout(() => {
          setAlertMessage(null);
          setCurrentPage("bankInfo");
        }, 2000);
      } else {
        throw new Error(result.message || "Failed to add bank details.");
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

  const updateBankDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("You must be logged in to update bank details.");

    const modifiedFields = Object.keys(bank).reduce((changes, key) => {
      if (
        bank[key as keyof typeof bank] !==
        initialBankDetails?.[key as keyof typeof bank]
      ) {
        return {
          ...changes,
          [key]: bank[key as keyof typeof bank],
        };
      }
      return changes;
    }, {} as Partial<typeof bank>);
    // Ensure accountName and accountID are included in the payload
    const payload = {
      ...modifiedFields,
      accountName: bank.accountName, // Include accountName
      bankID: bank.id, // Include accountID
    };

    if (!Object.keys(modifiedFields).length)
      return alert("No changes to update.");

    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/bank",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setInitialBankDetails(bank);
        setTimeout(() => {
          setAlertMessage("Bank Details updated successfully! 🤙");
          setTimeout(() => {
            setAlertMessage(null);
            setCurrentPage("bankInfo");
          }, 2000); // Delay before clearing the message
        }, 0);
      } else {
        throw new Error(result.message || "Failed to update bank details.");
      }
    } catch (error) {
      if (error instanceof Error) {
        // Log a detailed stack trace
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

  const handleCloseDeleteBank = () => {
    setIsDeleteBankOpen(false); // Close the DeleteBank component
    setCurrentPage("bankInfo"); // Optionally navigate back to settings or another page
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedBankId) {
      // If there's no selectedBankId, call addBankDetails (POST)
      addBankDetails();
    } else {
      // If there's a selectedBankId, call updateBankDetails (PUT)
      updateBankDetails();
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white lg:mr-8">
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : currentPage === "bankInfo" ? (
        <BankSetting
          onNavigateToAddBankDetails={() => setCurrentPage("addBankDetails")}
          onNavigateToAddCryptoDetails={() =>
            setCurrentPage("addCryptoDetails")
          }
        />
      ) : currentPage === "addCryptoDetails" ? (
        <AddCryptoDetails />
      ) : (
        <div>
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Bank/Crypto Info",
                onClick: handleNavigateToAddBankDetails,
              },
              {
                label: "Bank Details",
                onClick: () => console.log("Add Bank Details"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              {selectedBankId ? "Update Bank Details" : "Add Bank Details"}
            </h1>
            <p className="text-color-form text-sm mt-2 lg:hidden">
              Provide your bank account details
            </p>
          </div>
          {/* Desktop Navigator */}
          <NavigatorTwo
            style="hidden lg:flex"
            links={[
              {
                label: "Bank/Crypto Info",
                onClick: handleNavigateToAddBankDetails,
              },
              {
                label: "Bank Details",
                onClick: () => console.log("Bank Details"),
              },
            ]}
          />
          <form
            className="flex flex-col mt-8 space-y-8 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px]"
            onSubmit={handleFormSubmit}
          >
            {/* Input Fields */}
            {bank &&
              [
                {
                  label: "Bank Name",
                  name: "bankName",
                  type: "text",
                  placeholder: "Citi Bank",
                },
                {
                  label: "Account Number",
                  name: "accountNumber",
                  type: "number",
                  placeholder: "2010100191",
                },
                {
                  label: "Account Name",
                  name: "accountName",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  label: "Bank Address",
                  name: "bankAddress",
                  type: "text",
                  placeholder: "123 Main St",
                },
                {
                  label: "IBAN/Swift Code",
                  name: "swiftCode",
                  type: "text",
                  placeholder: "099794 (Optional)",
                },
                {
                  label: "Routing Number",
                  name: "routingNumber",
                  type: "number",
                  placeholder: "67897943 (Optional)",
                },
                {
                  label: "Beneficiary Address",
                  name: "beneficiaryAddress",
                  type: "text",
                  placeholder: "456 Elm St",
                },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name} className="flex flex-col gap-2">
                  <label className="text-color-form text-sm">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={bank[name as keyof typeof bank]}
                    onChange={handleChange}
                    className="rounded-sm border-b border-slate-200 text-color-zero"
                    placeholder={placeholder}
                    required={!placeholder.includes("(Optional)")}
                    disabled={isLoading}
                  />
                </div>
              ))}

            <Button
              ButtonText={isLoading ? "Saving..." : "Save Changes"}
              className={`py-3 lg:w-[300px] xl:w-[430px] 2xlg:w-[500px] ${
                isModified
                  ? "bg-color-one hover:bg-green-700"
                  : "bg-inactive cursor-not-allowed hover:bg-inactive"
              }`}
              disabled={!isModified || isLoading}
            />
          </form>
        </div>
      )}
      {currentPage === "bankInfo" && (
        <>
          {/* Bank Info Page content can go here */}
          {deleteBankOpen && <DeleteBank onClose={handleCloseDeleteBank} />}
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
