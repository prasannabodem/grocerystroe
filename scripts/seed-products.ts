import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const products = [
  // Fruits
  {
    name: 'Fresh Apples',
    description: 'Crisp and sweet apples, perfect for snacking',
    price: 4.99,
    category: 'Fruits',
    image: '/images/products/apples.jpg',
    unit: 'per lb',
    stock: 100,
    featured: true,
  },
  {
    name: 'Organic Bananas',
    description: 'Ripe organic bananas, great source of potassium',
    price: 2.99,
    category: 'Fruits',
    image: '/images/products/bananas.jpg',
    unit: 'per bunch',
    stock: 150,
    featured: true,
  },
  {
    name: 'Strawberries',
    description: 'Fresh, juicy strawberries',
    price: 5.99,
    category: 'Fruits',
    image: '/images/products/strawberries.jpg',
    unit: 'per pint',
    stock: 80,
    featured: false,
  },
  {
    name: 'Oranges',
    description: 'Sweet and tangy oranges, packed with vitamin C',
    price: 6.99,
    category: 'Fruits',
    image: '/images/products/oranges.jpg',
    unit: 'per 5 lb bag',
    stock: 60,
    featured: false,
  },
  
  // Vegetables
  {
    name: 'Fresh Tomatoes',
    description: 'Vine-ripened tomatoes, perfect for salads',
    price: 3.99,
    category: 'Vegetables',
    image: '/images/products/tomatoes.jpg',
    unit: 'per lb',
    stock: 120,
    featured: true,
  },
  {
    name: 'Organic Spinach',
    description: 'Fresh organic spinach leaves',
    price: 4.49,
    category: 'Vegetables',
    image: '/images/products/spinach.jpg',
    unit: 'per bunch',
    stock: 90,
    featured: false,
  },
  {
    name: 'Carrots',
    description: 'Crunchy and sweet carrots',
    price: 2.99,
    category: 'Vegetables',
    image: '/images/products/carrots.jpg',
    unit: 'per 2 lb bag',
    stock: 100,
    featured: false,
  },
  {
    name: 'Broccoli',
    description: 'Fresh green broccoli crowns',
    price: 3.49,
    category: 'Vegetables',
    image: '/images/products/broccoli.jpg',
    unit: 'per head',
    stock: 70,
    featured: false,
  },
  
  // Dairy
  {
    name: 'Whole Milk',
    description: 'Fresh whole milk, farm to table',
    price: 4.99,
    category: 'Dairy',
    image: '/images/products/milk.jpg',
    unit: 'per gallon',
    stock: 50,
    featured: true,
  },
  {
    name: 'Organic Eggs',
    description: 'Free-range organic eggs',
    price: 6.99,
    category: 'Dairy',
    image: '/images/products/eggs.jpg',
    unit: 'per dozen',
    stock: 80,
    featured: false,
  },
  {
    name: 'Cheddar Cheese',
    description: 'Sharp cheddar cheese',
    price: 7.99,
    category: 'Dairy',
    image: '/images/products/cheese.jpg',
    unit: 'per lb',
    stock: 45,
    featured: false,
  },
  {
    name: 'Greek Yogurt',
    description: 'Creamy Greek yogurt',
    price: 5.49,
    category: 'Dairy',
    image: '/images/products/yogurt.jpg',
    unit: 'per 32 oz',
    stock: 60,
    featured: false,
  },
  
  // Meat
  {
    name: 'Chicken Breast',
    description: 'Boneless, skinless chicken breast',
    price: 8.99,
    category: 'Meat',
    image: '/images/products/chicken.jpg',
    unit: 'per lb',
    stock: 40,
    featured: false,
  },
  {
    name: 'Ground Beef',
    description: '85% lean ground beef',
    price: 7.99,
    category: 'Meat',
    image: '/images/products/beef.jpg',
    unit: 'per lb',
    stock: 35,
    featured: false,
  },
  {
    name: 'Wild Salmon',
    description: 'Fresh wild-caught salmon fillet',
    price: 14.99,
    category: 'Meat',
    image: '/images/products/salmon.jpg',
    unit: 'per lb',
    stock: 25,
    featured: true,
  },
  
  // Bakery
  {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole wheat bread',
    price: 3.99,
    category: 'Bakery',
    image: '/images/products/bread.jpg',
    unit: 'per loaf',
    stock: 50,
    featured: false,
  },
  {
    name: 'Croissants',
    description: 'Buttery, flaky croissants',
    price: 5.99,
    category: 'Bakery',
    image: '/images/products/croissants.jpg',
    unit: 'per 6 pack',
    stock: 30,
    featured: false,
  },
  
  // Pantry
  {
    name: 'Pasta',
    description: 'Premium Italian pasta',
    price: 2.49,
    category: 'Pantry',
    image: '/images/products/pasta.jpg',
    unit: 'per 16 oz box',
    stock: 200,
    featured: false,
  },
  {
    name: 'Rice',
    description: 'Long grain white rice',
    price: 8.99,
    category: 'Pantry',
    image: '/images/products/rice.jpg',
    unit: 'per 5 lb bag',
    stock: 100,
    featured: false,
  },
  {
    name: 'Olive Oil',
    description: 'Extra virgin olive oil',
    price: 12.99,
    category: 'Pantry',
    image: '/images/products/olive-oil.jpg',
    unit: 'per bottle',
    stock: 60,
    featured: false,
  },
];

async function seedProducts() {
  try {
    const { ProductModel } = await import('../lib/models/Product');

    console.log('Starting to seed products...');
    
    for (const product of products) {
      await ProductModel.create(product);
      console.log(`Added: ${product.name}`);
    }
    
    console.log('Successfully seeded all products!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
