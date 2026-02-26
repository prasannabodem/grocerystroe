import { NextRequest, NextResponse } from 'next/server';
import { ProductModel } from '@/lib/models/Product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    const filters: any = {};
    
    if (category) {
      filters.category = category;
    }
    
    if (featured === 'true') {
      filters.featured = true;
    }

    const products = await ProductModel.findAll(filters);

    return NextResponse.json({ products });
  } catch (error) {
    console.error('[v0] Get products error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
