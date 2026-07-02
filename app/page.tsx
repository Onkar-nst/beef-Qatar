"use client";
import { useEffect, useRef, useState } from "react";
import BeefCutsHero from "../components/ui/BeefCutsHero";
import BeefCutsHeroCentered from "../components/ui/BeefCutsHeroCentered";
import VanishText from "../components/ui/VanishText";
import Navbar from "../components/ui/Navbar";

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>(".reveal, .genie");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const ref = useReveal();

  // "From Farm to Door" mobile carousel — track which card is in view for the dots.
  const farmScrollRef = useRef<HTMLDivElement | null>(null);
  const [farmIdx, setFarmIdx] = useState(0);
  const onFarmScroll = () => {
    const el = farmScrollRef.current;
    if (!el) return;
    setFarmIdx(Math.round(el.scrollLeft / (el.scrollWidth / 5)));
  };

  return (
    <div ref={ref} className="min-h-screen bg-[#FAF6EF] font-[var(--font-sans)] text-[#241B16] overflow-x-hidden">
      <Navbar />
      


      {/* ========================================= */}
      {/* PRESENTATION BANNER FOR OPTION 1          */}
      {/* ========================================= */}
      {/* <div className="w-full bg-[#241B16] text-[#FAF6EF] text-center py-2 text-[10px] tracking-[0.3em] uppercase font-bold relative z-20">
        Presentation: Hero Option 1 (Split Layout)
      </div> */}

      {/* <BeefCutsHero /> */}

      {/* ========================================= */}
      {/* PRESENTATION BANNER FOR OPTION 2          */}
      {/* ========================================= */}
      {/* <div className="w-full bg-[#8A1538] text-white text-center py-2 text-[10px] tracking-[0.3em] uppercase font-bold relative z-20">
        Presentation: Hero Option 2 (Centered Layout)
      </div> */}

      {/* Hero + philosophy share ONE continuous pasture field that runs down to the marquee */}
      <div className="relative">
        {/* shared pasture background */}
        <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <img
            src="/cow-bg-hero.png"
            alt=""
            draggable={false}
            className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-bottom opacity-45"
          />
          {/* Maroon brand wash — ties the pasture to the Saqr burgundy */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply bg-gradient-to-br from-[#8A1538]/35 via-[#9E2447]/22 to-[#6E1230]/45"
          />
          {/* Soft gold glow keeps a warm Saqr accent */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-soft-light bg-gradient-to-t from-[#C9A24B]/28 via-transparent to-[#C9A24B]/12"
          />
          {/* Cream veil — lifts the whole field lighter and more subtle */}
          <div aria-hidden="true" className="absolute inset-0 bg-[#FAF6EF]/35" />
          {/* Fade the top into the cream so the nav + title stay clean */}
          <div className="absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-[#FAF6EF] via-[#FAF6EF]/60 to-transparent" />
          {/* Soften the bottom edge back to cream before the marquee */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF6EF] to-transparent" />
        </div>

        <BeefCutsHeroCentered />

      </div>

      {/* THE SAQR PROMISE — full-bleed maroon manifesto band */}
      <section id="philosophy" className="relative z-10 overflow-hidden bg-[#8A1538] text-[#FAF6EF] scroll-mt-24">
        {/* giant faint Arabic watermark — sits beside the 3rd pillar on mobile, centered on the band from lg up */}
        <span aria-hidden className="pointer-events-none absolute -right-[4vw] top-[84%] -translate-y-1/2 select-none font-[var(--font-serif)] text-[34vw] leading-none text-white/[0.05] lg:top-1/2">
          وعد
        </span>
        {/* thin gold hairlines top + bottom */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-[#C9A24B]/40" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-[#C9A24B]/40" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="reveal grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:items-center lg:gap-20">
            {/* LEFT — manifesto quote */}
            <div>
              <span className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.35em] text-[#E0C074]">
                The Saqr Promise
              </span>
              <p className="mt-7 font-[var(--font-display)] text-[2rem] font-medium leading-[1.16] sm:text-[2.8rem] sm:leading-[1.12]">
                One standard. One promise. From trusted farms to your table,{" "}
                <span className="font-[var(--font-serif)] text-[#E0C074]">every cut is certified Halal.</span>
              </p>
              <p className="mt-8 max-w-xl text-[14.5px] leading-relaxed text-[#FAF6EF]/70">
                Saqr brings Qatar a new standard in premium meat — 100% Halal-certified beef
                and lamb, sourced from trusted farms, slaughtered strictly to Zabiha rites and
                cut by master butchers here in Doha.
              </p>
            </div>

            {/* RIGHT — numbered promise pillars */}
            <div className="border-y border-white/15 divide-y divide-white/15">
              {[
                { n: "01", t: "Halal, always", d: "Zabiha-certified, no exceptions." },
                { n: "02", t: "Owned end-to-end", d: "Sourcing, slaughter, cutting, delivery." },
                { n: "03", t: "Our own table", d: "We sell only what we'd serve at home." },
              ].map((p) => (
                <div key={p.n} className="flex items-baseline gap-5 py-5">
                  <span className="font-[var(--font-display)] text-2xl font-bold text-[#E0C074]">{p.n}</span>
                  <div>
                    <div className="font-[var(--font-display)] text-lg font-semibold uppercase tracking-wide">{p.t}</div>
                    <p className="mt-1 text-[13px] text-[#FAF6EF]/65">{p.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE — editorial split + stat strip + numbered stepper */}
      <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24 scroll-mt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* LEFT — content */}
          <div className="reveal">
            <div className="flex items-center gap-3">
              <span className="font-[var(--font-display)] text-[13px] font-bold uppercase tracking-[0.4em] text-[#8A1538]">About</span>
              <span className="h-px w-16 bg-[#8A1538]/30" />
              <span className="font-[var(--font-serif)] text-[#C9A24B]">من نحن</span>
            </div>
            <h2 className="mt-6 font-[var(--font-display)] text-[2rem] font-semibold leading-[1.12] text-[#241B16] md:text-[2.6rem]">
              A Qatari meat house, built on a <span className="text-[#8A1538]">single standard</span>.
            </h2>
            <div className="mt-6 max-w-xl space-y-4 font-[var(--font-serif)] text-[15px] leading-relaxed text-[#241B16]/70">
              <p>
                <span className="font-semibold text-[#241B16]">Saqr</span> (صقر) supplies 100% Halal-certified beef
                and lamb to homes, hotels and restaurants across Qatar — sourced with care, cut with craft,
                delivered with speed.
              </p>
              <p>
                From farm to door we own the links that matter most, and hold every one of them to a single,
                uncompromising standard.
              </p>
            </div>
          </div>

          {/* RIGHT — rectangular image with an offset gold frame */}
          <div className="reveal relative mx-auto w-full max-w-[300px] lg:mx-0 lg:ml-auto lg:max-w-[340px]">
            <div aria-hidden className="absolute -right-3 -top-3 bottom-6 left-6 rounded-sm border border-[#C9A24B]/60" />
            <div className="relative overflow-hidden rounded-sm shadow-[0_30px_60px_-30px_rgba(36,27,22,0.55)]">
              <img
                src="/cowsection.jpg"
                alt="Saqr premium Halal cattle"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#241B16]/75 to-transparent p-5">
                <span className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.2em] text-[#FAF6EF]">
                  Raised right · 100% Halal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* process flow — swipeable carousel on mobile, connected grid on lg+ */}
        <div className="reveal mt-16 border-t border-[#8A1538]/15 pt-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-[var(--font-display)] text-[12px] font-bold uppercase tracking-[0.4em] text-[#8A1538]">
              From Farm to Door
            </span>
            <span className="h-px w-12 bg-[#C9A24B]" />
            <span className="font-[var(--font-serif)] text-sm text-[#C9A24B]">من المزرعة إلى بابك</span>
          </div>
          <div className="relative">
            <div
              ref={farmScrollRef}
              onScroll={onFarmScroll}
              className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-8 px-8 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-5">
              {[
                { t: "Trusted Farms", d: "Cattle & lamb raised on pasture by long-standing partner farms.", ar: "مزارع موثوقة" },
                { t: "Halal Slaughter", d: "Certified Zabiha process, supervised at every step.", ar: "ذبح حلال" },
                { t: "Master Butchers", d: "Precision cuts prepared by hand for each order.", ar: "جزارة متقنة" },
                { t: "Cold Chain", d: "Unbroken chilled handling that locks in freshness.", ar: "سلسلة تبريد" },
                { t: "Doha Delivery", d: "Fast, careful delivery to your door across Qatar.", ar: "توصيل الدوحة" },
              ].map((step, i) => (
                <div
                  key={step.t}
                  className="group relative flex w-[78%] shrink-0 snap-start flex-col gap-4 rounded-lg border border-[#8A1538]/10 bg-white/40 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A24B]/50 hover:bg-white hover:shadow-[0_24px_40px_-28px_rgba(138,21,56,0.45)] sm:w-auto sm:shrink"
                >
                  {/* number badge sitting on the baseline */}
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A24B]/50 bg-[#FAF6EF] font-[var(--font-display)] text-xl font-bold text-[#8A1538] shadow-sm transition-colors duration-300 group-hover:border-[#8A1538] group-hover:bg-[#8A1538] group-hover:text-[#FAF6EF]">
                    0{i + 1}
                  </span>
                  <div className="space-y-1.5">
                    <span className="block font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.1em] text-[#241B16]">
                      {step.t}
                    </span>
                    <span className="block font-[var(--font-serif)] text-[13px] leading-relaxed text-[#241B16]/60">
                      {step.d}
                    </span>
                  </div>
                  {/* connecting arrow between steps (lg+) */}
                  {i < 4 && (
                    <span
                      aria-hidden
                      className="absolute -right-2.5 top-7 z-10 hidden h-2 w-2 -translate-y-1/2 rotate-45 border-r border-t border-[#C9A24B] bg-[#FAF6EF] lg:block"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Dots — hint that more cards sit to the right (mobile only) */}
            <div className="mt-5 flex justify-center gap-2 sm:hidden">
              {[0, 1, 2, 3, 4].map((d) => (
                <span
                  key={d}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    d === farmIdx ? "w-5 bg-[#8A1538]" : "w-1.5 bg-[#8A1538]/25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HALAL ASSURANCE */}
      <section id="halal" className="relative z-10 scroll-mt-24 overflow-hidden bg-[#FAF6EF]">
        {/* faint gold + maroon motif backdrop */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 22%, #8A1538 0, transparent 38%), radial-gradient(circle at 86% 72%, #C9A24B 0, transparent 42%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* LEFT — certification seal (desktop only) */}
          <div className="reveal hidden lg:flex flex-col items-center">
            <img
              src="/images/halal-seal.svg"
              alt="Saqr — Certified Halal, Zabiha slaughtered"
              loading="lazy"
              className="float-slow w-56 sm:w-64 lg:w-72 drop-shadow-[0_24px_40px_-20px_rgba(138,21,56,0.5)]"
            />
            <span className="mt-6 font-[var(--font-serif)] text-2xl text-[#8A1538]">حلال ١٠٠٪</span>
          </div>

          {/* RIGHT — copy + assurance grid */}
          <div className="reveal relative">
            {/* Mobile watermark — small seal behind the title */}
            <img
              src="/images/halal-seal.svg"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 right-1 w-28 opacity-[0.13] select-none lg:hidden"
            />
            <span className="relative mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A1538]">
              <span className="h-px w-6 bg-[#8A1538]/60" />
              Halal Assurance · ضمان حلال
            </span>
            <h3 className="relative font-[var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-wide leading-[1.1] mb-6">
              <VanishText>
                Certified Halal, <span className="text-[#8A1538]">Without Compromise</span>
              </VanishText>
            </h3>
            <p className="max-w-xl font-[var(--font-serif)] text-[14px] leading-relaxed text-gray-600">
              Every animal is hand-slaughtered to strict Zabiha rites — facing the Qiblah, with the name of Allah pronounced — under qualified Islamic supervision. Nothing leaves our facility without full Halal assurance. It is the first promise of the Saqr name, never an afterthought.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Zabiha Slaughter", d: "Hand-slaughtered to Islamic rites — no compromise, no shortcuts." },
                { t: "Qualified Supervision", d: "Overseen and certified by a recognised Halal authority." },
                { t: "Full Traceability", d: "Every cut traceable from the source farm to your order." },
                { t: "Unbroken Cold Chain", d: "Chilled handling end-to-end for guaranteed freshness." },
              ].map((f) => (
                <div key={f.t} className="flex items-start gap-3.5 rounded-xl border border-[#8A1538]/12 bg-white/70 px-5 py-4">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#8A1538]/10 text-[#8A1538]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.08em] text-[#241B16]">{f.t}</div>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-gray-600">{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY — full-bleed dark split: content left, edge-bleed image right, metric rows */}
      <section id="quality" className="relative z-10 overflow-hidden bg-[#16100C] text-[#FAF6EF] scroll-mt-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 78% 28%, rgba(138,21,56,0.20), transparent 55%)" }}
        />
        <div className="relative grid lg:grid-cols-2">
          {/* LEFT — content (below the image on mobile) */}
          <div className="reveal order-2 flex flex-col justify-center px-6 py-20 sm:py-24 lg:order-1 lg:py-28">
            <div className="mx-auto w-full max-w-xl lg:ml-auto lg:mr-0 lg:max-w-lg lg:pr-14">
              <span className="font-[var(--font-display)] text-[13px] font-bold uppercase tracking-[0.4em] text-[#E0C074]">
                Quality · الجودة
              </span>
              <h2 className="mt-5 font-[var(--font-display)] text-[2rem] font-semibold leading-[1.12] md:text-[2.6rem]">
                Marbling you can measure, <span className="text-[#E0C074]">not assume</span>.
              </h2>
              <p className="mt-6 text-[14.5px] leading-relaxed text-[#FAF6EF]/70">
                Marbling — the fine web of fat within the muscle — is the key to flavour, juiciness and aroma.
                Every Saqr carcass is hand-assessed for marble score and selected against strict premium-grade
                standards, then handled on an unbroken cold chain from our facility to your door.
              </p>

              {/* metric rows */}
              <dl className="mt-9 divide-y divide-white/12 border-y border-white/12">
                {[
                  { k: "Marble score", v: "Hand-assessed, every carcass" },
                  { k: "Grade", v: "Premium selection only" },
                  { k: "Halal", v: "100% Zabiha certified" },
                  { k: "Cold chain", v: "Unbroken, farm to door" },
                ].map((m) => (
                  <div key={m.k} className="flex items-center justify-between gap-6 py-4">
                    <dt className="font-[var(--font-display)] text-sm font-bold uppercase tracking-[0.12em] text-[#FAF6EF]">{m.k}</dt>
                    <dd className="text-right text-[13px] text-[#FAF6EF]/60">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* RIGHT — image bleeding to the edge (shown first on mobile) */}
          <div className="reveal relative order-1 min-h-[320px] lg:order-2 lg:min-h-full">
            <img
              src="/images/steak-board.jpg"
              alt="Premium marbled steak on a board"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-[#16100C] via-transparent to-transparent lg:block" />
            {/* Mobile — darken from every edge so the image melts into the section */}
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#16100C] via-[#16100C]/15 to-[#16100C]/55 lg:hidden" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#16100C]/70 via-transparent to-[#16100C]/70 lg:hidden" />
          </div>
        </div>
      </section>

      {/* SOURCING & PROVENANCE — three-step farm-to-door journey cards */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="reveal max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="font-[var(--font-display)] text-[13px] font-bold uppercase tracking-[0.4em] text-[#8A1538]">Provenance</span>
            <span className="h-px w-16 bg-[#8A1538]/30" />
            <span className="font-[var(--font-serif)] text-[#C9A24B]">المصدر</span>
          </div>
          <h2 className="mt-5 font-[var(--font-display)] text-[2rem] font-semibold leading-[1.12] text-[#241B16] md:text-[2.6rem]">
            From trusted farm to your door — <span className="text-[#8A1538]">nothing left to chance</span>.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              img: "/images/feedlot-cattle.jpg",
              step: "Sourced",
              t: "Trusted partner farms",
              d: "Cattle and lambs raised on open pasture and grain-finished for rich, even marbling. Only animals that meet our standard carry the Saqr name.",
            },
            {
              img: "/images/ribeye.jpg",
              step: "Prepared",
              t: "Halal, cut with craft",
              d: "Slaughtered to strict Zabiha rites under qualified supervision, then broken down to order by master butchers in our Doha facility.",
            },
            {
              img: "/images/steak-sliced.jpg",
              step: "Delivered",
              t: "Cold chain to your door",
              d: "Vacuum-sealed and handled on an unbroken cold chain, so freshness and Halal integrity arrive exactly as they left the bench.",
            },
          ].map((c, i) => (
            <article
              key={c.step}
              className="group reveal overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_-32px_rgba(36,27,22,0.5)] ring-1 ring-[#241B16]/10"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#8A1538] font-[var(--font-display)] text-sm font-bold text-[#E0C074] shadow-lg">
                  {i + 1}
                </span>
                <span className="absolute bottom-3 left-4 rounded-full bg-[#FAF6EF]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A1538]">
                  {c.step}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-[var(--font-display)] text-lg font-bold uppercase tracking-[0.06em] text-[#241B16]">{c.t}</h3>
                <p className="mt-2 font-[var(--font-serif)] text-[13.5px] leading-relaxed text-[#241B16]/65">{c.d}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contact" className="relative z-10 overflow-hidden bg-[#8A1538] text-[#FAF6EF] scroll-mt-0">
        {/* subtle gold glow + maroon depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 85% 8%, rgba(201,162,75,0.14), transparent 52%), radial-gradient(circle at 0% 100%, rgba(110,15,44,0.55), transparent 55%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-start gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* LEFT — intro + details + socials */}
          <div className="reveal">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A24B]">
              <span className="h-px w-6 bg-[#C9A24B]/60" />
              Get in Touch
            </span>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold uppercase leading-[1.1] tracking-wide">
              <VanishText>
                Let&apos;s Work <span className="text-[#C9A24B]">Together</span>
              </VanishText>
            </h3>
            <p className="mt-5 max-w-md font-[var(--font-serif)] text-[14px] leading-relaxed text-[#FAF6EF]/65">
              Whether you&apos;re a home customer, a hotel or restaurant buyer, a retail partner or wholesale client, our team would be glad to hear from you. Message us on WhatsApp, reach us directly, or send a note and we&apos;ll reply within one business day.
            </p>

            {/* contact detail cards */}
            <div className="mt-8 space-y-3">
              {[
                { label: "Showroom & Counter", value: "Salwa Road, Doha, State of Qatar", icon: <MapPinIcon /> },
                { label: "WhatsApp & Phone", value: "+974 4000 1234", href: "https://wa.me/97440001234", icon: <PhoneIcon /> },
                { label: "Email", value: "enquiries@saqr.qa", href: "mailto:enquiries@saqr.qa", icon: <MailIcon /> },
                { label: "Business Hours", value: "Sun–Thu · 8:00–20:00 AST", icon: <ClockIcon /> },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#C9A24B]/40">
                  <span className="mt-0.5 shrink-0 text-[#C9A24B]">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FAF6EF]/45">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block whitespace-pre-line font-[var(--font-display)] text-base leading-snug text-[#FAF6EF] transition-colors hover:text-[#C9A24B]">
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-1 whitespace-pre-line font-[var(--font-display)] text-base leading-snug text-[#FAF6EF]">
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* socials */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FAF6EF]/45">Follow</span>
              <div className="flex items-center gap-3">
                {[
                  { label: "Instagram", href: "#", path: <><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></> },
                  { label: "Facebook", href: "#", path: <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z" /> },
                  { label: "LinkedIn", href: "#", path: <><rect x="2" y="2" width="20" height="20" rx="3" /><path d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 17v-7" /></> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#FAF6EF]/70 transition-colors hover:border-[#C9A24B] hover:bg-[#C9A24B] hover:text-[#1A130F]"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {s.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — contact form */}
          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </section>

    </div>
  );
}

function Divider() {
  return (
    <div className="mx-auto mt-12 flex max-w-md items-center gap-3 text-[#8A1538]/70 reveal">
      <div className="flex-1 h-px bg-gray-200" />
      <svg width="40" height="10" viewBox="0 0 40 10" fill="none" className="text-[#8A1538]">
        <path d="M0 5 Q5 0 10 5 T20 5 T30 5 T40 5" stroke="currentColor" fill="none" />
      </svg>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function CountUp({ to, suffix = "", duration = 1500 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const company = String(f.get("company") || "");
    const type = String(f.get("type") || "General Enquiry");
    const message = String(f.get("message") || "");
    const subject = `${type} — ${name || "Website Enquiry"}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nEnquiry: ${type}\n\n${message}`;
    window.location.href = `mailto:enquiries@saqr.qa?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#FAF6EF] placeholder:text-[#FAF6EF]/35 outline-none transition focus:border-[#C9A24B]/60 focus:ring-2 focus:ring-[#C9A24B]/20";
  const label = "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#FAF6EF]/45";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
      <h4 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-wide text-[#FAF6EF]">Send us a message</h4>
      <p className="mt-1.5 font-[var(--font-serif)] text-[13px] text-[#FAF6EF]/55">
        We typically reply within one business day.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className={label} htmlFor="cf-name">Full Name</label>
          <input id="cf-name" name="name" required placeholder="Ahmed Al-Thani" className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" required placeholder="ahmed@company.qa" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="cf-company">Company <span className="text-[#FAF6EF]/25">(optional)</span></label>
            <input id="cf-company" name="company" placeholder="Company name" className={field} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="cf-type">Enquiry Type</label>
          <select id="cf-type" name="type" className={field + " appearance-none"} defaultValue="General Enquiry">
            <option className="bg-[#241B16]">General Enquiry</option>
            <option className="bg-[#241B16]">Home Delivery</option>
            <option className="bg-[#241B16]">Hotels &amp; Restaurants (HORECA)</option>
            <option className="bg-[#241B16]">Retail &amp; Wholesale</option>
            <option className="bg-[#241B16]">Halal &amp; Certification</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" required rows={4} placeholder="Tell us how we can help…" className={field + " resize-none"} />
        </div>
      </div>

      <button
        type="submit"
        className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-[#C9A24B] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E0F2C] transition-opacity hover:opacity-90"
      >
        <span className="relative flex items-center gap-2">
          Send Message
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      {sent && (
        <p className="mt-4 text-center text-[12px] font-medium text-[#FAF6EF]/70">
          Thanks! Your email draft is ready to send. We&apos;ll be in touch shortly.
        </p>
      )}
    </form>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

/* Navbar now lives in components/ui/Navbar.tsx so it can be reused on
   the cut-detail pages as well. */
