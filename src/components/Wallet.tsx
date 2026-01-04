import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { useWallet } from "../state";
import { fmt } from "../utils/currency";
import { PigMotion } from "./wallets/PigMotion";
import { PigMotionOld } from "./wallets/PigMotionOld";
import { GoldCoin } from "./GoldCoin";

export const Wallet: React.FC = () => {
  const { state } = useWallet();
  const controls = useAnimationControls();
  const iconControls = useAnimationControls();
  const [showCoins, setShowCoins] = useState(false);
  const [coinPositions, setCoinPositions] = useState<
    Array<{ x: number; y: number; delay: number }>
  >([]);

  useEffect(() => {
    const onPaid = () => {
      controls.start({
        rotate: [0, -8, 8, -4, 4, 0],
        transition: { duration: 0.6 },
      });
    };
    window.addEventListener("wallet:paid", onPaid);
    return () => window.removeEventListener("wallet:paid", onPaid);
  }, [controls]);

  const handleWalletTap = () => {
    // Bounce animation for the icon
    iconControls.start({
      y: [0, -20, -10, -15, 0],
      rotate: [0, -5, 5, -3, 0],
      scale: [1, 1.1, 1.05, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });

    // Generate coin positions
    const coins = Array.from({ length: 6 }, (_, i) => ({
      x: (Math.random() - 0.5) * 100,
      y: (Math.random() - 0.5) * 80,
      delay: i * 0.05,
    }));
    setCoinPositions(coins);
    setShowCoins(true);

    // Hide coins after animation
    setTimeout(() => setShowCoins(false), 1000);
  };

  return (
    <div
      className="p-0 overflow-visible rounded-2xl shadow-lg border border-slate-200 cursor-pointer active:scale-[0.98] transition-transform"
      style={{ height: "min(50vh, 400px)" }}
      onClick={handleWalletTap}
    >
      <div className="bg-gradient-to-br from-sky-500 via-sky-400 to-emerald-500 text-white h-full flex items-center justify-center p-8 rounded-2xl overflow-hidden relative">
        <div className="flex flex-col items-center text-center gap-4 relative z-10">
          <p className="uppercase tracking-wide text-white/90 text-sm font-medium">
            {state.kidName}'s balance
          </p>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={state.balance}
              className="text-7xl sm:text-8xl font-extrabold drop-shadow-lg wallet-balance-container"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              {fmt(state.balance, state.currency)}
            </motion.p>
          </AnimatePresence>

          {/* Animated Icon */}
          <motion.div animate={iconControls} className="relative">
            {state.iconStyle === "pig" && (
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 select-none wallet-image drop-shadow-lg"
                src="/wallet/pig-with-coin.png"
              />
            )}
            {state.iconStyle === "wallet" && (
              <img
                className="w-24 h-24 sm:w-32 sm:h-32 select-none wallet-image drop-shadow-lg"
                src="/wallet/brown-wallet.png"
              />
            )}
          </motion.div>
        </div>

        {/* Gold Coin Sparkles */}
        <AnimatePresence>
          {showCoins &&
            coinPositions.map((pos, i) => (
              <GoldCoin
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: "50%",
                  top: "60%",
                  marginLeft: "-16px",
                  marginTop: "-16px",
                }}
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: [0, 1.3, 1],
                  opacity: [1, 1, 0],
                  rotate: Math.random() * 720,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: pos.delay,
                  ease: "easeOut",
                }}
              />
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
