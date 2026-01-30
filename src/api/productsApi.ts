import type { ProductsResponse } from "../types/product";

const BASE_URL = "https://dummyjson.com";

const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};
export { fetchProducts };
