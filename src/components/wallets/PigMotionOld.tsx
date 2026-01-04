import { AnimationControls, motion } from "framer-motion";

export const PigMotionOld = ({ controls }: { controls: AnimationControls }) => {
  return (
    <motion.svg
      animate={controls}
      viewBox="0 0 128 128"
      className="w-16 h-16 select-none"
    >
      <defs>
        <linearGradient id="pig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <ellipse cx="64" cy="70" rx="46" ry="34" fill="url(#pig)" />
      <circle cx="36" cy="58" r="6" fill="#111827" />
      <rect x="54" y="42" width="22" height="8" rx="4" fill="#111827" />
      <circle cx="96" cy="78" r="10" fill="url(#pig)" />
      <circle cx="100" cy="78" r="3" fill="#111827" />
    </motion.svg>
  );
};
