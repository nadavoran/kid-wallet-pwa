import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../state";
import { PinGate } from "./PinGate";
import { AddSvg } from "./AddSvg.js";
import { CoinSvg } from "./CoinSvg.js";

export const AddMoneyModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { state, dispatch } = useWallet();
  const [amount, setAmount] = useState(500);
  const [stage, setStage] = useState<"pin" | "amount" | "fly">("pin");

  const containerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const bankRef = useRef<HTMLDivElement>(null);

  const coinCount = useMemo(() => {
    const byValue = Math.floor(amount / 100); // 1 coin ~= $1
    console.log("+++++++++ coinCount", byValue);
    return Math.min(20, byValue + 10);
  }, [amount]);

  const positions = useRef({ sx: 40, sy: 140, bx: 320, by: 120 });
  useLayoutEffect(() => {
    if (!containerRef.current || !stackRef.current || !bankRef.current) return;
    const c = containerRef.current.getBoundingClientRect();
    const s = stackRef.current.getBoundingClientRect();
    const b = bankRef.current.getBoundingClientRect();
    positions.current = {
      sx: s.left - c.left + s.width / 2,
      sy: s.top - c.top + s.height - 8,
      bx: b.left - c.left + b.width * 0.6,
      by: b.top - c.top + b.height * 0.5,
    };
  }, [stage, amount]);

  const start = () => setStage("amount");

  const beginFly = () => {
    setStage("fly");
  };

  const handleClose = () => {
    onClose();
    setStage("pin");
  };

  const handleLastCoinArrived = () => {
    dispatch({ type: "add", amount });

    setTimeout(handleClose, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full sm:w-[460px] card p-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {stage === "pin" && (
              <PinGate onOk={start} existingPin={state.pin} />
            )}

            {stage === "amount" && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Add money</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    className="w-full border rounded-lg p-2"
                    value={amount === 0 ? "" : amount / 100}
                    placeholder="0"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        setAmount(0);
                      } else {
                        setAmount(Math.max(0, Math.round(Number(value) * 100)));
                      }
                    }}
                  />
                  <button
                    className="btn btn-accent w-full"
                    onClick={beginFly}
                    disabled={amount === 0}
                  >
                    <AddSvg /> Add
                  </button>
                </div>
              </div>
            )}

            {stage === "fly" && (
              <div ref={containerRef} className="relative h-56">
                {/* Stack area */}
                <div
                  ref={stackRef}
                  className="absolute left-4 bottom-4 w-20 h-28 flex  gap-4 items-end justify-center"
                >
                  {/* Stack of coin */}
                  {Array.from({ length: coinCount }).map((_, i) => {
                    const posY = coinCount * 2.5 - i * 2.5 - i;
                    if (i > 9) {
                      console.log("++++++++ render animated coin", i);
                      return (
                        <CoinSvg
                          key={i}
                          className="absolute left-4 bottom-4 w-20 h-28 flex items-end justify-center"
                          initial={{
                            x: 0,
                            y: posY,
                            scale: 1,
                            opacity: 1,
                          }}
                          animate={{
                            x: positions.current.bx - 80,
                            y: [posY, posY - 50, posY - 50, 0],
                            scaleY: 2.5,
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.7,
                            times: [0, 0.7, 0.9, 1],
                            delay: (coinCount - i) * 0.08,
                            ease: "easeInOut",
                          }}
                          onAnimationComplete={
                            i === coinCount - 1
                              ? () =>
                                  setTimeout(
                                    handleLastCoinArrived,
                                    coinCount * 20
                                  )
                              : undefined
                          }
                        />
                      );
                    }
                    return (
                      <CoinSvg
                        key={i}
                        className="absolute left-4 bottom-4 w-20 h-28 flex items-end justify-center"
                        style={{
                          transform: `translate3d(0, ${posY}px,0)`,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Bank icon */}
                <div
                  ref={bankRef}
                  className="absolute right-6 bottom-6 w-24 h-24"
                >
                  <img src="/wallet/pig.png" />
                </div>
                <div className="absolute left-0 right-0 bottom-2 text-center text-sm font-medium">
                  Adding {amount / 100}...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
