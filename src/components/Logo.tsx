/** Brand mark. Replace the SVG here once the final logo is approved. */
export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <span className="haldi inline-grid place-items-center rounded-[28%]" style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} fill="currentColor"><path d="M3 3h7v7H3V3zm2 2v3h3V5H5zm9-2h7v7h-7V3zm2 2v3h3V5h-3zM3 14h7v7H3v-7zm2 2v3h3v-3H5zm9-2h3v3h-3v-3zm4 0h3v3h-3v-3zm-4 4h3v3h-3v-3zm4 0h3v3h-3v-3z" /></svg>
    </span>
  );
}
