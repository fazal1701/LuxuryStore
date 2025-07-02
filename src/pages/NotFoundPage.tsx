import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-9xl font-serif font-bold text-primary-200">404</h1>
        <h2 className="text-3xl font-serif mb-6">Page Not Found</h2>
        <p className="text-primary-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button as={Link} to="/">
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;