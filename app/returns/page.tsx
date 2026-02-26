import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, XCircle, Clock, MessageSquare } from 'lucide-react';

const eligible = [
    'Items received damaged or defective',
    'Incorrect item delivered',
    'Items past their expiry date on arrival',
    'Significant quality difference from description',
];

const notEligible = [
    'Perishable items opened or partially consumed',
    'Items returned more than 7 days after delivery',
    'Change of mind on non-perishable items after 48 hours',
    'Products that have been misused or improperly stored',
];

const steps = [
    { icon: MessageSquare, title: 'Contact Support', desc: 'Reach out via our Contact page or email returns@freshmart.com within 7 days of delivery.' },
    { icon: RefreshCw, title: 'Share Details', desc: 'Provide your order number, item(s) affected and a photo if applicable.' },
    { icon: CheckCircle2, title: 'We Review', desc: 'Our team reviews your request within 1 business day and approves eligible returns.' },
    { icon: Clock, title: 'Refund Issued', desc: 'Approved refunds are credited to your original payment method within 3–5 business days.' },
];

export default function ReturnsPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <RefreshCw className="size-7 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Returns & Refunds</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Your satisfaction is our priority. If something's not right, we'll make it right.
                    </p>
                </div>

                {/* Policy Summary */}
                <Card className="mb-10 border-primary/30 bg-primary/5">
                    <CardContent className="p-6 text-center">
                        <p className="font-semibold text-lg mb-1">Our Happiness Guarantee</p>
                        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                            If you're not 100% satisfied with any item, contact us within <strong>7 days</strong> of delivery and we'll issue a full refund or replacement — no hassle, no questions asked for quality issues.
                        </p>
                    </CardContent>
                </Card>

                {/* Eligibility */}
                <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <CheckCircle2 className="size-5 text-green-500" /> Eligible for Return
                        </h2>
                        <ul className="space-y-2">
                            {eligible.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle2 className="size-4 text-green-500 mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <XCircle className="size-5 text-destructive" /> Not Eligible
                        </h2>
                        <ul className="space-y-2">
                            {notEligible.map((item) => (
                                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <XCircle className="size-4 text-destructive mt-0.5 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Return Steps */}
                <h2 className="text-2xl font-bold mb-6">How to Request a Return</h2>
                <div className="grid sm:grid-cols-4 gap-4 mb-12">
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

                {/* CTA */}
                <div className="text-center">
                    <p className="text-muted-foreground mb-4">Need to start a return or have questions?</p>
                    <Button asChild>
                        <Link href="/contact">Contact Support</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
