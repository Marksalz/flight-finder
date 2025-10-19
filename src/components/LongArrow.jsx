export default function LongArrow() {
  return (
    <svg
      width="100%"
      preserveAspectRatio="none"
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "middle" }}
    >
      <line x1="0" y1="12" x2="110" y2="12" stroke="black" strokeWidth="1.5" />
      <polyline
        points="100,4 110,12 100,20"
        fill="none"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
