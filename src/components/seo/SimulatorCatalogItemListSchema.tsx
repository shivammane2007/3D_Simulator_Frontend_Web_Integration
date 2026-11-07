import { PROCEDURES } from '@/data/procedures';

interface SimulatorCatalogItemListSchemaProps {
  locale?: string;
  limit?: number;
}

export default function SimulatorCatalogItemListSchema({
  locale = 'en',
  limit = 30,
}: SimulatorCatalogItemListSchemaProps) {
  const baseUrl = 'https://www.faceifylabs.com';
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  const items = PROCEDURES.filter((p) => p.simulateSlug && !p.comingSoon)
    .slice(0, limit)
    .map((p, i) => ({
      '@type': 'ListItem' as const,
      position: i + 1,
      url: `${baseUrl}${localePrefix}/simulate/${p.simulateSlug}`,
      name: p.name,
    }));

  if (items.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Faceify Labs: AI Plastic Surgery Simulator Catalog',
    description:
      'Browse the full catalog of AI-powered plastic surgery, dental, and aesthetic simulators.',
    numberOfItems: items.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: items,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

