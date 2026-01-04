import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWallet } from "../state";
import { fmt } from "../utils/currency";

export const HistoryPanel: React.FC = () => {
  const { state, dispatch } = useWallet();
  const [open, setOpen] = useState(false);
  const [refunding, setRefunding] = useState<string | null>(null);
  const [pin, setPin] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const items = state.history;

  const startRefund = (id: string) => {
    setRefunding(id);
    setErr(null);
    setPin("");
  };

  const confirmRefund = () => {
    if (!refunding) return;
    if (state.pin && pin !== state.pin) {
      setErr("Wrong PIN");
      return;
    }
    dispatch({ type: "refund", txId: refunding });
    setRefunding(null);
  };

  return (
    <div className="card p-4">
      <button
        className="w-full flex items-center justify-between"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="font-semibold">History</span>
        <span className="text-slate-500 text-sm">{open ? "Hide" : "Show"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <ul className="divide-y divide-slate-200">
              {items.length === 0 && (
                <li className="py-6 text-center text-sm text-slate-500">
                  No history yet
                </li>
              )}
              {items.map((tx) => (
                <li
                  key={tx.id}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div>
                    <div
                      className={`font-medium ${
                        tx.kind === "debit"
                          ? "text-slate-800"
                          : "text-emerald-700"
                      }`}
                    >
                      {tx.kind === "debit" ? "-" : "+"}
                      {fmt(tx.amount, state.currency)}
                    </div>
                    {tx.note && (
                      <div className="text-xs text-slate-500">{tx.note}</div>
                    )}
                    <div className="text-[11px] text-slate-400">
                      {new Date(tx.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {tx.kind === "debit" && !tx.refunded ? (
                      <button
                        className="btn bg-slate-100"
                        onClick={() => startRefund(tx.id)}
                      >
                        Refund
                      </button>
                    ) : tx.refunded ? (
                      <span className="text-xs text-emerald-600">Refunded</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {refunding && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full sm:w-[360px] card p-4"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2">
                Enter PIN to refund
              </h3>
              <input
                className="w-full border rounded-lg p-2"
                placeholder="PIN"
                value={pin}
                maxLength={4}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              />
              {err && <p className="text-sm text-red-600 mt-2">{err}</p>}
              <div className="flex gap-2 mt-3">
                <button
                  className="btn bg-slate-200"
                  onClick={() => setRefunding(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary flex-1"
                  onClick={confirmRefund}
                >
                  Confirm refund
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
