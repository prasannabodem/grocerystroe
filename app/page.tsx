import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Leaf, Truck, Shield } from 'lucide-react';

async function getFeaturedProducts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products?featured=true`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error('[v0] Error fetching featured products:', error);
    return [];
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('[v0] Error fetching categories:', error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-foreground">
            Fresh Groceries Delivered to Your Door
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
            Shop quality fruits, vegetables, dairy, meat, and more from the comfort of your home
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/products">
                <ShoppingCart className="size-5" />
                Start Shopping
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Fresh Products</h3>
            <p className="text-sm text-muted-foreground">
              Quality guaranteed, farm-fresh produce daily
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Truck className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Same-day delivery available in your area
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Secure Shopping</h3>
            <p className="text-sm text-muted-foreground">
              Safe checkout and data protection
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category: string) => (
              <Link
                key={category}
                href={`/products?category=${encodeURIComponent(category)}`}
                className="group"
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardContent className="p-6 flex flex-col items-center justify-center gap-2">
                    <div className="text-2xl mb-2">
                      {getCategoryIcon(category)}
                    </div>
                    <p className="font-medium text-sm text-center group-hover:text-primary transition-colors">
                      {category}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No products available yet. Please seed the database first.
              </p>
              <p className="text-sm text-muted-foreground">
                Run: <code className="bg-muted px-2 py-1 rounded">pnpm seed</code>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square bg-muted/50 flex items-center justify-center text-6xl">
        {getProductEmoji(product.category)}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-base">{product.name}</CardTitle>
          {product.featured && (
            <Badge variant="secondary" className="text-xs">Featured</Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{product.unit}</p>
          </div>
          <Button asChild size="sm">
            <Link href={`/products/${product._id}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function getCategoryIcon(category: string) {
  const icons: Record<string, string> = {
    Fruits: '🍎',
    Vegetables: '🥬',
    Dairy: '🥛',
    Meat: '🥩',
    Bakery: '🍞',
    Pantry: '🥫',
  };
  return icons[category] || '🛒';
}

function getProductEmoji(category: string) {
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
