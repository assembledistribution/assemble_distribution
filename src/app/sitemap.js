import { getApiUrl } from '@/utils/api';

const CATEGORIES = [
  'art-craft',
  'toys-games',
  'garden-outdoor',
  'office-products',
  'home-kitchen',
  'health-household',
  'tools-home-improvement',
  'sports-outdoors',
  'industrial-scientific',
  'automotive-parts-accessories',
  'pet-supplies',
];

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.assembledistribution.com';
  const now = new Date().toISOString();

  // Static core routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/distributor-signup`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Category routes
  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop/${cat}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Dynamic Product routes
  let productRoutes = [];
  try {
    const API_URL = getApiUrl();
    const res = await fetch(`${API_URL}/products`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const products = await res.json();
      if (Array.isArray(products)) {
        productRoutes = products.map((prod) => ({
          url: `${baseUrl}/product/${prod.id || prod._id}`,
          lastModified: prod.updatedAt || prod.createdAt || now,
          changeFrequency: 'weekly',
          priority: 0.75,
        }));
      }
    }
  } catch (err) {
    console.error('Sitemap fetch products error:', err);
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
