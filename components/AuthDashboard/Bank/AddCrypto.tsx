import { useEffect, useState } from "react";
import Button from "../../ui/Button";

interface AddCryptoInformationProps {
  onClose: () => void;
  onCryptoDetailStatus?: () => void;
}

export default function AddCryptoInformation({
  onClose,
  onCryptoDetailStatus = () => {},
}: AddCryptoInformationProps) {
  const [formData, setFormData] = useState({
    networkID: "",
    walletAddress: "",
  });
  const [networks, setNetworks] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
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
          console.log(responseData.data) // Extract `data` from the response
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
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.networkID || !formData.walletAddress) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        networkID: formData.networkID,
        address: formData.walletAddress,
      };

      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/bank//crypto-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        onCryptoDetailStatus();
        setFeedbackType("success");
        setFeedbackMessage("Crypto Details Added successfully!");
        setTimeout(onClose, 1000); // Close modal after success
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        alert(errorData.message || "Failed to save crypto details.");
      }
    } catch (error) {
      console.error("Request error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-end lg:items-center lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[400px] lg:rounded-[20px] lg:max-w-[621px]">
        <div className="flex items-center border-b w-full pb-2 p-4">
          <p
            onClick={onClose}
            className="text-color-form text-sm cursor-pointer"
          >
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Add Crypto Details
          </p>
        </div>
        <div className="flex flex-col bg-white">
          <p className="text-color-form text-sm p-4">
            Provide your Crypto Wallet details
          </p>
          <form
            className="flex flex-col space-y-8 p-4"
            onSubmit={handleFormSubmit}
          >
            {/* Network Dropdown */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Network</label>
              <select
                name="networkID"
                value={formData.networkID}
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
            </div>

            {/* Wallet Address */}
            <div className="flex flex-col gap-2">
              <label className="text-color-form text-sm">Wallet Address</label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleChange}
                required
                className="rounded-sm border-b border-slate-200 text-color-zero"
                placeholder="Babhauixxyanal1225616711sdjcjssa"
              />
            </div>

            {feedbackMessage && (
            <div
              className={`my-1 text-sm ${
                feedbackType === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {feedbackMessage}
            </div>
          )}

            <Button
              ButtonText={isSubmitting ? "Saving..." : "Save"}
              className={`py-3 ${
                isSubmitting ? "bg-gray-400" : "bg-color-one hover:bg-green-700"
              } w-full`}
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
