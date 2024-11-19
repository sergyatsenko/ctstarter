import {
  getCategoryByKey,
  getProductsInCategory,
} from "@/util/commercetools/products";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: { categoryKey: string };
}) {
  const locale: string = process.env.SITE_LOCALE || "en-US";
  const category = await getCategoryByKey(params.categoryKey);
  const products = await getProductsInCategory(category.id, 100);
  console.log("products", products);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <Link
        href="/categories"
        className="text-blue-500 hover:text-blue-700 mb-8 inline-block"
      >
        ← Back to Categories
      </Link>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-8">
        {category.name[locale]}
      </h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid gap-4">
          <div>
            <span className="font-bold">ID:</span> {category.id}
          </div>
          <div>
            <span className="font-bold">Key:</span> {category.key}
          </div>
          <div>
            <span className="font-bold">Slug:</span> {category.slug[locale]}
          </div>
          <div>
            <span className="font-bold">Created At:</span>{" "}
            {new Date(category.createdAt).toLocaleString()}
          </div>
          <div>
            <span className="font-bold">Last Modified:</span>{" "}
            {new Date(category.lastModifiedAt).toLocaleString()}
          </div>
          {category.parent && (
            <div>
              <span className="font-bold">Parent Category ID:</span>{" "}
              {category.parent.id}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Products in this category</h2>
        {products.length > 0 ? (
          <div className="grid gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-gray-50 p-4 rounded-lg">
                <Link
                  href={`/categories/${category.key}/${product.key}`}
                  className="block hover:opacity-75 transition-opacity"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {product.name[locale]}
                  </h3>
                  <div className="grid gap-2 text-sm">
                    <div>
                      <span className="font-medium">ID:</span> {product.id}
                    </div>
                    <div>
                      <span className="font-medium">Slug:</span>{" "}
                      {product.slug[locale]}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products found in this category</p>
        )}
      </div>
    </div>
  );
}
