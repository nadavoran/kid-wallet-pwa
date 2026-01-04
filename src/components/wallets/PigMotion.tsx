import { AnimationControls, motion } from "framer-motion";

export const PigMotion = ({ controls }: { controls: AnimationControls }) => {
  return (
    <motion.svg
      animate={controls}
      viewBox="0 0 500 500"
      className="w-16 h-16 select-none"
    >
      <circle
        cx="235"
        cy="125"
        r="55"
        fill="#FFD700"
        stroke="black"
        strokeWidth="8"
      />
      <circle
        cx="235"
        cy="125"
        r="45"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <text
        x="235"
        y="145"
        fontFamily="Arial"
        fontSize="60"
        fontWeight="bold"
        textAnchor="middle"
        fill="black"
      >
        $
      </text>

      <path
        d="M100 250 C100 150 400 150 400 250 L420 260 L420 320 L400 330 C400 420 100 420 100 330 Z"
        fill="#FFB6C1"
        stroke="black"
        strokeWidth="8"
      />

      <path
        d="M300 185 L350 160 L330 220 Z"
        fill="#FFB6C1"
        stroke="black"
        strokeWidth="8"
      />
      <path
        d="M340 165 L370 160 L350 200 Z"
        fill="#FF8DA1"
        stroke="black"
        strokeWidth="4"
      />

      <path
        d="M105 255 C80 230 60 270 95 285"
        fill="none"
        stroke="black"
        strokeWidth="6"
        strokeLinecap="round"
      />

      <rect
        x="150"
        y="380"
        width="40"
        height="40"
        rx="10"
        fill="#FFB6C1"
        stroke="black"
        strokeWidth="8"
      />
      <rect
        x="300"
        y="380"
        width="40"
        height="40"
        rx="10"
        fill="#FFB6C1"
        stroke="black"
        strokeWidth="8"
      />

      <circle cx="370" cy="250" r="10" fill="black" />

      <ellipse
        cx="150"
        cy="220"
        rx="25"
        ry="15"
        fill="white"
        fillOpacity="0.5"
        transform="rotate(-30 150 220)"
      />

      <rect
        x="185"
        y="165"
        width="100"
        height="15"
        rx="5"
        fill="black"
        transform="rotate(-10 235 172)"
      />
    </motion.svg>
  );
};
{
  /* OK version
  <circle cx="47" cy="25" r="11" fill="#FFD700" stroke="#000" strokeWidth="1.5" />
  <circle cx="47" cy="25" r="9" fill="none" stroke="#000" strokeWidth="0.5" />
  <text x="47" y="30" fontFamily="Arial" font-size="12" fontWeight="bold" text-anchor="middle" fill="#000">$</text>

  <rect x="30" y="75" width="10" height="12" rx="4" fill="#F4A7B9" stroke="#000" strokeWidth="2" />
  <rect x="58" y="75" width="10" height="12" rx="4" fill="#F4A7B9" stroke="#000" strokeWidth="2" />

  <ellipse cx="50" cy="55" rx="35" ry="30" fill="#F4A7B9" stroke="#000" strokeWidth="2" />
  
  <ellipse cx="30" cy="45" rx="5" ry="3" fill="#FFC0CB" transform="rotate(-30, 30, 45)" />

  <rect x="80" y="52" width="8" height="15" rx="3" fill="#F4A7B9" stroke="#000" strokeWidth="2" />

  <path d="M 60 40 Q 75 25 78 45 Z" fill="#F4A7B9" stroke="#000" strokeWidth="2" />

  <path d="M 17 50 Q 5 45 15 40 Q 18 45 15 48" fill="none" stroke="#000" strokeWidth="1.5" />

  <circle cx="75" cy="50" r="2.5" fill="#000" /> */
}
