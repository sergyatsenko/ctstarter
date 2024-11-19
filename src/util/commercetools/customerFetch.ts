import { Product } from "@commercetools/platform-sdk";
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

async function productFetchById(
  productId: string
): Promise<Product | undefined> {
  try {
    const response = await apiRoot
      .products()
      .withId({ ID: productId })
      .get()
      .execute();

    console.log("Success", JSON.stringify(response.body, null, 2));
    return response.body;
  } catch (error) {
    console.log(JSON.stringify(error, null, 2));
    return undefined;
  }
}

//productFetchById(productId);
export { productFetchById };
