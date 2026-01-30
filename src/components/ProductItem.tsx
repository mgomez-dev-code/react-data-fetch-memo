import type { Product } from "../types/product";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <li className="product-card">
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">{product.description}</p>
      <div className="product-meta">
        <span>${product.price}</span>
        <span>⭐ {product.rating}</span>
      </div>
    </li>
  );
};
export { ProductItem };
