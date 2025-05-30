import { formatarPreco } from "../Utils";
import { Product } from "./types";

type Props = {
  product: Product;
  onSelectProduct: (product: Product) => void;
  isSelected: boolean;
};

function ProductCard({ product, onSelectProduct, isSelected }: Readonly<Props>) {
  return (
    <div className={`order-card-container ${isSelected ? 'selected': ''}`} 
      onClick={() => onSelectProduct(product)}>
      <h3 className="order-card-title">{product.name}</h3>
      <img
        className="order-card-image"
        src={product.imageUri}
        alt={product.name}
      />
      <h3 className="order-card-price">{formatarPreco(product.price)}</h3>
      <div className="order-card-description">
        <h3>Descrição</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductCard;
