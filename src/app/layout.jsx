import './globals.css';
import { Poppins } from 'next/font/google';
import Providers from '@/components/Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.assembledistribution.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Assemble Distribution | USA Wholesale Distributor & B2B Supply',
    template: '%s | Assemble Distribution',
  },
  description:
    'Trusted wholesale distributor across the United States for Art, Craft & Sewing, Toys & Games, Home & Kitchen, Garden & Outdoor, Tools, and Office Supplies. Fast nationwide shipping & tier bulk pricing for retailers.',
  keywords: [
    'USA wholesale distributor',
    'B2B wholesale supplier USA',
    'wholesale products for retailers',
    'wholesale art craft sewing supplies',
    'wholesale toys and games USA',
    'garden outdoor wholesale distributor',
    'bulk merchandise supplier USA',
    'wholesale distributor application',
    'reseller inventory distributor',
    'wholesale supply warehouse USA',
  ],
  applicationName: 'Assemble Distribution',
  authors: [{ name: 'Assemble Distribution', url: SITE_URL }],
  creator: 'Assemble Distribution',
  publisher: 'Assemble Distribution',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Assemble Distribution | USA Wholesale Distributor & B2B Supply',
    description:
      'Connecting US retailers and e-commerce stores with verified manufacturers. Fast nationwide freight delivery and volume wholesale pricing.',
    url: SITE_URL,
    siteName: 'Assemble Distribution',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/brands/gildan.png`,
        width: 1200,
        height: 630,
        alt: 'Assemble Distribution — Premier Wholesale Supply in the USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Assemble Distribution | USA Wholesale Distributor & B2B Supply',
    description:
      'Premier US wholesale distributor for retailers, department stores, and online merchants.',
    images: [`${SITE_URL}/brands/gildan.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'Business & Industrial Wholesale Distribution',
};

// JSON-LD Schemas for USA Audience & Local Business
const jsonLdWholesale = {
  '@context': 'https://schema.org',
  '@type': 'WholesaleStore',
  '@id': `${SITE_URL}/#organization`,
  name: 'Assemble Distribution',
  url: SITE_URL,
  logo: `${SITE_URL}/Assemble-distribution (1).png`,
  description:
    'Premier B2B wholesale distributor in the United States supplying retailers, department stores, and e-commerce merchants with quality merchandise.',
  telephone: '+1-800-555-0192',
  email: 'support@assembledistribution.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Business Avenue, Suite 400',
    addressLocality: 'New York',
    addressRegion: 'NY',
    postalCode: '10001',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 40.7128,
    longitude: -74.006,
  },
  areaServed: [
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  currenciesAccepted: 'USD',
  paymentAccepted: 'Wire Transfer, Credit Card, Net 30 Terms',
  priceRange: '$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-555-0192',
    contactType: 'sales and customer service',
    areaServed: 'US',
    availableLanguage: ['English'],
  },
};

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Assemble Distribution',
  description: 'Wholesale Products & B2B Inventory Distribution in the United States',
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" className={poppins.variable} suppressHydrationWarning>
      <head>
        {/* Favicon is auto-detected from src/app/icon.png by Next.js */}
        {/* USA Geographic & Location Meta Tags */}
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="New York" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />
        <meta name="target_country" content="US" />
        <meta name="coverage" content="United States" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />

        {/* Structured Data: WholesaleStore & WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWholesale) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
