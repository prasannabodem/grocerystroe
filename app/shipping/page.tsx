import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package, CheckCircle2 } from 'lucide-react';

const options = [
    {
        name: 'Standard Delivery',
        price: '$5.99',
        time: '2–4 hours',
        desc: 'Available 7 days a week, 8 am – 8 pm',
    },
    {
        name: 'Express Delivery',
        price: '$9.99',
        time: '60–90 minutes',
        desc: 'Available in select areas, 9 am – 6 pm',
    },
    {
        name: 'Scheduled Delivery',
        price: '$5.99',
        time: 'Your chosen slot',
        desc: 'Pick a 2-hour window up to 7 days in advance',
    },
    {
        name: 'Free Delivery',
        price: 'FREE',
        time: '2–4 hours',
        desc: 'On all orders over $75',
    },
];

const steps = [
    { icon: Package, title: 'Order Placed', desc: 'You receive a confirmation email immediately.' },
    { icon: CheckCircle2, title: 'Picking & Packing', desc: 'Our team carefully selects and packs your items.' },
    { icon: Truck, title: 'Out for Delivery', desc: 'Your order is on its way with real-time tracking.' },
    { icon: MapPin, title: 'Delivered', desc: 'Left at your door or handed directly to you.' },
];

const faqs = [
    { q: 'Do you deliver on weekends?', a: 'Yes! We deliver 7 days a week, including public holidays.' },
    { q: 'Can I change my delivery address?', a: 'You can update your address up to 30 minutes after placing an order by contacting support.' },
    {
        q: "What if I'm not home?", a: 'We leave your order in a safe spot and send you a photo confirmation.'
    },
    { q: 'Is there a minimum order?', a: 'There is no minimum order. Delivery fees apply based on the option selected.' },
];

export default function ShippingPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Truck className="size-7 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Shipping Information</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Fast, reliable delivery right to your door. Here's everything you need to know.
                    </p>
                </div>

                {/* Delivery Options */}
                <h2 className="text-2xl font-bold mb-4">Delivery Options</h2>
                <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {options.map((opt) => (
                        <Card key={opt.name} className={opt.price === 'FREE' ? 'border-primary/40 bg-primary/5' : ''}>
                            <CardContent className="p-5">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-semibold">{opt.name}</h3>
                                    <span className={`text-sm font-bold ${opt.price === 'FREE' ? 'text-primary' : ''}`}>{opt.price}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-1">
                                    <Clock className="size-3.5" />
                                    {opt.time}
                                </div>
                                <p className="text-xs text-muted-foreground">{opt.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* How It Works */}
                <h2 className="text-2xl font-bold mb-6">How Delivery Works</h2>
                <div className="relative mb-12">
                    <div className="grid sm:grid-cols-4 gap-4">
                        {steps.map(({ icon: Icon, title, desc }, i) => (
                            <div key={title} className="flex flex-col items-center text-center">
                                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 relative">
                                    <Icon className="size-5 text-primary" />
                                    <span className="absolute -top-1 -right-1 size-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                                        {i + 1}
                                    </span>
                                </div>
                                <p className="font-semibold text-sm mb-1">{title}</p>
                                <p className="text-xs text-muted-foreground">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map(({ q, a }) => (
                        <Card key={q}>
                            <CardContent className="p-5">
                                <p className="font-semibold mb-1">{q}</p>
                                <p className="text-sm text-muted-foreground">{a}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
