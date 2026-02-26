import { NextRequest, NextResponse } from 'next/server';
import { OrderModel } from '@/lib/models/Order';
import { ProductModel } from '@/lib/models/Product';
import { getCurrentUser } from '@/lib/auth';
import { ObjectId } from 'mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items,
      orderNotes,
    } = body;

    // Validation
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'All fields are required and cart must not be empty' },
        { status: 400 }
      );
    }

    // Get current user if logged in
    const currentUser = await getCurrentUser();

    // Calculate totals and prepare order items
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await ProductModel.findById(item.productId);
      
      if (!product) {
        return NextResponse.json(
          { error: `Product ${item.productId} not found` },
          { status: 404 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        );
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: new ObjectId(item.productId),
        productName: product.name,
        price: product.price,
        quantity: item.quantity,
        unit: product.unit,
      });

      // Update product stock
      await ProductModel.updateStock(product._id!, item.quantity);
    }

    const deliveryFee = 5.99;
    const total = subtotal + deliveryFee;

    // Create order
    const order = await OrderModel.create({
      userId: currentUser ? new ObjectId(currentUser.userId) : undefined,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      orderNotes,
    });

    return NextResponse.json(
      {
        message: 'Order placed successfully',
        order: {
          id: order._id,
          total: order.total,
          status: order.status,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Create order error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const orders = await OrderModel.findByUserId(currentUser.userId);

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('[v0] Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
