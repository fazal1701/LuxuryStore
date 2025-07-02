import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts, formatCurrency } from '../lib/utils';
import type { Product } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [favorite, setFavorite] = useState(false);
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const allProducts = await fetchProducts();
        const foundProduct = allProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Get related products from the same category
          const related = allProducts
            .filter(p => p.id !== id && p.category === foundProduct.category)
            .slice(0, 4);
          
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      
      // Reset the added state after 3 seconds
      setTimeout(() => {
        setAdded(false);
      }, 3000);
    }
  };
  
  if (loading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-950"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-16 max-w-md mx-auto">
            <h2 className="text-2xl font-serif mb-4">Product Not Found</h2>
            <p className="text-primary-600 mb-8">
              We couldn't find the product you're looking for.
            </p>
            <Button as={Link} to="/shop">
              Back to Shop
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link to="/shop" className="text-sm text-primary-600 hover:text-gold-500 flex items-center">
            <ArrowLeft size={16} className="mr-1" />
            Back to Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="aspect-square bg-primary-50 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-2 text-sm uppercase tracking-wider text-primary-500">
              {product.brand}
            </div>
            <h1 className="text-3xl font-serif mb-4">{product.name}</h1>
            <div className="text-2xl font-medium mb-6">
              {formatCurrency(product.price)}
            </div>
            
            <div className="mb-8">
              <p className="text-primary-600 mb-4">
                {product.description || 'No description available.'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Condition</div>
                  <div className="inline-block px-3 py-1 bg-green-50 text-green-800 text-sm">
                    Excellent
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Authenticity</div>
                  <div className="inline-block px-3 py-1 bg-primary-50 text-primary-800 text-sm">
                    Verified
                  </div>
                </div>
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-32">
                  <label htmlFor="quantity" className="block text-sm font-medium mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-full p-3 border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-950"
                  />
                </div>
                
                <div className="flex-grow flex flex-col">
                  <label className="block text-sm font-medium mb-2 invisible">
                    &nbsp;
                  </label>
                  <div className="flex gap-2 h-full">
                    <Button
                      onClick={handleAddToCart}
                      className="flex-grow flex justify-center items-center"
                      disabled={added}
                    >
                      {added ? (
                        <>
                          <Check size={18} className="mr-2" />
                          Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => setFavorite(!favorite)}
                      className={`w-12 flex-shrink-0 flex justify-center items-center ${
                        favorite ? 'bg-red-50 border-red-200 text-red-500' : ''
                      }`}
                      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        size={18}
                        className={favorite ? 'fill-red-500 text-red-500' : ''}
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Details Accordion */}
            <div className="border-t border-primary-200">
              <details className="group">
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                  <span className="font-medium">Product Details</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="pb-4 text-primary-600">
                  <ul className="space-y-2">
                    <li><strong>Material:</strong> Leather</li>
                    <li><strong>Dimensions:</strong> 30 x 20 x 10 cm</li>
                    <li><strong>Year:</strong> 2010</li>
                    <li><strong>Reference Number:</strong> ABC123456</li>
                  </ul>
                </div>
              </details>
              
              <details className="group border-t border-primary-200">
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                  <span className="font-medium">Shipping & Returns</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="pb-4 text-primary-600">
                  <p className="mb-2">Free standard shipping on all orders over $200.</p>
                  <p>Returns accepted within 14 days of delivery. Item must be in its original condition with all tags attached.</p>
                </div>
              </details>
              
              <details className="group border-t border-primary-200">
                <summary className="flex justify-between items-center py-4 cursor-pointer list-none">
                  <span className="font-medium">Authenticity Guarantee</span>
                  <span className="transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </summary>
                <div className="pb-4 text-primary-600">
                  <p>All items are verified by our in-house experts to guarantee authenticity. Each item comes with an authenticity certificate.</p>
                </div>
              </details>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;