import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Beef,
  Hash,
  Award,
  MapPin,
  Snowflake,
  Package,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import CowMini from "@/components/ui/CowMini";
import {
  allSteakSlugs,
  getSteakBySlug,
  specsFor,
  PRODUCT_FORMATS,
  PACKAGING,
  SUPPLY_CHANNELS,
  relatedCuts,
  steakSlug,
} from "@/lib/cuts";

const SPEC_ICON: Record<string, typeof Beef> = {
  Primal: Beef,
  "AUS-MEAT No.": Hash,
  Grade: Award,
  Origin: MapPin,
};

export function generateStaticParams() {
  return allSteakSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = getSteakBySlug(slug);
  if (!found) return { title: "Cut not found — ACC" };
  return {
    title: `${found.steak.name} — ACC`,
    description: found.steak.description,
  };
}

export default async function CutDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getSteakBySlug(slug);
  if (!found) notFound();
  const { primal, steak } = found;
  const specs = specsFor(primal, steak);
  const related = relatedCuts(primal.id, steak.name, 3);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#fcfaf6] font-[var(--font-sans)] text-[#2c2623]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20 lg:pt-36">
        {/* ── Top-left wayfinding cow ── */}
        <div className="flex flex-col items-start">
          <Link
            href="/#cuts"
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2c2623]/55 transition-colors hover:text-[#191851]"
          >
            ← The Cuts
          </Link>
          <CowMini active={primal.id} className="w-28 sm:w-32" />
          <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.4em] text-[#b9ad9c]">
            {primal.label} Primal
          </span>
        </div>

        {/* ── Hero stage: disc + cut + recommended cooking ── */}
        <div className="relative mx-auto -mt-6 w-full max-w-3xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#efe9e0] sm:w-[440px] lg:w-[520px]"
          />

          <div className="relative z-10 flex justify-center py-6">
            <div className="aspect-square w-[230px] overflow-hidden rounded-full shadow-[0_36px_60px_-24px_rgba(28,26,25,0.55)] ring-1 ring-black/5 sm:w-[330px] lg:w-[400px]">
              <img src={steak.img} alt={steak.name} className="h-full w-full object-cover" />
            </div>
          </div>

        </div>

        {/* ── Cut identity + product specification ── */}
        <div className="relative mt-14 grid gap-12 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* LEFT — identity, description, key specs, actions */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-16 border-t-2 border-dashed border-[#2c2623]/40" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#191851]">Retail Cut</span>
            </div>

            <h1 className="font-[var(--font-display)] text-3xl font-bold uppercase leading-tight tracking-[0.04em] text-[#2c2623] sm:text-4xl lg:text-5xl">
              {steak.name}
              <span className="text-[#2c2623]/35">, {steak.code}</span>
            </h1>

            <p className="mt-3 font-[var(--font-serif)] text-base italic text-[#2c2623]/55">{steak.sub}</p>

            <p className="mt-6 text-[15px] leading-relaxed text-[#2c2623]/75">{steak.description}</p>

            {/* key specs */}
            <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-[#2c2623]/10 pt-7 sm:grid-cols-4">
              {specs.map((s) => {
                const Icon = SPEC_ICON[s.label] ?? Beef;
                return (
                  <div key={s.label} className="flex flex-col gap-1.5">
                    <dt className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#2c2623]/45">
                      <Icon className="h-3.5 w-3.5 text-[#191851]" strokeWidth={1.8} />
                      {s.label}
                    </dt>
                    <dd className="text-[13px] font-semibold text-[#2c2623]">{s.value}</dd>
                  </div>
                );
              })}
            </dl>

            {/* actions */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="mailto:enquiries@accbeef.net.au"
                className="bg-[#191851] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-85"
              >
                Enquire about this cut
              </a>
              <a
                href="mailto:enquiries@accbeef.net.au?subject=Spec%20sheet%20request"
                className="border-2 border-[#191851] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#191851] transition-colors hover:bg-[#191851] hover:text-white"
              >
                Request spec sheet
              </a>
            </div>
          </div>

          {/* RIGHT — product specification card */}
          <div className="rounded-2xl bg-white/60 p-7 ring-1 ring-[#2c2623]/10 sm:p-8 lg:p-9">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#191851]">
              Product Specification
            </span>

            {/* formats */}
            <div className="mt-6">
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2c2623]/70">
                <Snowflake className="h-4 w-4 text-[#2c2623]/50" strokeWidth={1.8} />
                Available formats
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCT_FORMATS.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-[#2c2623]/15 bg-[#fcfaf6] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#2c2623]/75"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* packaging */}
            <div className="mt-7">
              <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#2c2623]/70">
                <Package className="h-4 w-4 text-[#2c2623]/50" strokeWidth={1.8} />
                Packaging
              </h3>
              <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {PACKAGING.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[14px] text-[#2c2623]/80">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#191851]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* supply channels */}
            <div className="mt-7 border-t border-[#2c2623]/10 pt-6">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2c2623]/70">Supplied to</h3>
              <p className="mt-2 text-[14px] text-[#2c2623]/80">{SUPPLY_CHANNELS.join(" · ")}</p>
              <p className="mt-4 font-[var(--font-serif)] text-[13px] italic leading-relaxed text-[#2c2623]/55">
                Cut and packed to your specification through Australia&apos;s largest vertically
                integrated beef supply chain — bred, fed and processed under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────── */}
      {/*  MORE CUTS                                                    */}
      {/* ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#2c2623]/10 bg-white/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-10 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#2c2623]/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#2c2623]/45">More Cuts</span>
            <span className="h-px w-12 bg-[#2c2623]/20" />
          </div>

          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map(({ primalId, steak: s }) => (
              <Link
                key={`${primalId}-${s.name}`}
                href={`/cuts/${steakSlug(primalId, s.name)}`}
                className="group flex items-center gap-5 rounded-xl bg-white/70 p-5 ring-1 ring-[#2c2623]/10 transition-shadow hover:shadow-[0_20px_40px_-26px_rgba(28,26,25,0.6)]"
              >
                <div className="aspect-square w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-black/5">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h4 className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.08em] text-[#2c2623] transition-colors group-hover:text-[#191851]">
                    {s.name}
                  </h4>
                  <p className="mt-1 font-[var(--font-serif)] text-[12px] italic text-[#2c2623]/55">{s.sub}</p>
                  <span className="mt-2 inline-block text-[9px] font-bold uppercase tracking-[0.2em] text-[#b9ad9c]">
                    {s.code}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
