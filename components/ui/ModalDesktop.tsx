// components/Modal.js
import Image from "next/image";
import { useState } from "react";

export default function Modal({ 
    images = [], 
    initialImage,
    onClose 
}: {
    images: string[];
    initialImage: string;
    onClose: () => void;
}) {
    const [selectedImage, setSelectedImage] = useState(initialImage);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-4 rounded-lg flex max-w-4xl w-full">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-2 focus:outline-none">
                    X   
                </button>

                {/* Main Image Display */}
                <div className="flex-1 flex items-center justify-center">
                    <Image src={selectedImage} alt="Selected Product" width={500} height={500} className="object-contain rounded-md" />
                </div>

                {/* Thumbnails */}
                <div className="ml-4 flex flex-col items-center space-y-2 overflow-y-auto max-h-[500px]">
                    {images.map((src, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(src)}
                            className={`cursor-pointer p-1 rounded-md ${selectedImage === src ? "ring-2 ring-green-500" : ""}`}
                        >
                            <Image src={src} alt="Thumbnail" width={80} height={80} className="object-cover rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
