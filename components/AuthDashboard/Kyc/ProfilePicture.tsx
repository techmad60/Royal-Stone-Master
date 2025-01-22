import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { TiTimes } from "react-icons/ti";
import Button from "../../ui/Button";

interface ProfilePictureInfoProps {
    onClose: () => void;
    onProfilePictureStatus: () => void;
}
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export default function ProfilePictureInformation ({onClose, onProfilePictureStatus}: ProfilePictureInfoProps) {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter() 

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

      // Assuming you get access token and signature to upload image (as before)
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setFeedbackType("error");
        setFeedbackMessage("You are not authenticated. Please log in again.");
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
      
      const signatureData = await signatureResponse.json();
      if (!signatureResponse.ok) {
        throw new Error(signatureData.message || "Failed to fetch signature");
      }

      if (signatureResponse.status === 401) {
        router.push("/auth/login")
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

        const profileResponse = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/profile",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar: uploadedImageURL, // Set the avatar field with the uploaded image URL
            }),
          }
        );
        const profileData = await profileResponse.json();
        if (profileResponse.ok) {
          console.log("Profile Response:", profileData);
        } else {
          throw new Error(profileData.message || "Failed to submit Profile");
        }

        // Update the status in KYC when the upload is successful
        onProfilePictureStatus(); // Notify parent that the Valid ID status has been provided
        setFeedbackType("success");
        setFeedbackMessage("Profile picture uploaded successfully!");
        // Close the modal after successful upload
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
      <div className="flex flex-col bg-white rounded-t-[15px] w-full h-[490px] sm:h-[580px] lg:rounded-[20px] lg:max-w-[621px] lg:h-auto">
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
            Profile Picture
          </p>
        </div>
        <div className="flex flex-col p-4 sm:p-8 lg:p-4">
          <section className="mt-8">
            <p className="text-color-form text-sm">
              Provide a profile picture
            </p>
            <div className={`flex flex-col justify-center items-center space-y-4 my-6 py-6 shadow-sm bg-light-grey rounded-common w-full pr-8`}>
              {!image && !imagePreview && (
                <>
                  <div className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px] bg-white`}>
                    <span className="text-color-one transform -rotate-45">
                      <FaRegImage className="text-color-one" />
                    </span>
                  </div>
                  <p className={`text-sm text-color-one cursor-pointer`} onClick={handleImageClick}>
                    Tap to Upload Image
                  </p>
                </>
              )}
              {(imagePreview || image) && (
                <div className="mt-4 flex flex-col justify-center items-center relative">
                  <TiTimes onClick={handleRemoveImage} className="absolute top-0 right-0 text-color-form cursor-pointer text-xl bg-white rounded-full p-1" />
                  <Image
                    src={imagePreview || ""}
                    alt="Image Preview"
                    className="mt-4object-cover rounded-lg"
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
            <div className={`text-sm ${feedbackType === "error" ? "text-red-500" : "text-green-500"}`}>
              {feedbackMessage}
            </div>
          )}

          <Button
            ButtonText={isUploading ? "Uploading..." : "Finish"}
            className="w-full mt-4 duration-300"
            onClick={handleUpload}
            disabled={isUploading}
          />
        </div>
      </div>
    </div>
    )
}



