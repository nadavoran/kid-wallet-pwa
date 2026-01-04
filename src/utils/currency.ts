import type { CurrencyCode } from "../types";

export const fmt = (
  amountCents: number,
  currency: CurrencyCode,
  locale = "en-AU"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amountCents / 100);
};
