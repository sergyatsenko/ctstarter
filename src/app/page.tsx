//import Image from "next/image";
import { getProductById, getCategories } from "@/util/commercetools/products";
import Link from "next/link";
//import { LocalizedString } from "@commercetools/platform-sdk";

export default async function Home() {
  const productId: string = "a09c2128-e000-4501-a656-f219b1efbdb6";
  const locale: string = process.env.SITE_LOCALE || "en-US";

  const categories = await getCategories(100, 1);
  console.log("categories", categories);
  const product = await getProductById(productId);
  const productName = product?.masterData?.current?.name?.[locale] || "";

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
            Product Name: {productName}
          </p>
        </div>
        {/* <div className="w-full mt-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          <div className="grid gap-4">
            {categories.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg">
                <p>
                  <span className="font-bold">ID:</span> {category.id}
                </p>
                <p>
                  <span className="font-bold">Key:</span> {category.key}
                </p>
                <p>
                  <span className="font-bold">Name:</span>{" "}
                  {category.name[locale]}
                </p>
                <p>
                  <span className="font-bold">Slug:</span>{" "}
                  {category.slug[locale]}
                </p>
              </div>
            ))}
          </div>
        </div> */}
        <Link href="/categories">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Categories Page
          </button>
        </Link>
      </main>
    </div>
  );
}
