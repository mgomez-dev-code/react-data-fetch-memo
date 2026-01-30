import type { Product } from "../types/product";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return <p>No products found.</p>;
  }
  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
export default ProductList;
