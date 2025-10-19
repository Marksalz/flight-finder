export default function LongArrow() {
  return (
    <svg
      width="100%"
      preserveAspectRatio="none"
      viewBox="0 0 110 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "middle" }}
    >
      <line x1="10" y1="12" x2="100" y2="12" stroke="black" strokeWidth="0.5" />
      <polyline
        points="90,4 100,12 90,20"
        fill="none"
        stroke="black"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
