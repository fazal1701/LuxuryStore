import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${randomStr}`;
}

export const fetchProducts = async (category?: string): Promise<any[]> => {
  // In a real app, this would be an API call to your backend
  // For this example, we'll return mock data
  await delay(600); // Simulate API delay
  
  const products = [
    {
      id: '1',
      name: 'Monogram Canvas Bag',
      brand: 'Louis Vuitton',
      price: 1999,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Authentic vintage Louis Vuitton monogram canvas bag in excellent condition.',
      category: 'bags'
    },
    {
      id: '2',
      name: 'Classic Flap Bag',
      brand: 'Chanel',
      price: 4599,
      image: 'https://images.pexels.com/photos/1306262/pexels-photo-1306262.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Iconic Chanel Classic Flap Bag in black caviar leather with gold hardware.',
      category: 'bags'
    },
    {
      id: '3',
      name: 'Gold Watch',
      brand: 'Cartier',
      price: 8999,
      image: 'https://images.pexels.com/photos/9978722/pexels-photo-9978722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vintage Cartier watch in 18k gold, recently serviced and in excellent condition.',
      category: 'jewelry'
    },
    {
      id: '4',
      name: 'Silk Scarf',
      brand: 'Hermès',
      price: 399,
      image: 'https://images.pexels.com/photos/6046184/pexels-photo-6046184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vintage Hermès silk scarf with classic equestrian print.',
      category: 'accessories'
    },
    {
      id: '5',
      name: 'Wool Coat',
      brand: 'Burberry',
      price: 1299,
      image: 'https://images.pexels.com/photos/7679740/pexels-photo-7679740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Classic Burberry trench coat in camel, excellent vintage condition.',
      category: 'clothing'
    },
    {
      id: '6',
      name: 'Bamboo Handle Bag',
      brand: 'Gucci',
      price: 1799,
      image: 'https://images.pexels.com/photos/5234154/pexels-photo-5234154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vintage Gucci bamboo handle bag in navy blue leather.',
      category: 'bags'
    },
    {
      id: '7',
      name: 'Diamond Pendant Necklace',
      brand: 'Tiffany & Co.',
      price: 2499,
      image: 'https://images.pexels.com/photos/11638817/pexels-photo-11638817.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vintage Tiffany & Co. diamond pendant necklace in platinum setting.',
      category: 'jewelry'
    },
    {
      id: '8',
      name: 'Cashmere Sweater',
      brand: 'Ralph Lauren',
      price: 399,
      image: 'https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      description: 'Vintage Ralph Lauren cashmere sweater in cream, excellent condition.',
      category: 'clothing'
    }
  ];
  
  if (category && category !== 'all') {
    return products.filter(product => product.category === category);
  }
  
  return products;
};