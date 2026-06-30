"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import VanishText from "./VanishText";
import { PRIMALS, steakSlug } from "@/lib/cuts";

/* Cut data (primals + retail steaks) lives in lib/cuts.ts so the detail
   pages at /cuts/[slug] share exactly the same source. */
const CUTS_DETAILS = PRIMALS;

/* ------------------------------------------------------------------ */
/*  Assembly pieces — each primal region is a clipped slice of the     */
/*  diagram that flies in from a different edge of the screen.         */
/* ------------------------------------------------------------------ */
const PIECES: { id: string; polys: string[]; from: { x: number; y: number; r: number } }[] = [
  { id: "chuck", polys: ["304,125,402,114,510,117,510,381,350,381,327,295,312,213"], from: { x: -1400, y: -900, r: -20 } },
  { id: "rib", polys: ["510,117,660,118,660,381,510,381"], from: { x: -250, y: -1100, r: 14 } },
  { id: "short_loin", polys: ["660,118,810,120,810,381,660,381"], from: { x: 950, y: -1050, r: 18 } },
  { id: "sirloin", polys: ["810,120,965,123,965,381,810,381"], from: { x: 1650, y: -250, r: -12 } },
  { id: "round", polys: ["965,123,1112,125,1148,187,1153,297,1130,381,965,381"], from: { x: 1600, y: 850, r: 16 } },
  { id: "brisket", polys: ["352,385,534,385,534,513,432,527,374,487,356,437"], from: { x: -1650, y: 250, r: 10 } },
  { id: "plate", polys: ["538,385,790,385,790,495,538,509"], from: { x: 150, y: 1250, r: -10 } },
  { id: "flank", polys: ["794,385,965,383,965,473,832,491,794,483"], from: { x: -1150, y: 1050, r: -16 } },
  { id: "shank", polys: ["364,493,494,497,480,607,437,645,394,603,370,537"], from: { x: 550, y: 1300, r: 8 } },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function BeefCutsHeroCentered() {
  const [selectedCut, setSelectedCut] = useState<string | null>(null);
  // Mirrors selectedCut but lingers through the close animation so the panel
  // content stays mounted while it collapses (instead of vanishing instantly).
  const [panelCut, setPanelCut] = useState<string | null>(null);
  const [showPanel, setShowPanel] = useState(false);
  const [assemble, setAssemble] = useState(false); // pieces fly to their place
  const [settled, setSettled] = useState(false); // crossfade to the full cow
  const [blinkId, setBlinkId] = useState<string | null>(null); // self-running hover tour
  const detailsRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  // Horizontal steaks row: track whether more cuts exist off either edge so we
  // can show a scroll arrow that hints "there's more" (chuck has 7 cuts).
  const steaksScrollRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // On load: let pieces start off-screen, then trigger the assemble, then settle.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setAssemble(true));
    const t = setTimeout(() => setSettled(true), 1700);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  // Once the cow has settled, run a one-time "tour": highlight each primal cut
  // one after another (chuck → rib → short loin → …) so it blinks like a hover.
  useEffect(() => {
    if (!settled) return;
    const ids = PIECES.map((p) => p.id);
    const ON = 480; // how long each part stays lit
    const GAP = 140; // pause between parts
    const STEP = ON + GAP;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ids.forEach((id, i) => {
      timers.push(setTimeout(() => setBlinkId(id), 500 + i * STEP));
      timers.push(setTimeout(() => setBlinkId((cur) => (cur === id ? null : cur)), 500 + i * STEP + ON));
    });
    return () => timers.forEach(clearTimeout);
  }, [settled]);

  const detailsFor = (cut: string | null) =>
    cut
      ? CUTS_DETAILS[cut] || {
          title: `${cut.toUpperCase().replace("_", " ")} CUTS`,
          items: [
            { name: "PREMIUM STEAK", sub: "(Prime Cut)", img: "/images/ribeye.jpg" },
            { name: "ALTERNATIVE CUT", sub: "(Value Cut)", img: "/images/steak-small.jpg" },
          ],
        }
      : null;

  // Right-column indicator follows the live selection (clears instantly on close);
  // the panel renders from panelCut so its content survives the collapse animation.
  const activeCutDetails = detailsFor(selectedCut);
  const panelDetails = detailsFor(panelCut);

  // Animate in panel & scroll to it
  useEffect(() => {
    if (selectedCut) {
      setPanelCut(selectedCut);
      setShowPanel(true);
      const t = setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
      return () => clearTimeout(t);
    } else {
      // Reverse the open: collapse first, then unmount the content once it's done.
      setShowPanel(false);
      const t = setTimeout(() => setPanelCut(null), 650);
      return () => clearTimeout(t);
    }
  }, [selectedCut]);

  // Intersection observer for genie reveal
  useEffect(() => {
    const root = sectionRef.current;
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
      { threshold: 0.12 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const getPathClass = (id: string) => {
    if (selectedCut === id)
      return "fill-[#C9A24B]/60 stroke-white stroke-[4] cursor-pointer transition-all duration-300";
    if (blinkId === id)
      return "fill-[#C9A24B]/40 stroke-white stroke-[3] cursor-pointer transition-all duration-300";
    return "fill-transparent stroke-transparent hover:fill-[#C9A24B]/40 hover:stroke-white hover:stroke-[3] cursor-pointer transition-all duration-300";
  };

  const handleCutClick = useCallback(
    (id: string) => setSelectedCut((prev) => (prev === id ? null : id)),
    [],
  );

  // Read the steaks row's scroll position to decide which arrows to show.
  const updateScrollHints = useCallback(() => {
    const el = steaksScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scrollSteaks = useCallback((dir: 1 | -1) => {
    const el = steaksScrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }, []);

  // When the panel opens (or its cut changes) reset to the start and recompute
  // the arrows once layout has settled; also keep them correct on resize.
  useEffect(() => {
    if (!showPanel) return;
    const el = steaksScrollRef.current;
    if (el) el.scrollLeft = 0;
    const t = setTimeout(updateScrollHints, 60);
    window.addEventListener("resize", updateScrollHints);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", updateScrollHints);
    };
  }, [showPanel, panelCut, updateScrollHints]);

  return (
    <section
      id="cuts"
      ref={sectionRef}
      className="w-full relative text-[#241B16] font-sans antialiased selection:bg-blue-200 flex flex-col items-center overflow-hidden"
    >
      {/* Pasture background now lives in the page-level wrapper so it can run
          continuously from the hero down to the marquee. */}

      {/* ─── Top Spacer for Fixed Navbar ─── */}
      <div className="h-28 lg:h-32 w-full" />

      {/* ─── Main Stage ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
        {/* Decorative cleaver — far top-right */}
        <img
          src="/images/cleaver.png"
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-8 top-0 w-32 object-contain rotate-[18deg] opacity-80 select-none pointer-events-none drop-shadow-md z-30 reveal"
          draggable={false}
        />

        {/* Two columns — cow on the left, headline + prompt on the right */}
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-14">

          {/* ── Left: Cow Diagram ── */}
          <div className="relative w-full flex items-center justify-center order-2 lg:order-1">
            {/* Circular backdrop — centered behind the cow, aligned with the logo */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 aspect-square w-[340px] rounded-full bg-[#EFE6D6]
                         sm:w-[460px] lg:w-[540px]"
              style={{ transition: "all 0.6s cubic-bezier(.4,0,.2,1)" }}
            />

            {/* Cow diagram */}
            <div className="relative w-full max-w-[600px] aspect-[1270/879] z-10">
              {/* Assembling slices + full-cow base (crossfades in once assembled) */}
              <svg
                viewBox="0 0 1270 879"
                className="absolute inset-0 w-full h-full z-10"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {PIECES.map((p) => (
                    <clipPath key={p.id} id={`clip-${p.id}`} clipPathUnits="userSpaceOnUse">
                      {p.polys.map((pts, i) => (
                        <polygon key={i} points={pts} />
                      ))}
                    </clipPath>
                  ))}
                </defs>

                {/* full cow — covers head & legs, fades in as pieces settle */}
                <image
                  href="/images/newcow1.png"
                  width="1270"
                  height="879"
                  style={{
                    mixBlendMode: "multiply",
                    opacity: settled ? 1 : 0,
                    transition: "opacity 0.6s ease",
                  }}
                />

                {/* flying primal slices */}
                {PIECES.map((p, i) => {
                  const delay = i * 0.08;
                  return (
                    <image
                      key={p.id}
                      href="/images/newcow1.png"
                      width="1270"
                      height="879"
                      clipPath={`url(#clip-${p.id})`}
                      style={{
                        mixBlendMode: "multiply",
                        pointerEvents: "none",
                        transformBox: "view-box",
                        transformOrigin: "635px 440px",
                        transform: assemble
                          ? "none"
                          : `translate(${p.from.x}px,${p.from.y}px) rotate(${p.from.r}deg)`,
                        opacity: settled ? 0 : assemble ? 1 : 0,
                        transition: settled
                          ? "opacity 0.5s ease"
                          : `transform 0.95s cubic-bezier(.2,.75,.25,1) ${delay}s, opacity 0.45s ease ${delay}s`,
                      }}
                    />
                  );
                })}
              </svg>

              {/* Interactive overlay — hover / click primals */}
              <svg
                viewBox="0 0 1270 879"
                className="absolute inset-0 w-full h-full z-20"
                preserveAspectRatio="xMidYMid meet"
              >
                <polygon points="304,125,402,114,510,117,510,381,350,381,327,295,312,213" className={getPathClass("chuck")} onClick={() => handleCutClick("chuck")} />
                <polygon points="510,117,660,118,660,381,510,381" className={getPathClass("rib")} onClick={() => handleCutClick("rib")} />
                <polygon points="660,118,810,120,810,381,660,381" className={getPathClass("short_loin")} onClick={() => handleCutClick("short_loin")} />
                <polygon points="810,120,965,123,965,381,810,381" className={getPathClass("sirloin")} onClick={() => handleCutClick("sirloin")} />
                <polygon points="965,123,1112,125,1148,187,1153,297,1130,381,965,381" className={getPathClass("round")} onClick={() => handleCutClick("round")} />
                <polygon points="352,385,534,385,534,513,432,527,374,487,356,437" className={getPathClass("brisket")} onClick={() => handleCutClick("brisket")} />
                <polygon points="538,385,790,385,790,495,538,509" className={getPathClass("plate")} onClick={() => handleCutClick("plate")} />
                <polygon points="794,385,965,383,965,473,832,491,794,483" className={getPathClass("flank")} onClick={() => handleCutClick("flank")} />
                <polygon points="364,493,494,497,480,607,437,645,394,603,370,537" className={getPathClass("shank")} onClick={() => handleCutClick("shank")} />
              </svg>
            </div>
          </div>

          {/* ── Right: Headline + Prompt ── */}
          <div className="order-1 lg:order-2 flex flex-col justify-center items-start reveal lg:pl-4">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.5em] text-[#B7A98E] mb-5">
              Premium Beef &amp; Lamb · لحوم فاخرة
            </span>
            <h2 className="font-[var(--font-display)] font-semibold uppercase tracking-[0.04em] leading-[1.1] text-[#241B16]/85 text-[clamp(2rem,3.6vw,3.6rem)] [text-shadow:0_1px_2px_rgba(250,246,239,0.6)]">
              Qatar&apos;s House of <span className="text-[#8A1538]">Premium Halal</span><br />Beef &amp; Lamb
            </h2>
            <div className="mt-8">
            {!selectedCut ? (
              <div className="relative">
                {/* Hand-drawn curly arrow */}
                <svg
                  width="100"
                  height="70"
                  viewBox="0 0 120 80"
                  fill="none"
                  className="text-[#8A1538] mb-5 select-none pointer-events-none"
                >
                  <path
                    d="M110 12 C 100 4, 90 6, 84 16 C 76 30, 78 52, 66 52 C 54 52, 52 30, 62 22 C 72 14, 76 32, 66 44 C 56 56, 36 56, 18 52"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M28 44 L14 52 L26 60"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Cross-hatch inside arrowhead */}
                  <line x1="22" y1="49" x2="18" y2="52" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="24" y1="52" x2="20" y2="55" stroke="currentColor" strokeWidth="1.2" />
                  <line x1="22" y1="55" x2="18" y2="52" stroke="currentColor" strokeWidth="1.2" />
                </svg>

                {/* Wavy accent line */}
                <svg width="50" height="8" viewBox="0 0 50 8" className="text-[#8A1538] mb-4">
                  <path d="M0 4 Q 6 0, 12 4 T 24 4 T 36 4 T 50 4" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>

                <p className="font-[var(--font-serif)] text-[13px] lg:text-[15px] text-[#241B16]/75 leading-relaxed">
                  <strong className="not-italic text-[#8A1538] font-sans font-bold uppercase tracking-[0.2em] text-[10px] block">
                    Select a primal cut
                  </strong>
                </p>
              </div>
            ) : (
              <div className="pl-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B7A98E] block mb-1">
                  Selected
                </span>
                <span className="text-lg font-[var(--font-display)] font-bold uppercase tracking-[0.15em] text-[#8A1538]">
                  {activeCutDetails?.title}
                </span>
                <p className="font-[var(--font-serif)] text-xs text-[#241B16]/60 mt-2 leading-relaxed">
                  Scroll down to view the retail steaks available from this primal cut.
                </p>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Retail Steaks Panel ─── */}
      <div
        ref={detailsRef}
        className="w-full scroll-mt-28"
        style={{
          maxHeight: showPanel ? "1200px" : "0px",
          opacity: showPanel ? 1 : 0,
          transform: showPanel ? "scaleY(1) translateY(0)" : "scaleY(0.02) translateY(40%)",
          transformOrigin: "top center",
          transition: "max-height 0.6s cubic-bezier(.4,0,.2,1), opacity 0.5s ease, transform 0.6s cubic-bezier(.2,.8,.2,1)",
          overflow: "hidden",
        }}
      >
        {panelDetails && (
          <div className="max-w-6xl mx-auto px-6 pt-16 pb-20">
            <div className="w-full bg-[#1A130F] text-white p-8 sm:p-10 lg:p-12 shadow-2xl rounded-lg">
              {/* Panel Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
                <div>
                  <span className="text-[#C9A24B] text-[10px] font-bold tracking-[0.25em] uppercase block mb-1.5">
                    Retail Cuts
                  </span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-[var(--font-display)] font-light tracking-[0.18em] uppercase text-white">
                    {panelDetails.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedCut(null)}
                  className="group flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-300 shrink-0"
                  aria-label="Close details"
                >
                  <span>Close</span>
                  <X className="w-5 h-5 border border-neutral-700 rounded-full p-0.5 group-hover:border-[#C9A24B] group-hover:text-[#C9A24B] transition-all duration-300" />
                </button>
              </div>

              {/* Steaks — a single horizontal row. When more cuts exist than fit,
                  an arrow at the end hints "there's more" and scrolls the row. */}
              <div className="relative">
                <div
                  ref={steaksScrollRef}
                  onScroll={updateScrollHints}
                  className="w-full overflow-x-auto pb-2 custom-scrollbar"
                >
                  <div className="flex flex-nowrap gap-x-8 min-w-max">
                    {panelDetails.items.map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/cuts/${steakSlug(panelCut ?? "", item.name)}`}
                        className="flex flex-col items-center text-center group w-36 shrink-0 cursor-pointer"
                        style={{
                          opacity: showPanel ? 1 : 0,
                          transform: showPanel ? "translateY(0)" : "translateY(20px)",
                          transition: `opacity 0.5s ease ${idx * 0.08}s, transform 0.5s ease ${idx * 0.08}s`,
                        }}
                      >
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-neutral-800 mb-4 border-2 border-neutral-700/50 group-hover:border-[#C9A24B] transition-all duration-500 shadow-lg">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        </div>
                        <span className="text-[11px] sm:text-[12px] font-bold tracking-[0.15em] text-neutral-200 uppercase line-clamp-2 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 font-[var(--font-serif)]">
                          {item.sub}
                        </span>
                        <span className="mt-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#C9A24B] opacity-0 group-hover:opacity-100 transition-opacity">
                          View cut →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Left fade + arrow — appears once scrolled away from the start */}
                <div
                  className={`pointer-events-none absolute left-0 top-0 bottom-2 flex items-center justify-start pr-12 bg-gradient-to-r from-[#1A130F] via-[#1A130F]/85 to-transparent transition-opacity duration-300 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
                >
                  <button
                    type="button"
                    onClick={() => scrollSteaks(-1)}
                    aria-label="Show previous cuts"
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-[#1A130F] text-neutral-300 hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors shadow-lg"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                </div>

                {/* Right fade + arrow — indicates more cuts are available */}
                <div
                  className={`pointer-events-none absolute right-0 top-0 bottom-2 flex items-center justify-end pl-12 bg-gradient-to-l from-[#1A130F] via-[#1A130F]/85 to-transparent transition-opacity duration-300 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
                >
                  <button
                    type="button"
                    onClick={() => scrollSteaks(1)}
                    aria-label="Show more cuts"
                    className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 bg-[#1A130F] text-neutral-300 hover:border-[#C9A24B] hover:text-[#C9A24B] transition-colors shadow-lg"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacer when no panel is shown */}
      {!selectedCut && <div className="h-16 lg:h-24" />}
    </section>
  );
}
