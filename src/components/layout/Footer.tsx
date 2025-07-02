import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary-950 text-white py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and mission */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-serif font-bold tracking-wider text-gold-500">LUXE</span>
            </Link>
            <p className="text-primary-200 text-sm leading-relaxed">
              Curated luxury vintage pieces with a commitment to authenticity, quality, and sustainability.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-primary-200 hover:text-gold-500 transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-gold-500 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-primary-200 hover:text-gold-500 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Shop links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              <li><Link to="/shop" className="hover:text-gold-500 transition-colors">All Products</Link></li>
              <li><Link to="/shop?category=new" className="hover:text-gold-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?category=bags" className="hover:text-gold-500 transition-colors">Bags</Link></li>
              <li><Link to="/shop?category=jewelry" className="hover:text-gold-500 transition-colors">Jewelry</Link></li>
              <li><Link to="/shop?category=clothing" className="hover:text-gold-500 transition-colors">Clothing</Link></li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              <li><Link to="/about" className="hover:text-gold-500 transition-colors">About Us</Link></li>
              <li><Link to="/sustainability" className="hover:text-gold-500 transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="hover:text-gold-500 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="hover:text-gold-500 transition-colors">Press</Link></li>
              <li><Link to="/contact" className="hover:text-gold-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Support links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-primary-200">
              <li><Link to="/faq" className="hover:text-gold-500 transition-colors">FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-gold-500 transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/authenticity" className="hover:text-gold-500 transition-colors">Authenticity Guarantee</Link></li>
              <li><Link to="/terms" className="hover:text-gold-500 transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-500 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-primary-400 mb-4 md:mb-0">
            &copy; {currentYear} LUXE. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <img src="https://assets.codepen.io/285131/visa.svg" alt="Visa" className="h-6" />
            <img src="https://assets.codepen.io/285131/mastercard.svg" alt="Mastercard" className="h-6" />
            <img src="https://assets.codepen.io/285131/paypal.svg" alt="PayPal" className="h-6" />
            <img src="https://assets.codepen.io/285131/amex.svg" alt="American Express" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;