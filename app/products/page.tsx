'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Filter } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  stock: number;
  featured?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const { addToCart } = useCart();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    fetchCategories();
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('[v0] Error fetching categories:', error);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `/api/products?category=${encodeURIComponent(selectedCategory)}`
        : '/api/products';
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('[v0] Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart(product: Product) {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">All Products</h1>
          <p className="text-muted-foreground">
            Browse our full selection of fresh groceries
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="size-5 text-muted-foreground" />
            <h2 className="font-semibold">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No products found{selectedCategory && ` in ${selectedCategory}`}.
            </p>
            {!selectedCategory && (
              <p className="text-sm text-muted-foreground">
                Run: <code className="bg-muted px-2 py-1 rounded">pnpm seed</code> to add products
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="aspect-square bg-muted/50 flex items-center justify-center text-6xl">
                  {getCategoryEmoji(product.category)}
                </div>
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-base">{product.name}</CardTitle>
                    {product.featured && (
                      <Badge variant="secondary" className="text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {product.description}
                  </p>
                  <Badge variant="outline" className="w-fit mb-3">
                    {product.category}
                  </Badge>
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-lg font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <ShoppingCart className="size-4" />
                        Add to Cart
                      </Button>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/products/${product._id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getCategoryEmoji(category: string) {
  const emojis: Record<string, string> = {
    Fruits: '🍎',
    Vegetables: '🥬',
    Dairy: '🥛',
    Meat: '🥩',
    Bakery: '🍞',
    Pantry: '🥫',
  };
  return emojis[category] || '🛒';
}
