import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error: signUpError } = await signUp(email, password);
      
      if (signUpError) {
        setError(signUpError.message);
      }
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white border border-primary-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Create an Account</h1>
          <p className="text-primary-600">Join us for a luxurious shopping experience</p>
        </div>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-800 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <Input
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          
          <Input
            id="confirm-password"
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          
          <div className="flex items-start">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 mt-1 text-gold-500 border-primary-300 rounded focus:ring-gold-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-primary-700">
              I agree to the{' '}
              <Link to="/terms" className="text-gold-500 hover:text-gold-600 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-gold-500 hover:text-gold-600 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button type="submit" className="w-full" isLoading={loading}>
            Create Account
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-primary-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gold-500 hover:text-gold-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;