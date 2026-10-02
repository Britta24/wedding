// Lightweight falling petals: pure CSS, transform/opacity only.
const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 8) % 100}%`,
  delay: `${(i * 1.3) % 9}s`,
  duration: `${9 + (i % 5) * 2}s`,
  size: `${10 + (i % 4) * 4}px`
}));

export default function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: p.left, animationDelay: p.delay, animationDuration: p.duration, width: p.size, height: p.size }}
        />
      ))}
    </div>
  );
}
