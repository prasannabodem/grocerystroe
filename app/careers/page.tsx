import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Briefcase, Heart, Zap, Globe, ArrowRight } from 'lucide-react';

const perks = [
    { icon: Heart, title: 'Health & Wellness', desc: 'Full medical, dental and vision coverage for you and your family.' },
    { icon: Zap, title: 'Growth & Learning', desc: '$1,500/year learning budget plus access to online courses and conferences.' },
    { icon: Globe, title: 'Remote Friendly', desc: 'Work from home or from any of our 5 offices across the US.' },
    { icon: Briefcase, title: 'Equity & Bonuses', desc: 'Competitive salary, performance bonuses and equity for all employees.' },
];

const openings = [
    { title: 'Senior Software Engineer – Backend', dept: 'Engineering', location: 'Remote / NYC', type: 'Full-time' },
    { title: 'Product Designer (UX/UI)', dept: 'Design', location: 'Remote / LA', type: 'Full-time' },
    { title: 'Delivery Operations Manager', dept: 'Logistics', location: 'Chicago, IL', type: 'Full-time' },
    { title: 'Customer Success Specialist', dept: 'Support', location: 'Remote', type: 'Full-time' },
    { title: 'Farm Partnerships Manager', dept: 'Partnerships', location: 'New York, NY', type: 'Full-time' },
    { title: 'Data Analyst', dept: 'Analytics', location: 'Remote', type: 'Full-time' },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 px-4 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="size-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <Briefcase className="size-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Help us bring fresh groceries to millions of households. We're building something special and we need passionate people to do it.
                    </p>
                    <Button size="lg" asChild>
                        <a href="#openings">View Open Roles <ArrowRight className="size-4" /></a>
                    </Button>
                </div>
            </section>

            {/* Perks */}
            <section className="py-16 px-4 bg-secondary/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Why FreshMart?</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {perks.map(({ icon: Icon, title, desc }) => (
                            <Card key={title}>
                                <CardContent className="p-5 text-center">
                                    <div className="size-11 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Icon className="size-5 text-primary" />
                                    </div>
                                    <h3 className="font-semibold mb-1.5">{title}</h3>
                                    <p className="text-xs text-muted-foreground">{desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Roles */}
            <section id="openings" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
                    <div className="space-y-3">
                        {openings.map((role) => (
                            <Card key={role.title} className="group hover:shadow-md transition-shadow cursor-pointer">
                                <CardContent className="p-5 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="font-semibold group-hover:text-primary transition-colors">{role.title}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-sm text-muted-foreground">
                                            <span>{role.dept}</span>
                                            <span>·</span>
                                            <span>{role.location}</span>
                                            <span>·</span>
                                            <span>{role.type}</span>
                                        </div>
                                    </div>
                                    <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="text-center mt-10">
                        <p className="text-muted-foreground mb-4">Don't see the right role? We'd still love to hear from you.</p>
                        <Button variant="outline" asChild>
                            <Link href="/contact">Send a Speculative Application</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
