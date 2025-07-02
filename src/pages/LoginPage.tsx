import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface LocationState {
  from?: { pathname: string };
  message?: string;
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state?.from?.pathname || '/';
  const message = state?.message;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        setError(signInError.message);
      } else {
        navigate(from);
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white border border-primary-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif mb-2">Welcome Back</h1>
          <p className="text-primary-600">Sign in to your account</p>
          {message && (
            <div className="mt-4 p-3 bg-green-50 text-green-800 text-sm">
              {message}
            </div>
          )}
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
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-primary-900" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <Link to="/forgot-password" className="text-xs text-primary-600 hover:text-gold-500 transition-colors">
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 text-sm border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-950"
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 text-gold-500 border-primary-300 rounded focus:ring-gold-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-primary-700">
              Remember me
            </label>
          </div>
          
          <Button type="submit" className="w-full" isLoading={loading}>
            Sign In
          </Button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-primary-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-gold-500 hover:text-gold-600 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;