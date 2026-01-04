import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../state";
import { fmt } from "../utils/currency";
import { CoinSvg } from "./CoinSvg.js";

export const PayPanel: React.FC = () => {
  const { state, dispatch } = useWallet();
  const [val, setVal] = useState(0);
  const [note, setNote] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animAmount, setAnimAmount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  // const walletRef = useRef<HTMLDivElement>(null);
  const payButtonRef = useRef<HTMLButtonElement>(null);

  // const quicks = useMemo(() => state.items.slice(0, 6), [state.items]);

  const canPay = val > 0 && state.balance >= Math.round(val * 100);

  const coinCount = useMemo(() => {
    const byValue = Math.floor(animAmount / 100); // 1 coin ~= $1
    return Math.max(3, Math.min(12, byValue));
  }, [animAmount]);

  const [positions, setPositions] = useState({
    wx: window.innerWidth / 2,
    wy: 100,
    bx: 200,
    by: 400,
  });
  // const positions = useRef({ wx: 200, wy: 100, bx: 200, by: 400 });
  useLayoutEffect(() => {
    if (!isAnimating) return;
    if (!payButtonRef.current) return;

    // Get wallet position from the page
    const walletEl = document.querySelector(".wallet-image");
    // const walletEl = document.querySelector(".wallet-balance-container");
    if (!walletEl) return;

    const w = walletEl.getBoundingClientRect();
    const b = payButtonRef.current.getBoundingClientRect();

    // Use viewport coordinates directly
    // positions.current = {
    setPositions({
      wx: w.left + w.width / 2,
      wy: w.top,
      bx: b.left + b.width / 2,
      by: b.top + b.height / 2,
    });
  }, [isAnimating]);

  const doPay = () => {
    const cents = Math.round(val * 100);
    if (cents <= 0) return;
    if (state.balance < cents) return;

    setAnimAmount(cents);
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    dispatch({
      type: "pay-amount",
      amount: animAmount,
      note: note || undefined,
    });
    window.dispatchEvent(new CustomEvent("wallet:paid"));
    setIsAnimating(false);
    setVal(0);
    setNote("");
  };

  return (
    <>
      <div className="card p-4 space-y-3" ref={containerRef}>
        <label htmlFor="note" className="text-sm text-slate-600">
          Paying for (optional)
        </label>
        <div className="flex items-center gap-2 pb-2">
          <input
            id="note"
            className="w-full border rounded-lg p-2"
            placeholder="e.g. Ice-cream"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={isAnimating}
          />
        </div>
        <label htmlFor="payment" className="text-sm text-slate-600 pt-4">
          Enter amount
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              id="payment"
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0"
              className="w-full border rounded-lg p-3 text-lg"
              value={val || ""}
              onChange={(e) => setVal(Number(e.target.value))}
              disabled={isAnimating}
            />
          </div>
          <button
            ref={payButtonRef}
            className={`btn ${
              canPay
                ? "btn-danger"
                : "bg-slate-200 text-slate-500 cursor-not-allowed"
            } min-w-28`}
            onClick={doPay}
            disabled={!canPay || isAnimating}
          >
            Pay
          </button>
        </div>
      </div>

      {/* Payment Animation Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full h-full">
              {/* Coins flying from wallet to payment destination */}
              {Array.from({ length: coinCount }).map((_, i) => {
                const delay = i * 0.06;
                const spread = (Math.random() - 0.5) * 40;
                return (
                  <CoinSvg
                    key={i}
                    className="absolute text-3xl"
                    style={{ left: 0, top: 0 }}
                    initial={{
                      x: positions.wx + (Math.random() - 0.5) * 20,
                      y: positions.wy + (Math.random() - 0.5) * 20,
                      // x: positions.current.wx + (Math.random() - 0.5) * 20,
                      // y: positions.current.wy + (Math.random() - 0.5) * 20,
                      scale: 1.2,
                      scaleY: 2,
                      opacity: 1,
                      rotate: 0,
                    }}
                    animate={{
                      x: [
                        positions.wx + (Math.random() - 0.5) * 20,
                        positions.bx + spread,
                      ],
                      y: [
                        positions.wy + (Math.random() - 0.5) * 20,
                        positions.by + (Math.random() - 0.5) * 20,
                      ],
                      scale: 1,
                      scaleY: 1.2,
                      opacity: 0,
                      rotate: Math.random() * 360,
                    }}
                    transition={{
                      duration: 0.8,
                      times: [0, 1],
                      delay,
                      ease: "easeInOut",
                    }}
                    onAnimationComplete={
                      i === coinCount - 1 ? handleAnimationComplete : undefined
                    }
                  />
                );
              })}

              {/* Payment amount indicator */}
              <motion.div
                className="absolute bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg"
                style={{
                  left: positions.bx - 50,
                  top: positions.by - 60,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                -{fmt(animAmount, state.currency)}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
