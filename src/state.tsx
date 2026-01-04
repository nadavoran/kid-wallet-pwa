import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { WalletState, Item, Transaction, IconStyle } from './types';
import { initialState, saveState } from './utils/storage';

interface ActionAdd { type: 'add'; amount: number; note?: string }
interface ActionPay { type: 'pay'; itemId: string; }
interface ActionPayAmount { type: 'pay-amount'; amount: number; note?: string }
interface ActionAddItem { type: 'add-item'; item: Item; }
interface ActionRemoveItem { type: 'remove-item'; itemId: string; }
interface ActionSetPin { type: 'set-pin'; pin: string; }
interface ActionSetName { type: 'set-name'; name: string; }
interface ActionSetIcon { type: 'set-icon'; icon: IconStyle }
interface ActionRefund { type: 'refund'; txId: string; }

export type Action = ActionAdd | ActionPay | ActionPayAmount | ActionAddItem | ActionRemoveItem | ActionSetPin | ActionSetName | ActionSetIcon | ActionRefund;

const reducer = (state: WalletState, action: Action): WalletState => {
  switch (action.type) {
    case 'add': {
      const tx: Transaction = { id: String(Date.now()) + Math.random().toString(36).slice(2), kind: 'credit', amount: action.amount, note: action.note ?? 'Top up', createdAt: Date.now() };
      return { ...state, balance: state.balance + action.amount, history: [tx, ...state.history] };
    }
    case 'pay': {
      const item = state.items.find(i => i.id === action.itemId);
      if (!item) return state;
      if (state.balance < item.price) return state;
      const tx: Transaction = { id: String(Date.now()) + Math.random().toString(36).slice(2), kind: 'debit', amount: item.price, note: item.name, createdAt: Date.now() };
      return { ...state, balance: state.balance - item.price, history: [tx, ...state.history] };
    }
    case 'pay-amount': {
      const amt = Math.max(0, Math.round(action.amount));
      if (state.balance < amt) return state;
      const tx: Transaction = { id: String(Date.now()) + Math.random().toString(36).slice(2), kind: 'debit', amount: amt, note: action.note, createdAt: Date.now() };
      return { ...state, balance: state.balance - amt, history: [tx, ...state.history] };
    }
    case 'add-item':
      return { ...state, items: [...state.items, action.item] };
    case 'remove-item':
      return { ...state, items: state.items.filter(i => i.id !== action.itemId) };
    case 'set-pin':
      return { ...state, pin: action.pin };
    case 'set-name':
      return { ...state, kidName: action.name };
    case 'set-icon':
      return { ...state, iconStyle: action.icon };
    case 'refund': {
      const idx = state.history.findIndex(h => h.id === action.txId);
      if (idx === -1) return state;
      const tx = state.history[idx];
      if (tx.refunded || tx.kind !== 'debit') return state;
      const updated = { ...tx, refunded: true } as Transaction;
      const history = [...state.history];
      history[idx] = updated;
      return { ...state, balance: state.balance + tx.amount, history };
    }
    default:
      return state;
  }
};

const Ctx = createContext<{ state: WalletState; dispatch: React.Dispatch<Action>; } | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  useEffect(() => { saveState(state); }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};
