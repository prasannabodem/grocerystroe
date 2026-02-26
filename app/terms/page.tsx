import { FileText } from 'lucide-react';

const sections = [
    {
        title: '1. Acceptance of Terms',
        content: `By accessing or using FreshMart's website, mobile applications or services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services. FreshMart reserves the right to update these Terms at any time. Continued use after changes constitutes acceptance.`,
    },
    {
        title: '2. Use of Services',
        content: `FreshMart grants you a limited, non-exclusive, non-transferable licence to use our services for lawful, personal, non-commercial purposes. You agree not to:
• Use the services for any unlawful purpose or in violation of any regulations
• Attempt to gain unauthorised access to any part of the services
• Interfere with or disrupt the integrity or performance of the services
• Scrape, crawl or otherwise extract data from our platform
• Use our services if you are under 18 years of age without parental consent`,
    },
    {
        title: '3. Account Registration',
        content: `To place orders, you may need to create an account. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account. FreshMart is not liable for any loss resulting from unauthorised account use.`,
    },
    {
        title: '4. Orders and Payments',
        content: `By placing an order, you make an offer to purchase products at the displayed price. We reserve the right to refuse or cancel orders at our discretion (e.g., for pricing errors or suspected fraud). Payment is charged at the time of order confirmation. All prices are in USD and inclusive of applicable taxes where displayed.`,
    },
    {
        title: '5. Product Availability and Substitutions',
        content: `Product availability is subject to change. In the event an item is out of stock, we may substitute it with a similar product of equal or greater value. You may reject substitutions upon delivery. FreshMart is not liable for unavailability of specific products.`,
    },
    {
        title: '6. Delivery',
        content: `Delivery times are estimates and not guaranteed. FreshMart is not liable for delays caused by circumstances beyond our control (e.g., severe weather, traffic, force majeure). Risk of loss and title for items purchased pass to you upon delivery.`,
    },
    {
        title: '7. Returns and Refunds',
        content: `Returns and refunds are governed by our Returns Policy, which is incorporated into these Terms by reference. Please visit our Returns page for full details.`,
    },
    {
        title: '8. Intellectual Property',
        content: `All content on the FreshMart platform, including text, images, logos, software and data, is the property of FreshMart Inc. or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute or create derivative works without our prior written consent.`,
    },
    {
        title: '9. Disclaimer of Warranties',
        content: `FreshMart's services are provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that the services will be uninterrupted, error-free or free of viruses. To the maximum extent permitted by law, FreshMart disclaims all warranties.`,
    },
    {
        title: '10. Limitation of Liability',
        content: `To the maximum extent permitted by law, FreshMart shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the services. Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid to FreshMart in the 30 days prior to the claim.`,
    },
    {
        title: '11. Governing Law',
        content: `These Terms are governed by the laws of the State of New York, USA, without regard to conflict of law principles. Any disputes shall be resolved exclusively in the courts located in New York County, New York.`,
    },
    {
        title: '12. Contact',
        content: `For questions about these Terms, please contact:
Email: legal@freshmart.com
Address: FreshMart Inc., 123 Market Street, New York, NY 10001`,
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="size-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="size-7 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: February 20, 2026</p>
                </div>

                <div className="bg-muted/50 rounded-xl p-5 mb-8 text-sm text-muted-foreground">
                    Please read these Terms of Service carefully before using FreshMart. These Terms constitute a legally binding agreement between you and FreshMart Inc. governing your use of our website and services.
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
