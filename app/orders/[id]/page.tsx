'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Package, Truck, Home } from 'lucide-react';

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    productName: string;
    price: number;
    quantity: number;
    unit: string;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderNotes?: string;
  status: string;
  createdAt: string;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string);
    }
  }, [params.id]);

  async function fetchOrder(id: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch (error) {
      console.error('[v0] Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading order...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the order you're looking for.
          </p>
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="size-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle2 className="size-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground">
            Thank you for your order. We'll start preparing it right away.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm text-muted-foreground mb-1">Order Number</h2>
                <p className="font-mono font-medium">#{order._id.slice(-8).toUpperCase()}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Order Date</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Amount</p>
                <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Status */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                  <Package className="size-6" />
                </div>
                <p className="text-xs font-medium text-center">Processing</p>
              </div>
              <div className="h-0.5 bg-border flex-1 mx-2" />
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                  <Truck className="size-6 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground text-center">In Transit</p>
              </div>
              <div className="h-0.5 bg-border flex-1 mx-2" />
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="size-12 rounded-full bg-muted flex items-center justify-center">
                  <Home className="size-6 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground text-center">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Information */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Customer Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Email</p>
                <p className="font-medium">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Phone</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Delivery Address</p>
                <p className="font-medium whitespace-pre-line">{order.deliveryAddress}</p>
              </div>
              {order.orderNotes && (
                <div>
                  <p className="text-muted-foreground mb-1">Order Notes</p>
                  <p className="font-medium">{order.orderNotes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-3 mb-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-muted-foreground">
                      {item.quantity} x ${item.price.toFixed(2)} {item.unit}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
