//import Image from "next/image";
import { productFetchById } from "@/util/commercetools/customerFetch";
import { LocalizedString } from "@commercetools/platform-sdk";

export default async function Home() {
  const productId: string = "a09c2128-e000-4501-a656-f219b1efbdb6";
  const product = await productFetchById(productId);
  const productName = product?.masterData?.current?.name || "";
  const productNameEnUs = (productName as LocalizedString) || "";

  console.log("valueOf", productNameEnUs["en-US"]); //
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center sm:text-left">
          Commercetools Starter
        </h1>
        <p className="text-lg sm:text-2xl md:text-3xl text-center sm:text-left">
          Next.js + Commercetools API Client
        </p>
        <div className="flex flex-col items-center sm:items-start">
          <p className="text-lg sm:text-2xl md:text-3xl font-bold">Product:</p>
          <p className="text-lg sm:text-2xl md:text-3xl">
            Product ID: {product?.id}
          </p>
          <p className="text-lg sm:text-2xl md:text-3xl">
            Product Name: {productName.toString()}
          </p>
        </div>
      </main>
    </div>
  );
}
