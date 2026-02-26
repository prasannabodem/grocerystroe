'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock, Loader2, MessageSquare } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        label: 'Email Us',
        value: 'support@freshmart.com',
        sub: 'We reply within 24 hours',
    },
    {
        icon: Phone,
        label: 'Call Us',
        value: '+1 (800) 555-0199',
        sub: 'Mon–Fri, 8 am – 8 pm EST',
    },
    {
        icon: MapPin,
        label: 'Our Office',
        value: '123 Market Street, New York, NY 10001',
        sub: 'Not open to walk-ins',
    },
    {
        icon: Clock,
        label: 'Support Hours',
        value: 'Mon – Sun',
        sub: '8 am – 10 pm EST',
    },
];

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000)); // simulate send
        toast.success("Message sent! We'll get back to you within 24 hours.");
        setForm({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="size-7 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Have a question, feedback or just want to say hello? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-4">
                        {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                            <Card key={label}>
                                <CardContent className="p-5 flex gap-4 items-start">
                                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon className="size-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
                                        <p className="font-semibold text-sm">{value}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <Card className="lg:col-span-3">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="name">Full Name *</Label>
                                        <Input id="name" name="name" value={form.name} onChange={handleChange} required placeholder="Jane Doe" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="jane@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input id="subject" name="subject" value={form.subject} onChange={handleChange} required placeholder="How can we help?" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} required placeholder="Tell us more..." className="min-h-32" />
                                </div>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? <><Loader2 className="size-4 animate-spin" /> Sending...</> : 'Send Message'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
