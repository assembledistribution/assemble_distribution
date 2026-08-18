import './globals.css';

import { Poppins } from 'next/font/google';
import Providers from '@/components/Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Assemble Distribution — Wholesale Products',
    template: '%s | Assemble Distribution',
  },
  description:
    'Your trusted wholesale distributor for Art and Craft, Toys and Games, Garden and Outdoor products — delivered fast, priced right.',
  keywords: [
    'wholesale',
    'distribution',
    'art and craft',
    'toys and games',
    'garden and outdoor',
    'bulk products',
  ],
  openGraph: {
    title: 'Assemble Distribution — Wholesale Products',
    description:
      'Your trusted wholesale distributor for Art and Craft, Toys and Games, Garden and Outdoor products.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
