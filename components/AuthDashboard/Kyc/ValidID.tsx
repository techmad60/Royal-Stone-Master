import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import Button from "../../ui/Button";

interface ValidIdInfoProps {
  onClose: () => void;
  onValidIdStatus: () => void; // New prop to update KYC status in parent
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function ValidIdInformation({ onClose, onValidIdStatus }: ValidIdInfoProps) {
  const [selectedId, setSelectedId] = useState("Passport");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // Cleanup image preview URL
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedId(e.target.value);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > MAX_FILE_SIZE || !["image/jpeg", "image/png"].includes(file.type)) {
        setFeedbackType("error");
        setFeedbackMessage("File must be a JPG/PNG and less than 5MB.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setFeedbackType("error");
      setFeedbackMessage("Please select an image first!");
      return;
    }

    try {
      setIsUploading(true);
      setFeedbackMessage(null);

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login")
        return;
      }

      const signatureResponse = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/account/image-upload-signature",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (signatureResponse.status === 401) {
        router.push("/auth/login");
        return;
      }

      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error(signatureData.message || "Failed to fetch signature");
      }

      const { token, expire, signature } = signatureData.data;

      const formData = new FormData();
      formData.append("file", image);
      formData.append("fileName", image.name);
      formData.append("publicKey", "public_AJejPaYhBTg1hY1ARboX64NZrFU=");
      formData.append("signature", signature);
      formData.append("expire", expire.toString());
      formData.append("token", token);

      const uploadResponse = await fetch(
        "https://upload.imagekit.io/api/v1/files/upload",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const uploadedImageURL = uploadData.url;
        localStorage.setItem("uploadedImageURL", uploadedImageURL);
        setImagePreview(uploadedImageURL);

        const kycResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/kyc",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identity: {
                type: selectedId.toLowerCase().replace(" ", "-"), // Convert ID type to lowercase with hyphen
                value: uploadData.url, // Image URL from ImageKit
              },
            }),
          }
        );
        const kycData = await kycResponse.json();
        if (kycResponse.ok) {
          console.log("KYC Response:", kycData);
        } else {
          throw new Error(kycData.message || "Failed to submit KYC");
        }

        onValidIdStatus(); // Notify parent about success
        setFeedbackType("success");
        setFeedbackMessage("ID uploaded successfully!");
        setTimeout(onClose, 1000); // Close modal after success
      } else {
        throw new Error(uploadData.message || "Upload failed");
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
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#D9D9D9A6] flex items-end lg:items-center justify-end lg:justify-center z-50">
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-auto sm:h-[580px] lg:rounded-[20px] lg:max-w-[621px] lg:h-auto">
        <div className="flex justify-center items-center mt-4 lg:hidden">
          <hr className="w-[51px] h-[5px] rounded-[40px] bg-[#D9D9D9]" />
        </div>
        <div className="flex items-center border-b w-full pb-2 p-4 sm:p-8 lg:p-4">
          <p onClick={onClose} className="text-color-form text-sm cursor-pointer">
            Cancel
          </p>
          <p className="text-color-zero font-semibold text-lg mx-auto relative right-4">
            Valid Identification
          </p>
        </div>
        <div className="flex flex-col p-4 sm:p-8 lg:p-4">
          <div>
            <div className="flex flex-col gap-1">
              <p className="text-color-form text-sm">ID type</p>
              <div className="relative border-b border-slate-200">
                <select
                  value={selectedId}
                  onChange={handleSelectChange}
                  required
                  className="rounded-sm placeholder:text-color-zero placeholder:text-sm py-1 w-full"
                >
                  <option value="Passport">International Passport</option>
                  <option value="Driving License">Drivers License</option>
                  <option value="Others">Other Valid ID</option>
                </select>
              </div>
            </div>
          </div>
          <section className="mt-4">
            <p className="text-color-form text-sm">Provide a picture of the ID</p>
            <div
              className={`flex flex-col justify-center items-center space-y-4 my-4 py-6 shadow-sm bg-light-grey rounded-common w-full pr-8`}
            >
              {!image && !imagePreview && (
                <>
                  <div
                    className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}
                  >
                    <span className="text-color-one transform -rotate-45">
                      <FaRegImage className="text-color-one" />
                    </span>
                  </div>
                  <p
                    className={`text-sm text-color-one cursor-pointer`}
                    onClick={handleImageClick}
                  >
                    Tap to Upload Image
                  </p>
                </>
              )}
              {(imagePreview || image) && (
                <div className="mt-4 flex flex-col justify-center items-center relative">
                  <TiTimes
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 text-color-form cursor-pointer text-xl bg-white rounded-full p-1"
                  />
                  <Image
                    src={imagePreview || ""}
                    alt="Image Preview"
                    className="mt-4 object-cover rounded-lg"
                    width={128}
                    height={128}
                  />
                  <div className="flex gap-1 mt-2">
                    <p className="text-sm text-color-form">{image?.name}</p>
                  </div>
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </section>

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
            ButtonText={isUploading ? "Uploading ID..." : "Finish"}
            className="w-full mt-4 duration-300"
            onClick={handleUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
  );
}
