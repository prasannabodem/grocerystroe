'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import {
    UserCircle,
    Mail,
    Phone,
    MapPin,
    ShoppingBag,
    Loader2,
    Pencil,
    X,
} from 'lucide-react';

export default function ProfilePage() {
    const { user, loading: authLoading, refreshUser } = useAuth();
    const router = useRouter();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/');
                return;
            }
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || '',
            });
        }
    }, [user, authLoading]);

    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleCancel() {
        setFormData({
            name: user?.name || '',
            phone: user?.phone || '',
            address: user?.address || '',
        });
        setEditing(false);
    }

    async function handleSave() {
        if (!formData.name.trim()) {
            toast.error('Name is required');
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/auth/me', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to update profile');
            }

            await refreshUser();
            toast.success('Profile updated successfully');
            setEditing(false);
        } catch (error: any) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    }

    if (authLoading) {
        return (
            <div className="min-h-screen py-8 px-4">
                <div className="max-w-2xl mx-auto">
                    <Skeleton className="h-9 w-40 mb-8" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Page Header */}
                <div className="flex items-center gap-3 mb-8">
                    <UserCircle className="size-7 text-primary" />
                    <h1 className="text-3xl font-bold">My Profile</h1>
                </div>

                {/* Avatar + Name Card */}
                <Card className="mb-6 overflow-hidden">
                    <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
                    <CardContent className="px-6 pb-6 -mt-12">
                        <div className="flex items-end justify-between gap-4">
                            <div className="size-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center">
                                <span className="text-3xl font-bold text-primary">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            {!editing ? (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditing(true)}
                                    className="mb-1"
                                >
                                    <Pencil className="size-4" />
                                    Edit Profile
                                </Button>
                            ) : (
                                <div className="flex gap-2 mb-1">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleCancel}
                                        disabled={saving}
                                    >
                                        <X className="size-4" />
                                        Cancel
                                    </Button>
                                    <Button size="sm" onClick={handleSave} disabled={saving}>
                                        {saving ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : null}
                                        Save Changes
                                    </Button>
                                </div>
                            )}
                        </div>
                        <div className="mt-3">
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Card */}
                <Card className="mb-6">
                    <CardContent className="p-6 space-y-6">
                        <h2 className="text-lg font-semibold">Personal Information</h2>

                        {/* Name */}
                        <div className="space-y-1.5">
                            <Label htmlFor="name" className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                                <UserCircle className="size-3.5" />
                                Full Name
                            </Label>
                            {editing ? (
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your full name"
                                />
                            ) : (
                                <p className="font-medium">{user.name}</p>
                            )}
                        </div>

                        {/* Email (read-only) */}
                        <div className="space-y-1.5">
                            <Label className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                                <Mail className="size-3.5" />
                                Email Address
                            </Label>
                            <p className="font-medium">{user.email}</p>
                            {editing && (
                                <p className="text-xs text-muted-foreground">
                                    Email cannot be changed
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                            <Label htmlFor="phone" className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                                <Phone className="size-3.5" />
                                Phone Number
                            </Label>
                            {editing ? (
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+1 (555) 123-4567"
                                />
                            ) : (
                                <p className="font-medium">
                                    {user.phone || (
                                        <span className="text-muted-foreground italic">Not provided</span>
                                    )}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div className="space-y-1.5">
                            <Label htmlFor="address" className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wide">
                                <MapPin className="size-3.5" />
                                Delivery Address
                            </Label>
                            {editing ? (
                                <Textarea
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="123 Main St, Apt 4B, New York, NY 10001"
                                    className="min-h-20"
                                />
                            ) : (
                                <p className="font-medium whitespace-pre-line">
                                    {user.address || (
                                        <span className="text-muted-foreground italic">Not provided</span>
                                    )}
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                    <CardContent className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild variant="outline" className="flex-1">
                                <Link href="/orders">
                                    <ShoppingBag className="size-4" />
                                    My Orders
                                </Link>
                            </Button>
                            <Button asChild className="flex-1">
                                <Link href="/products">Browse Products</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
