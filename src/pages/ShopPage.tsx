import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { fetchProducts } from '../lib/utils';
import type { Product } from '../context/CartContext';

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const categoryParam = searchParams.get('category');
  
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts(categoryParam || undefined);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [categoryParam]);
  
  const handleCategoryChange = (category: string) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };
  
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4">Shop Our Collection</h1>
          <p className="max-w-2xl mx-auto text-primary-600">
            Explore our curated selection of authentic vintage luxury items, featuring iconic pieces from the world's most prestigious brands.
          </p>
        </div>
        
        <div className="md:grid md:grid-cols-4 md:gap-8">
          {/* Mobile filter button */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium">Products ({products.length})</h2>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleFilters}
              className="flex items-center"
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </Button>
          </div>
          
          {/* Sidebar filters - Mobile */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 p-6 md:hidden overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Filters</h2>
                <button
                  className="p-2"
                  onClick={toggleFilters}
                  aria-label="Close filters"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Category filter */}
                <div>
                  <h3 className="font-medium mb-4">Category</h3>
                  <div className="space-y-2">
                    {['all', 'bags', 'jewelry', 'clothing', 'accessories'].map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={category === 'all' ? !categoryParam : categoryParam === category}
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 text-gold-500"
                        />
                        <span className="ml-2 capitalize">
                          {category === 'all' ? 'All Categories' : category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Brand filter */}
                <div>
                  <h3 className="font-medium mb-4">Brand</h3>
                  <div className="space-y-2">
                    {['All Brands', 'Louis Vuitton', 'Chanel', 'Hermès', 'Gucci', 'Cartier', 'Prada'].map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-gold-500"
                        />
                        <span className="ml-2">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Price filter */}
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-primary-600 mb-1 block">Min</label>
                      <input
                        type="number"
                        placeholder="$0"
                        className="w-full p-2 border border-primary-200"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-primary-600 mb-1 block">Max</label>
                      <input
                        type="number"
                        placeholder="$10000"
                        className="w-full p-2 border border-primary-200"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full">Apply Filters</Button>
                  <button className="w-full text-center mt-4 text-primary-600">
                    Reset All
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Sidebar filters - Desktop */}
          <div className="hidden md:block md:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Category filter */}
              <div>
                <h3 className="font-medium mb-4">Category</h3>
                <div className="space-y-2">
                  {['all', 'bags', 'jewelry', 'clothing', 'accessories'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={category === 'all' ? !categoryParam : categoryParam === category}
                        onChange={() => handleCategoryChange(category)}
                        className="h-4 w-4 text-gold-500"
                      />
                      <span className="ml-2 capitalize">
                        {category === 'all' ? 'All Categories' : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Brand filter */}
              <div>
                <h3 className="font-medium mb-4">Brand</h3>
                <div className="space-y-2">
                  {['All Brands', 'Louis Vuitton', 'Chanel', 'Hermès', 'Gucci', 'Cartier', 'Prada'].map((brand) => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-gold-500"
                      />
                      <span className="ml-2">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Price filter */}
              <div>
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-primary-600 mb-1 block">Min</label>
                    <input
                      type="number"
                      placeholder="$0"
                      className="w-full p-2 border border-primary-200"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-primary-600 mb-1 block">Max</label>
                    <input
                      type="number"
                      placeholder="$10000"
                      className="w-full p-2 border border-primary-200"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">Apply Filters</Button>
                <button className="w-full text-center mt-4 text-primary-600">
                  Reset All
                </button>
              </div>
            </div>
          </div>
          
          {/* Product grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="space-y-4">
                    <div className="aspect-[3/4] bg-primary-100 animate-pulse"></div>
                    <div className="h-4 bg-primary-100 animate-pulse"></div>
                    <div className="h-4 bg-primary-100 animate-pulse w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-primary-600 mb-6">
                  Try adjusting your filters or check back later for new arrivals.
                </p>
                <Button
                  onClick={() => handleCategoryChange('all')}
                  variant="secondary"
                >
                  View All Products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;