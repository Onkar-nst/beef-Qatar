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

  return (
    <div ref={ref} className="min-h-screen bg-[#fcfaf6] font-[var(--font-sans)] text-[#2c2623] overflow-x-hidden">
      <Navbar />
      


      {/* ========================================= */}
      {/* PRESENTATION BANNER FOR OPTION 1          */}
      {/* ========================================= */}
      {/* <div className="w-full bg-[#2c2623] text-[#fcfaf6] text-center py-2 text-[10px] tracking-[0.3em] uppercase font-bold relative z-20">
        Presentation: Hero Option 1 (Split Layout)
      </div> */}

      {/* <BeefCutsHero /> */}

      {/* ========================================= */}
      {/* PRESENTATION BANNER FOR OPTION 2          */}
      {/* ========================================= */}
      {/* <div className="w-full bg-[#191851] text-white text-center py-2 text-[10px] tracking-[0.3em] uppercase font-bold relative z-20">
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
            className="absolute inset-x-0 bottom-0 w-full h-full object-cover object-bottom opacity-80"
          />
          {/* warm golden wash — echoes the yellow in the ACC logo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-soft-light bg-gradient-to-br from-[#fff10b]/40 via-[#ffe23a]/25 to-[#f5c518]/35"
          />
          {/* extra gold tint, multiplied for a sun-warmed paddock tone */}
          <div
            aria-hidden="true"
            className="absolute inset-0 mix-blend-multiply bg-gradient-to-b from-transparent via-[#fde68a]/15 to-[#fbbf24]/15"
          />
          {/* Fade the top into the cream so the nav + title stay clean */}
          <div className="absolute inset-x-0 top-0 h-[26rem] bg-gradient-to-b from-[#fcfaf6] via-[#fcfaf6]/60 to-transparent" />
          {/* Soften the bottom edge back to cream before the marquee */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fcfaf6] to-transparent" />
        </div>

        <BeefCutsHeroCentered />

        {/* ========================================= */}
        {/* ORIGINAL HOMEPAGE CONTENT                 */}
        {/* ========================================= */}

        {/* ABOUT · PHILOSOPHY CTA — quote banner with overhanging cleaver */}
        <section id="philosophy" className="mx-auto max-w-5xl px-6 py-20 sm:py-24 relative z-10 scroll-mt-24">
        <div className="reveal relative">
          {/* dark banner */}
          <div className="relative overflow-hidden rounded-xl bg-[#2c2623] text-[#fcfaf6] px-8 py-12 sm:px-14 sm:py-14 shadow-[0_24px_50px_-24px_rgba(28,26,25,0.5)] ring-1 ring-white/[0.06]">
            {/* warm navy glow for depth */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at 0% 50%, rgba(25,24,81,0.12), transparent 60%)" }}
            />
            <div className="relative flex flex-col items-center text-center">
              {/* top — eyebrow + quote, centered */}
              <span className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#fff10b]">
                <span className="h-px w-8 bg-[#fff10b]/60" />
                The ACC Philosophy
                <span className="h-px w-8 bg-[#fff10b]/60" />
              </span>

              {/* italic serif quote — ACC's real point of difference */}
              <p className="mt-6 max-w-3xl font-[var(--font-serif)] italic text-2xl leading-snug text-[#fcfaf6] sm:text-[2rem] sm:leading-snug">
                One supply chain, one standard, from our paddocks to your plate,{" "}
                <span className="not-italic text-[#fff10b]">every step is ours to control.</span>
              </p>

              {/* divider */}
              <span className="mt-9 h-px w-16 bg-white/15" />

              {/* below — supporting copy in two columns */}
              <div className="mt-9 grid max-w-3xl gap-8 text-[15px] leading-relaxed text-[#fcfaf6]/75 sm:grid-cols-2 sm:text-left">
                <p>
                  Australian Country Choice is 100% Australian, family owned and operated,
                  and the nation&apos;s largest vertically integrated beef supply chain. We breed,
                  background and grain-finish our own cattle, then process, value-add and pack
                  under one roof.
                </p>
                <p>
                  Owning every link, from genetics through to distribution, is how we hold a
                  single standard across domestic and export markets, and why we&apos;re
                  recognised as a global leader in the best-practice supply of premium beef.
                </p>
              </div>
            </div>
          </div>

          {/* hand-drawn knife straddling the top edge — gently floats up and down */}
          <img
            src="/images/cleaver.png"
            alt="Hand-drawn knife"
            loading="lazy"
            className="knife-bob pointer-events-none absolute -top-24 right-2 w-40 select-none drop-shadow-[0_16px_22px_rgba(0,0,0,0.4)] sm:-top-28 sm:right-8 sm:w-48 lg:-top-32 lg:w-56"
          />
        </div>
      </section>
      </div>

      {/* ABOUT THE COMPANY */}
      <section id="about" className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 z-10 scroll-mt-24">
        <div className="absolute left-0 top-4 font-[var(--font-display)] text-[120px] sm:text-[200px] lg:text-[280px] leading-none tracking-tighter font-bold text-gray-100 pointer-events-none select-none">
          ACC
        </div>
        <div className="relative grid items-center gap-10 md:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* LEFT — about copy */}
          <div className="reveal">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#191851]">
              <span className="h-px w-6 bg-[#191851]/60" />
              Who We Are
            </span>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-wide leading-[1.1] mb-6">
              <VanishText>
                Australia&apos;s <span className="text-[#191851]">largest</span> family-owned cattle and beef supply chain
              </VanishText>
            </h3>
            <div className="max-w-xl space-y-4 font-[var(--font-serif)] text-[14px] leading-relaxed text-gray-600">
              <p>
                <span className="font-semibold text-[#2c2623]">Australian Country Choice</span> is dedicated to the best-practice supply of high-quality meat products to domestic and export markets.
              </p>
              <p>
                Our operations encompass everything from cattle breeding and lot feeding to primary processing, value adding and distribution, every step held to a single standard.
              </p>
            </div>

            <a
              href="#contact"
              className="group relative mt-9 inline-flex items-center overflow-hidden border border-[#191851] px-7 py-3 text-[11px] font-bold uppercase tracking-widest text-[#191851] transition-colors hover:text-white"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#191851] transition-transform duration-500 group-hover:translate-x-0" />
              <span className="relative">Get in touch</span>
            </a>
          </div>

          {/* RIGHT — black angus cattle, framed in a photographic medallion */}
          <div className="relative flex items-center justify-center py-6">
            {/* soft radial backdrop for depth */}
            <div
              className="absolute left-1/2 top-1/2 aspect-square w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, #f4efe6 0%, #f4efe6 55%, transparent 72%)" }}
            />

            {/* circular photo medallion */}
            <div className="genie relative z-10 aspect-square w-[84%] overflow-hidden rounded-full shadow-2xl ring-1 ring-[#2c2623]/10">
              <img
                src="/images/angus-cattle.jpg"
                alt="Australian Country Choice Black Angus cattle on pasture"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* warm inner vignette to match the editorial palette */}
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(44,38,35,0.4)]" />
              {/* thin inner ring */}
              <div className="pointer-events-none absolute inset-[6px] rounded-full border border-white/25" />
            </div>

            {/* caption badge */}
            <span className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#191851] px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              100% Australian
            </span>
          </div>
        </div>

        {/* paddock-to-plate capability chain — full width, single row */}
        <div className="reveal mt-14 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {["Breeding", "Backgrounding", "Lot Feeding", "Processing", "Distribution"].map((step, i) => (
            <div key={step} className="flex shrink-0 items-center gap-3">
              {i > 0 && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#191851" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              )}
              <span className="whitespace-nowrap rounded-full border border-gray-300/80 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2c2623]">
                {step}
              </span>
            </div>
          ))}
        </div>

        <Divider />
      </section>

      {/* MARBLING — editorial band that begins at the middle of the steak photo */}
      <section id="marbling" className="relative overflow-hidden text-white py-20 sm:py-24 z-10 scroll-mt-0">
        <div className="relative mx-auto max-w-4xl px-6">
          {/* TOP — framed steak photo: top half over the cream above, bottom half over the dark band */}
          {/* Wrapper stays static so the dark band never animates */}
          <div className="relative mx-auto w-full max-w-2xl">
            {/* DARK BAND — full-bleed, anchored to start at the photo's vertical middle (clipped to the section) */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -z-10 h-[300vh] w-screen -translate-x-1/2 bg-[#181310]"
            >
              {/* soft navy glow for depth */}
              <div
                className="absolute inset-x-0 top-0 h-[700px]"
                style={{ background: "radial-gradient(circle at 75% 12%, rgba(25,24,81,0.12), transparent 55%)" }}
              />
            </div>
            {/* framed image — only this animates in (clean fade-up), band stays steady */}
            <div className="reveal relative z-10 border border-white/15 bg-[#181310] p-2.5 shadow-2xl">
              <img
                src="/images/steak-board.jpg"
                alt="MSA-graded marbled steak on a board"
                loading="lazy"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          </div>

          {/* CONTENT — centered in the band */}
          <div className="reveal relative mx-auto mt-16 max-w-2xl text-center">
            {/* segmented editorial divider — centered */}
            <div className="mb-7 flex items-center justify-center gap-2.5 text-white/30">
              <span className="h-px w-12 bg-current" />
              <span className="h-1 w-1 rotate-45 bg-current" />
              <span className="h-px w-5 bg-current" />
              <span className="h-1 w-1 rotate-45 bg-current" />
              <span className="h-px w-12 bg-current" />
            </div>

            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-light uppercase leading-[1.15] tracking-[0.12em] text-white/85">
              <VanishText>
                Marbling, Graded to
                <span className="mt-1 block">MSA &amp; AUS-MEAT</span>
              </VanishText>
            </h3>

            <div className="mt-7 space-y-4 font-[var(--font-serif)] text-[13px] leading-relaxed text-white/45">
              <p>
                Marbling, the even distribution of fat within the muscle, is the principal indicator of beef quality and the key to its flavour and aroma. Every ACC carcase is assessed for <span className="font-semibold text-white/75">AUS-MEAT marble score</span> and graded to <span className="font-semibold text-white/75">Meat Standards Australia (MSA)</span>, so eating quality is measured, not assumed.
              </p>
              <p>
                That consistency is no accident. Australian Country Choice is <span className="font-semibold text-white/75">100% Australian, family owned and operated</span>, and the nation&apos;s largest vertically integrated beef supply chain. From cattle breeding, backgrounding and lot feeding through to processing, value adding, retail packing and distribution, every link in the chain is ours.
              </p>
              <p>
                Controlling each step, from <span className="font-semibold text-white/75">paddock to plate</span>, is how we guarantee the genetics, the grain finishing and the grading behind every cut. It&apos;s the discipline that makes ACC a global leader in the best-practice supply of premium beef to domestic and export markets alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEED & FINISHING */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-24 z-10">
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr] lg:gap-16">
          {/* LEFT — grain-fed cattle, framed in a photographic medallion */}
          <div className="relative flex items-center justify-center py-6">
            {/* soft backdrop disc for depth */}
            <div className="absolute left-1/2 top-1/2 aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f2eee6]" />

            {/* circular photo medallion */}
            <div className="genie relative z-10 aspect-square w-[84%] overflow-hidden rounded-full shadow-2xl ring-1 ring-[#2c2623]/10">
              <img
                src="/images/feedlot-cattle.jpg"
                alt="Black Angus feeder cattle at an Australian Country Choice feedlot"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {/* warm inner vignette to match the editorial palette */}
              <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(44,38,35,0.4)]" />
              {/* thin inner ring */}
              <div className="pointer-events-none absolute inset-[6px] rounded-full border border-white/25" />
            </div>

            {/* caption badge */}
            <span className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-[#191851] px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white shadow-lg">
              Grain-Finished
            </span>
          </div>

          {/* RIGHT — copy */}
          <div className="reveal">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#191851]">
              <span className="h-px w-6 bg-[#191851]/60" />
              Feed &amp; Finishing
            </span>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold uppercase tracking-wide leading-[1.1] mb-6">
              <VanishText>
                Pasture Raised, <span className="text-[#191851]">Grain Finished</span>
              </VanishText>
            </h3>
            <div className="max-w-xl space-y-4 font-[var(--font-serif)] text-[14px] leading-relaxed text-gray-600">
              <p>
                Our cattle are bred and raised across ACC&apos;s own properties throughout Queensland, then backgrounded on natural pasture. Lush grass and clean, open country lay the foundation for the premium quality of ACC beef.
              </p>
              <p>
                They are then moved to our feedlots in southern Queensland and grain-finished on carefully managed rations. This finishing stage is what develops the rich, even marbling within the meat, giving the cooked steak its remarkable juiciness, aroma and flavour. Because we own every stage, the genetics, feeding and grading behind each cut stay under our control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contact" className="relative z-10 overflow-hidden bg-[#2c2623] text-[#fcfaf6] scroll-mt-0">
        {/* subtle navy glow for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(circle at 85% 10%, rgba(25,24,81,0.12), transparent 55%)" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-start gap-14 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* LEFT — intro + details + socials */}
          <div className="reveal">
            <span className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-[#fff10b]">
              <span className="h-px w-6 bg-[#fff10b]/60" />
              Get in Touch
            </span>
            <h3 className="font-[var(--font-display)] text-3xl md:text-4xl font-bold uppercase leading-[1.1] tracking-wide">
              <VanishText>
                Let&apos;s Work <span className="text-[#fff10b]">Together</span>
              </VanishText>
            </h3>
            <p className="mt-5 max-w-md font-[var(--font-serif)] text-[14px] leading-relaxed text-[#fcfaf6]/65">
              Whether you&apos;re a retail partner, food-service buyer, export client or member of the press, our team would be glad to hear from you. Reach us directly, or send a message and we&apos;ll get back within one business day.
            </p>

            {/* contact detail cards */}
            <div className="mt-8 space-y-3">
              {[
                { label: "Head Office", value: "Cannon Hill, Brisbane\nQueensland 4170, Australia", icon: <MapPinIcon /> },
                { label: "Phone", value: "+61 7 3115 0100", href: "tel:+61731150100", icon: <PhoneIcon /> },
                { label: "Email", value: "enquiries@accbeef.net.au", href: "mailto:enquiries@accbeef.net.au", icon: <MailIcon /> },
                { label: "Business Hours", value: "Mon–Fri · 8:00–17:00 AEST", icon: <ClockIcon /> },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-[#fff10b]/40">
                  <span className="mt-0.5 shrink-0 text-[#fff10b]">{c.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#fcfaf6]/45">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="mt-1 block whitespace-pre-line font-[var(--font-display)] text-base leading-snug text-[#fcfaf6] transition-colors hover:text-[#fff10b]">
                        {c.value}
                      </a>
                    ) : (
                      <div className="mt-1 whitespace-pre-line font-[var(--font-display)] text-base leading-snug text-[#fcfaf6]">
                        {c.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* socials */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#fcfaf6]/45">Follow</span>
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
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#fcfaf6]/70 transition-colors hover:border-[#fff10b] hover:bg-[#fff10b] hover:text-[#1c1a19]"
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
    <div className="mx-auto mt-12 flex max-w-md items-center gap-3 text-[#191851]/70 reveal">
      <div className="flex-1 h-px bg-gray-200" />
      <svg width="40" height="10" viewBox="0 0 40 10" fill="none" className="text-[#191851]">
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
    window.location.href = `mailto:enquiries@accbeef.net.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#fcfaf6] placeholder:text-[#fcfaf6]/35 outline-none transition focus:border-[#fff10b]/60 focus:ring-2 focus:ring-[#fff10b]/20";
  const label = "mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#fcfaf6]/45";

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
      <h4 className="font-[var(--font-display)] text-xl font-bold uppercase tracking-wide text-[#fcfaf6]">Send us a message</h4>
      <p className="mt-1.5 font-[var(--font-serif)] text-[13px] italic text-[#fcfaf6]/55">
        We typically reply within one business day.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className={label} htmlFor="cf-name">Full Name</label>
          <input id="cf-name" name="name" required placeholder="Jane Smith" className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="cf-email">Email</label>
            <input id="cf-email" name="email" type="email" required placeholder="jane@company.com" className={field} />
          </div>
          <div>
            <label className={label} htmlFor="cf-company">Company <span className="text-[#fcfaf6]/25">(optional)</span></label>
            <input id="cf-company" name="company" placeholder="Company name" className={field} />
          </div>
        </div>
        <div>
          <label className={label} htmlFor="cf-type">Enquiry Type</label>
          <select id="cf-type" name="type" className={field + " appearance-none"} defaultValue="General Enquiry">
            <option className="bg-[#2c2623]">General Enquiry</option>
            <option className="bg-[#2c2623]">Retail Partnership</option>
            <option className="bg-[#2c2623]">Food-Service Supply</option>
            <option className="bg-[#2c2623]">Export &amp; Wholesale</option>
            <option className="bg-[#2c2623]">Media &amp; Press</option>
          </select>
        </div>
        <div>
          <label className={label} htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" required rows={4} placeholder="Tell us how we can help…" className={field + " resize-none"} />
        </div>
      </div>

      <button
        type="submit"
        className="group relative mt-6 inline-flex w-full items-center justify-center overflow-hidden rounded-md bg-[#191851] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-95"
      >
        <span className="relative flex items-center gap-2">
          Send Message
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </button>

      {sent && (
        <p className="mt-4 text-center text-[12px] font-medium text-[#fcfaf6]/70">
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
