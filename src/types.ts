export type CurrencyCode = "AUD" | "USD" | "EUR";

export interface Item {
  id: string;
  name: string;
  price: number; // in
  emoji?: string;
}

export type TxKind = "credit" | "debit";

export interface Transaction {
  id: string;
  kind: TxKind;
  amount: number; // in cents
  note?: string;
  createdAt: number; // epoch ms
  refunded?: boolean;
}

export type IconStyle = "pig" | "wallet";

export interface WalletState {
  balance: number; // in cents
  currency: CurrencyCode;
  items: Item[];
  pin?: string; // plain for v1 (local-only). In production you'd hash.
  kidName: string;
  history: Transaction[];
  iconStyle: IconStyle;
}
