import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../context/CartContext';
import { formatCurrency } from '../../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-primary-50">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        </Link>
        
        {/* Wishlist button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-colors"
          aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-gold-500 text-gold-500' : 'text-primary-800'}
          />
        </button>
      </div>
      
      {/* Product Info */}
      <div className="pt-4 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs text-primary-500 uppercase tracking-wider">{product.brand}</h3>
          <p className="font-medium">{formatCurrency(product.price)}</p>
        </div>
        <Link to={`/product/${product.id}`} className="block hover:text-gold-500 transition-colors">
          <h4 className="font-medium">{product.name}</h4>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;