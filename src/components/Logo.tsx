/**
 * Inline brand mark — neon gradient ring with an italic serif "hd" monogram.
 * Replaces the Lovable-hosted logo asset, which only resolves on Lovable's
 * infrastructure (the /__l5e/assets-v1/* path 404s on self-hosted deploys).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Holidays and Dreams"
      className={className}
    >
      <defs>
        <linearGradient id="hd-logo-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--neon-pink)" />
          <stop offset="100%" stopColor="var(--neon-cyan)" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="22.6"
        fill="oklch(0.18 0.013 260 / 0.65)"
        stroke="url(#hd-logo-gradient)"
        strokeWidth="1.3"
      />
      <text
        x="24"
        y="25.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Playfair Display', Georgia, serif"
        fontStyle="italic"
        fontSize="19"
        fill="var(--cream)"
      >
        hd
      </text>
    </svg>
  );
}
