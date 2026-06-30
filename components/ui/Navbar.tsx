"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Links split around the centered logo, matching the reference layout.
  // Anchors are absolute (/#section) so they resolve from any route.
  const leftLinks = [
    { href: "/#cuts", label: "The Cuts" },
    { href: "/#about", label: "About" },
    { href: "/#marbling", label: "Marbling & Feed" },
  ];
  const rightLinks = [
    { href: "/#contact", label: "Contact" },
  ];
  const allLinks = [...leftLinks, ...rightLinks, { href: "mailto:enquiries@accbeef.net.au", label: "Enquire" }];
  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 " +
        (scrolled ? "bg-[#fcfaf6]/90 backdrop-blur-md" : "bg-transparent")
      }
    >
      <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 h-24 max-w-7xl gap-4">
        {/* LEFT NAV */}
        <nav className="hidden md:flex items-center justify-end gap-8 text-[11px] uppercase tracking-[0.22em] text-[#2c2623] font-bold border-b border-gray-200/80 pb-2">
          {leftLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#191851] transition-colors whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CENTER LOGO */}
        <Link href="/" className="group flex items-center justify-center md:px-6">
          <img
            src="/images/acc-logo.svg"
            alt="Australian Country Choice"
            className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* RIGHT NAV */}
        <nav className="hidden md:flex items-center justify-start gap-8 text-[11px] uppercase tracking-[0.22em] text-[#2c2623] font-bold border-b border-gray-200/80 pb-2">
          {rightLinks.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-[#191851] transition-colors whitespace-nowrap">
              {l.label}
            </Link>
          ))}
          <a
            href="mailto:enquiries@accbeef.net.au"
            className="bg-[#191851] text-white px-2.5 py-1 tracking-[0.18em] transition-opacity hover:opacity-85 whitespace-nowrap"
          >
            Enquire
          </a>
        </nav>

        {/* MOBILE TOGGLE (sits in right column on small screens) */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden justify-self-end grid place-items-center h-9 w-9 border border-gray-200 bg-white"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={"h-0.5 w-5 bg-[#2c2623] transition-transform " + (open ? "translate-y-2 rotate-45" : "")} />
            <span className={"h-0.5 w-5 bg-[#2c2623] transition-opacity " + (open ? "opacity-0" : "")} />
            <span className={"h-0.5 w-5 bg-[#2c2623] transition-transform " + (open ? "-translate-y-2 -rotate-45" : "")} />
          </div>
        </button>
      </div>

      <div
        className={
          "md:hidden overflow-hidden border-t border-gray-200 bg-white backdrop-blur transition-[max-height,opacity] duration-500 " +
          (open ? "max-h-96 opacity-100" : "max-h-0 opacity-0")
        }
      >
        <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3 text-[12px] uppercase tracking-[0.22em] font-bold text-[#2c2623]">
          {allLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 hover:text-[#191851] transition-colors border-b border-gray-50">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
