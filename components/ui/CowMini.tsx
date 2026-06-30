import { COW_VIEWBOX, PRIMAL_POLYS } from "@/lib/cuts";

/* A small, static cow diagram with one primal region highlighted in navy —
   the wayfinding cue on each cut-detail page. */
export default function CowMini({
  active,
  className = "",
}: {
  active: string;
  className?: string;
}) {
  const polys = PRIMAL_POLYS[active] ?? [];
  return (
    <div className={`relative aspect-[1017/619] ${className}`}>
      <img
        src="/images/2.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain opacity-20 grayscale"
        style={{ mixBlendMode: "multiply" }}
      />
      <svg
        viewBox={COW_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        {polys.map((pts, i) => (
          <polygon key={i} points={pts} className="fill-[#191851]" />
        ))}
      </svg>
    </div>
  );
}
