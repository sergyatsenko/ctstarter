import { getProductByKey } from "@/util/commercetools/products";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: {
    categoryKey: string;
    productKey: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const [categoryKey, productKey] = await Promise.all([
    Promise.resolve(params.categoryKey),
    Promise.resolve(params.productKey),
  ]);

  const product = await getProductByKey(productKey);
  console.log("product", product);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <Link
        href={`/categories/${categoryKey}`}
        className="text-blue-500 hover:text-blue-700 mb-8 inline-block"
      >
        ← Back to Category
      </Link>

      <div className="bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">
          {product.masterData.current.name["en-US"]}
        </h1>

        <div className="grid gap-6">
          <div>
            <span className="font-bold">Description:</span>
            <p className="mt-2">
              {product.masterData.current.description["en-US"]}
            </p>
          </div>

          <div>
            <span className="font-bold">Slug:</span>
            <p className="mt-2">{product.masterData.current.slug["en-US"]}</p>
          </div>

          <div>
            <span className="font-bold">Master Variant:</span>
            <div className="mt-2 space-y-2">
              <p>SKU: {product.masterData.current.masterVariant.sku}</p>
              {product.masterData.current.masterVariant.images && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.masterData.current.masterVariant.images.map(
                    (image, index) => (
                      <Image
                        key={index}
                        src={image.url}
                        alt={product.masterData.current.name["en-US"]}
                        width={500}
                        height={500}
                        className="rounded-lg w-full h-auto object-cover"
                      />
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
