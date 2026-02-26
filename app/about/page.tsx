import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Truck, Shield, Heart, Users, Store } from 'lucide-react';

const stats = [
    { label: 'Happy Customers', value: '50,000+' },
    { label: 'Products Available', value: '500+' },
    { label: 'Cities Served', value: '30+' },
    { label: 'Years in Business', value: '8' },
];

const values = [
    { icon: Leaf, title: 'Fresh & Sustainable', desc: 'We partner with local farms that use sustainable practices to bring you the freshest produce while caring for the planet.' },
    { icon: Truck, title: 'Reliable Delivery', desc: 'Same-day delivery available in most areas. We keep you informed every step of the way from order to doorstep.' },
    { icon: Shield, title: 'Quality Guaranteed', desc: 'Every product is quality-checked before it reaches you. Not satisfied? We offer a full refund, no questions asked.' },
    { icon: Heart, title: 'Community First', desc: 'We reinvest in the communities we serve by supporting local farmers, reducing food waste and donating surplus goods.' },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="size-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Store className="size-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About FreshMart</h1>
                    <p className="text-lg text-muted-foreground">
                        We started with a simple idea: everyone deserves access to fresh, high-quality groceries without leaving home. Since 2016, we've been making that idea a reality.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-14 px-4 bg-secondary/30">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    {stats.map(({ label, value }) => (
                        <div key={label}>
                            <p className="text-3xl font-bold text-primary">{value}</p>
                            <p className="text-sm text-muted-foreground mt-1">{label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Story */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
                    <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-4">
                        <p>
                            FreshMart was founded in 2016 by a group of food-lovers frustrated with the hassle of grocery shopping. We believed technology could bridge the gap between local farms and busy families — without sacrificing quality or freshness.
                        </p>
                        <p>
                            We began by working with a handful of farms in the New York area, hand-selecting produce and delivering it ourselves. Word spread fast, and within a year we had expanded to three states and built a dedicated team of over 200 employees.
                        </p>
                        <p>
                            Today, FreshMart serves over 50,000 households across 30+ cities, offers more than 500 products, and proudly partners with over 120 local farms and suppliers. Our mission remains the same: to bring fresh, quality groceries to every doorstep.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4 bg-muted/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <Card key={title}>
                                <CardContent className="p-6 flex gap-4">
                                    <div className="size-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">{title}</h3>
                                        <p className="text-sm text-muted-foreground">{desc}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="size-7 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold mb-3">Built by a Passionate Team</h2>
                    <p className="text-muted-foreground">
                        Our 200+ team members are spread across logistics, technology, customer support and farm partnerships. We share a common passion — great food and happy customers.
                    </p>
                </div>
            </section>
        </div>
    );
}
