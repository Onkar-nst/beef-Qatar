/* ------------------------------------------------------------------ */
/*  Single source of truth for primal cuts + their retail steaks.      */
/*  Shared by the interactive cow diagram (panel) and the per-steak    */
/*  detail pages at /cuts/[slug].                                       */
/* ------------------------------------------------------------------ */

export type CookMethod = "grill" | "pan" | "roast" | "braise";

export type Steak = {
  name: string;
  sub: string;
  img: string;
  /** Trade name + cut reference, shown under the title. */
  code: string;
  description: string;
  methods: CookMethod[];
};

export type Primal = {
  id: string;
  /** Heading used by the diagram panel, e.g. "RIB CUTS". */
  title: string;
  /** Short label for the mini-diagram caption, e.g. "Rib". */
  label: string;
  items: Steak[];
};

export const PRIMALS: Record<string, Primal> = {
  chuck: {
    id: "chuck",
    title: "CHUCK CUTS",
    label: "Chuck",
    items: [
      { name: "COWBOY STEAK", sub: "(Bone-in Ribeye)", img: "/images/ribeye.jpg", code: "OP Rib · 2090", description: "A bone-in ribeye with the rib handle left long. Generous intramuscular marbling bastes the meat as it cooks, delivering deep, beefy flavour and a striking presentation at the table.", methods: ["grill", "pan", "roast"] },
      { name: "RUMP ROAST", sub: "(Bottom Half)", img: "/images/steak-board.jpg", code: "Rump · 2091", description: "A lean, full-flavoured roasting cut from the hindquarter. Best taken to medium-rare and rested, then carved thin across the grain for tender, satisfying slices.", methods: ["roast", "grill"] },
      { name: "NEW YORK STRIP", sub: "(Strip Loin)", img: "/images/steak-sliced.jpg", code: "Striploin · 2140", description: "Firm-textured and richly marbled with a defined fat cap that renders to crisp, savoury edges. A steakhouse classic that rewards a hot, fast sear.", methods: ["grill", "pan"] },
      { name: "PORTERHOUSE", sub: "(Short Loin)", img: "/images/steak-small.jpg", code: "Striploin · 2140", description: "The strip loin steak cut thick and on the bone. Balanced marbling and a clean, beefy character make it a confident choice for the grill.", methods: ["grill", "pan", "roast"] },
      { name: "FILET MIGNON", sub: "(Tenderloin)", img: "/images/ribeye.jpg", code: "Tenderloin · 2150", description: "The most tender cut on the animal, buttery, fine-grained and mild. Sear hard for a caramelised crust while keeping the centre blushing and soft.", methods: ["pan", "grill", "roast"] },
      { name: "FLANKEN RIBS", sub: "(Short Ribs)", img: "/images/steak-board.jpg", code: "Short Rib · 2470", description: "Short ribs cut thin across the bones. Quick over fierce heat or slow-braised until the meat falls away, either way, intensely savoury and rich.", methods: ["grill", "braise"] },
      { name: "TOMAHAWK", sub: "(Long Bone Ribeye)", img: "/images/steak-sliced.jpg", code: "OP Rib · 2090", description: "A ribeye with the entire rib bone frenched into a long handle. Showpiece marbling and an unmistakable silhouette, built for slow roasting then a finishing sear.", methods: ["roast", "grill"] },
    ],
  },
  rib: {
    id: "rib",
    title: "RIB CUTS",
    label: "Rib",
    items: [
      { name: "RIBEYE STEAK", sub: "(Prime Rib)", img: "/images/ribeye.jpg", code: "Cube Roll · 2090", description: "Cut from the rib primal, the ribeye is prized for its abundant marbling and the soft cap of fat that frames the eye. As it cooks, that fat renders through the muscle for a juicy, full-bodied flavour that defines premium Halal beef.", methods: ["grill", "pan", "roast"] },
      { name: "BACK RIBS", sub: "(Beef Ribs)", img: "/images/steak-board.jpg", code: "Rib Prepared · 2335", description: "The meat between the rib bones, lean, flavourful and made for low, slow cooking. Smoke or roast until tender and the connective tissue melts into the meat.", methods: ["roast", "braise"] },
      { name: "BEEF MINCE", sub: "(Trim)", img: "/images/beef-mince.jpg", code: "Trim Mince · 2580", description: "Coarse-ground from the lean trim left after the rib is portioned, so nothing premium is wasted. A clean, all-purpose mince with a true beefy flavour, brown it hard for ragù and bolognese, or pack it into burgers, meatballs and koftas.", methods: ["pan", "braise"] },
    ],
  },
  short_loin: {
    id: "short_loin",
    title: "SHORT LOIN CUTS",
    label: "Short Loin",
    items: [
      { name: "PORTERHOUSE", sub: "(Thick Cut)", img: "/images/steak-small.jpg", code: "Short Loin · 2120", description: "A T-bone with a larger portion of tenderloin. Two textures from one steak, the firm strip on one side, the silky fillet on the other, both at their best cooked over coals.", methods: ["grill", "pan"] },
      { name: "T-BONE", sub: "(Classic Cut)", img: "/images/steak-board.jpg", code: "Short Loin · 2138", description: "Named for the T-shaped bone that separates two prized muscles: tender fillet and robust strip loin. A grilling icon with bold, honest beef flavour.", methods: ["grill", "pan"] },
    ],
  },
  sirloin: {
    id: "sirloin",
    title: "SIRLOIN CUTS",
    label: "Sirloin",
    items: [
      { name: "TOP SIRLOIN", sub: "(Lean Steak)", img: "/images/steak-sliced.jpg", code: "Rump · 2091", description: "Lean and boldly flavoured with a satisfying chew. Versatile and forgiving, excellent grilled whole or sliced for the pan.", methods: ["grill", "pan", "roast"] },
      { name: "TRI-TIP", sub: "(Roast)", img: "/images/ribeye.jpg", code: "Tri-Tip · 2120", description: "A triangular muscle from the bottom sirloin, rich and beefy with a loose grain. Roast or grill to medium-rare, then slice across the changing grain to keep every piece tender.", methods: ["roast", "grill"] },
    ],
  },
  round: {
    id: "round",
    title: "ROUND CUTS",
    label: "Round",
    items: [
      { name: "EYE OF ROUND", sub: "(Roast)", img: "/images/steak-board.jpg", code: "Eye Round · 2040", description: "A very lean, even-grained cut from the hindquarter. Best slow-roasted to medium-rare and carved paper-thin, or cured for cold cuts.", methods: ["roast", "braise"] },
      { name: "BOTTOM ROUND", sub: "(Roast)", img: "/images/steak-small.jpg", code: "Silverside · 2020", description: "A lean, economical roasting cut with a clean flavour. Rewards gentle, moist cooking, braise or pot-roast until fork-tender.", methods: ["braise", "roast"] },
    ],
  },
  brisket: {
    id: "brisket",
    title: "BRISKET",
    label: "Brisket",
    items: [
      { name: "BRISKET FLAT", sub: "(Lean)", img: "/images/ribeye.jpg", code: "Brisket · 2320", description: "The leaner half of the brisket, with a uniform shape that slices cleanly. Made for the long haul, smoke or braise low and slow until the collagen turns silken.", methods: ["braise", "roast"] },
      { name: "BRISKET POINT", sub: "(Fatty)", img: "/images/steak-sliced.jpg", code: "Brisket · 2321", description: "The richer, fattier half, heavily marbled and forgiving over long cooks. Renders into deeply savoury, melting meat that's perfect for burnt ends.", methods: ["braise", "roast"] },
    ],
  },
  plate: {
    id: "plate",
    title: "SHORT PLATE",
    label: "Plate",
    items: [
      { name: "SKIRT STEAK", sub: "(Fajita Cut)", img: "/images/steak-sliced.jpg", code: "Skirt · 2210", description: "A long, loose-grained cut packed with flavour. Marinate, sear hot and fast, then slice thin across the grain, the classic choice for fajitas and tacos.", methods: ["grill", "pan"] },
      { name: "SHORT RIBS", sub: "(Braising)", img: "/images/steak-board.jpg", code: "Short Rib · 2470", description: "Thick, meaty ribs laid over the bone. Built for braising, hours of gentle heat coax out a glossy, fall-apart richness.", methods: ["braise", "roast"] },
    ],
  },
  flank: {
    id: "flank",
    title: "FLANK CUTS",
    label: "Flank",
    items: [
      { name: "FLANK STEAK", sub: "(Grilling Cut)", img: "/images/ribeye.jpg", code: "Flank · 2200", description: "A broad, flat cut with a pronounced grain and a deep, beefy taste. Keep it to medium-rare, rest well and slice thin across the grain for tenderness.", methods: ["grill", "pan"] },
    ],
  },
  shank: {
    id: "shank",
    title: "SHANK",
    label: "Shank",
    items: [
      { name: "BEEF SHANK", sub: "(Osso Buco)", img: "/images/steak-small.jpg", code: "Shin · 2360", description: "A hard-working cut threaded with connective tissue and marrow. Braise slowly and it transforms, meltingly tender meat in a glossy, gelatin-rich sauce.", methods: ["braise"] },
    ],
  },
};

/* ---- Slug helpers (slugs are primal-scoped so names never collide) ---- */
export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const steakSlug = (primalId: string, name: string) =>
  `${primalId}-${slugify(name)}`;

export function getSteakBySlug(slug: string): { primal: Primal; steak: Steak } | null {
  for (const primal of Object.values(PRIMALS)) {
    for (const steak of primal.items) {
      if (steakSlug(primal.id, steak.name) === slug) return { primal, steak };
    }
  }
  return null;
}

export function allSteakSlugs(): string[] {
  const slugs: string[] = [];
  for (const primal of Object.values(PRIMALS)) {
    for (const steak of primal.items) slugs.push(steakSlug(primal.id, steak.name));
  }
  return slugs;
}

/* ---- Cow diagram geometry (viewBox 0 0 1017 619) for the mini map ---- */
export const COW_VIEWBOX = "0 0 1017 619";

export const PRIMAL_POLYS: Record<string, string[]> = {
  chuck: ["264,68,266,81,265,94,263,112,259,131,254,149,247,169,239,182,227,196,217,206,200,216,209,228,217,242,224,259,230,276,234,286,259,281,281,276,307,271,327,268,346,266,363,265,383,265,393,265,391,241,390,221,390,205,389,183,389,162,387,141,384,123,383,108,383,98,381,88"],
  rib: ["386,86,389,107,392,127,393,149,393,170,393,191,395,213,395,233,398,254,396,263,421,263,439,263,460,261,477,261,494,261,506,261,505,239,502,210,499,181,496,158,492,140,489,123,485,106,479,91"],
  short_loin: ["484,90,487,100,493,114,496,130,499,145,501,161,504,178,506,197,507,218,509,233,510,248,511,263,528,264,547,265,567,265,586,265,603,267,606,247,604,223,603,201,600,180,597,160,593,137,587,112,577,90"],
  sirloin: ["581,89,590,106,596,129,601,154,606,177,608,197,608,212,610,232,608,252,607,266,631,269,658,273,676,277,693,289,708,302,716,309,721,286,721,266,721,247,720,230,718,210,717,193,717,174,714,156,711,136,708,120,703,103,690,81"],
  round: ["696,79,706,97,714,122,717,146,721,173,723,194,726,223,726,256,726,283,723,312,748,312,774,316,800,322,820,323,830,296,838,269,843,250,857,239,857,204,853,179,846,156,837,133,826,113,816,94,806,81,778,76"],
  brisket: ["237,293,266,284,297,279,327,274,359,272,393,270,396,302,396,339,394,353,333,359,313,366,287,360,269,347"],
  plate: ["399,267,399,289,401,306,403,325,400,345,396,352,421,356,441,350,457,349,476,349,490,349,510,353,526,353,541,353,561,350,584,346,593,325,597,309,600,294,603,272"],
  flank: ["590,346,598,325,604,303,607,282,606,269,634,270,653,273,668,277,681,286,691,293,701,300,711,312"],
  shank: ["320,368,329,381,334,395,339,406,344,419,356,421,369,406,377,394,383,381,390,366,394,359,354,359", "708,319,730,332,747,346,761,356,777,366,790,372,807,376,816,362,814,347,813,327,754,315"],
};

export const COOK_LABELS: Record<CookMethod, string> = {
  grill: "Grill",
  pan: "Pan-Sear",
  roast: "Roast",
  braise: "Braise",
};

/* ------------------------------------------------------------------ */
/*  Product specifications, Saqr supplies premium Halal cuts, so each  */
/*  cut page reads as a wholesale/retail spec sheet (formats,           */
/*  packaging, grade, Halal) rather than a consumer recipe.            */
/* ------------------------------------------------------------------ */
export type Spec = { label: string; value: string };

/** Pulls the cut-code number out of a code string like "Cube Roll · 2090". */
export const ausMeatNo = (code: string) => code.split("·").pop()?.trim() ?? ", ";

export function specsFor(primal: Primal, steak: Steak): Spec[] {
  return [
    { label: "Primal", value: primal.label },
    { label: "Cut Code", value: ausMeatNo(steak.code) },
    { label: "Grade", value: "Premium" },
    { label: "Halal", value: "Certified" },
  ];
}

/** Available chilled/frozen formats, offered across the Saqr range. */
export const PRODUCT_FORMATS = ["Chilled", "Frozen"];

/** Retail-ready & bulk packaging options from Saqr's butchery. */
export const PACKAGING = [
  "Vacuum pack",
  "MAP retail tray",
  "Vacuum skin pack",
  "Bulk carton",
];

/** Channels Saqr supplies this product into. */
export const SUPPLY_CHANNELS = ["Retail", "Hotels & Restaurants", "Wholesale"];

/** Other cuts to surface at the foot of a cut page, same primal first. */
export function relatedCuts(
  primalId: string,
  excludeName: string,
  limit = 3,
): { primalId: string; steak: Steak }[] {
  const same = (PRIMALS[primalId]?.items ?? [])
    .filter((s) => s.name !== excludeName)
    .map((s) => ({ primalId, steak: s }));
  const others: { primalId: string; steak: Steak }[] = [];
  for (const p of Object.values(PRIMALS)) {
    if (p.id === primalId) continue;
    for (const s of p.items) others.push({ primalId: p.id, steak: s });
  }
  return [...same, ...others].slice(0, limit);
}
