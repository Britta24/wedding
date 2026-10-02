// Kolam-inspired gold divider.
export default function Divider() {
  return (
    <svg className="divider" viewBox="0 0 240 24" role="presentation" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 12h84M152 12h84" />
        <path d="M120 3l9 9-9 9-9-9z" />
        <circle cx="120" cy="12" r="2" fill="currentColor" stroke="none" />
        <path d="M96 12c4-6 8-6 12 0M132 12c4 6 8 6 12 0" />
        <circle cx="92" cy="12" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="148" cy="12" r="1.6" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}
