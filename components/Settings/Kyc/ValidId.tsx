"use client";
import Loading from "@/components/ui/Loading";
import NavigatorTwo from "@/components/ui/NavigatorTwo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import Button from "../../ui/Button";
import CustomAlert from "../../ui/CustomAlert";
import SettingsParent from "../SettingsParent";
import Kyc from "./KycSettings";
import NextofKinSettings from "./NextofKin";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
type IdentityPayload = {
  identity: {
    type: string;
    value: string | null; // `imageUrl` can be null if no image is uploaded
  };
};
export default function ValidID() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  const [isLoading, setIsloading] = useState(true);
  const [selectedId, setSelectedId] = useState("");
  const [initialSelectedId, setInitialSelectedId] = useState("");
  const [currentPage, setCurrentPage] = useState("validId");
  const [image, setImage] = useState<File | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null); // Initial image for comparison
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Track upload state
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // For alert message
  const [kycError, setKycError] = useState<string | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
    null
  );
  const router = useRouter();

  // Load saved image and type
  useEffect(() => {
    const fetchKycData = async () => {
      setIsloading(true);
      try {
        // Step 1: Fetch accessToken
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          return router.push("/auth/login");
        }

        // Step 2: Fetch KYC data from the API
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/kyc",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = await response.json();
        console.log("Fetched KYC Data:", data);
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch KYC data");
        }

        // Step 3: Update state with fetched KYC data
        const { type, value } = data.data.identity || {}; // Safely destructure with a fallback

        if (!type || !value) {
          setKycError("KYC data is incomplete. Couldn't fetch the image.");
          setTimeout(() => {
            setKycError(null);
          }, 2000);
          return; // Early return if there's an error
        }

        if (type) {
          // Map API type to human-readable format
          const typeMapping: Record<string, string> = {
            "driving-license": "Driving License",
            passport: "International Passport",
            others: "Others",
          };
          const formattedType = typeMapping[type.toLowerCase()] || "Others";
          setSelectedId(formattedType); // Set human-readable type
          setInitialSelectedId(formattedType);
        } else {
          console.warn("KYC type is undefined or missing");
        }

        if (value) {
          setImagePreview(value); // Set image URL as preview
          console.log("Image preview set to:", value);
          setInitialImage(value);
        } else {
          console.warn("KYC value is undefined or missing");
        }
      } catch (error) {
        console.error("Error fetching KYC data:", error);
        alert("Failed to load KYC data. Please try again later.");
      } finally {
        setIsloading(false);
      }
    };

    fetchKycData();
  }, [router]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (
        file.size > MAX_FILE_SIZE ||
        !["image/jpeg", "image/png"].includes(file.type)
      ) {
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
  };

  //Function to disable button when there's no change in the form || image is empty...
  const isFormChanged =
    (selectedId.toLowerCase() !== initialSelectedId.toLowerCase() ||
      (imagePreview !== initialImage && imagePreview !== null)) &&
    !isUploading;

  const handleUpload = async () => {
    try {
      setIsUploading(true);
      setFeedbackMessage(null);

      // Step 1: Fetch accessToken from local storage
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/auth/login");
        return;
      }

      let imageUrl = image ? null : initialImage; // Use the initial image if no new image is provided // Use the initial image URL if image is not changed
      const idType = selectedId.trim() || initialSelectedId; // Use the new ID type if provided, otherwise fallback to the initial one

      // Step 2: Upload image if it has been changed
      if (image) {
        // Fetch signature from your backend
        const signatureResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/image-upload-signature",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const signatureData = await signatureResponse.json();
        if (!signatureResponse.ok) {
          throw new Error(signatureData.message || "Failed to fetch signature");
        }

        const { token, expire, signature } = signatureData.data;

        // Create FormData for ImageKit upload
        const formData = new FormData();
        formData.append("file", image); // The selected image file
        formData.append("fileName", image.name); // Name of the file
        formData.append("publicKey", "public_AJejPaYhBTg1hY1ARboX64NZrFU=");
        formData.append("signature", signature);
        formData.append("expire", expire.toString());
        formData.append("token", token);

        // Upload to ImageKit
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

        if (!uploadResponse.ok) {
          throw new Error(uploadData.message || "Image upload failed");
        }

        imageUrl = uploadData.url; // Update the image URL
        setFeedbackMessage("Image uploaded Successfully");
      }

      // Step 3: Submit KYC with only the modified fields
      const payload: IdentityPayload = {
        identity: {
          type: idType.toLowerCase().replace(" ", "-"), // Always pass the ID type
          value: imageUrl, // Always pass the image URL
        },
      };

      const kycResponse = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/kyc",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const kycData = await kycResponse.json();

      if (kycResponse.ok) {
        setAlertMessage("Kyc Info updated successfully! 🎉");
        // Update initial states to reflect the new state
        setInitialSelectedId(selectedId);
        setInitialImage(imageUrl);

        setTimeout(() => {
          setAlertMessage(null);
          setCurrentPage("kycSetting");
        }, 2000);
        console.log("KYC Response:", kycData);
        console.log({ idType, imageUrl, payload });
      } else {
        throw new Error(kycData.message || "Failed to submit KYC");
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

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:mr-8">
      {currentPage === "settings" && isMobile ? (
        <SettingsParent />
      ) : currentPage === "kycSetting" ? (
        <Kyc
          onNavigatetoValidID={() => setCurrentPage("validId")}
          onNavigatetoNextofKin={() => setCurrentPage("nextOfKin")}
        />
      ) : currentPage === "nextOfKin" ? (
        <NextofKinSettings />
      ) : (
        <div>
          {/* Mobile Navigator */}
          <NavigatorTwo
            style="lg:hidden"
            links={[
              { label: "Settings", onClick: () => setCurrentPage("settings") },
              {
                label: "Kyc",
                onClick: () => setCurrentPage("kycSetting"),
              },
              {
                label: "Valid ID",
                onClick: () => console.log("Valid ID"),
              },
            ]}
          />
          <div className="flex flex-col justify-between my-6 lg:my-0 lg:mt-[85px] lg:border-b lg:pb-4 lg:mr-8">
            <h1 className="text-color-zero text-base font-semibold">
              Update your ID document
            </h1>
          </div>

          {/* Desktop Navigator */}
          <NavigatorTwo
            style="hidden lg:flex"
            links={[
              {
                label: "Kyc",
                onClick: () => setCurrentPage("kycSetting"),
              },
              {
                label: "Valid ID",
                onClick: () => console.log("Valid ID"),
              },
            ]}
          />
          <div className="lg:mt-8">
            <div className="flex flex-col gap-1">
              <p className="text-color-form text-sm">ID type</p>
              <div className="relative border-b border-slate-200">
                <select
                  value={selectedId}
                  onChange={(e) => setSelectedId(e.target.value)}
                  required
                  className="rounded-sm placeholder:text-color-zero placeholder:text-sm py-1 w-full text-color-zero "
                >
                  <option value="Passport">International Passport</option>
                  <option value="Driving License">Driving License</option>
                  <option value="Others">Other Valid ID</option>
                </select>
              </div>
            </div>
          </div>
          <section className="mt-8">
            <p className="text-color-form text-sm">
              Provide a picture of the ID
            </p>
            <div
              className={`flex flex-col justify-center items-center space-y-4 my-8 py-6 shadow-sm bg-light-grey rounded-common w-full pr-8`}
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
          {/* Display Error Message */}
          {kycError && (
            <div className="text-red-500 text-sm py-2 mb-4 rounded">
              <p>{kycError}</p>
            </div>
          )}
          <Button
            ButtonText={isUploading ? "Uploading..." : "Finish"}
            className={`w-full mt-4 ${
              isLoading || !isFormChanged || isUploading
                ? "bg-inactive cursor-not-allowed hover:bg-inactive"
                : "bg-color-one hover:bg-green-700"
            }`}
            onClick={handleUpload}
            disabled={isLoading || !isFormChanged || isUploading}
          />
        </div>
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
