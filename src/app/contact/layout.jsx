const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.assembledistribution.com';

export const metadata = {
  title: 'Contact Us | USA Wholesale Customer & Sales Support',
  description:
    'Get in touch with Assemble Distribution USA. Contact our wholesale sales and customer support team for inquiries, bulk pricing, and freight delivery assistance.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Assemble Distribution USA — B2B Wholesale Support',
    description: 'Direct contact with our USA wholesale account team for bulk purchasing and freight logistics.',
    url: '/contact',
  },
};

const jsonLdContact = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Assemble Distribution',
  url: `${SITE_URL}/contact`,
  description: 'Wholesale sales inquiries, customer support, and account assistance.',
  mainEntity: {
    '@type': 'Organization',
    name: 'Assemble Distribution',
    telephone: '+1-800-555-0192',
    email: 'support@assembledistribution.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-800-555-0192',
      contactType: 'customer support',
      areaServed: 'US',
      availableLanguage: 'English',
    },
  },
};

export default function ContactLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdContact) }}
      />
      {children}
    </>
  );
}
