import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "../state";

export const SettingsModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const { state, dispatch } = useWallet();
  const [name, setName] = useState(state.kidName ?? "Ben Ben");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [icon, setIcon] = useState(state.iconStyle);

  const save = () => {
    if (name.trim().length < 1) {
      setErr("Please enter a name");
      return;
    }
    if (p1 || p2) {
      if (p1.length !== 4 || p2.length !== 4) {
        setErr("PIN must be 4 digits");
        return;
      }
      if (p1 !== p2) {
        setErr("PINs do not match");
        return;
      }
      dispatch({ type: "set-pin", pin: p1 });
    }
    dispatch({ type: "set-name", name: name.trim() });
    if (icon !== state.iconStyle) dispatch({ type: "set-icon", icon });
    onClose();
  };

  return (
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
            className="w-full sm:w-[420px] card p-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3 className="text-lg font-semibold mb-3">Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-slate-600">Kid name</label>
                <input
                  className="w-full border rounded-lg p-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">
                  New PIN (4 digits)
                </label>
                <input
                  className="w-full border rounded-lg p-2"
                  value={p1}
                  maxLength={4}
                  onChange={(e) => setP1(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Confirm PIN</label>
                <input
                  className="w-full border rounded-lg p-2"
                  value={p2}
                  maxLength={4}
                  onChange={(e) => setP2(e.target.value.replace(/\D/g, ""))}
                />
              </div>
              <div>
                <label className="text-sm text-slate-600">Icon style</label>
                <div className="flex flex-col gap-2 mt-1 text-sm">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="iconStyle"
                      checked={icon === "pig"}
                      onChange={() => setIcon("pig")}
                    />{" "}
                    Piggy bank
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="iconStyle"
                      checked={icon === "wallet"}
                      onChange={() => setIcon("wallet")}
                    />{" "}
                    Wallet
                  </label>
                </div>
              </div>

              {err && <p className="text-sm text-red-600">{err}</p>}
              <div className="flex gap-2 pt-2">
                <button className="btn bg-slate-200" onClick={onClose}>
                  Cancel
                </button>
                <button className="btn btn-primary flex-1" onClick={save}>
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
