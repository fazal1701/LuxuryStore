import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { fetchProducts } from '../lib/utils';
import type { Product } from '../context/CartContext';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/6069544/pexels-photo-6069544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Luxury vintage collection"
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-xl animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-6">
              Timeless Luxury Redefined
            </h1>
            <p className="text-white text-lg mb-8">
              Discover our curated collection of authentic vintage luxury pieces that have stood the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button as={Link} to="/shop" className="group">
                Shop Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
              <Button as={Link} to="/about" variant="outline" className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-white/50">
                Our Story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Vintage Bags',
                image: 'https://images.pexels.com/photos/1270014/pexels-photo-1270014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/shop?category=bags'
              },
              {
                title: 'Fine Jewelry',
                image: 'https://images.pexels.com/photos/10217400/pexels-photo-10217400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/shop?category=jewelry'
              },
              {
                title: 'Designer Clothing',
                image: 'https://images.pexels.com/photos/19518642/pexels-photo-19518642/free-photo-of-woman-in-fur-coat-looking-away.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                link: '/shop?category=clothing'
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group block relative overflow-hidden aspect-square"
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <h3 className="text-2xl font-serif text-white bg-black/30 backdrop-blur-sm px-6 py-3">
                    {category.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-serif">Featured Products</h2>
            <Link 
              to="/shop" 
              className="text-sm font-medium flex items-center hover:text-gold-500 transition-colors"
            >
              View All 
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="aspect-[3/4] bg-primary-100 animate-pulse"></div>
                  <div className="h-4 bg-primary-100 animate-pulse"></div>
                  <div className="h-4 bg-primary-100 animate-pulse w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brand Spotlight */}
      <section className="py-20 bg-primary-950 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-serif mb-6">Brand Spotlight</h2>
              <p className="text-primary-200 mb-6">
                Our collection features authenticated pieces from the world's most coveted luxury brands. Each item is carefully inspected by our team of experts to ensure authenticity and excellent condition.
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {['Louis Vuitton', 'Chanel', 'Hermès', 'Gucci', 'Cartier', 'Prada'].map((brand, index) => (
                  <div key={index} className="text-center py-4 bg-primary-900 hover:bg-gold-500 hover:text-primary-950 transition-colors">
                    <span className="text-sm font-medium">{brand}</span>
                  </div>
                ))}
              </div>
              <Button as={Link} to="/shop" variant="gold">
                Shop All Brands
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/4906285/pexels-photo-4906285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Luxury vintage items"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl font-serif mb-4">Stay Connected</h2>
          <p className="mb-8 text-primary-600">
            Subscribe to our newsletter for exclusive access to new arrivals, special promotions, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 border border-primary-200 focus:ring-2 focus:ring-primary-950 focus:outline-none" 
              required
            />
            <Button type="submit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;