"use client";
import Processed from "@/components/ui/Processed";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiStockFill } from "react-icons/ri";
import { toast } from "react-toastify";
import BuyStockForm from "../../../components/Stocks/ui/BuyStockForm";
import { apiFetch } from "@/utils/apiHelper";

// Define interface for form data
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  amount: string;
  type: string;
  
}

interface Errors {
  name?: string;
  email?: string;
  phoneNumber?: string;
  amount?: string;
  type?: string;
 
}

export default function StocksPage() {
  const [currentModal, setCurrentModal] = useState<
    | "buyStock"
    | "processed"
    | null
  >(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    amount: "",
    type: "", //Optional
 
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    // Basic validation for required fields
    const newErrors: Errors = {};
    if (!formData.name) newErrors.name = "Your Name is required.";
    if (!formData.email) newErrors.email = "Your Email is required.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Account Holder Name is required.";
    if (!formData.amount) newErrors.amount = "Bank Address is required.";
    if (!formData.type) newErrors.type = "Beneficiary Address is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set the error state
      return; // Exit early if there are validation errors
    }

    setIsLoading(true);

    // Retrieve the access token (assuming it's in localStorage)
    // const token = localStorage.getItem("accessToken");

    // API call to submit the form data
    try {
      const response = await apiFetch("/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          phone: formData.phoneNumber, // Map phoneNumber to accountName
          type: formData.type, 
          amount: formData.amount
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok) {
        setCurrentModal("processed")
        console.log("Buy successful")
      } else {
        toast.error("Request not made")
      }
      if (response.status === 401) {
        router.push("/auth/login/with-mail")
      }
    } catch (error) {
      console.error("Error submitting bank details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
    console.log(errors)
  };
  
  return (
    <div className="flex flex-col lg:w-[420px] xl:w-[535px]">
      <div className="flex flex-col justify-center items-center space-y-4 my-8 py-6 shadow-sm bg-light-grey rounded-common lg:w-[740px] lg:mr-8">
        <div
          className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}
        >
          <span className="text-color-one transform -rotate-45">
            <RiStockFill /> {/* Counter-rotate icon */}
          </span>
        </div>
        <p className="text-sm text-color-form">
          Are you interested in Buying Stocks?
        </p>
        <button className="py-3 self-center text-sm bg-color-one hover:bg-green-700 duration-150 text-white text-center w-[200px] rounded-[12px]"
        onClick={() => setCurrentModal("buyStock")}>
          {" "}
          Buy Stock
        </button>
      </div>

      {currentModal === "buyStock"  && (
        <BuyStockForm 
        onClose={() => setCurrentModal(null)}
        onFormSubmit={handleFormSubmit}
        loading={loading}
        formData={formData}  // ✅ Pass formData
        handleChange={handleChange} // ✅ Pass handleChange
      />
      
      )}
      {currentModal === "processed"  && (
        <Processed onClose={() => setCurrentModal(null)}
        showButton = {false}
        message="Purchase requested submitted successfully! A member of our team will reach out to you soon!"/>
        
      )}
    </div>
  );
}
