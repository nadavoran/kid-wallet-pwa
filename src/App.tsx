import React, { useState } from "react";
import { WalletProvider, useWallet } from "./state";
import { Wallet } from "./components/Wallet";
import { PayModal } from "./components/PayModal";
import { AddMoneyModal } from "./components/AddMoneyModal";
import { SettingsModal } from "./components/SettingsModal";
import { HistoryModal } from "./components/HistoryModal";
import { AddSvg } from "./components/AddSvg.js";
import { SettingsSvg } from "./components/SettingsSvg";
import { PaySvg } from "./components/PaySvg";
import { HistorySvg } from "./components/HistorySvg";

const Inner: React.FC = () => {
  const { state } = useWallet();
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [payOpen, setPayOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="max-w-md mx-auto p-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hi, {state.kidName}! 👋</h1>
          <button
            className="p-2 rounded-lg text-slate-800 hover:text-slate-900 hover:bg-slate-100 text-sm font-medium text-slate-700 transition-colors"
            onClick={() => setSettingsOpen(true)}
            aria-label="Settings"
          >
            ☰
          </button>
        </header>

        <Wallet />

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <button
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50 transition-all"
            onClick={() => setAddMoneyOpen(true)}
          >
            <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center">
              <AddSvg />
            </div>
            <span className="text-sm font-medium text-slate-700">Add</span>
          </button>

          <button
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-red-400 hover:bg-red-50 transition-all"
            onClick={() => setPayOpen(true)}
          >
            <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center">
              <PaySvg />
            </div>
            <span className="text-sm font-medium text-slate-700">Pay</span>
          </button>

          <button
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all"
            onClick={() => setHistoryOpen(true)}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <HistorySvg />
            </div>
            <span className="text-sm font-medium text-slate-700">History</span>
          </button>
        </div>
      </div>

      <AddMoneyModal
        open={addMoneyOpen}
        onClose={() => setAddMoneyOpen(false)}
      />
      <PayModal open={payOpen} onClose={() => setPayOpen(false)} />
      <HistoryModal open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

const App: React.FC = () => (
  <WalletProvider>
    <Inner />
  </WalletProvider>
);

export default App;
