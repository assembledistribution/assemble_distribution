const categoryTitleMap = {
  'art-craft': 'Art, Craft & Sewing',
  'art-craft-sewing': 'Art, Craft & Sewing',
  'toys-games': 'Toys & Games',
  'garden-outdoor': 'Garden & Outdoor',
  'office-products': 'Office Products',
  'home-kitchen': 'Home & Kitchen',
  'health-household': 'Health & Household',
  'tools-home-improvement': 'Tools & Home Improvement',
  'sports-outdoors': 'Sports & Outdoors',
  'industrial-scientific': 'Industrial & Scientific',
  'automotive-parts-accessories': 'Automotive Parts & Accessories',
  'pet-supplies': 'Pet Supplies',
};

export async function generateMetadata({ params }) {
  const { category } = await params;
  const formattedCategory = categoryTitleMap[category] || (category ? category.replace(/-/g, ' ') : 'Wholesale');

  return {
    title: `Wholesale ${formattedCategory} | USA Bulk Distributor`,
    description: `Shop bulk ${formattedCategory} products at wholesale rates. Verified USA inventory, direct manufacturer supply, and fast nationwide delivery.`,
    alternates: {
      canonical: `/shop/${category}`,
    },
    openGraph: {
      title: `Wholesale ${formattedCategory} — Assemble Distribution USA`,
      description: `Bulk wholesale catalog for ${formattedCategory}. Sourced for retail stores, e-commerce merchants, and B2B buyers.`,
      url: `/shop/${category}`,
    },
  };
}

export default function CategoryLayout({ children }) {
  return children;
}
