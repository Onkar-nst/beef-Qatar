"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import VanishText from "./VanishText";
import { PRIMALS } from "@/lib/cuts";

/* Cut data (primals + retail steaks) lives in lib/cuts.ts so the detail
   pages at /cuts/[slug] share exactly the same source. */
const CUTS_DETAILS = PRIMALS;

/* ------------------------------------------------------------------ */
/*  Assembly pieces — each primal region is a clipped slice of the     */
/*  diagram that flies in from a different edge of the screen.         */
/* ------------------------------------------------------------------ */
const CUT_POLYS: Record<string, string> = {
  chuck:
    "430,303,426,334,420,365,412,388,403,411,391,434,377,452,360,469,341,486,319,498,298,506,302,521,310,535,317,548,323,560,331,581,346,581,370,577,395,574,416,572,441,568,464,566,488,562,509,558,534,556,555,556,571,554,571,529,573,512,573,486,571,463,573,440,571,423,569,403,567,380,563,355,559,334,554,314,524,306",
  rib:
    "561,313,569,344,571,367,575,392,575,414,577,439,579,464,579,487,579,514,577,536,577,553,592,551,606,551,617,551,641,549,662,549,687,547,710,547,724,545,726,520,726,497,724,476,722,452,718,429,716,408,708,386,703,363,695,342,689,325,627,324",
  short_loin:
    "695,324,703,345,706,363,712,382,720,407,724,430,726,452,730,477,732,498,732,521,732,537,735,548,757,546,782,546,805,545,828,545,852,543,873,543,886,541,886,517,884,496,881,471,877,450,871,428,865,405,857,386,848,363,838,341,830,326",
  sirloin:
    "834,323,842,339,854,360,863,381,869,405,877,424,883,447,886,470,890,494,892,519,892,542,910,542,933,542,956,542,981,540,1003,540,1030,538,1028,509,1026,484,1022,461,1016,437,1010,412,1001,391,993,368,981,345,972,323,960,304",
  round:
    "968,303,977,318,989,343,999,365,1008,388,1014,411,1022,434,1028,459,1034,483,1035,508,1035,529,1039,560,1037,581,1034,606,1030,632,1045,651,1057,670,1068,694,1082,715,1092,727,1123,717,1148,707,1177,697,1165,663,1165,645,1169,632,1173,614,1179,595,1184,564,1186,539,1188,504,1188,457,1186,432,1181,411,1169,384,1163,368,1153,353,1140,337,1124,324,1105,314,1088,306,1059,308",
  brisket:
    "333,590,374,584,397,580,412,578,418,605,426,628,432,650,443,673,453,696,461,719,461,731,441,727,424,716,406,702,389,687,377,675,358,656,343,636,337,617",
  shank:
    "418,578,453,574,478,570,501,566,524,565,559,561,571,561,569,584,567,609,563,632,561,656,557,679,554,702,546,721,523,723,503,725,482,729,461,704,432,637",
  plate:
    "577,557,571,596,571,623,569,644,565,671,559,696,579,688,606,683,625,683,654,679,687,675,716,671,739,673,768,673,794,671,823,663,850,659,869,657,877,632,883,611,883,588,886,563,886,549,768,551",
  flank:
    "892,548,890,577,888,608,884,634,879,659,912,649,927,647,946,641,960,641,977,639,995,639,1012,634,1022,630,1024,608,1024,589,1026,568,1030,546,974,546",
};

const PIECES: { id: string; polys: string[]; from: { x: number; y: number; r: number } }[] = [
  { id: "chuck", polys: [CUT_POLYS.chuck], from: { x: -1400, y: -900, r: -20 } },
  { id: "rib", polys: [CUT_POLYS.rib], from: { x: -250, y: -1100, r: 14 } },
  { id: "short_loin", polys: [CUT_POLYS.short_loin], from: { x: 950, y: -1050, r: 18 } },
  { id: "sirloin", polys: [CUT_POLYS.sirloin], from: { x: 1650, y: -250, r: -12 } },
  { id: "round", polys: [CUT_POLYS.round], from: { x: 1600, y: 850, r: 16 } },
  { id: "brisket", polys: [CUT_POLYS.brisket], from: { x: -1650, y: 250, r: 10 } },
  { id: "plate", polys: [CUT_POLYS.plate], from: { x: 150, y: 1250, r: -10 } },
  { id: "flank", polys: [CUT_POLYS.flank], from: { x: -1150, y: 1050, r: -16 } },
  { id: "shank", polys: [CUT_POLYS.shank], from: { x: 550, y: 1300, r: 8 } },
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

  // The "Select a primal cut" prompt is shared between the desktop column (beside
  // the title) and the mobile block (below the cow). On mobile the guide arrow
  // points UP toward the cow instead of sideways.
  const renderPrompt = (variant: "desktop" | "mobile") => {
    if (selectedCut) {
      return (
        <div className={variant === "mobile" ? "text-center" : "pl-2"}>
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
      );
    }

    return (
      <div className="relative">
        {/* Curly arrow with the cleaver sitting beside it */}
        <div className="flex items-center gap-3 mb-5">
          <svg
            width="100"
            height="70"
            viewBox="0 0 120 80"
            fill="none"
            className="text-[#8A1538] shrink-0 select-none pointer-events-none"
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
            <line x1="22" y1="49" x2="18" y2="52" stroke="currentColor" strokeWidth="1.2" />
            <line x1="24" y1="52" x2="20" y2="55" stroke="currentColor" strokeWidth="1.2" />
            <line x1="22" y1="55" x2="18" y2="52" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <img
            src="/images/cleaver.png"
            alt=""
            aria-hidden="true"
            className="w-24 sm:w-28 object-contain rotate-[10deg] opacity-85 drop-shadow-md select-none pointer-events-none"
            draggable={false}
          />
        </div>

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
    );
  };

  return (
    <section
      id="cuts"
      ref={sectionRef}
      className="w-full relative text-[#241B16] font-sans antialiased selection:bg-blue-200 flex flex-col items-center overflow-hidden"
    >
      {/* Pasture background now lives in the page-level wrapper so it can run
          continuously from the hero down to the marquee. */}

      {/* ─── Top Spacer for Fixed Navbar (extra breathing room above the cow) ─── */}
      <div className="h-24 sm:h-32 lg:h-52 w-full" />

      {/* ─── Main Stage ─── */}
      <div className="relative w-full max-w-7xl mx-auto px-6 z-10">
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

            {/* Mobile-only floating knife + guide arrow — sits top-right beside the
                title; the knife bobs up/down and the arrow points down at the cow. */}
            {!selectedCut && (
              <div className="pointer-events-none absolute right-0 -top-6 z-30 flex flex-col items-end lg:hidden">
                <span className="mb-1 block text-right text-[9px] font-bold uppercase leading-tight tracking-[0.2em] text-[#8A1538]">
                  Select a<br />primal cut
                </span>
                {/* knife + a down-pointing arrow beside it */}
                <div className="flex items-start gap-1">
                  <svg
                    width="34"
                    height="58"
                    viewBox="0 0 40 72"
                    fill="none"
                    className="mt-1 text-[#8A1538] select-none"
                  >
                    <path
                      d="M20 8 C 13 26, 27 36, 20 56"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M11 46 L20 63 L29 46"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <img
                    src="/images/cleaver.png"
                    alt=""
                    aria-hidden="true"
                    className="knife-bob w-16 object-contain opacity-90 drop-shadow-md select-none"
                    draggable={false}
                  />
                </div>
              </div>
            )}

            {/* Cow diagram */}
            <div className="relative w-full max-w-[600px] aspect-[1378/1142] z-10">
              {/* Assembling slices + full-cow base (crossfades in once assembled) */}
              <svg
                viewBox="0 0 1378 1142"
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
                  href="/images/newcow.png"
                  width="1378"
                  height="1142"
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
                      href="/images/newcow.png"
                      width="1378"
                      height="1142"
                      clipPath={`url(#clip-${p.id})`}
                      style={{
                        mixBlendMode: "multiply",
                        pointerEvents: "none",
                        transformBox: "view-box",
                        transformOrigin: "689px 571px",
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
                viewBox="0 0 1378 1142"
                className="absolute inset-0 w-full h-full z-20"
                preserveAspectRatio="xMidYMid meet"
              >
                {PIECES.map((p) => (
                  <polygon
                    key={p.id}
                    points={CUT_POLYS[p.id]}
                    className={getPathClass(p.id)}
                    onClick={() => handleCutClick(p.id)}
                  />
                ))}
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
            {/* Desktop prompt — sits beside the title */}
            <div className="mt-8 hidden lg:block">{renderPrompt("desktop")}</div>
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
                      // Product detail pages are disabled for now — render as a
                      // static card (no link, no navigation on click).
                      <div
                        key={idx}
                        className="flex flex-col items-center text-center group w-36 shrink-0"
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
                      </div>
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
