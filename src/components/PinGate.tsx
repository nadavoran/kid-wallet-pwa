import React, { useState } from 'react';

export const PinGate: React.FC<{ onOk: () => void; setMode?: boolean; existingPin?: string | undefined; }>
= ({ onOk, setMode = false, existingPin }) => {
  const [pin, setPin] = useState('');
  const [pin2, setPin2] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const submit = () => {
    setErr(null);
    if (setMode) {
      if (pin.length !== 4 || pin2.length !== 4) { setErr('Enter 4 digits'); return; }
      if (pin !== pin2) { setErr('PINs do not match'); return; }
      onOk();
    } else {
      if (!existingPin) { onOk(); return; }
      if (pin === existingPin) onOk(); else setErr('Wrong PIN');
    }
  };

  return (
    <div className="p-4 space-y-3">
      {setMode ? (
        <>
          <p className="text-sm text-slate-600">Set a 4-digit PIN for adding money</p>
          <input className="w-full border rounded-lg p-2" placeholder="PIN" value={pin} maxLength={4}
                 onChange={e=>setPin(e.target.value.replace(/\D/g,''))} />
          <input className="w-full border rounded-lg p-2" placeholder="Confirm PIN" value={pin2} maxLength={4}
                 onChange={e=>setPin2(e.target.value.replace(/\D/g,''))} />
        </>
      ) : (
        <>
          <p className="text-sm text-slate-600">Enter PIN to add money</p>
          <input className="w-full border rounded-lg p-2" placeholder="PIN" value={pin} maxLength={4}
                 onChange={e=>setPin(e.target.value.replace(/\D/g,''))} />
        </>
      )}
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button className="btn btn-primary w-full" onClick={submit}>Continue</button>
    </div>
  );
};
