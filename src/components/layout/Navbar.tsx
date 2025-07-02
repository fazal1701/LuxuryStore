import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useAuth();
  const { getCartCount } = useCart();
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'New Arrivals', path: '/shop?category=new' },
    { name: 'Collections', path: '/shop?category=collections' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
      }`}
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-serif font-bold tracking-wider">LUXE</span>
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm uppercase tracking-wider hover:text-gold-500 transition-colors ${
                  location.pathname === link.path ? 'text-gold-500 font-medium' : 'text-primary-900'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2" aria-label="Search">
              <Search size={20} />
            </button>
            
            <Link to={user ? '/profile' : '/login'} className="p-2" aria-label="Account">
              <User size={20} />
            </Link>
            
            <Link to="/cart" className="p-2 relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-gold-500 rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wider hover:text-gold-500 transition-colors ${
                    location.pathname === link.path ? 'text-gold-500 font-medium' : 'text-primary-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;