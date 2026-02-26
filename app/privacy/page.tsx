import { Shield } from 'lucide-react';

const sections = [
    {
        title: '1. Information We Collect',
        content: `We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This includes your name, email address, phone number, delivery address, and payment information (processed securely by our payment provider — we never store card numbers).

We also automatically collect certain information when you use FreshMart, including log data (IP address, browser type, pages visited), device information, and cookies or similar tracking technologies.`,
    },
    {
        title: '2. How We Use Your Information',
        content: `We use your information to:
• Process and fulfil your orders and send related communications
• Create and manage your FreshMart account
• Send promotional offers and newsletters (you can opt out at any time)
• Improve our website, products and services
• Detect, investigate and prevent fraudulent or illegal activities
• Comply with legal obligations`,
    },
    {
        title: '3. Sharing Your Information',
        content: `We do not sell your personal data. We share your information only with trusted third parties necessary to operate our services, including:
• Delivery partners (name, phone, address for delivery purposes)
• Payment processors (for secure payment handling)
• Cloud infrastructure providers (for hosting and storage)
• Analytics providers (aggregated, anonymised data only)

All third parties are contractually bound to protect your data in line with this policy.`,
    },
    {
        title: '4. Cookies',
        content: `We use cookies and similar technologies to remember your preferences, keep you signed in, understand how you use our site and tailor our marketing. You can control cookie settings from your browser. Disabling certain cookies may limit your ability to use some features of FreshMart.`,
    },
    {
        title: '5. Data Retention',
        content: `We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@freshmart.com. Some data may be retained for legal compliance purposes.`,
    },
    {
        title: '6. Your Rights',
        content: `Depending on your location, you may have rights regarding your personal data, including the right to access, correct, delete or port your data, and the right to object to or restrict certain processing. To exercise these rights, contact us at privacy@freshmart.com.`,
    },
    {
        title: '7. Security',
        content: `We use industry-standard security measures to protect your data, including TLS encryption, secure data centres, and regular security audits. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
    },
    {
        title: '8. Changes to This Policy',
        content: `We may update this Privacy Policy from time to time. We'll notify you of significant changes via email or a prominent notice on our website. Continued use of FreshMart after changes constitutes your acceptance of the revised policy.`,
    },
    {
        title: '9. Contact Us',
        content: `For privacy-related enquiries, contact us at:
Email: privacy@freshmart.com
Address: FreshMart Inc., 123 Market Street, New York, NY 10001`,
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="size-7 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
                    <p className="text-muted-foreground">
                        Last updated: February 20, 2026
                    </p>
                </div>

                <div className="bg-muted/50 rounded-xl p-5 mb-8 text-sm text-muted-foreground">
                    This Privacy Policy explains how FreshMart Inc. ("FreshMart", "we", "us" or "our") collects, uses and shares information about you when you use our website, mobile applications and services. Please read this carefully.
                </div>

                <div className="space-y-8">
                    {sections.map(({ title, content }) => (
                        <div key={title}>
                            <h2 className="text-xl font-semibold mb-3">{title}</h2>
                            <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                                {content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
