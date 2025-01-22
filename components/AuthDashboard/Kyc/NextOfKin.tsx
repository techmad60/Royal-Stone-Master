import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../ui/Button";

interface NextOfKinInfoProps {
  onClose: () => void;
  onNextOfKinStatus: () => void; // Notify parent about Next of Kin update
}

export default function NextOfKinInformation({ onClose, onNextOfKinStatus }: NextOfKinInfoProps) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullname || !formData.email || !formData.phone || !formData.address) {
      setFeedbackType("error");
      setFeedbackMessage("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedbackMessage(null);

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setFeedbackType("error");
        setFeedbackMessage("You are not authenticated. Please log in again.");
        return;
      }

      const response = await fetch("https://api-royal-stone.softwebdigital.com/api/account/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          nextOfKin: {
            fullname: formData.fullname,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
        }),
      });

      const result = await response.json();
     

      if (response.status === 401 ) {
        router.push("/auth/login")
      }

      if (response.ok) {
        setFeedbackType("success");
        setFeedbackMessage("Next of Kin information updated successfully!");
        onNextOfKinStatus(); // Notify parent about the update
        setTimeout(onClose, 1000); // Close modal after success
      } else {
        throw new Error(result.message || "Failed to update Next of Kin information.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setFeedbackType("error");
        setFeedbackMessage(error.message || "Failed to upload image.");
      } else {
        setFeedbackType("error");
        setFeedbackMessage("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#D9D9D9A6] flex items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[510px] sm:h-[580px] lg:rounded-[20px] lg:max-w-[621px] lg:h-[500px]">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4 sm:p-8 lg:p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Next of Kin
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-2 space-y-6 p-4 sm:p-8 lg:p-4"
        >
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
              className="rounded-sm border-b border-slate-200"
              placeholder="Cooper WinterWind"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-sm border-b border-slate-200"
              placeholder="cooperwind@gmail.com"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="rounded-sm border-b border-slate-200"
              placeholder="+1 702 123 4567"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="text-color-form text-sm">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="rounded-sm border-b border-slate-200"
              placeholder="5 Lanes Minneapolis"
            />
          </div>

          {feedbackMessage && (
            <div className={`text-sm ${feedbackType === "error" ? "text-red-500" : "text-green-500"} my-2`}>
              {feedbackMessage}
            </div>
          )}

          <Button
            ButtonText={isSubmitting ? "Submitting..." : "Finish"}
            className="py-3"
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
