export const getPluralizedQuantity = (word: string, amount: number): string =>
  `${amount} ${word}${amount !== 1 ? "s" : ""}`;
