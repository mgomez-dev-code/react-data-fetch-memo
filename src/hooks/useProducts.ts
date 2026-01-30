import { useState, useEffect } from "react";
import { fetchProducts } from "../api/productsApi";
import type { Product } from "../types/product";

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (!cancelled) {
          setProducts(data.products);
        }
      } catch {
        if (!cancelled) {
          setError("Something went wrong while loading products.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
