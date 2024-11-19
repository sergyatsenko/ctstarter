import { Category, Product } from "@commercetools/platform-sdk";
import { apiRoot } from "./apiClient";

// const customerId: string = "ffec2d66-a518-4266-8447-091150ca4cc4";

// async function customerFetchById(customerId: string): Promise<void> {
//   try {
//     const response = await apiRoot
//       .customers()
//       .withId({ ID: customerId })
//       .get()
//       .execute();

//     console.log("Success", JSON.stringify(response.body, null, 2));
//   } catch (error) {
//     console.log(JSON.stringify(error, null, 2));
//   }
// }

//const productId: string = "a09c2128-e000-4501-a656-f219b1efbdb6";

export async function getCategories(
  limit: number,
  page: number
): Promise<Category[]> {
  try {
    //const response = await apiRoot.categories().get().withLimit(10).execute();

    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          limit: limit,
          offset: (page - 1) * limit,
        },
      })
      .execute();

    console.log("page", page);
    console.log("Success", JSON.stringify(response.body, null, 2));
    return response.body.results;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw error;
  }
}

export async function getCategoryByKey(key: string): Promise<Category> {
  try {
    const response = await apiRoot
      .categories()
      .withKey({ key: key })
      .get()
      .execute();

    console.log("Success", JSON.stringify(response.body, null, 2));
    return response.body;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new Error(`Category with key ${key} not found`);
  }
}

export async function getProductById(productId: string): Promise<Product> {
  try {
    const response = await apiRoot
      .products()
      .withId({ ID: productId })
      .get()
      .execute();

    //console.log("Success", JSON.stringify(response.body, null, 2));
    return response.body;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    throw new Error(`Product with ID ${productId} not found`);
  }
}

//productFetchById(productId);
//export { getProductById as productFetchById };