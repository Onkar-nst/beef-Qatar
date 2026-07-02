import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Beef,
  Hash,
  Award,
  ShieldCheck,
  Snowflake,
  Package,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import CowMini from "@/components/ui/CowMini";
import LandingPage from "@/components/ui/LandingPage";
import {
  getAllSimpleSlugs,
  getItemBySlug,
  specsFor,
  PRODUCT_FORMATS,
  PACKAGING,
  SUPPLY_CHANNELS,
  relatedCuts,
  simpleSlug,
} from "@/lib/cuts";
import { getBrandBySlug, getAllBrandSlugs } from "@/lib/brands";

const SPEC_ICON: Record<string, typeof Beef> = {
  Primal: Beef,
  "Cut Code": Hash,
  Grade: Award,
  Halal: ShieldCheck,
};

export function generateStaticParams() {
  // Generate params for both cuts and brands
  const cutParams = getAllSimpleSlugs().map((slug) => ({ slug }));
  const brandParams = getAllBrandSlugs().map((slug) => ({ slug }));
  return [...cutParams, ...brandParams];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  
  // Check if it's a brand first
  const foundBrand = getBrandBySlug(slug);
  if (foundBrand) {
    return {
      title: `${foundBrand.displayName} | ${foundBrand.description}`,
      description: foundBrand.tagline,
    };
  }
  
  // Check if it's a cut
  const found = getItemBySlug(slug);
  if (!found) return { title: "Item not found" };
  return {
    title: `${found.steak.name}`,
    description: found.steak.description,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Check if it's a brand
  const foundBrand = getBrandBySlug(slug);
  if (foundBrand) {
    return <LandingPage brand={foundBrand} />;
  }
  
  // Check if it's a cut
  const found = getItemBySlug(slug);
  if (!found) notFound();
  
  return <CutPageContent found={found} />;
}

/* ──────────────────────────────────────────────────── */
/*  BRAND PAGE CONTENT                                  */
/* ──────────────────────────────────────────────────── */

function BrandPageContent({ brand }: { brand: typeof getBrandBySlug extends (...args: any[]) => infer R ? Exclude<R, null> : never }) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FAF6EF] font-[var(--font-sans)] text-[#241B16]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pt-36">
        {/* Brand Header */}
        <div className="mb-12 flex flex-col gap-6 lg:gap-8">
          <div>
            <h1 className="font-[var(--font-display)] text-4xl font-bold uppercase leading-tight tracking-[0.04em] text-[#241B16] sm:text-5xl lg:text-6xl">
              {brand.displayName}
            </h1>
            <p className="mt-4 text-xl font-[var(--font-serif)] text-[#241B16]/70">
              {brand.description}
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={`mailto:${brand.email}`}
              className="bg-[#8A1538] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85"
            >
              Contact {brand.name}
            </a>
            <p className="text-[13px] text-[#241B16]/60">
              Email: <span className="font-mono">{brand.email}</span>
            </p>
          </div>
        </div>

        {/* Brand Info Card */}
        <div className="rounded-2xl bg-white/60 p-8 ring-1 ring-[#241B16]/10 lg:p-10">
          <div className="space-y-6">
            <div>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">
                About
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#241B16]/75">
                {brand.tagline}
              </p>
            </div>

            <div className="border-t border-[#241B16]/10 pt-6">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">
                Brand Details
              </h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#241B16]/50">
                    ID
                  </dt>
                  <dd className="mt-1 font-mono text-[13px] text-[#241B16]">
                    {brand.id}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#241B16]/50">
                    Email
                  </dt>
                  <dd className="mt-1 font-mono text-[13px] text-[#241B16]">
                    {brand.email}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#241B16]/50">
                    Name
                  </dt>
                  <dd className="mt-1 text-[13px] text-[#241B16]">
                    {brand.name}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#241B16]/50">
                    Display Name
                  </dt>
                  <dd className="mt-1 text-[13px] text-[#241B16]">
                    {brand.displayName}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="border-t border-[#241B16]/10 pt-6">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">
                URL Route
              </h2>
              <code className="mt-3 block rounded bg-[#241B16]/5 p-3 font-mono text-[13px] text-[#241B16]">
                /{brand.id}
              </code>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ──────────────────────────────────────────────────── */
/*  CUT PAGE CONTENT                                    */
/* ──────────────────────────────────────────────────── */
function CutPageContent({ found }: { found: { primal: typeof import("@/lib/cuts").PRIMALS[keyof typeof import("@/lib/cuts").PRIMALS]; steak: any } }) {
  const { primal, steak } = found;
  const specs = specsFor(primal, steak);
  const related = relatedCuts(primal.id, steak.name, 3);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FAF6EF] font-[var(--font-sans)] text-[#241B16]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pt-36">
        {/* ── Top-left wayfinding cow ── */}
        <div className="flex flex-col items-start">
          <Link
            href="/"
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#241B16]/55 transition-colors hover:text-[#8A1538]"
          >
            ← Back
          </Link>
          <CowMini active={primal.id} className="w-28 sm:w-32" />
          <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#B7A98E]">
            {primal.label} Primal
          </span>
        </div>

        {/* ── Hero stage: disc + cut + recommended cooking ── */}
        <div className="relative mx-auto -mt-6 w-full max-w-3xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFE6D6] sm:w-[440px] lg:w-[520px]"
          />

          <div className="relative z-10 flex justify-center py-6">
            <div className="aspect-square w-[230px] overflow-hidden rounded-full shadow-[0_36px_60px_-24px_rgba(36,27,22,0.55)] ring-1 ring-black/5 sm:w-[330px] lg:w-[400px]">
              <img src={steak.img} alt={steak.name} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* ── Cut identity + product specification ── */}
        <div className="relative mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT, identity, description, key specs, actions */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-16 border-t-2 border-dashed border-[#241B16]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">Retail Cut</span>
            </div>

            <h1 className="font-[var(--font-display)] text-3xl font-bold uppercase leading-tight tracking-[0.04em] text-[#241B16] sm:text-4xl lg:text-5xl">
              {steak.name}
              <span className="text-[#241B16]/35">, {steak.code}</span>
            </h1>

            <p className="mt-3 font-[var(--font-serif)] text-base text-[#241B16]/55">{steak.sub}</p>

            <p className="mt-6 text-[15px] leading-relaxed text-[#241B16]/75">{steak.description}</p>

            {/* key specs */}
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#241B16]/10 pt-7 sm:grid-cols-4">
              {specs.map((s) => {
                const Icon = SPEC_ICON[s.label] ?? Beef;
                return (
                  <div key={s.label} className="flex flex-col gap-1.5">
                    <dt className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#241B16]/45">
                      <Icon className="h-3.5 w-3.5 text-[#8A1538]" strokeWidth={1.8} />
                      {s.label}
                    </dt>
                    <dd className="text-[13px] font-semibold text-[#241B16]">{s.value}</dd>
                  </div>
                );
              })}
            </dl>

            {/* actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="mailto:enquiries@saqr.qa"
                className="bg-[#8A1538] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85"
              >
                Enquire about this cut
              </a>
              <a
                href="mailto:enquiries@saqr.qa?subject=Spec%20sheet%20request"
                className="border-2 border-[#8A1538] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A1538] transition-colors hover:bg-[#8A1538] hover:text-white"
              >
                Request spec sheet
              </a>
            </div>
          </div>

          {/* RIGHT, product specification card */}
          <div className="rounded-2xl bg-white/60 p-7 ring-1 ring-[#241B16]/10 sm:p-8 lg:p-9">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">
              Product Specification
            </span>

            {/* formats */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#241B16]/70">
                <Snowflake className="h-4 w-4 text-[#241B16]/50" strokeWidth={1.8} />
                Available formats
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCT_FORMATS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[#241B16]/15 bg-[#FAF6EF] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#241B16]/75"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* packaging */}
            <div className="mt-7">
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#241B16]/70">
                <Package className="h-4 w-4 text-[#241B16]/50" strokeWidth={1.8} />
                Packaging
              </h3>
              <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {PACKAGING.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-[#241B16]/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#8A1538]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* supply channels */}
            <div className="mt-7 border-t border-[#241B16]/10 pt-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#241B16]/70">Supplied to</h3>
              <p className="mt-2 text-[14px] text-[#241B16]/80">{SUPPLY_CHANNELS.join(" · ")}</p>
              <p className="mt-4 font-[var(--font-serif)] text-[13px] leading-relaxed text-[#241B16]/55">
                Cut and packed to your specification, sourced, Halal-slaughtered and prepared to order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  MORE CUTS                                                    */}
      {related.length > 0 && (
        <section className="border-t border-[#241B16]/8 py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 flex items-end justify-between gap-4 lg:mb-16">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-12 border-t-2 border-dashed border-[#241B16]/40" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">More</span>
                </div>
                <h2 className="font-[var(--font-display)] text-3xl font-bold uppercase tracking-[0.04em] text-[#241B16]">
                  Cuts from {primal.label}
                </h2>
              </div>
              <Link
                href="/#cuts"
                className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#241B16]/60 transition-colors hover:text-[#8A1538]"
              >
                View All →
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(({ steak: relSteak }) => (
                <Link
                  key={relSteak.name}
                  href={`/${simpleSlug(relSteak.name)}`}
                  className="group flex flex-col gap-3 transition-opacity hover:opacity-75"
                >
                  <div className="aspect-square overflow-hidden rounded-lg bg-[#EFE6D6]">
                    <img
                      src={relSteak.img}
                      alt={relSteak.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="text-[13px] font-bold uppercase tracking-[0.04em] text-[#241B16]">
                      {relSteak.name}
                    </p>
                    <p className="mt-0.5 text-[12px] text-[#241B16]/60">{relSteak.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
