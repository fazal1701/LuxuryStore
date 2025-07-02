import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };
  
  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock promo code validation
    if (promoCode.toLowerCase() === 'welcome10') {
      setPromoError('');
      // In a real app, you'd apply the discount
      alert('Promo code applied successfully!');
    } else {
      setPromoError('Invalid promo code');
    }
  };
  
  const cartTotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 15 : 0;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;
  
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif mb-6">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-50 rounded-full mb-6">
              <ShoppingBag size={32} className="text-primary-400" />
            </div>
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <p className="text-primary-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button as={Link} to="/shop" className="group">
              Continue Shopping
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white border border-primary-100">
                <div className="hidden sm:grid sm:grid-cols-5 text-sm font-medium text-primary-500 bg-primary-50 p-4">
                  <div className="sm:col-span-2">Product</div>
                  <div className="text-center">Price</div>
                  <div className="text-center">Quantity</div>
                  <div className="text-right">Total</div>
                </div>
                
                <div className="divide-y divide-primary-100">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-4 sm:grid sm:grid-cols-5 sm:gap-6 sm:items-center">
                      {/* Product info */}
                      <div className="flex sm:col-span-2">
                        <div className="w-20 h-20 flex-shrink-0 bg-primary-100 mr-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.product.name}</h3>
                          <p className="text-sm text-primary-500">{item.product.brand}</p>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="mt-2 text-sm text-primary-500 hover:text-red-500 flex items-center sm:hidden"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="text-center hidden sm:block">
                        {formatCurrency(item.product.price)}
                      </div>
                      
                      {/* Mobile price and quantity */}
                      <div className="flex justify-between items-center mt-4 sm:hidden">
                        <div>
                          <span className="text-sm text-primary-500">Price: </span>
                          <span>{formatCurrency(item.product.price)}</span>
                        </div>
                      </div>
                      
                      {/* Quantity control */}
                      <div className="flex items-center justify-center mt-4 sm:mt-0">
                        <div className="flex items-center border border-primary-200">
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center text-primary-500 hover:bg-primary-50"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-12 h-8 text-center border-x border-primary-200 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center text-primary-500 hover:bg-primary-50"
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total price */}
                      <div className="text-right mt-4 sm:mt-0">
                        <div className="font-medium">
                          {formatCurrency(item.product.price * item.quantity)}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="hidden sm:inline-flex sm:items-center text-sm text-primary-500 hover:text-red-500 mt-1"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between p-4 border-t border-primary-100">
                  <button
                    onClick={clearCart}
                    className="text-sm text-primary-500 hover:text-red-500 flex items-center"
                  >
                    <X size={16} className="mr-1" />
                    Clear Cart
                  </button>
                  <Link
                    to="/shop"
                    className="text-sm text-primary-500 hover:text-gold-500 flex items-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-primary-50 p-6 sticky top-24">
                <h3 className="text-lg font-medium mb-6">Order Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Subtotal ({cartItems.length} items)</span>
                    <span>{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Shipping</span>
                    <span>{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Estimated Tax</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                  
                  <form onSubmit={handlePromoSubmit} className="pt-4">
                    <label htmlFor="promo" className="block text-sm font-medium mb-2">
                      Promo Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-grow p-2 text-sm border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-950"
                      />
                      <Button type="submit" size="sm" className="ml-2">
                        Apply
                      </Button>
                    </div>
                    {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                  </form>
                  
                  <div className="border-t border-primary-200 pt-4 mt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>
                  
                  <Button
                    as={Link}
                    to="/checkout"
                    className="w-full mt-6"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;