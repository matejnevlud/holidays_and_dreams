import logo from "@/assets/logo.png";

/**
 * Client-supplied brand logo (neon sign on a black background, 512px PNG).
 * mix-blend-screen drops the black background on the site's dark surfaces,
 * so the neon strokes float directly on the page — no transparent cut needed.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Holidays and Dreams"
      width={512}
      height={512}
      className={`mix-blend-screen ${className ?? ""}`}
    />
  );
}
