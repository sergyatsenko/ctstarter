"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductProjection } from "@commercetools/platform-sdk";

interface ProductCardProps {
  product: ProductProjection;
  categoryKey?: string;
}

export default function ProductCard({
  product,
  categoryKey,
}: ProductCardProps) {
  // console.log("product", product);

  const firstImage = product.masterVariant.images?.[0];
  const usPrice = product.masterVariant.prices?.find(
    (price) => price.country === "US"
  );

  const formattedPrice = usPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(usPrice.value.centAmount / 100)
    : null;

  return (
    <Link href={`/categories/${categoryKey}/${product.key}`} className="h-full">
      <div className="bg-white rounded-lg shadow overflow-hidden transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg h-full flex flex-col">
        <div className="w-full">
          {firstImage ? (
            <div className="relative w-full pt-[100%]">
              <Image
                src={firstImage.url}
                alt={product.name["en-US"]}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : (
            <div className="w-full pt-[100%] relative bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2">
            {product.name["en-US"]}
          </h3>
          {formattedPrice && (
            <p className="text-blue-600 font-bold mb-2">{formattedPrice}</p>
          )}
          <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
            {product.description?.["en-US"]}
          </p>
        </div>
      </div>
    </Link>
  );
}
