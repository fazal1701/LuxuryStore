import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { stripePromise } from '../lib/stripe';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { formatCurrency, generateOrderId } from '../lib/utils';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentIntent, setPaymentIntent] = useState<any>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'US',
  });
  
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  // In a real application, you would set this from the authenticated user
  useEffect(() => {
    if (user) {
      setEmail(user.email || '');
    }
  }, [user]);
  
  // In a real application, this would be a fetch to your server to create a PaymentIntent
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        // Mock PaymentIntent creation (In a real app, this would be an API call)
        const mockPaymentIntentData = {
          clientSecret: 'mock_client_secret_' + Math.random().toString(36).substr(2, 9),
          id: 'pi_' + Math.random().toString(36).substr(2, 9),
          amount: getCartTotal() * 100,
          currency: 'usd',
        };
        
        setClientSecret(mockPaymentIntentData.clientSecret);
        setPaymentIntent(mockPaymentIntentData);
      } catch (err) {
        console.error('Error creating payment intent:', err);
        setError('Failed to initialize payment. Please try again.');
      }
    };
    
    if (cartItems.length > 0) {
      fetchPaymentIntent();
    } else {
      navigate('/cart');
    }
  }, [cartItems, getCartTotal, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would confirm the PaymentIntent with Stripe
      // For this example, we'll simulate a successful payment
      
      // Mock a successful payment after a short delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate an order ID
      const orderId = generateOrderId();
      
      // In a real implementation, you would store the order in your database
      
      // Clear the cart
      clearCart();
      
      // Redirect to success page
      navigate('/success', { 
        state: { 
          orderId, 
          amount: getCartTotal(),
          email: email
        } 
      });
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'An error occurred during payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const cartTotal = getCartTotal();
  const shipping = 15;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-800 text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Shipping Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              id="address-line1"
              label="Address Line 1"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Input
              id="address-line2"
              label="Address Line 2 (Optional)"
              value={address.line2}
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
            />
          </div>
          <Input
            id="city"
            label="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
          <Input
            id="state"
            label="State / Province"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            required
          />
          <Input
            id="postal-code"
            label="Postal Code"
            value={address.postal_code}
            onChange={(e) => setAddress({ ...address, postal_code: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-primary-900 mb-2" htmlFor="country">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              id="country"
              value={address.country}
              onChange={(e) => setAddress({ ...address, country: e.target.value })}
              className="w-full px-4 py-3 text-sm border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-950"
              required
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">Payment Details</h3>
        <div className="border border-primary-200 p-4">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>
      
      <div className="border-t border-primary-200 pt-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-primary-600">Subtotal</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-600">Shipping</span>
            <span>{formatCurrency(shipping)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-primary-600">Tax</span>
            <span>{formatCurrency(tax)}</span>
          </div>
          <div className="flex justify-between font-medium text-lg pt-2 border-t border-primary-100">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        isLoading={loading}
        disabled={!stripe || !clientSecret}
      >
        {loading ? 'Processing...' : `Pay ${formatCurrency(total)}`}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  
  // Redirect to cart if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          
          <div>
            <div className="bg-primary-50 p-6 sticky top-24">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              <div className="divide-y divide-primary-200">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="py-4 flex">
                    <div className="w-20 h-20 flex-shrink-0 bg-primary-100 mr-4">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium">{item.product.name}</h4>
                      <p className="text-xs text-primary-600 mb-1">{item.product.brand}</p>
                      <div className="flex justify-between">
                        <span className="text-sm">Qty: {item.quantity}</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;