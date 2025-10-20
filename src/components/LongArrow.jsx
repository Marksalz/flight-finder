export default function LongArrow() {
  return (
    <svg
      width="100%"
      height="100%" // let parent control the rendered height
      viewBox="0 0 110 24"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        verticalAlign: "middle",
        display: "block",
        height: "100%",
      }}
      aria-hidden="true"
    >
      <line
        x1="10"
        y1="12"
        x2="100"
        y2="12"
        stroke="black"
        strokeWidth="0.5"
        vectorEffect="non-scaling-stroke"
      />
      <polyline
        points="90,4 100,12 90,20"
        fill="none"
        stroke="black"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
