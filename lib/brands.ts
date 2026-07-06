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
  "anmol-kanodia": {
    // 1. URL ka path badalne ke liye is key ko badlein (e.g., website.com/anmol-kanodia)
    id: "anmol-kanodia", // Isko upar ki key ke sath hamesha match rakhin taaki dynamic route load ho sake
    name: "Anmol Kanodia", // Short/internal brand name
    displayName: "Anmol Kanodia", // Frontend par page heading aur title ke liye display name
    email: "enquiries@anmol.qa", // Contact ke liye email address
    description: "Premium Halal Meats of Qatar", // Subheading/description text
    tagline:
      "Anmol Kanodia, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.", // Brand page introduction tagline
    phone: "+974 4000 5678", // Dynamic telephone contact number
    whatsapp: "https://wa.me/97450005678?text=Hello%20Anmol%20Kanodia%2C%20I%27d%20like%20to%20place%20an%20order.", // Direct Whatsapp order redirect URL
  },
  "twinkle-shah": {
    id: "twinkle-shah",
    name: "Twinkle Shah",
    displayName: "Twinkle Shah onkar pvt limited",
    email: "enquiries@twinkleshah.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Twinkle Shah, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Twinkle%20Shah%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  "qatar-meat-production": {
    id: "qatar-meat-production",
    name: "Qatar Meat Production",
    displayName: "Qatar Meat Production",
    email: "enquiries@qatarmeatproduction.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Qatar Meat Production, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Qatar%20Meat%20Production%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  "fresh-meat-factory": {
    id: "fresh-meat-factory",
    name: "Fresh Meat Factory",
    displayName: "Fresh Meat Factory",
    email: "enquiries@freshmeatfactory.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Fresh Meat Factory, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Fresh%20Meat%20Factory%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  "al-qusaimi-meat-co": {
    id: "al-qusaimi-meat-co",
    name: "Al Qusaimi Meat Co.",
    displayName: "Al Qusaimi Meat Co.",
    email: "enquiries@alqusaimimeatco.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Al Qusaimi Meat Co., premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Al%20Qusaimi%20Meat%20Co%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  "al-touqa-meat-company": {
    id: "al-touqa-meat-company",
    name: "Al Touqa Meat Company",
    displayName: "Al Touqa Meat Company",
    email: "enquiries@altouqameatcompany.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Al Touqa Meat Company, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Al%20Touqa%20Meat%20Company%2C%20I%27d%20like%20to%20place%20an%20order.",
  },
  "saboor-company": {
    id: "saboor-company",
    name: "Saboor Company",
    displayName: "Saboor Company",
    email: "enquiries@saboorcompany.qa",
    description: "Premium Halal Meats of Qatar",
    tagline:
      "Saboor Company, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
    phone: "+974 4000 1234",
    whatsapp: "https://wa.me/97450001234?text=Hello%20Saboor%20Company%2C%20I%27d%20like%20to%20place%20an%20order.",
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

