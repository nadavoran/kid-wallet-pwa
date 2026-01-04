import React, { useMemo, useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../state";
import { fmt } from "../utils/currency";
import { CoinSvg } from "./CoinSvg.js";

export const PayModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { state, dispatch } = useWallet();
  const [val, setVal] = useState(0);
  const [note, setNote] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animAmount, setAnimAmount] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const payButtonRef = useRef<HTMLButtonElement>(null);

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

  useLayoutEffect(() => {
    if (!isAnimating) return;
    if (!payButtonRef.current) return;

    // Get wallet position from the page
    const walletEl = document.querySelector(".wallet-image");
    if (!walletEl) return;

    const w = walletEl.getBoundingClientRect();
    const b = payButtonRef.current.getBoundingClientRect();

    // Use viewport coordinates directly
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
    setTimeout(() => onClose(), 200);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="w-full sm:w-[460px] card p-4"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              ref={containerRef}
            >
              <h3 className="text-lg font-semibold mb-4">Make Payment</h3>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="note" className="text-sm text-slate-600">
                    Paying for (optional)
                  </label>
                  <input
                    id="note"
                    className="w-full border rounded-lg p-2 mt-1"
                    placeholder="e.g. Ice-cream"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    disabled={isAnimating}
                  />
                </div>

                <div>
                  <label htmlFor="payment" className="text-sm text-slate-600">
                    Enter amount
                  </label>
                  <input
                    id="payment"
                    type="number"
                    inputMode="decimal"
                    step="0.5"
                    min="0"
                    className="w-full border rounded-lg p-3 text-lg mt-1"
                    value={val || ""}
                    onChange={(e) => setVal(Number(e.target.value))}
                    disabled={isAnimating}
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    className="btn bg-slate-200 flex-1"
                    onClick={onClose}
                    disabled={isAnimating}
                  >
                    Cancel
                  </button>
                  <button
                    ref={payButtonRef}
                    className={`btn flex-1 ${
                      canPay
                        ? "btn-danger"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                    onClick={doPay}
                    disabled={!canPay || isAnimating}
                  >
                    Pay
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
