"use client";
import { useState } from "react";
import Image from "next/image";

interface Image {
  url: string;
  dimensions?: {
    w: number;
    h: number;
  };
}

interface ProductImageGalleryProps {
  images: Image[];
  productName: string;
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={images[selectedImage].url}
          alt={`${productName} - Image ${selectedImage + 1}`}
          width={800}
          height={800}
          className="object-cover"
          priority={selectedImage === 0}
        />
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg ${
                selectedImage === index
                  ? "ring-2 ring-blue-500"
                  : "hover:opacity-75"
              }`}
            >
              <Image
                src={image.url}
                alt={`${productName} - Thumbnail ${index + 1}`}
                width={200}
                height={200}
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
