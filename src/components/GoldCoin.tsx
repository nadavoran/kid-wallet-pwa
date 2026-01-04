import { motion } from "framer-motion";

interface GoldCoinProps {
  className?: string;
  style?: React.CSSProperties;
  initial?: any;
  animate?: any;
  exit?: any;
  transition?: any;
  onAnimationComplete?: () => void;
}

export const GoldCoin: React.FC<GoldCoinProps> = ({
  className,
  style,
  initial,
  animate,
  exit,
  transition,
  onAnimationComplete,
}) => {
  return (
    <motion.svg
      className={className}
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      width="32"
      height="32"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer glow */}
      <circle cx="20" cy="20" r="18" fill="url(#goldGlow)" opacity="0.6" />
      
      {/* Main coin body */}
      <circle cx="20" cy="20" r="16" fill="url(#goldGradient)" />
      
      {/* Inner circle */}
      <circle cx="20" cy="20" r="13" fill="none" stroke="url(#goldStroke)" strokeWidth="1.5" />
      
      {/* Dollar sign */}
      <text
        x="20"
        y="26"
        fontFamily="serif"
        fontSize="16"
        fontWeight="bold"
        fill="#B8860B"
        textAnchor="middle"
      >
        $
      </text>
      
      {/* Shine effect */}
      <ellipse cx="15" cy="13" rx="6" ry="4" fill="white" opacity="0.4" />
      
      {/* Definitions */}
      <defs>
        <radialGradient id="goldGradient" cx="0.3" cy="0.3">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFA500" />
          <stop offset="100%" stopColor="#DAA520" />
        </radialGradient>
        
        <radialGradient id="goldGlow">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA500" opacity="0" />
        </radialGradient>
        
        <linearGradient id="goldStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B8860B" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};
