import { NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models/Product';

export async function GET() {
  try {
    const categories = await ProductModel.getCategories();

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('[v0] Get categories error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
