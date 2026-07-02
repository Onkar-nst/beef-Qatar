/* ================================================================ */
/*  BRANDS/COMPANIES LIST                                           */
/*  Central source of truth for brand names used throughout site   */
/*  Edit here and all references update automatically              */
/* ================================================================ */

export type Brand = {
  id: string;
  name: string;
  displayName: string;
  email: string;
  description: string;
  tagline: string;
  phone?: string;
  whatsapp?: string;
};

/**
 * Your brands/companies list.
 * Add more items here and they'll be available at /{id}
 * Example: /saqr, /another-brand, /third-brand, etc.
 */
export const BRANDS: Record<string, Brand> = {
  test: {
    id: "test",
    name: "test",
    displayName: "test",
    email: "enquiries@test.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "test, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 0000",
    whatsapp: "https://wa.me/97450000000?text=Hello%20test%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  saqr: {
    id: "saqr",
    name: "Saqr",
    displayName: "Saqr",
    email: "enquiries@saqr.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Saqr, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Saqr%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  anmol: {
    id: "anmol",
    name: "anmol",
    displayName: "anmol",
    email: "enquiries@anmol.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "anmol, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 5678",
    whatsapp: "https://wa.me/97450005678?text=Hello%20anmol%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
};

/**
 * Get brand by ID (slug)
 * Returns the default brand (test) if not found, or null based on your preference
 */
export function getBrandBySlug(slug: string): Brand | null {
  return BRANDS[slug] ?? null;
}

/**
 * Get all brand slugs for static generation
 */
export function getAllBrandSlugs(): string[] {
  return Object.keys(BRANDS);
}

/**
 * Get the default/primary brand (used for site-wide defaults)
 */
export function getDefaultBrand(): Brand {
  return BRANDS.test;
}

