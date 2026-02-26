'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight, LayoutGrid } from 'lucide-react';

interface CategoryInfo {
    name: string;
    emoji: string;
    description: string;
    color: string;
}

const categoryDetails: Record<string, CategoryInfo> = {
    Fruits: {
        name: 'Fruits',
        emoji: '🍎',
        description: 'Fresh seasonal fruits sourced daily from local farms',
        color: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30',
    },
    Vegetables: {
        name: 'Vegetables',
        emoji: '🥬',
        description: 'Crisp, farm-fresh vegetables for every meal',
        color: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    },
    Dairy: {
        name: 'Dairy',
        emoji: '🥛',
        description: 'Milk, cheese, yogurt and more from quality producers',
        color: 'from-blue-50 to-sky-50 dark:from-blue-950/30 dark:to-sky-950/30',
    },
    Meat: {
        name: 'Meat',
        emoji: '🥩',
        description: 'Premium cuts of beef, chicken, pork and seafood',
        color: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    },
    Bakery: {
        name: 'Bakery',
        emoji: '🍞',
        description: 'Freshly baked breads, pastries and sweet treats',
        color: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30',
    },
    Pantry: {
        name: 'Pantry',
        emoji: '🥫',
        description: 'Pantry staples, canned goods and dry ingredients',
        color: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    },
};

function getDetails(name: string): CategoryInfo {
    return (
        categoryDetails[name] ?? {
            name,
            emoji: '🛒',
            description: `Browse all ${name} products`,
            color: 'from-muted/50 to-muted/20',
        }
    );
}

export default function CategoriesPage() {
    const [categories, setCategories] = useState<string[]>([]);
    const [productCounts, setProductCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const [catRes, prodRes] = await Promise.all([
                fetch('/api/categories'),
                fetch('/api/products'),
            ]);

            if (catRes.ok) {
                const catData = await catRes.json();
                setCategories(catData.categories || []);
            }

            if (prodRes.ok) {
                const prodData = await prodRes.json();
                const counts: Record<string, number> = {};
                (prodData.products || []).forEach((p: { category: string }) => {
                    counts[p.category] = (counts[p.category] || 0) + 1;
                });
                setProductCounts(counts);
            }
        } catch (error) {
            console.error('[v0] Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <LayoutGrid className="size-7 text-primary" />
                        <h1 className="text-3xl font-bold">Shop by Category</h1>
                    </div>
                    <p className="text-muted-foreground ml-10">
                        Explore our wide selection of fresh groceries, organised by category
                    </p>
                </div>

                {/* Category Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <Skeleton key={i} className="h-52 rounded-xl" />
                        ))}
                    </div>
                ) : categories.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-4">🛒</p>
                        <h2 className="text-xl font-semibold mb-2">No categories yet</h2>
                        <p className="text-muted-foreground mb-6">
                            Seed the database to get started.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Run:{' '}
                            <code className="bg-muted px-2 py-1 rounded">pnpm seed</code>
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((name) => {
                            const info = getDetails(name);
                            const count = productCounts[name] ?? 0;
                            return (
                                <Link
                                    key={name}
                                    href={`/products?category=${encodeURIComponent(name)}`}
                                    className="group"
                                >
                                    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group-hover:-translate-y-0.5 h-full border">
                                        <CardContent className="p-0 h-full">
                                            {/* Coloured top band */}
                                            <div
                                                className={`bg-gradient-to-br ${info.color} flex flex-col items-center justify-center py-10 px-6 text-center`}
                                            >
                                                <span className="text-6xl mb-3 drop-shadow-sm">
                                                    {info.emoji}
                                                </span>
                                                <h2 className="text-xl font-bold mb-1">{info.name}</h2>
                                                {count > 0 && (
                                                    <span className="text-xs font-medium bg-background/70 backdrop-blur-sm border px-2.5 py-0.5 rounded-full text-muted-foreground">
                                                        {count} product{count !== 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Bottom description + CTA */}
                                            <div className="px-5 py-4 flex items-center justify-between gap-3">
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {info.description}
                                                </p>
                                                <ArrowRight className="size-4 text-primary shrink-0 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* CTA */}
                {!loading && categories.length > 0 && (
                    <div className="mt-12 text-center">
                        <p className="text-muted-foreground mb-4">
                            Looking for something specific?
                        </p>
                        <Button asChild size="lg">
                            <Link href="/products">Browse All Products</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
