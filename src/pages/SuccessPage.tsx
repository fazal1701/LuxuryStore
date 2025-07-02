import { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { formatCurrency } from '../lib/utils';

interface LocationState {
  orderId: string;
  amount: number;
  email: string;
}

const SuccessPage = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // In a real app, you might want to track the conversion
    // or send an event to your analytics platform
    if (state?.orderId) {
      console.log('Order completed:', state.orderId);
    }
  }, [state]);
  
  // If no order data is available, redirect to home
  if (!state?.orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-serif mb-4">Order Confirmed!</h1>
          
          <p className="text-primary-600 mb-8">
            Thank you for your purchase. We've sent a confirmation email to {state.email}.
          </p>
          
          <div className="bg-primary-50 p-6 mb-8">
            <div className="mb-4">
              <h2 className="text-lg font-medium mb-2">Order Details</h2>
              <p className="text-sm text-primary-500">Order #{state.orderId}</p>
            </div>
            
            <div className="flex justify-between py-3 border-b border-primary-200">
              <span className="text-primary-600">Order total</span>
              <span className="font-medium">{formatCurrency(state.amount)}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-primary-200">
              <span className="text-primary-600">Shipping address</span>
              <button className="text-sm text-gold-500">View</button>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-primary-600">Estimated delivery</span>
              <span>3-5 business days</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button as={Link} to="/profile" className="w-full">
              View Order History
            </Button>
            
            <Button as={Link} to="/" variant="secondary" className="w-full group">
              Continue Shopping
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;