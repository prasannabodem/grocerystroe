'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  async function fetchProduct(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) {
        throw new Error('Product not found');
      }
      const data = await res.json();
      setProduct(data.product);
    } catch (error) {
      console.error('[v0] Error fetching product:', error);
      toast.error('Failed to load product');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
      });
    }
    toast.success(`${quantity} x ${product.name} added to cart`);
    setQuantity(1);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/products">
            <ArrowLeft className="size-4" />
            Back to Products
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted/50 flex items-center justify-center text-9xl">
              {getCategoryEmoji(product.category)}
            </div>
          </Card>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-balance">{product.name}</h1>
                {product.featured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              <Badge variant="outline" className="mb-4">
                {product.category}
              </Badge>
              <p className="text-lg text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground">{product.unit}</p>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Availability:</p>
                  <p className={`text-sm font-medium ${product.stock > 0 ? 'text-primary' : 'text-destructive'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </p>
                </div>
              </CardContent>
            </Card>

            {product.stock > 0 && (
              <>
                <div className="flex items-center gap-4">
                  <p className="font-medium">Quantity:</p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon-sm"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </div>

                <Button size="lg" onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="size-5" />
                  Add {quantity} to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
              </>
            )}

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Product Details</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category:</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Unit:</dt>
                  <dd className="font-medium">{product.unit}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Stock:</dt>
                  <dd className="font-medium">{product.stock}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
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
