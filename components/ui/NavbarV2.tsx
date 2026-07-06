"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

/* Anmol falcon mark, reused in the logo lockup. */
function FalconMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 68" className={className} aria-hidden="true">
      <path fill="#8A1538" d="M64,10 C46,8 33,16 30,28 L11,31 C6,32 5,37 10,38 L22,35 C26,48 40,60 58,62 C74,64 90,54 94,38 C98,20 84,12 64,10 Z" />
      <path fill="#C9A24B" d="M38,23 C44,21 50,23 51,28 C52,33 46,35 41,34 C36,33 33,25 38,23 Z" />
      <circle cx="43" cy="28" r="2.6" fill="#241B16" />
      <path fill="#C9A24B" d="M40,34 C42,42 40,50 35,55 C33,47 35,39 38,34 Z" />
    </svg>
  );
}

const WHATSAPP = "https://wa.me/97450001234?text=Hello%20Anmol%2C%20I%27d%20like%20to%20place%20an%20order.";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#cuts", label: "The Cuts" },
    { href: "/#halal", label: "Halal" },
    { href: "/#about", label: "Our Story" },
    { href: "/#quality", label: "Quality" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* ── Top utility strip ── */}
      <div className="hidden md:block w-full bg-[#8A1538] text-[#E0C074]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em]">
          <span className="flex items-center gap-2">
            <span className="text-[#FAF6EF]">✦</span> Certified Halal 
          </span>
          <span className="text-[#FAF6EF]/85 tracking-[0.3em]"> · Premium Meats of Qatar</span>
          <span>Delivery across Qatar · +974 4000 1234</span>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div
        className={
          "transition-all duration-500 " +
          (scrolled
            ? "bg-[#FAF6EF]/92 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(36,27,22,0.5)]"
            : "bg-transparent")
        }
      >
        <div className="mx-auto flex items-center justify-between px-6 h-20 max-w-7xl gap-4">
          {/* LEFT, logo lockup */}
          <Link href="/" className="group flex items-center gap-3 min-w-0">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-[#FAF6EF] ring-1 ring-[#8A1538]/20 shadow-sm transition-transform duration-300 group-hover:scale-105 flex-shrink-0">
              <FalconMark className="h-7 w-7" />
            </span>
            <span className="flex flex-col leading-tight min-w-0">
              <span className="font-[var(--font-display)] text-[1.3rem] sm:text-[1.5rem] lg:text-[1.6rem] font-bold tracking-[0.16em] text-[#8A1538] uppercase break-words line-clamp-2">
                ANMOL
              </span>
            </span>
          </Link>

          {/* CENTER, links */}
          <nav className="hidden lg:flex items-center gap-9 text-[11px] uppercase tracking-[0.22em] text-[#241B16] font-semibold flex-shrink-0 whitespace-nowrap">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="relative py-1 transition-colors hover:text-[#8A1538] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-[#C9A24B] after:transition-transform hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT, WhatsApp CTA */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#8A1538] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#FAF6EF] transition-colors hover:bg-[#6E0F2C]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-[#E0C074]">
                <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Order now
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden grid place-items-center h-10 w-10 rounded-full border border-[#8A1538]/20 bg-[#FAF6EF]"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex flex-col gap-1.5">
              <span className={"h-0.5 w-5 bg-[#8A1538] transition-transform " + (open ? "translate-y-2 rotate-45" : "")} />
              <span className={"h-0.5 w-5 bg-[#8A1538] transition-opacity " + (open ? "opacity-0" : "")} />
              <span className={"h-0.5 w-5 bg-[#8A1538] transition-transform " + (open ? "-translate-y-2 -rotate-45" : "")} />
            </div>
          </button>
        </div>

        {/* slim divider between the navbar and hero (mobile only) */}
        <div aria-hidden className="md:hidden h-px w-full bg-[#8A1538]/25" />
      </div>

      {/* MOBILE MENU */}
      <div
        className={
          "md:hidden overflow-hidden border-t border-[#8A1538]/10 bg-[#FAF6EF] backdrop-blur transition-[max-height,opacity] duration-500 " +
          (open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1 text-[12px] uppercase tracking-[0.22em] font-semibold text-[#241B16]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 hover:text-[#8A1538] transition-colors border-b border-[#8A1538]/10">
              {l.label}
            </Link>
          ))}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#8A1538] px-5 py-3 text-[11px] font-bold tracking-[0.16em] text-[#FAF6EF]"
          >
            Order now
          </a>
        </nav>
      </div>
    </header>
  );
}
