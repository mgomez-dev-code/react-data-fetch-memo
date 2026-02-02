import "./App.css";
import { useMemo, useState } from "react";
import type { FC } from "react";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import useProducts from "./hooks/useProducts";
import type { Product } from "./types/product";

const App: FC = () => {
  const { products, loading, error } = useProducts();
  //UI state
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "title">("title");

  const categories = useMemo(() => {
    const uniqueCategories = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(uniqueCategories)];
  }, [products]);

  //Derived data (memoized)
  const visibleProducts = useMemo<Product[]>(() => {
    let result = products;

    // filter by search
    if (searchTerm.trim()) {
      result = result.filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // filter by category
    if (category !== "all") {
      result = result.filter(
        (product: Product) => product.category === category,
      );
    }

    // sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return result;
  }, [products, searchTerm, category, sortBy]);

  if (loading) return <p>Loading products…</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`app ${theme}`}>
      <h1 className="title">Products</h1>
      <button
        className="theme-toggle"
        onClick={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      >
        Switch to {theme === "light" ? "dark" : "light"} Mode
      </button>

      <Filters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={categories.includes(category) ? category : "all"}
        categories={categories}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <ProductList products={visibleProducts} />
    </div>
  );
};

export default App;
