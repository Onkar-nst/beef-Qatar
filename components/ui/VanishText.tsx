"use client";
import React, { useEffect, useRef, useState } from "react";

/**
 * Splits heading text into words that "materialize" with a blur + fade as the
 * element scrolls into view. Preserves nested markup (e.g. coloured <span>s).
 */
export default function VanishText({
  children,
  className = "",
  step = 55,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let idx = 0;
  const render = (node: React.ReactNode): React.ReactNode => {
    if (typeof node === "string" || typeof node === "number") {
      return String(node)
        .split(/(\s+)/)
        .map((part) => {
          if (part === "") return null;
          if (/^\s+$/.test(part)) return part; // keep spacing as plain text
          const i = idx++;
          return (
            <span key={i} className="vanish-word" style={{ transitionDelay: i * step + "ms" }}>
              {part}
            </span>
          );
        });
    }
    if (Array.isArray(node)) return node.map((n) => render(n));
    if (React.isValidElement(node)) {
      const el = node as React.ReactElement<{ children?: React.ReactNode }>;
      return React.cloneElement(el, { ...el.props }, render(el.props.children));
    }
    return node;
  };

  return (
    <span ref={ref} className={(inView ? "vanish-in " : "") + className}>
      {render(children)}
    </span>
  );
}
