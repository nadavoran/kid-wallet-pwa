import type { WalletState, Item } from "../types";

const KEY = "kid_wallet_state_v1";

const defaultItems: Item[] = [
  { id: "icecream", name: "Ice-cream", price: 3, emoji: "🍦" },
  { id: "pizza", name: "Pizza", price: 3, emoji: "🍕" },
  { id: "burger", name: "Burger", price: 3, emoji: "🍔" },
];

export const initialState = (): WalletState => {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      return {
        balance: 0,
        currency: "AUD",
        items: defaultItems,
        pin: undefined,
        kidName: "Ben Ben",
        history: [],
        iconStyle: "pig",
        ...JSON.parse(raw),
      };
    } catch {}
  }
  return {
    balance: 0,
    currency: "AUD",
    items: defaultItems,
    pin: undefined,
    kidName: "Ben Ben",
    history: [],
    iconStyle: "pig",
  };
};

export const saveState = (s: WalletState) => {
  localStorage.setItem(KEY, JSON.stringify(s));
};
