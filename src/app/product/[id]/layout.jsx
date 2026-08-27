import { getApiUrl, getHighResImageUrl } from '@/utils/api';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.assembledistribution.com';

async function getProduct(id) {
  try {
    const API_URL = getApiUrl();
    const res = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Error fetching product for metadata:', err);
  }
  return null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: 'Wholesale Product | Assemble Distribution',
      description: 'Explore verified USA wholesale products at bulk pricing.',
    };
  }

  const title = `${product.title} | USA Wholesale`;
  const description =
    product.shortDescription ||
    (product.description && product.description.length > 150
      ? `${product.description.substring(0, 150)}...`
      : product.description) ||
    `Wholesale ${product.title} available for bulk purchasing at Assemble Distribution USA.`;
  const image = getHighResImageUrl(product.imageUrl || (product.images && product.images[0]));

  return {
    title,
    description,
    alternates: {
      canonical: `/product/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/product/${id}`,
      images: image ? [{ url: image, alt: product.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

export default async function ProductLayout({ children, params }) {
  const { id } = await params;
  const product = await getProduct(id);

  let jsonLdProduct = null;
  if (product) {
    const highResImg = getHighResImageUrl(product.imageUrl || (product.images && product.images[0]));
    const priceVal = parseFloat(product.price) || 0;

    jsonLdProduct = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      image: highResImg ? [highResImg] : [],
      description: product.description || product.shortDescription || product.title,
      sku: product.asin || product.id || id,
      mpn: product.asin || id,
      brand: {
        '@type': 'Brand',
        name: product.brand || 'Assemble Distribution',
      },
      offers: {
        '@type': 'Offer',
        url: `${SITE_URL}/product/${id}`,
        priceCurrency: 'USD',
        price: priceVal > 0 ? priceVal.toFixed(2) : '0.00',
        priceValidUntil: '2027-12-31',
        itemCondition: 'https://schema.org/NewCondition',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'Assemble Distribution',
        },
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: '0.00',
            currency: 'USD',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'US',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 2,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 3,
              maxValue: 7,
              unitCode: 'DAY',
            },
          },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'US',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: 14,
          returnMethod: 'https://schema.org/ReturnByMail',
          returnFees: 'https://schema.org/FreeReturn',
        },
      },
    };
  }

  return (
    <>
      {jsonLdProduct && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }}
        />
      )}
      {children}
    </>
  );
}
