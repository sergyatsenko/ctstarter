import { getProductByKey } from "@/util/commercetools/products";
import Link from "next/link";
import ProductImageGallery from "@/components/ProductImageGallery";

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
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ProductImageGallery 
              images={product.masterData.current.masterVariant.images || []}
              productName={product.masterData.current.name["en-US"]}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold">
              {product.masterData.current.name["en-US"]}
            </h1>

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
              <span className="font-bold">SKU:</span>
              <p className="mt-2">{product.masterData.current.masterVariant.sku}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
