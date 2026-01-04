import { motion, SVGMotionProps } from "framer-motion";

export const CoinSvg = (
  props: SVGMotionProps<SVGSVGElement> & {
    className?: string;
    style?: React.CSSProperties;
  }
) => {
  return (
    <motion.svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "#d4af37", stopOpacity: "1" }}
          />
          <stop
            offset="50%"
            style={{ stopColor: "#f1c40f", stopOpacity: "1" }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#b8860b", stopOpacity: "1" }}
          />
        </linearGradient>
      </defs>

      <g stroke="#967117" strokeWidth="1" id="topCoin">
        <ellipse
          cx="100"
          cy="100"
          rx="60"
          ry="20"
          strokeWidth="6"
          fill="url(#gold)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="60"
          ry="20"
          strokeWidth="6"
          fill="url(#gold)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="48"
          ry="12"
          fill="url(#goldTop)"
          stroke="#b8860b"
        />
        <text
          x="100"
          y="106"
          fontFamily="Arial"
          fontSize="18"
          fontWeight="bold"
          fill="#b8860b"
          textAnchor="middle"
        >
          $
        </text>
      </g>
    </motion.svg>
  );
};
